import { useState, useEffect } from 'react';
import { books, startingRecommendations } from './bibleData.js';

const categories = {
  Old: ["Law", "History", "Poetry", "Prophecy"],
  New: ["Gospel", "History", "Epistle", "Prophecy"]
};

function CrossIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="13" y="2" width="6" height="28" rx="1" fill="#d4a843" />
      <rect x="4" y="10" width="24" height="6" rx="1" fill="#d4a843" />
      <path d="M6 28 C6 28 8 20 16 20 C24 20 26 28 26 28" stroke="#d4a843" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="bg-navy text-cream px-4 py-5 shadow-lg">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <CrossIcon />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bible Study Companion</h1>
            <p className="text-sm text-gold-light opacity-90">Your guide through every book of Scripture</p>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-lg bg-navy-light text-cream placeholder-cream/50 border border-cream/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <svg className="absolute left-3 top-3 w-4 h-4 text-cream/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </header>
  );
}

function DevotionalCard() {
  return (
    <div className="bg-white border-l-4 border-gold rounded-lg p-5 shadow-sm">
      <p className="text-navy italic text-lg leading-relaxed">
        "Invite the Holy Spirit as your teacher. Open your heart before you open the Word, and let God speak to you through every page."
      </p>
      <p className="text-navy-light text-sm mt-3 font-medium">
        — Begin each study with prayer and an open heart
      </p>
      <p className="text-gold text-xs mt-2 font-semibold uppercase tracking-wide">
        Daily Encouragement
      </p>
    </div>
  );
}

function NavTabs({ activeView, setActiveView }) {
  const tabs = [
    { id: "home", label: "Books" },
    { id: "start", label: "Where to Start" },
    { id: "progress", label: "My Progress" }
  ];

  return (
    <div className="flex gap-1 bg-navy-dark/10 rounded-lg p-1">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveView(tab.id)}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === tab.id
              ? "bg-navy text-cream shadow-sm"
              : "text-navy hover:bg-navy/10"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function TestamentTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2">
      {["Old", "New"].map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
            activeTab === tab
              ? "bg-gold text-navy shadow-sm"
              : "bg-white text-navy border border-navy/20 hover:bg-cream"
          }`}
        >
          {tab} Testament
        </button>
      ))}
    </div>
  );
}

function CategoryBadge({ category }) {
  const colors = {
    Law: "bg-navy text-cream",
    History: "bg-navy-light text-cream",
    Poetry: "bg-gold text-navy",
    Prophecy: "bg-navy-dark text-gold-light",
    Gospel: "bg-gold text-navy",
    Epistle: "bg-navy-light text-cream"
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${colors[category] || "bg-navy text-cream"}`}>
      {category}
    </span>
  );
}

function BookListItem({ book, isCompleted, onSelect }) {
  return (
    <button
      onClick={() => onSelect(book)}
      className="w-full text-left bg-white rounded-lg p-4 border-l-4 border-gold shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-navy group-hover:text-navy-light transition-colors">{book.name}</h3>
            <CategoryBadge category={book.category} />
          </div>
          <p className="text-sm text-navy/60 truncate">{book.author} • {book.written}</p>
        </div>
        <div className="flex items-center gap-2 ml-2">
          {isCompleted && (
            <span className="text-green-600 text-xs font-semibold">✓ Studied</span>
          )}
          <svg className="w-5 h-5 text-navy/30 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function BookDetail({ book, isCompleted, onToggleComplete, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
      <div className="bg-cream rounded-xl shadow-2xl max-w-2xl w-full my-4">
        <div className="bg-navy rounded-t-xl px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-cream">{book.name}</h2>
            <p className="text-gold-light text-sm">{book.author} • {book.written}</p>
          </div>
          <button onClick={onClose} className="text-cream/70 hover:text-cream p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-center gap-2">
            <CategoryBadge category={book.category} />
            <span className="text-sm text-navy/60">{book.testament} Testament</span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gold uppercase tracking-wide mb-1">Why It Matters</h3>
            <p className="text-navy leading-relaxed">{book.whyItMatters}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gold uppercase tracking-wide mb-2">Main Themes</h3>
            <div className="flex flex-wrap gap-2">
              {book.themes.map(theme => (
                <span key={theme} className="bg-gold-light/30 text-navy px-3 py-1 rounded-full text-sm font-medium">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gold uppercase tracking-wide mb-1">Connection to Jesus</h3>
            <p className="text-navy leading-relaxed">{book.jesusConnection}</p>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-gold">
            <h3 className="text-sm font-bold text-gold uppercase tracking-wide mb-1">Key Verse</h3>
            <p className="text-navy italic leading-relaxed">{book.keyVerse}</p>
          </div>

          <button
            onClick={() => onToggleComplete(book.name)}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              isCompleted
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-navy text-cream hover:bg-navy-light"
            }`}
          >
            {isCompleted ? "✓ Marked as Studied" : "Mark as Studied"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BookList({ activeTab, completedBooks, onToggleComplete, onSelectBook, searchQuery }) {
  const filteredBooks = searchQuery
    ? books.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books.filter(b => b.testament === activeTab);

  const grouped = {};
  filteredBooks.forEach(book => {
    if (!grouped[book.category]) grouped[book.category] = [];
    grouped[book.category].push(book);
  });

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12 text-navy/50">
        <p className="text-lg">No books found</p>
        <p className="text-sm mt-1">Try a different search term</p>
      </div>
    );
  }

  const categoryOrder = searchQuery
    ? Object.keys(grouped)
    : categories[activeTab] || Object.keys(grouped);

  return (
    <div className="space-y-6">
      {categoryOrder.map(cat => {
        const catBooks = grouped[cat];
        if (!catBooks || catBooks.length === 0) return null;
        return (
          <div key={cat}>
            <h3 className="text-sm font-bold text-navy/50 uppercase tracking-wider mb-2 px-1">
              {cat} ({catBooks.length})
            </h3>
            <div className="space-y-2">
              {catBooks.map(book => (
                <BookListItem
                  key={book.name}
                  book={book}
                  isCompleted={completedBooks.includes(book.name)}
                  onSelect={onSelectBook}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WhereToStart({ onSelectBook }) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-navy">Where to Start</h2>
        <p className="text-navy/60 text-sm">Curated reading plans for your journey</p>
      </div>
      {startingRecommendations.map(rec => (
        <div key={rec.title} className="bg-white rounded-lg p-5 border-l-4 border-gold shadow-sm">
          <h3 className="font-bold text-navy text-lg mb-1">{rec.title}</h3>
          <p className="text-navy/70 text-sm mb-3 leading-relaxed">{rec.description}</p>
          <div className="flex flex-wrap gap-2">
            {rec.books.map(bookName => {
              const book = books.find(b => b.name === bookName);
              return (
                <button
                  key={bookName}
                  onClick={() => book && onSelectBook(book)}
                  className="bg-cream text-navy px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gold-light/30 transition-colors border border-navy/10"
                >
                  {bookName}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressTracker({ completedBooks, onToggleComplete }) {
  const total = books.length;
  const completed = completedBooks.length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-navy">My Progress</h2>
        <p className="text-navy/60 text-sm">{completed} of {total} books studied</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-navy">{percentage}% Complete</span>
          <span className="text-sm text-navy/50">{completed}/{total}</span>
        </div>
        <div className="w-full bg-cream rounded-full h-3">
          <div
            className="bg-gold rounded-full h-3 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {["Old", "New"].map(testament => (
        <div key={testament}>
          <h3 className="text-sm font-bold text-navy/50 uppercase tracking-wider mb-2 px-1">
            {testament} Testament
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {books.filter(b => b.testament === testament).map(book => {
              const isCompleted = completedBooks.includes(book.name);
              return (
                <button
                  key={book.name}
                  onClick={() => onToggleComplete(book.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    isCompleted
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-white text-navy border border-navy/10 hover:border-gold"
                  }`}
                >
                  <span className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                    isCompleted ? "bg-green-600 border-green-600" : "border-navy/30"
                  }`}>
                    {isCompleted && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="truncate">{book.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {completed > 0 && (
        <button
          onClick={() => {
            if (window.confirm("Clear all progress? This cannot be undone.")) {
              completedBooks.forEach(name => onToggleComplete(name));
            }
          }}
          className="w-full text-center text-sm text-red-400 hover:text-red-600 py-2 transition-colors"
        >
          Reset Progress
        </button>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-cream/60 text-center text-xs py-4 mt-8">
      <p>Bible Study Companion — Read, Study, Grow</p>
      <p className="mt-1 text-cream/40">All Scripture references from the NIV</p>
    </footer>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [activeTab, setActiveTab] = useState("Old");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [completedBooks, setCompletedBooks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("completedBooks") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("completedBooks", JSON.stringify(completedBooks));
  }, [completedBooks]);

  const toggleComplete = (bookName) => {
    setCompletedBooks(prev =>
      prev.includes(bookName)
        ? prev.filter(n => n !== bookName)
        : [...prev, bookName]
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <DevotionalCard />
        <NavTabs activeView={activeView} setActiveView={setActiveView} />

        {activeView === "home" && (
          <>
            {!searchQuery && <TestamentTabs activeTab={activeTab} setActiveTab={setActiveTab} />}
            <BookList
              activeTab={activeTab}
              completedBooks={completedBooks}
              onToggleComplete={toggleComplete}
              onSelectBook={setSelectedBook}
              searchQuery={searchQuery}
            />
          </>
        )}

        {activeView === "start" && (
          <WhereToStart onSelectBook={setSelectedBook} />
        )}

        {activeView === "progress" && (
          <ProgressTracker
            completedBooks={completedBooks}
            onToggleComplete={toggleComplete}
          />
        )}
      </main>

      {selectedBook && (
        <BookDetail
          book={selectedBook}
          isCompleted={completedBooks.includes(selectedBook.name)}
          onToggleComplete={toggleComplete}
          onClose={() => setSelectedBook(null)}
        />
      )}

      <Footer />
    </div>
  );
}
