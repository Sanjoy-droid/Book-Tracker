"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Book, BookStatus } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  User,
  Tag,
  CheckCircle,
  StickyNote,
  Star,
  Save,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import toast from "react-hot-toast";

// Improved validation schema with clear error messages
const bookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  genre: z.string().nullable().optional(),
  status: z.nativeEnum(BookStatus, {
    required_error: "Please select a reading status",
    invalid_type_error: "Please select a valid reading status",
  }),
  rating: z.number().min(1).max(5).nullable().optional(),
  notes: z.string().nullable().optional(),
});

interface BookFormProps {
  initialData?: Book;
}

export default function BookForm({ initialData }: BookFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      id: initialData?.id || undefined,
      title: initialData?.title || "",
      author: initialData?.author || "",
      genre: initialData?.genre || "",
      status: initialData?.status || undefined,
      rating: initialData?.rating || null,
      notes: initialData?.notes || "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data: Book) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const preparedData = {
        ...data,
        genre: data.genre || null,
        rating: data.rating || null,
        notes: data.notes || null,
      };

      const url = preparedData.id
        ? `/api/books/${preparedData.id}`
        : "/api/books";
      const method = preparedData.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      await response.json();
      toast.success(
        preparedData.id
          ? "Book updated successfully!"
          : "New book added successfully!",
      );
      router.push("/books");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save book. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4">
        <CardTitle className="flex items-center text-lg">
          <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
          {initialData ? "Edit Book" : "Add New Book"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm">
                      <BookOpen className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                      Title*
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter book title" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm">
                      <User className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                      Author*
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter author name" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm">
                      <Tag className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                      Genre
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Enter book genre"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm">
                      <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                      Reading Status*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="UNREAD">Unread</SelectItem>
                        <SelectItem value="READING">Reading</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="ABANDONED">Abandoned</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm">
                      <Star className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
                      Rating (1-5)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={field.value === null ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value
                            ? parseInt(e.target.value, 10)
                            : null;
                          field.onChange(value);
                        }}
                        placeholder="Rate from 1 to 5"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-sm">
                    <StickyNote className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                    Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Add thoughts, quotes, or notes about the book"
                      className="min-h-24"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initialData ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {initialData ? "Update Book" : "Add Book"}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
