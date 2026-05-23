import { useEffect, useState } from "react";
import type { Book, BookFormData } from "../types/book";

interface BookFormProps {
  onSubmit: (bookData: BookFormData) => void;
  selectedBook: Book | null;
  onCancelEdit: () => void;
}

function BookForm({ onSubmit, selectedBook, onCancelEdit }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    year: new Date().getFullYear(),
    genre: "",
    description: "",
  });

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        title: selectedBook.title,
        author: selectedBook.author,
        year: selectedBook.year,
        genre: selectedBook.genre,
        description: selectedBook.description || "",
      });
    }
  }, [selectedBook]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: name === "year" ? Number(value) : value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit(formData);

    setFormData({
      title: "",
      author: "",
      year: new Date().getFullYear(),
      genre: "",
      description: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{selectedBook ? "Edit Book" : "Add New Book"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Book title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Short description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit">{selectedBook ? "Update Book" : "Add Book"}</button>

      {selectedBook && (
        <button type="button" className="secondary-button" onClick={onCancelEdit}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default BookForm;