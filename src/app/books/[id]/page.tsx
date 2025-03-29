"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Book, BookStatus } from "@/types/book";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Loader2,
  Trash2,
  ArrowLeft,
  BookOpen,
  User,
  Tag,
  Star,
  CheckCircle,
  StickyNote,
  Edit,
  AlertTriangle,
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
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

// Helper function to display reading status
const getStatusBadge = (status: BookStatus | null | undefined) => {
  if (!status) return null;

  const statusConfig = {
    UNREAD: {
      color:
        "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
      label: "Unread",
    },
    READING: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      label: "Currently Reading",
    },
    COMPLETED: {
      color:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      label: "Completed",
    },
    ABANDONED: {
      color:
        "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
      label: "Abandoned",
    },
  };

  const config = statusConfig[status];
  return (
    <Badge
      variant="outline"
      className={`${config.color} rounded-full px-3 py-1 font-medium`}
    >
      {config.label}
    </Badge>
  );
};

// Star rating component
const StarRating = ({ rating }: { rating: number | null | undefined }) => {
  if (!rating) return null;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-500 fill-amber-500" : "text-slate-300 dark:text-slate-600"}`}
        />
      ))}
      <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
        ({rating}/5)
      </span>
    </div>
  );
};

export default function BookDetailPage({ params }: { params: { id: string } }) {
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
          toast.error("Failed to fetch book details");
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
      <div className="flex flex-col justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-600 dark:text-slate-400">
          Loading book details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md text-center">
        <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg border border-red-200 dark:border-red-800 shadow-sm">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">
            Error
          </h2>
          <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
          <Link href="/books">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center mb-6">
        <Link href="/books" className="mr-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Book Details
        </h1>
      </div>

      {book ? (
        <Card className="border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-blue-100 dark:from-blue-900/30 to-transparent rounded-bl-full z-0"></div>

          <CardHeader className="relative z-10 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold mb-1">
                  {book.title}
                </CardTitle>
                <CardDescription className="text-base flex items-center">
                  <User className="h-4 w-4 mr-1.5 text-slate-500" />
                  by {book.author}
                </CardDescription>
              </div>
              <div className="space-y-2">{getStatusBadge(book.status)}</div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              {book.genre && (
                <div className="flex items-center text-slate-700 dark:text-slate-300">
                  <Tag className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">Genre:</span>
                  <span className="ml-2">{book.genre}</span>
                </div>
              )}

              {book.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Rating:
                  </span>
                  <div className="ml-2">
                    <StarRating rating={book.rating} />
                  </div>
                </div>
              )}
            </div>

            {book.notes && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-start mb-2">
                  <StickyNote className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400 mt-1" />
                  <h3 className="font-medium text-slate-700 dark:text-slate-300">
                    Notes:
                  </h3>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 prose-sm dark:prose-invert">
                  {book.notes}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 mt-6 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                onClick={() => router.push(`/books/edit/${id}`)}
                className="border-blue-200 text-blue-700 hover:text-blue-800 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-900/30"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Book
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Book
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border border-slate-200 dark:border-slate-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      <span className="font-semibold"> {book.title} </span>
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
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
