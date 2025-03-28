"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/types/book";
import BookForm from "@/app/CustomComponents/BookForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Correctly unwrapping the params
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError("Book not found");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      router.push("/books");
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
    <div>
      {book ? (
        <>
          <BookForm initialData={book} />
          <div className="container mx-auto px-4 max-w-md mt-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDelete}
            >
              Delete Book
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
