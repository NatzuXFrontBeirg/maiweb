import { useRef, useState } from "react";
import { Icon } from "./IconSprite.jsx";
import T from "./T.jsx";
import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { useAppState } from "../hooks/useAppState.jsx";
import { useToast } from "../hooks/useToast.jsx";

const EMAIL = "nathaabhiyoga@gmail.com";

export default function Contact() {
  const { t } = useAppState();
  const showToast = useToast();
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  async function handleCopy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(EMAIL);
      ok = true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch (e2) {
        ok = false;
      }
      document.body.removeChild(ta);
    }

    if (ok) {
      setCopied(true);
      showToast(t("toast.copied"));
      setTimeout(() => setCopied(false), 2000);
    } else {
      showToast(t("toast.copyFail"));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;

    // honeypot: bot biasanya mengisi semua field termasuk yang tersembunyi
    const honeypot = form.querySelector("#website");
    if (honeypot && honeypot.value.trim() !== "") return;

    const name = form.querySelector("#cf-name").value.trim();
    const subject = form.querySelector("#cf-subject").value.trim();
    const message = form.querySelector("#cf-message").value.trim();

    if (!name || !subject || !message) {
      showToast(t("form.errorRequired"));
      return;
    }

    const body = `${message}\n\n— ${name}`;
    const mailto =
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` + `&body=${encodeURIComponent(body)}`;

    showToast(t("toast.mailOpened"));
    window.location.href = mailto;
  }

  return (
    <Reveal as="section" className="section" id="contact">
      <div className="contact-card gcard">
        <div className="cc-glow" aria-hidden="true"></div>
        <T k="contact.eyebrow" as="p" className="eyebrow" />
        <SplitHeading as="h2" className="display-sm" html={t("contact.h2")} />
        <T k="contact.lead" as="p" className="cc-lead" />

        <div className="cc-actions">
          <a className="btn btn-wa btn-lg" href="https://wa.me/6281353057459" target="_blank" rel="noopener noreferrer">
            <Icon id="i-wa" size={18} fill="currentColor" />
            <T k="contact.btnWa" />
          </a>
          <a className="btn btn-primary btn-lg" href={`mailto:${EMAIL}`}>
            <Icon id="i-mail" size={17} />
            <T k="contact.btnMail" />
          </a>
        </div>

        <button className={`copy-row ${copied ? "is-done" : ""}`} type="button" onClick={handleCopy}>
          <span>{EMAIL}</span>
          <Icon id="i-copy" size={16} className="ic-copy" />
          <Icon id="i-check" size={16} className="ic-done" />
        </button>

        <div className="cc-meta">
          <a href="tel:+6281353057459">
            <Icon id="i-wa" size={15} fill="currentColor" />
            +62 813-5305-7459
          </a>
          <span>
            <Icon id="i-pin" size={15} />
            Surabaya, Jawa Timur
          </span>
        </div>

        <div className="cc-divider" aria-hidden="true"></div>

        <form id="contactForm" className="cc-form" ref={formRef} onSubmit={handleSubmit} noValidate>
          <T k="form.label" as="p" className="cc-form-label" />

          {/* honeypot anti-bot: kolom tersembunyi, harus tetap kosong */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="cc-form-row">
            <div className="cc-field">
              <label htmlFor="cf-name">
                <T k="form.name" />
              </label>
              <input type="text" id="cf-name" name="name" required maxLength={120} autoComplete="name" />
            </div>
            <div className="cc-field">
              <label htmlFor="cf-subject">
                <T k="form.subject" />
              </label>
              <input type="text" id="cf-subject" name="subject" required maxLength={150} autoComplete="off" />
            </div>
          </div>
          <div className="cc-field">
            <label htmlFor="cf-message">
              <T k="form.message" />
            </label>
            <textarea id="cf-message" name="message" required maxLength={2000} rows={4} />
          </div>
          <T k="form.hint" as="p" className="cc-form-hint" />
          <button type="submit" className="btn btn-primary">
            <Icon id="i-send" size={16} />
            <T k="form.submit" />
          </button>
        </form>
      </div>
    </Reveal>
  );
}
