import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('aetheria_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('aetheria_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (essay) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.slug === essay.slug);
      if (exists) {
        return prev.filter(b => b.slug !== essay.slug);
      } else {
        return [...prev, {
          id: essay.id,
          title: essay.title,
          slug: essay.slug,
          excerpt: essay.excerpt,
          featured_image: essay.featured_image,
          category_name: essay.category_name,
          category_slug: essay.category_slug,
          reading_time: essay.reading_time,
          author_name: essay.author_name
        }];
      }
    });
  };

  const isBookmarked = (slug) => {
    return bookmarks.some(b => b.slug === slug);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
