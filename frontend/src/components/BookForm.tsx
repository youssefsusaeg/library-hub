import { useState } from "react";
import type { BookFormData } from "../types/book";

interface BookFormProps {
  onSubmit: (bookData: BookFormData) => void;
}

function BookForm({ onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    year: new Date().getFullYear(),
    genre: "",
    description: "",
  });

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

      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;