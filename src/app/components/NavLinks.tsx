"use client";

import Link from "next/link";
import { useState } from "react";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = ({ navs }: { navs: Navs[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Desktop navigation */}
        <div className="hidden min-h-12 items-center gap-6 md:flex">
          {navs.map((n) => (
            <Link
              key={n.id}
              href={`/category/${n.slug}`}
              className="flex items-center gap-1 whitespace-nowrap py-3 text-sm font-medium text-neutral-700 transition hover:text-green-600"
            >
              <span>{n.icon}</span>
              <span>{n.nameBn}</span>
            </Link>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <div className="flex min-h-12 items-center justify-between md:hidden">
          <span className="text-sm font-semibold text-neutral-700">
            পণ্যের ক্যাটাগরি
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 transition hover:bg-neutral-100"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div className="border-t border-neutral-100 py-2 md:hidden">
            {navs.map((n) => (
              <Link
                key={n.id}
                href={`/category/${n.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-neutral-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <span className="text-lg">{n.icon}</span>
                <span>{n.nameBn}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavLinks;
