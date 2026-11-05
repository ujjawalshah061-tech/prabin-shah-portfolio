// Shared contact-form logic, used by both the local Express server (server/index.js)
// and the Vercel serverless function (api/contact.js).
// Sends every message to the site owner (admin) AND a confirmation copy to the visitor.
import nodemailer from "nodemailer";
import { validateEmail, validateMessage, validateName, validatePhone } from "../shared/validation.js";

const env = () => {
  const GMAIL_USER = (process.env.GMAIL_USER || "").trim();
  // Gmail shows the 16-character app password in groups of 4 - strip any spaces.
  const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
  return {
    GMAIL_USER,
    GMAIL_APP_PASSWORD,
    ADMIN_EMAIL: (process.env.ADMIN_EMAIL || GMAIL_USER).trim(),
    OWNER_NAME: process.env.OWNER_NAME || "Prabin Shah",
  };
};

export const isMailConfigured = () => {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = env();
  return Boolean(GMAIL_USER && GMAIL_APP_PASSWORD);
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);


// Small in-memory rate limit: 5 submissions per IP per hour.
// (On serverless hosts this resets when the instance restarts - it is a basic guard, not a guarantee.)
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

/** Returns { status, body } for the HTTP layer to send. */
export async function handleContact(rawBody, ip = "unknown") {
  const body = rawBody && typeof rawBody === "object" ? rawBody : {};

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return { status: 200, body: { ok: true } };

  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  const error = validateName(name) || validatePhone(phone) || validateEmail(email) || validateMessage(message);
  if (error) return { status: 400, body: { ok: false, error } };
  if (!isMailConfigured()) {
    console.error("Mail not configured: set GMAIL_USER and GMAIL_APP_PASSWORD");
    return { status: 503, body: { ok: false, error: "Email service is not configured yet." } };
  }
  if (rateLimited(ip)) {
    return { status: 429, body: { ok: false, error: "Too many messages. Please try again later." } };
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, ADMIN_EMAIL, OWNER_NAME } = env();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

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
    return { status: 502, body: { ok: false, error: "Could not send your message. Please try WhatsApp or email directly." } };
  }

  let confirmationSent = true;
  try {
    await transporter.sendMail(customerMail);
  } catch (err) {
    confirmationSent = false;
    console.error("Failed to send confirmation email:", err.message);
  }

  return { status: 200, body: { ok: true, confirmationSent } };
}
