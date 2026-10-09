"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import UserInfo from "./UserInfo";
import Link from "next/link";

const Navbar = () => {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDate(
        new Date().toLocaleDateString("bn-BD", {
          dateStyle: "full",
        })
      );
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full border-b border-neutral-200">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Left side */}
        
            <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-2xl bg-green-600 p-2">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor Logo"
              width={30}
              height={30}
              priority
            />
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span className="text-2xl font-bold">
              বাজার দর
            </span>

            <span className="text-xs text-neutral-500">
              {date}
            </span>
          </div>
        </Link>
    

        {/* Right side */}
        <UserInfo />
      </div>
    </div>
  );
};

export default Navbar;