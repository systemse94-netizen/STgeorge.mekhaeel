import React, { useEffect, useState } from 'react';
import { loadBibleIndex } from './contentLoader';

export default function Bible() {
  const [index, setIndex] = useState(null);
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapterText, setChapterText] = useState(null);

  useEffect(() => {
    (async () => {
      const idx = await loadBibleIndex();
      setIndex(idx);
    })();
  }, []);

  async function openChapter(bookId, chapterId) {
    // expect a path like /STgeorge-main/assets/data/bible/books/{bookId}/chapters/{chapterId}.json
    const path = `/STgeorge-main/assets/data/bible/books/${bookId}/chapters/${chapterId}.json`;
    const resp = await fetch(path);
    const json = await resp.json();
    setChapterText(json.text || JSON.stringify(json));
  }

  if (!index) return <div>تحميل...</div>;

  return (
    <div style={{ direction: 'rtl', textAlign: 'right' }}>
      <h2>الكتاب المقدس</h2>
      <div>
        {index.books && index.books.map((b) => (
          <div key={b.id}>
            <button onClick={() => setBook(b)}>{b.name}</button>
          </div>
        ))}
      </div>
      <div>
        {book && (
          <div>
            <h3>{book.name}</h3>
            {book.chapters && book.chapters.map((c) => (
              <button key={c} onClick={() => openChapter(book.id, c)} style={{ display: 'block' }}>{`الفصل ${c}`}</button>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: 20 }}>{chapterText}</div>
    </div>
  );
}
