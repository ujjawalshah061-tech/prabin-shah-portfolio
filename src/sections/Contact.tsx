import React, { useState } from "react";
import { Mail, Phone, Send, ExternalLink, MessageCircle } from "lucide-react";

const Contact: React.FC = () => {
  const empty = { name: "", phone: "", email: "", message: "", website: "" };
  const [formData, setFormData] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
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
    } catch (err) {
      setStatus("error");
      setFeedback(
        (err instanceof Error ? err.message : "Something went wrong.") +
          " You can also email prabinshah919@gmail.com or message me on WhatsApp."
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

            <form onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <label className="field">
                  <span>Full name *</span>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>
                <label className="field">
                  <span>Phone number *</span>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </label>
              </div>

              <label className="field">
                <span>Email *</span>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>

              <label className="field">
                <span>Message *</span>
                <textarea
                  required
                  rows={5}
                  placeholder="Write your message or project requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113060.19830589574!2d85.25552984570075!3d27.67138243162791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sLalitpur!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>

            <div className="cta-row cta-row-left">
              <a href="https://maps.app.goo.gl/wyBpvtVPm2QKJYzZ8?g_st=aw" target="_blank" rel="noreferrer" className="btn btn-ghost">
                <span>Open in Google Maps</span>
                <ExternalLink size={14} />
              </a>
              <a href="tel:+9779812186293" className="btn btn-ghost">
                <span>Call now</span>
                <Phone size={14} />
              </a>
            </div>

            <div className="meta-list">
              <div className="meta spot">
                <span className="mono-label">Email</span>
                <a href="mailto:prabinshah919@gmail.com">prabinshah919@gmail.com</a>
              </div>
              <div className="meta spot">
                <span className="mono-label">Phone / WhatsApp</span>
                <a href="https://wa.me/9779812186293">+977 981-2186293</a>
              </div>
              <div className="meta spot">
                <span className="mono-label">Works at</span>
                <span>Hydro Tunneling and Research Pvt. Ltd. · Lalitpur, Nepal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dock">
        <a href="tel:+9779812186293">
          <Phone size={15} />
          <span>Call</span>
        </a>
        <a href="https://wa.me/9779812186293" target="_blank" rel="noreferrer">
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </a>
        <a href="mailto:prabinshah919@gmail.com">
          <Mail size={15} />
          <span>Message</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
