"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/types/book";
import BookForm from "@/app/CustomComponents/BookForm";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Loader2,
  Trash2,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function BookEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          toast.error("Failed to fetch book");
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
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Error deleting book");
        throw new Error("Failed to delete book");
      }
      toast.success("Book deleted successfully");
      router.push("/books");
    } catch (err) {
      setError("Failed to delete book");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 bg-slate-50 dark:bg-slate-900 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
          Loading book details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card className="border-red-200 dark:border-red-800 shadow-lg overflow-hidden">
          <div className="bg-red-50 dark:bg-red-900/20 p-8">
            <div className="flex justify-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/40 mb-4 shadow-inner">
                <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2 text-center">
              Error Loading Book
            </h2>
            <p className="text-red-600 dark:text-red-300 mb-6 text-center">
              {error}
            </p>
            <div className="flex justify-center">
              <Link href="/books">
                <Button
                  size="lg"
                  className="shadow-md hover:shadow-lg transition-all"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Library
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardHeader className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/books" className="mr-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full shadow-sm hover:shadow transition-all"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-primary mr-3" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Edit Book
                </h1>
              </div>
            </div>

            {book && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-500 dark:hover:bg-red-950/30 rounded-full shadow-sm hover:shadow transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-red-200 dark:border-red-900 shadow-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-700 dark:text-red-400 text-xl">
                      Are you sure you want to delete this book?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-600 dark:text-slate-400">
                      This action cannot be undone. This will permanently delete
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        {" "}
                        {book.title}{" "}
                      </span>
                      from your library.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      disabled={isDeleting}
                      className="border-slate-200 dark:border-slate-700"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white shadow-md"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Book
                        </>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {book ? <BookForm initialData={book} /> : null}
        </CardContent>
      </Card>
    </div>
  );
}
