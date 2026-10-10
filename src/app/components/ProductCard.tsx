import Link from "next/link";

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const unitNames: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, nameBn, image, today, unit, change } = product;

  const isUp = change.dir === "up";
  const isDown = change.dir === "down";

  return (
    <Link
      href={`/products/${id}`}
      className="block rounded-2xl border border-[#dfe8e0] bg-white p-3 transition hover:border-green-300 hover:shadow-sm sm:p-4"
    >
      {/* Product name and image */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eff4ef] text-xl sm:size-11">
          {image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#202a22]">
            {nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-neutral-500">
            প্রতি {unitNames[unit] ?? unit}
          </p>
        </div>
      </div>

      {/* Price and percentage */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-neutral-500">আজকের দাম</p>

          <p className="mt-0.5 text-base font-bold text-[#202a22]">
            {today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
          className={`mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-[#eff3ef] text-neutral-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}
          {Math.abs(change.pct).toLocaleString("bn-BD")}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
