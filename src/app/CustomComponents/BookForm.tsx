"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Book } from "@/types/book";
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

// Validation Schema

const bookSchema = z.object({
  id: z.string().optional(), // Add this line
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().nullable().optional(),
  status: z.enum(["UNREAD", "READING", "COMPLETED", "ABANDONED"]).optional(),
  rating: z.number().min(1).max(5).nullable().optional(),
  notes: z.string().nullable().optional(),
});
interface BookFormProps {
  initialData?: Book;
}

export default function BookForm({ initialData }: BookFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialData,
  });
  const onSubmit = async (data: Book) => {
    try {
      const url = initialData?.id
        ? `/api/books/${initialData.id}`
        : "/api/books";

      const method = initialData?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save book");
      }

      router.push("/books");
    } catch (err) {
      setError("Failed to save book. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">
        {initialData ? "Edit Book" : "Add New Book"}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <Input {...register("title")} placeholder="Book Title" />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Author</label>
          <Input {...register("author")} placeholder="Book Author" />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Genre</label>
          <Input {...register("genre")} placeholder="Book Genre" />
        </div>

        <div>
          <label className="block mb-2">Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UNREAD">Unread</SelectItem>
                  <SelectItem value="READING">Reading</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="ABANDONED">Abandoned</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <label className="block mb-2">Notes</label>
          <Textarea
            {...register("notes")}
            placeholder="Your thoughts about the book"
          />
        </div>

        <Button type="submit" className="w-full">
          {initialData ? "Update Book" : "Add Book"}
        </Button>
      </form>
    </div>
  );
}
