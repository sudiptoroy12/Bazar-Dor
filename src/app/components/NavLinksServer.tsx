import NavLinks from "./NavLinks";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

async function getNavs(): Promise<Navs[]> {
  "use cache";

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export default async function NavLinksServer() {
  const navs = await getNavs();

  return <NavLinks navs={navs} />;
}
