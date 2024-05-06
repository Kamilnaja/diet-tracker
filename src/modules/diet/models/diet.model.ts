import { Entry } from "@shared/models/entry.model";

export interface Diet extends Entry {
  description: string;
  author: string;
  books: Book[];
}

interface Book {
  title: string;
  isbn: string;
}
