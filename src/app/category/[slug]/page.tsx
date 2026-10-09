import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductGrid from "./ProductGrid";

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

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProducts(slug: string): Promise<Product[]> {
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return Array.isArray(data) ? data : data.products ?? [];
}

// This child component reads runtime params and fetches products.
async function CategoryContent({ params }: Props) {
  const { slug } = await params;
  const products = await getProducts(slug);

  if (products.length === 0) {
    notFound();
  }

  const category = products[0];

  return (
    <main className="min-h-screen bg-[#f1f5f0] px-3 py-5 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Category header */}
        <section className="flex items-center gap-3 rounded-2xl border border-[#dfe7df] bg-[#fbfcfb] px-4 py-4 sm:px-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-2xl">
            {category.categoryIcon}
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#202b22]">
              {category.categoryNameBn}
            </h1>
            <p className="text-xs text-neutral-500 sm:text-sm">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Interactive sorting and product cards */}
        <ProductGrid products={products} />
      </div>
    </main>
  );
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f1f5f0] px-3 py-5 sm:px-6">
          <div className="mx-auto max-w-7xl animate-pulse space-y-5">
            <div className="h-20 rounded-2xl border border-[#dfe7df] bg-white" />
            <div className="h-12 rounded-2xl border border-[#dfe7df] bg-white" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl border border-[#dfe7df] bg-white"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}