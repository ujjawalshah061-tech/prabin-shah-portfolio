// Contact-form mail server.
// Sends every message to the site owner (admin) AND a confirmation copy to the visitor.
// Secrets come from .env (never commit it) - see .env.example.
import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT) || 5050;
const GMAIL_USER = (process.env.GMAIL_USER || "").trim();
// Gmail shows the 16-character app password in groups of 4 - strip any spaces.
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || GMAIL_USER).trim();
const OWNER_NAME = process.env.OWNER_NAME || "Prabin Shah";

const configured = Boolean(GMAIL_USER && GMAIL_APP_PASSWORD);
const transporter = configured
  ? nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    })
  : null;

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Very small in-memory rate limit: 5 submissions per IP per hour
// (stops the form being used to spam other people through the confirmation email).
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, mailConfigured: configured }));

app.post("/api/contact", async (req, res) => {
  const body = req.body || {};

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return res.json({ ok: true });

  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ ok: false, error: "Please fill in all fields." });
  }
  if (!EMAIL_RE.test(email) || email.length > 120) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }
  if (name.length > 100 || phone.length > 40 || message.length > 5000) {
    return res.status(400).json({ ok: false, error: "One of the fields is too long." });
  }
  if (!configured) {
    console.error("Mail not configured: set GMAIL_USER and GMAIL_APP_PASSWORD in .env");
    return res.status(503).json({ ok: false, error: "Email service is not configured yet." });
  }
  if (rateLimited(req.ip)) {
    return res.status(429).json({ ok: false, error: "Too many messages. Please try again later." });
  }

  const when = new Date().toLocaleString("en-GB", { timeZone: "Asia/Kathmandu", dateStyle: "medium", timeStyle: "short" });
  const safeName = name.replace(/["<>\r\n]/g, "");
  const firstName = safeName.split(" ")[0] || "there";

  // 1) Notification to the admin. Reply-To is the visitor, so "Reply" answers them directly.
  const adminMail = {
    from: `"Portfolio Contact" <${GMAIL_USER}>`,
    to: ADMIN_EMAIL,
    replyTo: `"${safeName}" <${email}>`,
    subject: `New portfolio inquiry from ${safeName}`,
    text: `New message from your portfolio (${when} NPT)\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <div style="background:#0b0e14;color:#fff;padding:18px 22px"><b>New portfolio inquiry</b><div style="color:#9ca3af;font-size:12px">${esc(when)} (NPT)</div></div>
        <div style="padding:22px;color:#111827;font-size:15px;line-height:1.6">
          <p><b>Name:</b> ${esc(name)}<br><b>Phone:</b> ${esc(phone)}<br><b>Email:</b> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
          <p style="margin-bottom:6px"><b>Message:</b></p>
          <div style="background:#f3f4f6;border-radius:8px;padding:14px;white-space:pre-wrap">${esc(message)}</div>
          <p style="color:#6b7280;font-size:12px;margin-top:18px">Press Reply to answer ${esc(name)} directly.</p>
        </div>
      </div>`,
  };

  // 2) Confirmation to the visitor with a copy of what they sent.
  const customerMail = {
    from: `"${OWNER_NAME}" <${GMAIL_USER}>`,
    to: email,
    replyTo: ADMIN_EMAIL,
    subject: `Thanks for reaching out, ${firstName} - I received your message`,
    text: `Hi ${name},\n\nThank you for contacting me. I have received your message and will get back to you as soon as possible.\n\nHere is a copy of what you sent:\n\n${message}\n\nBest regards,\n${OWNER_NAME}\nCivil & Hydropower Engineer\n`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(110deg,#ffb020,#ff6a2b);color:#1a0f00;padding:20px 22px"><b style="font-size:18px">Message received</b></div>
        <div style="padding:22px;color:#111827;font-size:15px;line-height:1.65">
          <p>Hi ${esc(name)},</p>
          <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>
          <p style="margin-bottom:6px;color:#6b7280;font-size:13px">A copy of what you sent:</p>
          <div style="background:#f3f4f6;border-radius:8px;padding:14px;white-space:pre-wrap">${esc(message)}</div>
          <p style="margin-top:22px">Best regards,<br><b>${esc(OWNER_NAME)}</b><br><span style="color:#6b7280">Civil &amp; Hydropower Engineer · Lalitpur, Nepal</span></p>
        </div>
      </div>`,
  };

  try {
    // The admin copy is the one that matters; send it first.
    await transporter.sendMail(adminMail);
  } catch (err) {
    console.error("Failed to send admin email:", err.message);
    return res.status(502).json({ ok: false, error: "Could not send your message. Please try WhatsApp or email directly." });
  }

  let confirmationSent = true;
  try {
    await transporter.sendMail(customerMail);
  } catch (err) {
    confirmationSent = false;
    console.error("Failed to send confirmation email:", err.message);
  }

  return res.json({ ok: true, confirmationSent });
});

// In production (npm run build && npm start) this same server also serves the website.
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.use((_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
  if (!configured) console.warn("! GMAIL_USER / GMAIL_APP_PASSWORD missing in .env - contact form will return 503.");
});
