"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroBanner = () => {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDate(
        new Date().toLocaleDateString("bn-BD", {
          dateStyle: "full",
        }),
      );
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mx-auto max-w-7xl  px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex min-h-[250px] flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-green-100 bg-white p-6 sm:p-8 md:flex-row">
        {/* Left content */}
        <div className="w-full md:w-3/5">
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {date}
          </span>

          <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#202a22] sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-xs leading-5 text-neutral-500 sm:text-sm">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#all-products"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Right illustration */}
        <div className="relative flex w-full items-center justify-center md:w-2/5">
          <Image
            src={"/bazar-hero.png"}
            alt="বাজারের তাজা সবজি"
            width={260}
            height={220}
            priority
            className="h-auto w-48 object-contain sm:w-56 md:w-64"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
