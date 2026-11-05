// Vercel serverless function: POST /api/contact
// Needs these Environment Variables in the Vercel project settings:
//   GMAIL_USER, GMAIL_APP_PASSWORD, ADMIN_EMAIL (optional), OWNER_NAME (optional)
import { handleContact } from "../server/contactHandler.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  const { status, body } = await handleContact(req.body, ip);
  return res.status(status).json(body);
}
