import type { Book, BookFormData } from "../types/book";

const API_URL = "http://127.0.0.1:8000/books";

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/`);
  return response.json();
}

export async function createBook(bookData: BookFormData): Promise<Book> {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  return response.json();
}

export async function updateBook(id: number, bookData: BookFormData): Promise<Book> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  return response.json();
}

export async function deleteBook(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}