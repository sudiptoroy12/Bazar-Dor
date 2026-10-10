export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f1f5f0]">
      {/* Hero Banner Skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-8 w-48 rounded-lg bg-gray-200" />
        <div className="mt-4 h-4 w-72 max-w-full rounded bg-gray-200" />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="h-48 rounded-2xl bg-gray-200 sm:h-56" />
          <div className="h-48 rounded-2xl bg-gray-200 sm:h-56" />
        </div>
      </section>

      {/* Product Dashboard Skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 h-7 w-56 rounded-lg bg-gray-200" />

        {/* Product Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
            >
              {/* Product Image */}
              <div className="h-28 rounded-lg bg-gray-200 sm:h-36" />

              {/* Product Name */}
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />

              {/* Price */}
              <div className="mt-4 h-6 w-2/3 rounded bg-gray-200" />

              {/* Price Change */}
              <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
