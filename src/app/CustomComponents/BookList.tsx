"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load books");
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      setError("Failed to delete book");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Books</h1>
        <Link href="/books/new">
          <Button>
            <Plus className="mr-2" /> Add Book
          </Button>
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="text-center text-gray-500">
          No books found. Add your first book!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <p className="text-muted-foreground">by {book.author}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <Link href={`/books/${book.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => book.id && handleDelete(book.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
