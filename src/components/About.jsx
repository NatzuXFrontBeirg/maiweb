import { Icon } from "./IconSprite.jsx";
import T from "./T.jsx";
import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { useAppState } from "../hooks/useAppState.jsx";

const SKILLS = ["skill.1", "skill.2", "skill.3", "skill.4", "skill.5", "skill.6"];

export default function About() {
  const { t } = useAppState();

  return (
    <Reveal as="section" className="section" id="about">
      <header className="section-head">
        <p className="section-num">01</p>
        <div>
          <T k="about.eyebrow" as="p" className="eyebrow" />
          <SplitHeading as="h2" html={t("about.h2")} />
        </div>
      </header>

      <div className="about-grid">
        <div className="about-main">
          <T k="about.leadP" as="p" className="about-lead" />
          <T k="about.p1" as="p" />

          <div className="edu">
            <p className="block-label">
              <Icon id="i-cap" size={16} />
              <T k="about.eduLabel" />
            </p>
            <div className="edu-item">
              <span className="edu-year">2025 — 2029</span>
              <h3>Institut Teknologi Sepuluh Nopember</h3>
              <T k="about.edu1" as="p" />
            </div>
            <div className="edu-item">
              <span className="edu-year">2022 — 2025</span>
              <h3>SMA Negeri 1 Bangli</h3>
              <p>Bangli, Bali</p>
            </div>
          </div>
        </div>

        <div className="skills-panel gcard">
          <T k="about.skillsLabel" as="p" className="block-label" />
          <div className="tag-list">
            {SKILLS.map((key) => (
              <T key={key} k={key} as="span" />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
