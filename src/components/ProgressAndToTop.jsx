import { useEffect, useState } from "react";
import { Icon } from "./IconSprite.jsx";
import { useAppState } from "../hooks/useAppState.jsx";
import { prefersReducedMotion } from "../hooks/useInView.js";

export default function ProgressAndToTop() {
  const { t } = useAppState();
  const [pct, setPct] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setPct(max > 0 ? Math.min(Math.max((y / max) * 100, 0), 100) : 0);
      setShowTop(y >= 600);
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${pct}%` }}></span>
      </div>
      <button
        className="to-top"
        type="button"
        hidden={!showTop}
        aria-label={t("aria.toTop")}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })
        }
      >
        <Icon id="i-up" size={18} />
      </button>
    </>
  );
}
