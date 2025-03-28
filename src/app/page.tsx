import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Book Tracker</h1>
      <p className="text-xl mb-8">
        Manage your reading journey, track your books, and explore your library.
      </p>
      <Link href="/books">
        <Button>View My Books</Button>
      </Link>
    </div>
  );
}
