import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ExternalLink, MessageCircle } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Direct Gmail mailto link trigger
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:prabinshah919@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-page-section">
      <div className="contact-page-container">
        {/* Left: Send Message Form Card */}
        <div className="contact-form-card">
          <h2 className="form-card-title">Send a message</h2>
          <p className="form-card-subtitle">
            Fill in the form below and I will get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="contact-actual-form">
            <div className="form-double-row">
              <div className="form-input-group">
                <label>Full name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-input-group">
                <label>Phone number *</label>
                <input
                  type="tel"
                  required
                  placeholder="98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-input-group">
              <label>Email *</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-input-group">
              <label>Message *</label>
              <textarea
                required
                rows={5}
                placeholder="Write your message or project requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-send-contact-form">
              <span>Send message</span>
              <Send size={15} />
            </button>
          </form>

          <span className="form-footer-note">
            You will receive a prompt confirmation once submitted.
          </span>
        </div>

        {/* Right: Map & Direct Info */}
        <div className="contact-info-col">
          {/* Map Preview Box */}
          <div className="contact-map-frame">
            <iframe
              title="Prabin Shah Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113060.19830589574!2d85.25552984570075!3d27.67138243162791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sLalitpur!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
              width="100%"
              height="230"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>

          <div className="map-action-buttons">
            <a
              href="https://maps.app.goo.gl/wyBpvtVPm2QKJYzZ8?g_st=aw"
              target="_blank"
              rel="noreferrer"
              className="btn-map-action"
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={14} />
            </a>
            <a href="tel:+9779812186293" className="btn-call-action">
              <span>Call now</span>
              <Phone size={14} />
            </a>
          </div>

          {/* Contact Details List */}
          <div className="contact-meta-group">
            <div className="meta-item">
              <span className="meta-label">EMAIL</span>
              <a href="mailto:prabinshah919@gmail.com" className="meta-val">
                prabinshah919@gmail.com
              </a>
            </div>

            <div className="meta-item">
              <span className="meta-label">PHONE / WHATSAPP</span>
              <a href="https://wa.me/9779812186293" className="meta-val">
                +977 981-2186293
              </a>
            </div>

            <div className="meta-item">
              <span className="meta-label">WORKS AT</span>
              <span className="meta-val">
                Hydro Tunneling and Research Pvt. Ltd. · Lalitpur, Nepal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Bar */}
      <div className="contact-floating-dock">
        <a href="tel:+9779812186293" className="dock-item">
          <Phone size={14} />
          <span>Call</span>
        </a>
        <a
          href="https://wa.me/9779812186293"
          target="_blank"
          rel="noreferrer"
          className="dock-item"
        >
          <MessageCircle size={14} />
          <span>WhatsApp</span>
        </a>
        <a href="mailto:prabinshah919@gmail.com" className="dock-item">
          <Mail size={14} />
          <span>Message</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;