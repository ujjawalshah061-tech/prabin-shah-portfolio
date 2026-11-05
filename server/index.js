// Local / Node-host server for the contact form.
// Secrets come from .env (never commit it) - see .env.example.
// On Vercel this file is not used: api/contact.js (same logic) runs instead.
import "dotenv/config";
import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { handleContact, isMailConfigured } from "./contactHandler.js";

const PORT = Number(process.env.PORT) || 5050;

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, mailConfigured: isMailConfigured() }));

app.post("/api/contact", async (req, res) => {
  const { status, body } = await handleContact(req.body, req.ip);
  res.status(status).json(body);
});

// In production (npm run build && npm start) this same server also serves the website.
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.use((_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  if (!isMailConfigured()) console.warn("! GMAIL_USER / GMAIL_APP_PASSWORD missing in .env - contact form will return 503.");
});
