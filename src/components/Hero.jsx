import { lazy, Suspense } from "react";
import { Icon } from "./IconSprite.jsx";
import T from "./T.jsx";
import SplitHeading from "./SplitHeading.jsx";
import StatCounter from "./StatCounter.jsx";
import { useAppState } from "../hooks/useAppState.jsx";
import { useToast } from "../hooks/useToast.jsx";
import { useMediaQuery } from "../hooks/useMediaQuery.js";

const Hero3D = lazy(() => import("./Hero3D.jsx"));

export default function Hero() {
  const { t, theme } = useAppState();
  const showToast = useToast();
  // sama dengan breakpoint yang menyembunyikan .hero-3d di CSS — jangan
  // sampai HP tetap mengunduh chunk three.js untuk sesuatu yang tak terlihat
  const canShow3D = useMediaQuery("(min-width: 980px)");

  function handlePrint() {
    showToast(t("toast.print"));
    setTimeout(() => window.print(), 400);
  }

  return (
    <header className="hero" id="home">
      <div className="mesh" aria-hidden="true">
        <span className="mesh-a"></span>
        <span className="mesh-b"></span>
      </div>

      {canShow3D && (
        <Suspense fallback={null}>
          <Hero3D theme={theme} />
        </Suspense>
      )}

      <div className="hero-inner">
        <div className="hero-copy">
          <T k="hero.eyebrow" as="p" className="eyebrow" />
          <SplitHeading as="h1" className="display" html={t("hero.h1")} />

          <div className="hero-chips">
            <T k="hero.chip1" as="span" className="chip" />
            <T k="hero.chip2" as="span" className="chip" />
            <span className="chip">Surabaya</span>
          </div>

          <T k="hero.lead" as="p" className="lead" />

          <div className="actions">
            <a className="btn btn-primary" href="#pengalaman">
              <T k="hero.btnExp" />
              <Icon id="i-arrow" size={16} />
            </a>
            <a
              className="btn btn-wa"
              href="https://wa.me/6281353057459"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon id="i-wa" size={17} fill="currentColor" />
              WhatsApp
            </a>
            <button className="btn btn-ghost" type="button" onClick={handlePrint}>
              <Icon id="i-print" size={16} />
              <T k="hero.btnPdf" />
            </button>
          </div>

          <div className="stats">
            <StatCounter target={4} labelKey="hero.stat1" />
            <StatCounter target={2} suffix="×" labelKey="hero.stat2" />
            <StatCounter target={8} labelKey="hero.stat3" />
            <StatCounter target={5} labelKey="hero.stat4" />
          </div>
        </div>

        <aside className="profile-card gcard">
          <div className="pc-head">
            <div className="pc-avatar">A</div>
            <div>
              <p className="pc-name">Wibhu Natha Abhiyoga</p>
              <T k="profile.role" as="p" className="pc-role" />
            </div>
          </div>
          <div className="pc-status">
            <span className="dot"></span> <T k="profile.status" />
          </div>
          <div className="pc-divider"></div>
          <T k="profile.label" as="p" className="pc-label" />
          <ul className="pc-list">
            <li>
              <span className="ic">
                <Icon id="i-package" />
              </span>{" "}
              <T k="profile.skill1" />
            </li>
            <li>
              <span className="ic">
                <Icon id="i-users" />
              </span>{" "}
              <T k="profile.skill2" />
            </li>
            <li>
              <span className="ic">
                <Icon id="i-zap" />
              </span>{" "}
              <T k="profile.skill3" />
            </li>
          </ul>
        </aside>
      </div>
    </header>
  );
}
