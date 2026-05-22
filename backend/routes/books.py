from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session 

from database import SessionLocal 
from models.book import Book 
from schemas.book_schemas import BookCreate, BookUpdate, BookResponse


router = APIRouter(
    prefix="/books",
    tags=["Books"]
)


def get_db():
    db = SessionLocal()
    try: 
        yield db 
    finally:
        db.close()


@router.post("/", response_model=BookResponse, status_code=status.HTTP_201_CREATED)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    new_book = Book(**book.model_dump())

    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    return new_book

@router.get("/", response_model=list[BookResponse])
def get_books(db: Session = Depends(get_db)):
    books = db.query(Book).all()
    return books 

@router.get("/{book_id}", response_model=BookResponse)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()

    if book is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    
    return book 

@router.put("/{book_id}", response_model=BookResponse)
def update_book(book_id: int, updated_book: BookUpdate, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    
    if book is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    
    book.title = updated_book.title
    book.author = updated_book.author
    book.year = updated_book.year
    book.genre = updated_book.genre
    book.description = updated_book.description 

    db.commit()
    db.refresh(book)

    return (book)

@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()

    if book is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )
    
    db.delete(book)
    db.commit()

    return None 
