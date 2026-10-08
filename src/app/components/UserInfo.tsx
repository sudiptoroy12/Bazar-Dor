"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log(user);
  

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignout = async () => {
    await authClient.signOut();

    setIsOpen(false);

    toast.success("সফলভাবে সাইন আউট হয়েছে!");
  };

  return (
    <div ref={dropdownRef} className="absolute right-4 top-3 z-50">
      {user ? (
        <div className="relative">
          {/* Profile Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-neutral-100"
          >
            {/* Avatar */}
            <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-neutral-200">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-green-600 text-lg font-semibold text-white">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* User name */}
            <span className="hidden text-lg font-medium text-neutral-800 sm:block">
              {user.name}
            </span>

            {/* Arrow */}
            <span
              className={`text-sm text-neutral-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-14 w-80 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg">
              {/* User information */}
              <div className="px-7 pb-5 pt-6">
                <h2 className="text-xl font-semibold text-neutral-800">
                  {user.name}
                </h2>

                <p className="mt-1 truncate text-base text-neutral-500">
                  {user.email}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-neutral-100" />

              {/* Profile */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-7 py-4 text-lg text-neutral-700 transition hover:bg-neutral-50"
              >
                <span className="text-xl">👤</span>
                <span>আমার প্রোফাইল</span>
              </Link>

              {/* Sign out */}
              <button
                type="button"
                onClick={handleSignout}
                className="flex w-full items-center gap-3 px-7 py-4 text-left text-lg text-red-500 transition hover:bg-red-50"
              >
                <span className="text-2xl">↪</span>
                <span>সাইন আউট</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Not logged in */
        <div className="flex items-center gap-2">
          <Link href="/signin">
            <button className="btn btn-ghost text-neutral-700 transition-colors hover:text--700">
              সাইন ইন
            </button>
          </Link>

          <Link href="/signup">
            <button className="btn bg-green-600 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-green-700 rounded-xl">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
