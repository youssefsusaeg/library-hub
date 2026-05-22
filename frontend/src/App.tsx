import { useEffect, useState } from "react";
import "./App.css";

import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import type { Book, BookFormData } from "./types/book";
import { createBook, deleteBook, getBooks } from "./services/bookService";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [message, setMessage] = useState<string>("");

  async function loadBooks() {
    const data = await getBooks();
    setBooks(data);
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function handleCreateBook(bookData: BookFormData) {
    const newBook = await createBook(bookData);

    setBooks([...books, newBook]);
    setMessage(`"${newBook.title}" has been added successfully.`);
  }

  async function handleDeleteBook(id: number) {
    await deleteBook(id);

    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    setMessage("Book has been deleted successfully.");
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
        <BookForm onSubmit={handleCreateBook} />
        <BookList books={books} onDelete={handleDeleteBook} />
      </section>
    </main>
  );
}

export default App;