
import ProductCard, { type Product } from "./ProductCard";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  return res.json();
}

interface ProductGroupProps {
  title: string;
  icon: string;
  products: Product[];
}

function ProductGroup({
  title,
  icon,
  products,
}: ProductGroupProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-[#202a22]">
        <span
          className={
            icon === "▲" ? "text-red-500" : "text-green-600"
          }
        >
          {icon}
        </span>
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

const ProductDashboard = async () => {
  const products = await getProducts();

  const increasedProducts = products.filter(
    (product) => product.change.dir === "up"
  );

  const decreasedProducts = products.filter(
    (product) => product.change.dir === "down"
  );

  return (
    <main className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6">
      <ProductGroup
        title="আজ দাম বেড়েছে"
        icon="▲"
        products={increasedProducts}
      />

      <ProductGroup
        title="আজ দাম কমেছে"
        icon="▼"
        products={decreasedProducts}
      />

      <section id="all-products">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#202a22]">
            সব পণ্য
          </h2>

          <p className="mt-1 text-xs text-neutral-500">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDashboard;


