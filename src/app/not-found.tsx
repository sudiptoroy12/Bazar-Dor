
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#f5f8f3] px-4 py-16">
      {/* Background decorations */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-100/70 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-yellow-100/70 blur-3xl" />

      <div className="relative w-full max-w-2xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-full border border-green-100 bg-white shadow-xl shadow-green-900/5 sm:h-56 sm:w-56">
          <div className="absolute inset-3 rounded-full border-2 border-dashed border-green-200" />

          <div className="text-7xl sm:text-8xl">🛒</div>

          <span className="absolute -right-1 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">
            ?
          </span>

          <span className="absolute -bottom-1 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-2xl">
            🥦
          </span>

          <span className="absolute -bottom-2 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
            🍅
          </span>
        </div>

        {/* 404 Text */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-700">
          Error 404
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          ওহ! পেজটি <span className="text-green-600">খুঁজে পাওয়া যায়নি</span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
          মনে হচ্ছে আপনি ভুল পথে চলে এসেছেন! আপনি যে পেজটি খুঁজছেন,
          সেটি সরানো হয়েছে অথবা এর ঠিকানাটি ভুল।
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <span>←</span>
            হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-green-200 bg-white px-7 py-3.5 font-semibold text-green-800 transition hover:bg-green-50"
          >
            🥬 আজকের বাজার দর দেখুন
          </Link>
        </div>

        {/* Footer note */}
        <div className="mt-12 border-t border-green-100 pt-6">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-green-700">বাজার দর</span>
            {" "}— প্রতিদিনের বাজারদর, এক জায়গায়।
          </p>
        </div>
      </div>
    </main>
  );
}