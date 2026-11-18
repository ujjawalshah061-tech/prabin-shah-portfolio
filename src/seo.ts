import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SITE_URL = "https://www.shahprabin.com.np";

interface PageSeo {
  title: string;
  description: string;
  path: string; // canonical path
  index?: boolean;
}

const pages: Record<string, PageSeo> = {
  "/": {
    title: "{name} | Civil & Hydropower Engineer in Nepal",
    description:
      "{name} is a civil and hydropower engineer from Lalitpur, Nepal: hydropower design, structural drafting and construction management. Founder of Code & Concrete Construction. Kathmandu University graduate.",
    path: "/",
  },
  "/about": {
    title: "About {name} | Civil & Hydropower Engineer, Nepal",
    description:
      "Background, education and core skills of {name}: B.E. Civil Engineering (Kathmandu University), M.Sc. Construction Management, hydropower design and structural drafting.",
    path: "/",
  },
  "/experience": {
    title: "Experience | {name}, Hydropower Design Engineer",
    description:
      "Work experience of {name}: hydropower design at Hydro Tunnelling & Research, site work at Rahughat Hydroelectric (40 MW), research at Kathmandu University, and leadership roles.",
    path: "/experience",
  },
  "/project": {
    title: "Projects | {name}, Hydropower & Structural Design",
    description:
      "Hydropower projects by {name}: Budhigandaki (341 MW), Dudhkoshi-6 (270 MW), Upper Maiwa Khola, Paramolung and more, plus research and physical modeling studies.",
    path: "/project",
  },
  "/contact": {
    title: "Contact | {name}, Civil Engineer in Lalitpur, Nepal",
    description:
      "Get in touch with {name} for hydropower design, structural drafting or construction projects in Nepal. Email, phone, WhatsApp and message form.",
    path: "/contact",
  },
};
pages["/projects"] = { ...pages["/project"] };

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Keeps the browser tab title and the search/share tags in step with the current page. */
export function useSeo(name: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const isAdmin = clean.startsWith("/studio");
    const page: PageSeo = isAdmin
      ? { title: "Admin | " + name, description: "Site admin.", path: "/studio", index: false }
      : pages[clean] ?? { ...pages["/"], path: "/" };

    const fill = (s: string) => s.replace(/\{name\}/g, name);
    const title = fill(page.title);
    const description = fill(page.description);
    const url = SITE_URL + (page.path === "/" ? "/" : page.path);

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", page.index === false ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");
    upsertCanonical(url);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
  }, [pathname, name]);
}
