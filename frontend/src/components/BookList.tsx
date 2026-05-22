import type { Book } from "../types/book";

interface BookListProps {
  books: Book[];
  onDelete: (id: number) => void;
}

function BookList({ books, onDelete }: BookListProps) {
  if (books.length === 0) {
    return <p className="empty-message">No books currently available.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Year:</strong> {book.year}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          {book.description && <p>{book.description}</p>}

          <button onClick={() => onDelete(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BookList;