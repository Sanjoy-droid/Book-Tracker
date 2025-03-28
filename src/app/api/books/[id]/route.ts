import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation Schema (same as previous file)
const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().optional(),
  status: z.enum(["UNREAD", "READING", "COMPLETED", "ABANDONED"]).optional(),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
});

// GET Book by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 },
    );
  }
}

// UPDATE Book
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const validation = BookSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.errors },
        { status: 400 },
      );
    }

    const book = await prisma.book.update({
      where: { id: params.id },
      data: validation.data,
    });

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 },
    );
  }
}

// DELETE Book
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.book.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 },
    );
  }
}
