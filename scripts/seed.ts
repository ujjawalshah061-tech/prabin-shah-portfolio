// One-time setup: copies the site's current content, photos and resume into the CMS.
//
//   npm run seed            (first time; stops if content already exists)
//   npm run seed -- --force (overwrites everything in the CMS with the built-in content!)
//
// Needs in .env:  VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET (optional), SANITY_WRITE_TOKEN
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { defaults } from "../src/content/defaults.ts";

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;
const force = process.argv.includes("--force");

if (!projectId || !token) {
  console.error("Missing VITE_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env - see .env.example.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-01-01", useCdn: false });
const root = path.resolve(import.meta.dirname, "..");
const images = path.join(root, "src/assets/images");

const cache = new Map<string, string>();
async function upload(kind: "image" | "file", filePath: string) {
  const key = `${kind}:${filePath}`;
  let id = cache.get(key);
  if (!id) {
    if (!fs.existsSync(filePath)) {
      console.warn(`  ! missing file, skipped: ${filePath}`);
      return undefined;
    }
    const asset = await client.assets.upload(kind, fs.createReadStream(filePath), {
      filename: path.basename(filePath),
    });
    id = asset._id;
    cache.set(key, id);
    console.log(`  uploaded ${path.basename(filePath)}`);
  }
  return { _type: kind, asset: { _type: "reference", _ref: id } };
}
const img = (file?: string) => (file ? upload("image", path.join(images, file)) : Promise.resolve(undefined));

let keyCounter = 0;
const keyed = <T extends object>(items: T[]) => items.map((item) => ({ _key: `k${++keyCounter}`, ...item }));

async function main() {
  const existing = await client.fetch<number>(`count(*[_id in ["siteSettings", "about", "featuredProject"]])`);
  if (existing > 0 && !force) {
    console.error(
      "The CMS already has content. Re-running would overwrite your edits.\nRun with --force only if you really want to replace it."
    );
    process.exit(1);
  }

  const d = defaults;
  const docs: Record<string, unknown>[] = [];

  console.log("Uploading photos...");
  const { resumeUrl: _r, portraitUrl: _p, toolkitImageUrl: _t, ...settings } = d.settings;
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    ...settings,
    heroStats: keyed(d.settings.heroStats),
    heroCards: keyed(d.settings.heroCards),
    portrait: await img("prabin-shah.png"),
    toolkitImage: await img("side-helmet-desk.jpg"),
    resume: await upload("file", path.join(root, "public/prabin-resume.pdf")),
  });

  const { photoUrl: _pu, ...about } = d.about;
  docs.push({ _id: "about", _type: "about", ...about, photo: await img("side-helmet-hand.jpg") });

  const { imageFile, imageUrl: _iu, ...featured } = d.featured;
  docs.push({
    _id: "featuredProject",
    _type: "featuredProject",
    ...featured,
    specs: keyed(d.featured.specs),
    image: await img(imageFile),
  });

  d.education.forEach((e, i) => docs.push({ _id: `education-${i + 1}`, _type: "education", ...e, order: i + 1 }));
  d.skills.forEach((s, i) => docs.push({ _id: `skillCategory-${i + 1}`, _type: "skillCategory", ...s, order: i + 1 }));
  d.leadership.forEach((l, i) => docs.push({ _id: `leadership-${i + 1}`, _type: "leadership", ...l, order: i + 1 }));
  d.projects.forEach((p, i) => docs.push({ _id: `project-${i + 1}`, _type: "project", ...p, order: i + 1 }));

  for (const [type, list] of [
    ["milestone", d.milestones],
    ["galleryItem", d.gallery],
  ] as const) {
    for (const [i, item] of list.entries()) {
      const { imageFile: file, imageUrl: _u, ...rest } = item;
      docs.push({ _id: `${type}-${i + 1}`, _type: type, ...rest, image: await img(file), order: i + 1 });
    }
  }

  for (const [i, w] of d.work.entries()) {
    const { thumbFile, thumbUrl: _tu, ...rest } = w;
    docs.push({ _id: `work-${i + 1}`, _type: "work", ...rest, thumb: await img(thumbFile), order: i + 1 });
  }

  console.log(`Writing ${docs.length} documents...`);
  let tx = client.transaction();
  for (const doc of docs) tx = tx.createOrReplace(doc as never);
  await tx.commit();
  console.log("Done. Open /studio to edit. Changes appear on the site within about a minute.");
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
