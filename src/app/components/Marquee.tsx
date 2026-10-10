import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headline {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const formatBanglaNumber = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const getBanglaUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    g: "গ্রাম",
    liter: "লিটার",
    l: "লিটার",
    piece: "টি",
    dozen: "ডজন",
    bag: "বস্তা",
  };

  return units[unit.toLowerCase()] ?? unit;
};

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    },
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const headlines: Headline[] = await res.json();

  return (
    <div className="w-full overflow-hidden border-y border-neutral-200 bg-white">
      <MarqueeText direction="right" duration={10} className="flex w-max">
        {headlines.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="flex h-9 items-center whitespace-nowrap border-r border-neutral-200 px-4 text-sm transition hover:bg-neutral-50"
            >
              {/* Product icon */}
              <span className="mr-2">{item.image}</span>

              {/* Product name */}
              <span className="mr-2 font-medium text-neutral-700">
                {item.nameBn}
              </span>

              {/* Price and unit */}
              <span className="mr-2 font-semibold text-neutral-800">
                {formatBanglaNumber(item.today)} টাকা/
                {getBanglaUnit(item.unit)}
              </span>

              {/* Price change */}
              {item.change.dir === "flat" ? (
                <span className="font-semibold text-neutral-500">— ০%</span>
              ) : (
                <span
                  className={`flex gap-1 font-semibold ${
                    isUp ? "text-red-500" : "text-green-600"
                  }`}
                >
                  <span>{isUp ? "▲" : "▼"}</span>
                  {formatBanglaNumber(Math.abs(item.change.pct))}%
                </span>
              )}
            </Link>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
