import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./CustomComponents/Navbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ui/theme-provider";

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Book Tracker | Your Reading Journey",
  description:
    "Track your books, set reading goals, and explore your personal library",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#090816] text-white min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow py-6 px-4 md:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
            <footer className="py-8 text-center text-sm text-gray-400 dark:text-indigo-300 border-t border-gray-800 dark:border-indigo-800 bg-black/50 dark:bg-indigo-950/20 backdrop-blur-sm">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-indigo-400">
                      Book Tracker
                    </span>
                    <span>&copy; {new Date().getFullYear()}</span>
                  </div>
                  <div className="text-gray-500 dark:text-indigo-400">
                    Your Reading Journey
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-500 dark:text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Privacy
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 dark:text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Terms
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 dark:text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                fontSize: "0.875rem",
                maxWidth: "420px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
