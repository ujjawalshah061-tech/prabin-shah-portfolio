import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes, singletonTypes } from "./schema";
import { sanityDataset, sanityProjectId } from "../content/ContentContext";

const singletonItem = (S: any, id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id));

export default defineConfig({
  name: "default",
  title: "Prabin Shah portfolio",
  basePath: "/studio",
  projectId: sanityProjectId || "missing",
  dataset: sanityDataset,
  plugins: [
    structureTool({
      structure: (S: any) =>
        S.list()
          .title("Website content")
          .items([
            singletonItem(S, "siteSettings", "Site settings, hero & contact"),
            singletonItem(S, "about", "About text"),
            singletonItem(S, "featuredProject", "Featured project (big card)"),
            S.divider(),
            S.documentTypeListItem("education").title("Education"),
            S.documentTypeListItem("skillCategory").title("Skill groups"),
            S.documentTypeListItem("milestone").title("Milestones (photo cards)"),
            S.documentTypeListItem("galleryItem").title("Engineering gallery"),
            S.documentTypeListItem("work").title("Work experience"),
            S.documentTypeListItem("leadership").title("Leadership & additional experience"),
            S.documentTypeListItem("project").title("Projects (list)"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // The three "single page" documents are edited in place, never created as new copies.
    templates: (templates: any[]) => templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
  document: {
    actions: (input: any[], context: { schemaType: string }) =>
      singletonTypes.includes(context.schemaType)
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
});
