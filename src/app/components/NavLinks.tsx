
import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const getNavs = async (): Promise<Navs[]> => {
  "use cache";

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

const NavLinks = async () => {
  const navs = await getNavs();

  return (
    <div className="h-11 w-full border-b border-neutral-200">
      <div className="mx-auto mt-5 flex max-w-7xl justify-start gap-5 px-6">
        {navs.map((n) => (
          <Link key={n.id} href={`/category/${n.slug}`}>
            <div className="flex gap-0.5">
              <span>{n.icon}</span>
              {n.nameBn}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;

