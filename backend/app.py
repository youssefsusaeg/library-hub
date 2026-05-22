from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn 

from database import engine, Base
from models.book import Book 
from routes.books import router as books_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Library Hub API",
    description="A simple full stack CRUD for managing books",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books_router)

@app.get("/")
def root():
    return {"message": "Welcome to Library Hub API"}

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)