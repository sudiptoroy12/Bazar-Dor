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

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const headlines: Headline[] = await res.json();

  return (
    <div className="w-full overflow-hidden border-y border-neutral-200 bg-white">
      <MarqueeText
        direction="right"
        duration={10}
        className="flex w-max"
      >
        {headlines.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";

          return (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="
                flex h-9 items-center
                whitespace-nowrap
                border-r border-neutral-200
                px-4
                text-sm
                transition
                hover:bg-neutral-50
              "
            >
              {/* Icon */}
              <span className="mr-2 text-sm">
                {item.image}
              </span>

              {/* Product name */}
              <span className="mr-2 font-medium text-neutral-700">
                {item.nameBn}
              </span>

              {/* Price */}
              <span className="mr-2 font-semibold text-neutral-800">
               {item.today} TK/{item.unit}
              </span>

              {/* Change */}
              {item.change.dir === "flat" ? (
                <span className="font-semibold text-neutral-500">
                  — ০%
                </span>
              ) : (
                <span
                  className={`font-semibold flex gap-1 ${
                    isUp ? "text-red-500" : "text-green-600"
                  }`} 
                >
                    <span>{isUp ? "▲" : "▼"} </span>
                  
                   {Math.abs(item.change.pct)}%
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