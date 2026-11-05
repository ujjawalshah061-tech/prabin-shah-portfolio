// Contact-form validation shared by the browser (src/sections/Contact.tsx)
// and the mail server (server/contactHandler.js), so both apply identical rules.
// Each validator returns an error message, or "" when the value is fine.

// Common typos of popular mail providers -> the address the visitor most likely meant.
const DOMAIN_FIXES = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmil.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.comm": "gmail.com",
  "gmail.om": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlok.com": "outlook.com",
  "outlook.con": "outlook.com",
};

const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}$/i;

export function validateEmail(value) {
  const email = String(value ?? "").trim();
  if (!email) return "Please enter your email address.";
  if (email.length > 120) return "That email address is too long.";

  const [local = "", domain = ""] = email.toLowerCase().split("@");
  const looksValid =
    EMAIL_RE.test(email) &&
    !local.startsWith(".") &&
    !local.endsWith(".") &&
    !local.includes("..") &&
    !domain.includes("..") &&
    !domain.startsWith("-") &&
    !domain.split(".").some((part) => part.startsWith("-") || part.endsWith("-"));
  if (!looksValid) return "Please enter a valid email address, e.g. name@gmail.com.";

  if (DOMAIN_FIXES[domain]) return `Did you mean ${local}@${DOMAIN_FIXES[domain]}?`;
  return "";
}

/** Strips spaces, dashes, dots and brackets so numbers can be typed naturally. */
export function normalizePhone(value) {
  return String(value ?? "").replace(/[\s\-().]/g, "");
}

const NP_MOBILE = /^(?:\+?977)?(9[78]\d{8})$/; // Ncell / NTC / Smart: 97x or 98x + 8 digits
const NP_LANDLINE = /^(?:\+?977)?0?1\d{7}$/; // Kathmandu valley: 01-xxxxxxx
const INTERNATIONAL = /^\+(?!977)[1-9]\d{7,14}$/; // any other country, must start with +

export function validatePhone(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "Please enter your phone number.";
  if (raw.length > 25) return "That phone number is too long.";

  const num = normalizePhone(raw);
  const message = "Enter a valid phone number, e.g. 98XXXXXXXX or +977 98XXXXXXXX.";
  if (!/^\+?\d+$/.test(num)) return message;

  const digits = num.replace(/^\+?977/, "").replace(/\D/g, "");
  if (/^(\d)\1+$/.test(digits)) return message; // 9999999999, 0000000000 ...

  if (NP_MOBILE.test(num) || NP_LANDLINE.test(num) || INTERNATIONAL.test(num)) return "";
  return message;
}

export function validateName(value) {
  const name = String(value ?? "").trim();
  if (!name) return "Please enter your full name.";
  if (name.length < 2) return "Please enter your full name.";
  if (name.length > 100) return "That name is too long.";
  return "";
}

export function validateMessage(value) {
  const message = String(value ?? "").trim();
  if (!message) return "Please write a message.";
  if (message.length < 5) return "Your message is a bit short, please add more detail.";
  if (message.length > 5000) return "That message is too long (max 5000 characters).";
  return "";
}
