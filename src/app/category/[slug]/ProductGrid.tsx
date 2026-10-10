
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

type SortOption = "default" | "low" | "high" | "change";

// Use fixed formatting options for consistent number display.
const numberFormatter = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch (sort) {
      case "low":
        return items.sort((a, b) => a.today - b.today);

      case "high":
        return items.sort((a, b) => b.today - a.today);

      case "change":
        return items.sort(
          (a, b) =>
            Math.abs(b.change.pct) - Math.abs(a.change.pct)
        );

      default:
        return items.sort((a, b) => a.id - b.id);
    }
  }, [products, sort]);

  return (
    <div>
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-[#dfe7df] bg-[#fbfcfb] px-4 py-3">
        <label
          htmlFor="product-sort"
          className="text-xs text-neutral-500"
        >
          সাজান
        </label>

        <select
          id="product-sort"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as SortOption)
          }
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
          <option value="change">দামের পরিবর্তন</option>
        </select>
      </div>

      <p className="mb-3 mt-4 text-xs text-neutral-500">
        মোট {numberFormatter.format(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="rounded-2xl border border-[#dfe7df] bg-white p-3 transition hover:border-green-300 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-xl">
                {product.image || product.categoryIcon}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-[#202b22]">
                  {product.nameBn}
                </h2>
                <p className="text-xs text-neutral-500">
                  প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-end justify-between gap-2">
              <div>
                <p className="text-xs text-neutral-500">
                  আজকের দাম
                </p>
                <p className="text-base font-bold text-[#202b22]">
                  {numberFormatter.format(product.today)} টাকা
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                  product.change.dir === "up"
                    ? "bg-red-50 text-red-600"
                    : product.change.dir === "down"
                      ? "bg-green-50 text-green-700"
                      : "bg-[#eff3ef] text-neutral-600"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {numberFormatter.format(
                  Math.abs(product.change.pct)
                )}
                %
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
