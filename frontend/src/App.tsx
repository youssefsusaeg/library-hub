import { useEffect, useState } from "react";
import "./App.css";

import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import type { Book, BookFormData } from "./types/book";
import { createBook, deleteBook, getBooks, updateBook } from "./services/bookService";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  async function loadBooks() {
    const data = await getBooks();
    setBooks(data);
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function handleSubmitBook(bookData: BookFormData) {
    if (selectedBook) {
      const updatedBook = await updateBook(selectedBook.id, bookData);

      const updatedBooks = books.map((book) =>
        book.id === selectedBook.id ? updatedBook : book
      );

      setBooks(updatedBooks);
      setSelectedBook(null);
      setMessage(`"${updatedBook.title}" has been updated successfully.`);
    } else {
      const newBook = await createBook(bookData);

      setBooks([...books, newBook]);
      setMessage(`"${newBook.title}" has been added successfully.`);
    }
  }

  function handleEditBook(book: Book) {
    setSelectedBook(book);
    setMessage("");
  }

  function handleCancelEdit() {
    setSelectedBook(null);
    setMessage("");
  }

  async function handleDeleteBook(id: number) {
    await deleteBook(id);

    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    setMessage("Book has been deleted successfully.");

    if (selectedBook?.id === id) {
      setSelectedBook(null);
    }
  }

  return (
    <main className="app-container">
      <section className="hero-section">
        <h1>Library Hub</h1>
        <p>
          Manage your personal library with a simple fullstack CRUD application.
        </p>
      </section>

      {message && <p className="success-message">{message}</p>}

      <section className="content-section">
        <BookForm
          onSubmit={handleSubmitBook}
          selectedBook={selectedBook}
          onCancelEdit={handleCancelEdit}
        />

        <BookList
          books={books}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />
      </section>
    </main>
  );
}

export default App;