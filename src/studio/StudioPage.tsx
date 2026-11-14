import { Studio } from "sanity";
import config from "./sanity.config";
import { sanityProjectId } from "../content/ContentContext";

// Loaded only on /studio (see App.tsx), so the public site does not download the editor.
export default function StudioPage() {
  if (!sanityProjectId) {
    return (
      <div className="studio-setup">
        <h1>Admin screen not connected yet</h1>
        <p>
          Set <code>VITE_SANITY_PROJECT_ID</code> (and <code>VITE_SANITY_DATASET</code>) in your <code>.env</code> file
          and in Vercel&apos;s Environment Variables, then reload.
        </p>
      </div>
    );
  }
  return (
    <div className="studio-root">
      <Studio config={config} />
    </div>
  );
}
