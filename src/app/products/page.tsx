"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

type PriceFilter = "all" | "up" | "down" | "flat";

const filters: { value: PriceFilter; label: string }[] = [
  { value: "all", label: "সব পণ্য" },
  { value: "up", label: "▲ দাম বেড়েছে" },
  { value: "down", label: "▼ দাম কমেছে" },
  { value: "flat", label: "— দাম অপরিবর্তিত" },
];

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

const unitNames: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
        }

        const data: unknown = await response.json();

        let productList: Product[] = [];

        if (Array.isArray(data)) {
          productList = data as Product[];
        } else if (
          typeof data === "object" &&
          data !== null &&
          "products" in data &&
          Array.isArray(data.products)
        ) {
          productList = data.products as Product[];
        }

        if (!active) return;

        setProducts(productList);

        if (productList.length === 0) {
          setError("কোনো পণ্যের তথ্য পাওয়া যায়নি।");
        }
      } catch {
        if (active) {
          setError(
            "পণ্যের তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Map<string, string>();

    products.forEach((product) => {
      uniqueCategories.set(product.category, product.categoryNameBn);
    });

    return Array.from(uniqueCategories.entries()).map(([value, label]) => ({
      value,
      label,
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.nameBn.toLowerCase().includes(searchText) ||
        product.categoryNameBn.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesPrice =
        priceFilter === "all" || product.change.dir === priceFilter;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, selectedCategory, priceFilter]);

  const risingCount = products.filter(
    (product) => product.change.dir === "up",
  ).length;

  const fallingCount = products.filter(
    (product) => product.change.dir === "down",
  ).length;

  return (
    <main className="min-h-screen   px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">সব পণ্য</span>
        </nav>

        {/* Page Header */}
        <section className="overflow-hidden rounded-3xl bg-green-800 px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-green-200">
                বাজারদর • প্রতিদিনের নিত্যপণ্যের দাম
              </p>

              <h1 className="text-3xl font-bold sm:text-4xl">
                সব পণ্যের বাজারদর
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-green-100 sm:text-base">
                চাল, ডাল, তেল, সবজি ও অন্যান্য নিত্যপ্রয়োজনীয় পণ্যের দাম দেখুন
                এক জায়গায়।
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-64">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-green-100">মোট পণ্য</p>
                <p className="mt-1 text-2xl font-bold">
                  {loading ? "..." : products.length.toLocaleString("bn-BD")}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-green-100">দাম বেড়েছে</p>
                <p className="mt-1 text-2xl font-bold">
                  {loading ? "..." : risingCount.toLocaleString("bn-BD")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Price Overview */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setPriceFilter("up")}
            className={`rounded-2xl border p-4 text-left transition ${
              priceFilter === "up"
                ? "border-red-300 bg-red-50 ring-1 ring-red-200"
                : "border-gray-200 bg-white hover:border-red-200"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">আজ দাম বেড়েছে</p>
                <p className="mt-1 text-2xl font-bold text-red-600">
                  {loading ? "..." : risingCount.toLocaleString("bn-BD")} টি
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-xl bg-red-100 text-xl text-red-600">
                ↗
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPriceFilter("down")}
            className={`rounded-2xl border p-4 text-left transition ${
              priceFilter === "down"
                ? "border-green-300 bg-green-50 ring-1 ring-green-200"
                : "border-gray-200 bg-white hover:border-green-200"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">আজ দাম কমেছে</p>
                <p className="mt-1 text-2xl font-bold text-green-700">
                  {loading ? "..." : fallingCount.toLocaleString("bn-BD")} টি
                </p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-xl bg-green-100 text-xl text-green-700">
                ↘
              </span>
            </div>
          </button>
        </section>

        {/* Search and Category */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
                ⌕
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="পণ্যের নাম লিখে খুঁজুন..."
                aria-label="পণ্য খুঁজুন"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                aria-label="পণ্যের ক্যাটাগরি"
                className="min-w-40 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="all">সব ক্যাটাগরি</option>

                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setPriceFilter("all");
                }}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-green-300 hover:text-green-700"
              >
                ফিল্টার মুছুন
              </button>
            </div>
          </div>

          {/* Price Filter Tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setPriceFilter(filter.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  priceFilter === filter.value
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                সকল পণ্য
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                আপনার প্রয়োজনীয় পণ্য খুঁজে নিন
              </p>
            </div>

            {!loading && !error && (
              <p className="text-sm text-gray-500">
                দেখানো হচ্ছে{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length.toLocaleString("bn-BD")}
                </span>{" "}
                টি পণ্য
              </p>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-gray-200" />
                    <div className="flex-1">
                      <div className="h-4 w-3/4 rounded bg-gray-200" />
                      <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
                    </div>
                  </div>
                  <div className="mt-6 h-6 w-1/2 rounded bg-gray-200" />
                  <div className="mt-4 h-9 rounded-lg bg-gray-100" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-white px-5 py-12 text-center">
              <p className="text-3xl">⚠️</p>
              <p className="mt-3 font-semibold text-gray-800">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {/* Product Cards */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Empty Results */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center">
              <div className="text-4xl">🔎</div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                কোনো পণ্য পাওয়া যায়নি
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                অন্য নামে খুঁজুন অথবা ফিল্টার পরিবর্তন করুন।
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setPriceFilter("all");
                }}
                className="mt-5 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                সব পণ্য দেখুন
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeStyle = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-700"
      : "bg-gray-100 text-gray-500";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#eff5ef] text-2xl transition group-hover:bg-green-100">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-gray-900 transition group-hover:text-green-700">
            {product.nameBn}
          </h3>
          <p className="mt-1 truncate text-xs text-gray-500">
            {product.categoryNameBn}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-500">আজকের দাম</p>

        <div className="mt-1 flex flex-wrap items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">
            ৳{product.today.toLocaleString("bn-BD")}
          </span>
          <span className="text-xs text-gray-500">
            / {unitNames[product.unit] ?? product.unit}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold ${changeStyle}`}
          >
            {changeIcon} {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
          </span>

          <span className="text-xs font-medium text-green-700 transition group-hover:underline">
            বিস্তারিত দেখুন →
          </span>
        </div>
      </div>
    </Link>
  );
}
