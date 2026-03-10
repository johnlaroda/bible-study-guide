import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { request as httpsRequest } from 'node:https'
import { request as httpRequest } from 'node:http'
import { URL } from 'node:url'

function bibleApiProxy(apiKey) {
  return {
    name: 'bible-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/bible', (req, res) => {
        if (!apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'VITE_BIBLE_API_KEY is not configured. Add it to your .env file.' }))
          return
        }
        const targetUrl = `https://rest.api.bible${req.url}`
        const parsed = new URL(targetUrl)

        const httpsProxy = process.env.HTTPS_PROXY || process.env.https_proxy
        if (httpsProxy) {
          const proxy = new URL(httpsProxy)
          const connectReq = httpRequest({
            host: proxy.hostname,
            port: proxy.port,
            method: 'CONNECT',
            path: `${parsed.hostname}:443`,
            headers: {
              Host: `${parsed.hostname}:443`,
              'Proxy-Authorization': proxy.username
                ? 'Basic ' + Buffer.from(`${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password || '')}`).toString('base64')
                : undefined,
            },
          })

          connectReq.on('connect', (proxyRes, socket) => {
            if (proxyRes.statusCode !== 200) {
              res.writeHead(502)
              res.end('Proxy CONNECT failed')
              return
            }
            const apiReq = httpsRequest({
              hostname: parsed.hostname,
              path: parsed.pathname + parsed.search,
              method: req.method,
              headers: {
                'api-key': apiKey,
                'Accept': 'application/json',
              },
              socket,
              agent: false,
            }, (apiRes) => {
              res.writeHead(apiRes.statusCode, {
                'Content-Type': apiRes.headers['content-type'] || 'application/json',
                'Access-Control-Allow-Origin': '*',
              })
              apiRes.pipe(res)
            })
            apiReq.on('error', (err) => {
              res.writeHead(500)
              res.end(`API request error: ${err.message}`)
            })
            apiReq.end()
          })

          connectReq.on('error', (err) => {
            res.writeHead(502)
            res.end(`Proxy connect error: ${err.message}`)
          })

          connectReq.end()
        } else {
          const apiReq = httpsRequest({
            hostname: parsed.hostname,
            path: parsed.pathname + parsed.search,
            method: req.method,
            headers: {
              'api-key': apiKey,
              'Accept': 'application/json',
            },
          }, (apiRes) => {
            res.writeHead(apiRes.statusCode, {
              'Content-Type': apiRes.headers['content-type'] || 'application/json',
              'Access-Control-Allow-Origin': '*',
            })
            apiRes.pipe(res)
          })
          apiReq.on('error', (err) => {
            res.writeHead(500)
            res.end(`API request error: ${err.message}`)
          })
          apiReq.end()
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      bibleApiProxy(env.VITE_BIBLE_API_KEY),
    ],
  }
})
