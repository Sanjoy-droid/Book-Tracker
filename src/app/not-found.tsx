"use client";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center px-4 py-24">
      {/* Abstract 404 SVG visualization */}
      <div className="relative mb-8 w-full max-w-md">
        <svg viewBox="0 0 400 200" className="w-full h-auto">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>

          {/* Abstract 404 design */}
          <path
            d="M70,50 L100,50 L100,150 L70,150 Z"
            fill="url(#gradient)"
            opacity="0.8"
          />
          <circle
            cx="150"
            cy="100"
            r="50"
            fill="url(#gradient)"
            opacity="0.8"
          />
          <circle
            cx="250"
            cy="100"
            r="50"
            fill="url(#gradient)"
            opacity="0.8"
          />
          <path
            d="M330,50 L360,50 L360,150 L330,150 Z"
            fill="url(#gradient)"
            opacity="0.8"
          />

          {/* Connect the shapes with lines */}
          <path
            d="M100,100 C120,100 130,100 150,100"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M200,100 C220,100 230,100 250,100"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M300,100 C320,100 330,100 330,100"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
          />

          {/* Add some dots for decoration */}
          <circle cx="85" cy="70" r="3" fill="#ffffff" opacity="0.6" />
          <circle cx="130" cy="130" r="3" fill="#ffffff" opacity="0.6" />
          <circle cx="230" cy="70" r="3" fill="#ffffff" opacity="0.6" />
          <circle cx="270" cy="130" r="3" fill="#ffffff" opacity="0.6" />
          <circle cx="345" cy="70" r="3" fill="#ffffff" opacity="0.6" />
        </svg>

        {/* Glitchy animated text overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white">
          <div className="relative inline-block">
            <span className="absolute -top-1 -left-1 text-indigo-500 animate-pulse">
              404
            </span>
            <span
              className="absolute -bottom-1 -right-1 text-purple-500 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              404
            </span>
            <span className="relative text-white mix-blend-difference">
              404
            </span>
          </div>
        </div>
      </div>

      {/* Error message */}
      <h1 className="text-3xl font-bold tracking-tighter mb-2 text-center">
        Page not found
      </h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. Don't
        worry, it happens to the best of us.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
