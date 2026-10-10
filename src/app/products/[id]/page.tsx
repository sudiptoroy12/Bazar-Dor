import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

type PageProps = {
  params: Promise<{ id: string }>;
};

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

const unitNames: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

function formatPrice(price: number) {
  return price.toLocaleString("bn-BD");
}

async function getProduct(id: string): Promise<Product | null> {
  if (!/^\d+$/.test(id)) {
    return null;
  }

  const response = await fetch(`${API_URL}/${id}`, {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  return (await response.json()) as Product;
}

export default function ProductDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const unit = unitNames[product.unit] ?? product.unit;
  const priceDifference = product.today - product.yesterday;

  const lowestPrice =
    product.markets.length > 0
      ? Math.min(...product.markets.map((market) => market.min))
      : product.today;

  const highestPrice =
    product.markets.length > 0
      ? Math.max(...product.markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    product.markets.length > 0
      ? Math.round(
          product.markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0,
          ) / product.markets.length,
        )
      : product.today;

  const priceChangeColor =
    product.change.dir === "up"
      ? "bg-red-50 text-red-600"
      : product.change.dir === "down"
        ? "bg-green-50 text-green-600"
        : "bg-gray-100 text-gray-600";

  const priceChangeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <main className="min-h-screen  px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="font-medium text-gray-800">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl sm:size-20">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div>
                <p className="mb-1 text-sm text-gray-500">
                  {product.categoryNameBn}
                </p>

                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-2 text-sm text-gray-500">প্রতি {unit}</p>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-sm text-gray-500">আজকের বাজারদর</p>

              <div className="mt-1 flex flex-wrap items-center gap-3 sm:justify-end">
                <p className="text-3xl font-bold text-gray-900">
                  ৳{formatPrice(product.today)}
                </p>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${priceChangeColor}`}
                >
                  {priceChangeIcon} {formatPrice(Math.abs(product.change.pct))}%
                </span>
              </div>

              <p
                className={`mt-2 text-sm ${
                  priceDifference > 0
                    ? "text-red-600"
                    : priceDifference < 0
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {priceDifference > 0
                  ? `গতকালের চেয়ে ৳${formatPrice(priceDifference)} বেশি`
                  : priceDifference < 0
                    ? `গতকালের চেয়ে ৳${formatPrice(Math.abs(priceDifference))} কম`
                    : "গতকালের দামের সমান"}
              </p>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            বাজারদরের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCard
              title="সর্বনিম্ন দাম"
              price={lowestPrice}
              unit={unit}
              color="green"
              description="বাজারগুলোর মধ্যে সর্বনিম্ন"
            />

            <SummaryCard
              title="সর্বোচ্চ দাম"
              price={highestPrice}
              unit={unit}
              color="red"
              description="বাজারগুলোর মধ্যে সর্বোচ্চ"
            />

            <SummaryCard
              title="গড় বাজারদর"
              price={averagePrice}
              unit={unit}
              color="blue"
              description="বাজারগুলোর সর্বনিম্ন ও সর্বোচ্চ দামের ভিত্তিতে"
            />
          </div>
        </section>

        {/* Market Price Table */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900">
              বিভিন্ন বাজারে দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বাংলাদেশের বিভিন্ন বাজারের মূল্যতথ্য
            </p>
          </div>

          {product.markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-5 py-4 font-semibold">বাজারের নাম</th>
                    <th className="px-5 py-4 font-semibold">বিভাগ</th>
                    <th className="px-5 py-4 font-semibold">সর্বনিম্ন দাম</th>
                    <th className="px-5 py-4 font-semibold">সর্বোচ্চ দাম</th>
                    <th className="px-5 py-4 font-semibold">গড় দাম</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {product.markets.map((market, index) => {
                    const marketAverage = Math.round(
                      (market.min + market.max) / 2,
                    );

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="transition hover:bg-green-50/50"
                      >
                        <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 font-medium text-green-700">
                          ৳{formatPrice(market.min)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 font-medium text-red-600">
                          ৳{formatPrice(market.max)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-800">
                          ৳{formatPrice(marketAverage)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-6 text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক মূল্যতথ্য পাওয়া যায়নি।
            </p>
          )}

          <div className="border-t border-gray-100 px-5 py-3">
            <p className="text-xs text-gray-500">
              নোট: বাজারের গড় দাম সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবর্তী মান থেকে
              হিসাব করা হয়েছে।
            </p>
          </div>
        </section>

        {/* Historical Prices */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            আগের দিনের দাম
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <HistoryCard
              title="গতকালের দাম"
              price={product.yesterday}
              unit={unit}
            />

            <HistoryCard
              title="গত সপ্তাহের দাম"
              price={product.lastWeek}
              unit={unit}
            />

            <HistoryCard
              title="গত মাসের দাম"
              price={product.lastMonth}
              unit={unit}
            />
          </div>
        </section>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-300 hover:text-green-700"
          >
            <span aria-hidden="true">←</span>
            সব পণ্য দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
}

function SummaryCard({
  title,
  price,
  unit,
  color,
  description,
}: {
  title: string;
  price: number;
  unit: string;
  color: "green" | "red" | "blue";
  description: string;
}) {
  const colors = {
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <div
        className={`mt-3 inline-flex rounded-xl px-3 py-2 text-2xl font-bold ${colors[color]}`}
      >
        ৳{formatPrice(price)}
      </div>

      <p className="mt-2 text-sm text-gray-500">প্রতি {unit}</p>

      <p className="mt-3 text-xs text-gray-400">{description}</p>
    </div>
  );
}

function HistoryCard({
  title,
  price,
  unit,
}: {
  title: string;
  price: number;
  unit: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-3 text-2xl font-bold text-gray-900">
        ৳{formatPrice(price)}
      </p>

      <p className="mt-1 text-sm text-gray-500">প্রতি {unit}</p>
    </div>
  );
}

function ProductLoading() {
  return (
    <main className="min-h-screen bg-[#f7f9f7] px-4 py-16">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-6 h-4 w-48 rounded bg-gray-200" />

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="h-8 w-56 rounded bg-gray-200" />
          <div className="mt-4 h-12 w-40 rounded bg-gray-200" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="h-36 rounded-2xl bg-gray-200" />
          <div className="h-36 rounded-2xl bg-gray-200" />
          <div className="h-36 rounded-2xl bg-gray-200" />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      </div>
    </main>
  );
}
