// Resolves an image for display: the CMS upload if there is one, otherwise the bundled file.
const modules = import.meta.glob("../assets/images/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  byName[path.split("/").pop() as string] = url;
}

export const localImage = (file?: string): string | undefined => (file ? byName[file] : undefined);

/** `remote` is a Sanity CDN url; width/quality params make it small and fast. */
export function imgSrc(remote?: string, file?: string, width = 1600): string {
  if (remote) return `${remote}?w=${width}&auto=format&q=80`;
  return localImage(file) ?? "";
}
