// @/types/book.ts
export enum BookStatus {
  UNREAD = "UNREAD",
  READING = "READING",
  COMPLETED = "COMPLETED",
  ABANDONED = "ABANDONED",
}

export interface Book {
  id?: string;
  title: string;
  author: string;
  genre?: string | null;
  status?: BookStatus;
  rating?: number | null;
  notes?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
