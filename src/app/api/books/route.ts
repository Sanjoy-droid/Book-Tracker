import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation Schema
const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().optional(),
  status: z.enum(["UNREAD", "READING", "COMPLETED", "ABANDONED"]).optional(),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
});

// GET All Books
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 },
    );
  }
}

// POST New Book
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = BookSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.errors },
        { status: 400 },
      );
    }

    // Ensure all required fields are provided
    const data = {
      ...validation.data,
      genre: validation.data.genre ?? "",
    };

    const book = await prisma.book.create({ data });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 },
    );
  }
}
