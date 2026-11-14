// What can be edited in the admin screen (/studio). Field titles are written in plain language.
import { defineField, defineType } from "sanity";

// Small helpers so the field list below stays readable.
const field = (name: string, title: string, type: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type, ...extra } as never);

const text = (name: string, title: string, description?: string) =>
  field(name, title, "string", description ? { description } : {});
const longText = (name: string, title: string, rows = 4) => field(name, title, "text", { rows });
const strings = (name: string, title: string, description?: string) =>
  field(name, title, "array", { of: [{ type: "string" }], ...(description ? { description } : {}) });
const image = (name: string, title: string, description?: string) =>
  field(name, title, "image", { options: { hotspot: true }, ...(description ? { description } : {}) });
const order = field("order", "Position (1 shows first)", "number", { initialValue: 100 });

const obj = (fields: unknown[], select: Record<string, string>) => ({
  type: "object",
  fields,
  preview: { select },
});

const orderings = [{ title: "Position", name: "pos", by: [{ field: "order", direction: "asc" as const }] }];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings, hero & contact",
  type: "document",
  groups: [
    { name: "hero", title: "Home hero", default: true },
    { name: "contact", title: "Contact & links" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    field("firstName", "First name", "string", { group: "hero" }),
    field("lastName", "Last name", "string", { group: "hero" }),
    field("heroGreeting", "Small greeting above the name", "string", { group: "hero" }),
    field("availability", "Availability badge text", "string", { group: "hero" }),
    field("heroRoles", "Rotating role titles", "array", {
      group: "hero",
      of: [{ type: "string" }],
      description: "These change one after another under your name.",
    }),
    field("heroDescription", "Intro paragraph", "text", { group: "hero", rows: 4 }),
    field("heroStats", "Number counters", "array", {
      group: "hero",
      description: "The four big numbers under the intro.",
      of: [
        obj(
          [
            field("value", "Number", "number"),
            field("decimals", "Decimals (0 for whole numbers)", "number", { initialValue: 0 }),
            field("suffix", "After the number (e.g. +)", "string"),
            field("label", "Label", "string"),
          ],
          { title: "label", subtitle: "value" }
        ),
      ],
    }),
    field("marquee", "Scrolling tools ticker", "array", { group: "hero", of: [{ type: "string" }] }),
    field("heroCards", "Floating cards beside the photo (2)", "array", {
      group: "hero",
      of: [
        obj([field("title", "Title", "string"), field("subtitle", "Small text", "string")], {
          title: "title",
          subtitle: "subtitle",
        }),
      ],
    }),
    field("locationPin", "Location tag on the photo", "string", { group: "hero" }),
    field("portrait", "Portrait photo", "image", {
        group: "hero",
        options: { hotspot: true },
        description: "Transparent PNG works best. Leave empty to keep the current one.",
      }),
    field("toolkitCaption", "Caption on the Skills photo", "string", { group: "hero" }),
    field("toolkitImage", "Skills photo", "image", { group: "hero", options: { hotspot: true } }),

    field("email", "Email address", "string", { group: "contact" }),
    field("phone", "Phone (for the Call button, e.g. +9779812186293)", "string", { group: "contact" }),
    field("phoneDisplay", "Phone as shown on the page", "string", { group: "contact" }),
    field("whatsapp", "WhatsApp number (digits only, with country code)", "string", { group: "contact" }),
    field("worksAt", "Works at (Contact page)", "string", { group: "contact" }),
    field("mapEmbedUrl", "Google Maps embed link", "url", { group: "contact" }),
    field("mapLink", "Google Maps share link", "url", { group: "contact" }),
    field("resume", "Resume (PDF)", "file", { group: "contact", options: { accept: ".pdf" } }),
    field("linkedin", "LinkedIn link", "url", { group: "contact" }),
    field("facebook", "Facebook link", "url", { group: "contact" }),
    field("instagram", "Instagram link", "url", { group: "contact" }),

    field("footerHeadline", "Footer headline", "string", { group: "footer" }),
    field("footerHighlight", "Footer headline (coloured second line)", "string", { group: "footer" }),
    field("footerText", "Footer paragraph", "text", { group: "footer", rows: 3 }),
    field("footerRole", "Your title in the footer", "string", { group: "footer" }),
    field("footerLocation", "Location in the footer", "string", { group: "footer" }),
    field("firmName", "Firm card name", "string", { group: "footer" }),
    field("firmUrl", "Firm card link", "url", { group: "footer" }),
  ],
  preview: { prepare: () => ({ title: "Site settings, hero & contact" }) },
});

export const about = defineType({
  name: "about",
  title: "About text",
  type: "document",
  fields: [
    text("lead", "Big sentence", "The large heading above your story."),
    text("leadHighlight", "Word to highlight in the big sentence", "Must match a word in the sentence above."),
    field("paragraphs", "Story paragraphs", "array", { of: [{ type: "text", rows: 5 }] }),
    strings("competencies", "Core competencies", "The six small boxes."),
    text("photoCaption", "Photo caption"),
    image("photo", "Side photo"),
  ],
  preview: { prepare: () => ({ title: "About text" }) },
});

export const featuredProject = defineType({
  name: "featuredProject",
  title: "Featured project (big card)",
  type: "document",
  fields: [
    text("title", "Project name"),
    text("capacity", "Capacity (e.g. 341 MW)"),
    text("role", "Your role"),
    longText("desc", "Description", 6),
    field("specs", "Key figures (4 boxes)", "array", {
      of: [obj([field("value", "Figure", "string"), field("label", "What it is", "string")], { title: "value", subtitle: "label" })],
    }),
    strings("tools", "Tools & methods"),
    image("image", "Photo"),
  ],
  preview: { prepare: () => ({ title: "Featured project (big card)" }) },
});

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    text("degree", "Degree"),
    text("institution", "Institution"),
    text("period", "Period (e.g. 2020 - 2025)"),
    text("status", "Status badge (optional, e.g. Currently Pursuing)"),
    longText("focus", "Focus / description", 3),
    order,
  ],
  orderings,
  preview: { select: { title: "degree", subtitle: "institution" } },
});

export const skillCategory = defineType({
  name: "skillCategory",
  title: "Skill groups",
  type: "document",
  fields: [
    text("title", "Group title"),
    text("subtitle", "Subtitle"),
    field("accent", "Colour", "string", {
      options: { list: [{ title: "Amber", value: "amber" }, { title: "Cyan", value: "cyan" }, { title: "Violet", value: "violet" }] },
      initialValue: "amber",
    }),
    strings("skills", "Skills"),
    order,
  ],
  orderings,
  preview: { select: { title: "title", subtitle: "subtitle" } },
});

const photoFields = [
  text("tag", "Small label above the title"),
  text("title", "Title"),
  longText("caption", "Caption", 3),
  image("image", "Photo"),
  text("focus", "Photo focus (e.g. center 30%)", "Which part of the photo to keep when it is cropped. Try top, center or bottom, e.g. 'center 20%'."),
  order,
];

export const milestone = defineType({
  name: "milestone",
  title: "Milestones (photo cards)",
  type: "document",
  fields: photoFields,
  orderings,
  preview: { select: { title: "title", subtitle: "tag", media: "image" } },
});

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Engineering gallery",
  type: "document",
  fields: photoFields,
  orderings,
  preview: { select: { title: "title", subtitle: "tag", media: "image" } },
});

export const work = defineType({
  name: "work",
  title: "Work experience",
  type: "document",
  fields: [
    text("badge", "Date badge (e.g. 2024 - Present)"),
    text("category", "Small label (e.g. HYDROPOWER & TUNNELING)"),
    text("company", "Company"),
    text("role", "Your role"),
    longText("description", "What you did", 3),
    field("isCurrent", "Current job (highlights the card)", "boolean", { initialValue: false }),
    field("link", "Company website (optional)", "url"),
    field("icon", "Icon", "string", {
      options: {
        list: [
          { title: "Building", value: "building" },
          { title: "Lab", value: "flask" },
          { title: "Hard hat", value: "hardhat" },
          { title: "Drafting compass", value: "compass" },
        ],
      },
      initialValue: "building",
    }),
    image("thumb", "Logo or photo (optional)"),
    field("thumbIsLogo", "It is a logo (shown whole on white)", "boolean", { initialValue: false }),
    order,
  ],
  orderings,
  preview: { select: { title: "company", subtitle: "role", media: "thumb" } },
});

export const leadership = defineType({
  name: "leadership",
  title: "Leadership & additional experience",
  type: "document",
  fields: [
    text("period", "Period"),
    text("role", "Role"),
    text("entity", "Organisation"),
    text("domain", "What it covered"),
    order,
  ],
  orderings,
  preview: { select: { title: "role", subtitle: "entity" } },
});

export const project = defineType({
  name: "project",
  title: "Projects (list)",
  type: "document",
  fields: [
    field("category", "Group", "string", {
      options: {
        list: [
          { title: "Professional", value: "Professional" },
          { title: "Hydropower (academic)", value: "Hydropower" },
          { title: "Physical Modeling", value: "Physical Modeling" },
        ],
      },
      initialValue: "Professional",
    }),
    text("title", "Project name"),
    text("capacity", "Capacity (optional, e.g. 270 MW)"),
    longText("desc", "Description", 4),
    strings("tools", "Tools & methods"),
    order,
  ],
  orderings,
  preview: { select: { title: "title", subtitle: "category" } },
});

export const schemaTypes = [
  siteSettings,
  about,
  featuredProject,
  education,
  skillCategory,
  milestone,
  galleryItem,
  work,
  leadership,
  project,
];

export const singletonTypes = ["siteSettings", "about", "featuredProject"];
