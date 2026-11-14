import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createClient } from "@sanity/client";
import { defaults } from "./defaults";
import type { Content } from "./types";

export const sanityProjectId = (import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined) || "";
export const sanityDataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";

const byOrder = "order(order asc, _createdAt asc)";

// One request fetches everything. Image fields are turned into plain CDN urls.
const QUERY = `{
  "settings": *[_id == "siteSettings"][0]{
    ...,
    "portraitUrl": portrait.asset->url,
    "toolkitImageUrl": toolkitImage.asset->url,
    "resumeUrl": resume.asset->url
  },
  "about": *[_id == "about"][0]{ ..., "photoUrl": photo.asset->url },
  "featured": *[_id == "featuredProject"][0]{ ..., "imageUrl": image.asset->url },
  "education": *[_type == "education"] | ${byOrder},
  "skills": *[_type == "skillCategory"] | ${byOrder},
  "milestones": *[_type == "milestone"] | ${byOrder}{ ..., "imageUrl": image.asset->url },
  "gallery": *[_type == "galleryItem"] | ${byOrder}{ ..., "imageUrl": image.asset->url },
  "work": *[_type == "work"] | ${byOrder}{ ..., "thumbUrl": thumb.asset->url },
  "leadership": *[_type == "leadership"] | ${byOrder},
  "projects": *[_type == "project"] | ${byOrder}
}`;

// Sanity returns null for fields nobody filled in; drop those so the built-in value stays.
function clean<T>(value: T): T {
  if (Array.isArray(value)) return value.map(clean) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v !== null && v !== undefined) out[k] = clean(v);
    }
    return out as T;
  }
  return value;
}

const list = <T,>(fetched: T[] | null | undefined, fallback: T[]): T[] =>
  Array.isArray(fetched) && fetched.length > 0 ? clean(fetched) : fallback;

const doc = <T extends object>(fetched: Partial<T> | null | undefined, fallback: T): T =>
  fetched ? { ...fallback, ...clean(fetched) } : fallback;

function merge(r: Record<string, unknown>): Content {
  return {
    settings: doc(r.settings as Partial<Content["settings"]>, defaults.settings),
    about: doc(r.about as Partial<Content["about"]>, defaults.about),
    featured: doc(r.featured as Partial<Content["featured"]>, defaults.featured),
    education: list(r.education as Content["education"], defaults.education),
    skills: list(r.skills as Content["skills"], defaults.skills),
    milestones: list(r.milestones as Content["milestones"], defaults.milestones),
    gallery: list(r.gallery as Content["gallery"], defaults.gallery),
    work: list(r.work as Content["work"], defaults.work),
    leadership: list(r.leadership as Content["leadership"], defaults.leadership),
    projects: list(r.projects as Content["projects"], defaults.projects),
  };
}

const ContentContext = createContext<Content>(defaults);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(defaults);

  useEffect(() => {
    if (!sanityProjectId) return; // CMS not connected: the built-in content is used
    let cancelled = false;
    const client = createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: "2025-01-01",
      useCdn: true,
    });
    client
      .fetch(QUERY)
      .then((result: Record<string, unknown>) => {
        if (!cancelled && result) setContent(merge(result));
      })
      .catch((err: unknown) => {
        console.warn("CMS content could not be loaded, showing built-in content.", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = (): Content => useContext(ContentContext);
