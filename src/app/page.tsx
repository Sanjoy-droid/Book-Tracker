import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, TrendingUp, Library } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Book Tracker
        </h1>
        <p className="text-xl mb-8 text-slate-700 dark:text-slate-300">
          Manage your reading journey, track your books, and explore your
          library.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/books">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              View My Books
            </Button>
          </Link>
          <Link href="/add-book">
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              Add New Book
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {[
          {
            icon: <BookOpen className="w-10 h-10 text-blue-600" />,
            title: "Track Reading",
            description:
              "Keep track of your reading progress and completed books.",
          },
          {
            icon: <Star className="w-10 h-10 text-amber-500" />,
            title: "Rate & Review",
            description: "Share your thoughts and rate the books you've read.",
          },
          {
            icon: <TrendingUp className="w-10 h-10 text-green-600" />,
            title: "Set Goals",
            description: "Set personal reading goals and track your progress.",
          },
          {
            icon: <Library className="w-10 h-10 text-purple-600" />,
            title: "Manage Library",
            description:
              "Organize your books with custom collections and tags.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
