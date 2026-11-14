import React, { useState } from "react";
import { Mail, Phone, Send, ExternalLink, MessageCircle } from "lucide-react";
import { useContent } from "../content/ContentContext";
import { validateEmail, validateMessage, validateName, validatePhone } from "../../shared/validation";

type Field = "name" | "phone" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const validators: Record<Field, (v: string) => string> = {
  name: validateName,
  phone: validatePhone,
  email: validateEmail,
  message: validateMessage,
};
const fieldOrder: Field[] = ["name", "phone", "email", "message"];

const Contact: React.FC = () => {
  const { settings } = useContent();
  const empty = { name: "", phone: "", email: "", message: "", website: "" };
  const [formData, setFormData] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const setField = (field: Field, value: string) => {
    setFormData((d) => ({ ...d, [field]: value }));
    // Once a field shows an error, re-check it while the visitor fixes it.
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validators[field](value) }));
  };
  const checkField = (field: Field) => {
    if (!formData[field]) return; // don't nag about untouched/empty fields on blur
    setErrors((e) => ({ ...e, [field]: validators[field](formData[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const found: Errors = {};
    for (const f of fieldOrder) {
      const msg = validators[f](formData[f]);
      if (msg) found[f] = msg;
    }
    setErrors(found);
    const firstBad = fieldOrder.find((f) => found[f]);
    if (firstBad) {
      setStatus("idle");
      setFeedback("");
      document.getElementById(`contact-${firstBad}`)?.focus();
      return;
    }

    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setFeedback(
        data.confirmationSent === false
          ? "Message sent! I'll get back to you soon. (We couldn't deliver the confirmation copy to your email.)"
          : "Message sent! A confirmation copy is on its way to your email."
      );
      setFormData(empty);
      setErrors({});
    } catch (err) {
      setStatus("error");
      setFeedback(
        (err instanceof Error ? err.message : "Something went wrong.") +
          ` You can also email ${settings.email} or message me on WhatsApp.`
      );
    }
  };

  return (
    <section className="section page-top contact" id="contact-page">
      <div className="page-glow" aria-hidden="true" />
      <div className="wrap">
        <header className="sec-head reveal-on-scroll animate-in">
          <span className="mono-label">Get in touch</span>
          <h1 className="sec-title sec-title-xl">
            Let&apos;s build <em>something durable</em>
          </h1>
        </header>

        <div className="contact-grid">
          <div className="form-card spot reveal-on-scroll animate-in">
            <h2>Send a message</h2>
            <p className="form-sub">Fill in the form below and I will get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} className="form" noValidate>
              <div className="form-row">
                <label className="field">
                  <span>Full name *</span>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={100}
                    placeholder="Your full name"
                    value={formData.name}
                    aria-invalid={Boolean(errors.name)}
                    onChange={(e) => setField("name", e.target.value)}
                    onBlur={() => checkField("name")}
                  />
                  {errors.name && (
                    <em className="field-error" role="alert">
                      {errors.name}
                    </em>
                  )}
                </label>
                <label className="field">
                  <span>Phone number *</span>
                  <input
                    id="contact-phone"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    maxLength={20}
                    placeholder="98XXXXXXXX or +977 98XXXXXXXX"
                    value={formData.phone}
                    aria-invalid={Boolean(errors.phone)}
                    onChange={(e) => setField("phone", e.target.value.replace(/[^\d+\s\-()]/g, ""))}
                    onBlur={() => checkField("phone")}
                  />
                  {errors.phone && (
                    <em className="field-error" role="alert">
                      {errors.phone}
                    </em>
                  )}
                </label>
              </div>

              <label className="field">
                <span>Email *</span>
                <input
                  id="contact-email"
                  type="email"
                  inputMode="email"
                  required
                  autoComplete="email"
                  maxLength={120}
                  placeholder="your@email.com"
                  value={formData.email}
                  aria-invalid={Boolean(errors.email)}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => checkField("email")}
                />
                {errors.email && (
                  <em className="field-error" role="alert">
                    {errors.email}
                  </em>
                )}
              </label>

              <label className="field">
                <span>Message *</span>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  maxLength={5000}
                  placeholder="Write your message or project requirements..."
                  value={formData.message}
                  aria-invalid={Boolean(errors.message)}
                  onChange={(e) => setField("message", e.target.value)}
                  onBlur={() => checkField("message")}
                />
                {errors.message && (
                  <em className="field-error" role="alert">
                    {errors.message}
                  </em>
                )}
              </label>

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hp-field"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />

              <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
                <span>{status === "sending" ? "Sending..." : "Send message"}</span>
                <Send size={16} />
              </button>

              {feedback && (
                <p className={`form-status form-status-${status}`} role="status" aria-live="polite">
                  {feedback}
                </p>
              )}
            </form>
          </div>

          <div className="contact-side reveal-on-scroll animate-in delay-200">
            <div className="map-frame">
              <iframe
                title="Prabin Shah Location"
                src={settings.mapEmbedUrl}
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>

            <div className="cta-row cta-row-left">
              <a href={settings.mapLink} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <span>Open in Google Maps</span>
                <ExternalLink size={14} />
              </a>
              <a href={`tel:${settings.phone}`} className="btn btn-ghost">
                <span>Call now</span>
                <Phone size={14} />
              </a>
            </div>

            <div className="meta-list">
              <div className="meta spot">
                <span className="mono-label">Email</span>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </div>
              <div className="meta spot">
                <span className="mono-label">Phone / WhatsApp</span>
                <a href={`https://wa.me/${settings.whatsapp}`}>{settings.phoneDisplay}</a>
              </div>
              <div className="meta spot">
                <span className="mono-label">Works at</span>
                <span>{settings.worksAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dock">
        <a href={`tel:${settings.phone}`}>
          <Phone size={15} />
          <span>Call</span>
        </a>
        <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer">
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </a>
        <a href={`mailto:${settings.email}`}>
          <Mail size={15} />
          <span>Message</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
