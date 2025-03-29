"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
              <span className="font-bold text-xl">BookTracker</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col space-y-3">
              <NavLinks mobile />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClasses = mobile
    ? "block py-2 px-4 rounded-md text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition"
    : "px-4 py-2 rounded-md text-slate-700 font-bold dark:text-slate-300 hover:bg-blue-600 hover:text-white transition";

  return (
    <>
      <Link href="/books" className={linkClasses}>
        📚 My Books dklfjd
      </Link>
    </>
  );
}
