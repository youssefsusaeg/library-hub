from pydantic import BaseModel
from typing import Optional 

class BookBase(BaseModel):
    title: str
    author: str
    year: int 
    genre: str 
    description: Optional[str] = None 


class BookCreate(BookBase):
    pass 

class BookUpdate(BookBase):
    pass

class BookResponse(BookBase):
    id: int 

    class Config:
        from_attributes = True 