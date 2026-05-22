export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  description?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  year: number;
  genre: string;
  description?: string;
}