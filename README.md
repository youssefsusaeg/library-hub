# Library Hub
# Youssef Susaeg

Library Hub is a simple fullstack CRUD application for managing a personal book library.

The project is built with:

- FastAPI for the backend
- SQLite as the database
- SQLAlchemy for database models
- Pydantic for data validation
- React with TypeScript for the frontend
- Fetch API for communication between frontend and backend

## Project Structure

```txt
library-hub/
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── requirements.txt
│   ├── models/
│   │   └── book.py
│   ├── schemas/
│   │   └── book_schemas.py
│   └── routes/
│       └── books.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
│
└── README.md


Features

The application allows the user to:

Add a new book
View all books
Edit an existing book
Delete a book
See success messages after creating, updating, or deleting a book
See a message when no books are currently available

Backend

The backend is built with FastAPI and provides REST API endpoints for managing books.

Start Backend
cd backend
pip install -r requirements.txt
python app.py

The backend will run on:

http://127.0.0.1:8000

FastAPI documentation is available at:

http://127.0.0.1:8000/docs


Frontend

The frontend is built with React and TypeScript using Vite.

Start Frontend
cd frontend
npm install
npm run dev

The frontend will run on:

http://localhost:5173


API Endpoints

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/books/`          | Create a new book  |
| GET    | `/books/`          | Get all books      |
| GET    | `/books/{book_id}` | Get one book by ID |
| PUT    | `/books/{book_id}` | Update a book      |
| DELETE | `/books/{book_id}` | Delete a book      |


Database

This project uses SQLite.
When the backend runs, a local database file named library.db is created automatically inside the backend folder.


Notes

This project was created as part of a web application development assignment in the AI Developer program. The goal was to build a fullstack CRUD application with a structured backend, API validation, frontend integration, and clear project documentation.
