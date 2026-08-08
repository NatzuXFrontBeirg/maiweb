import { useRef } from "react";
import { Icon } from "./IconSprite.jsx";
import T from "./T.jsx";
import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { useInView } from "../hooks/useInView.js";
import { useAppState } from "../hooks/useAppState.jsx";
import { TIMELINE } from "../data/timeline.js";

function TimelineRow({ item }) {
  const ref = useRef(null);
  const isOn = useInView(ref, { threshold: 0.4, rootMargin: "-15% 0px -25% 0px", once: false });

  return (
    <li className={`tl-row ${isOn ? "is-on" : ""}`} ref={ref}>
      <div className="tl-rail" aria-hidden="true">
        <span className="tl-node">
          <Icon id={item.icon} size={17} />
        </span>
      </div>
      <article className={`tl-card gcard ${item.lead ? "is-lead" : ""}`}>
        <div className="tl-top">
          <T k={item.dateKey} as="span" className="tl-when" />
          <span className="tl-org">{item.org}</span>
          {item.lead && <T k="exp.badge" as="span" className="tl-badge" />}
        </div>
        <T k={item.titleKey} as="h3" />
        <T k={item.descKey} as="p" />
        <div className="tl-tags">
          {item.tagKeys.map((key) => (
            <T key={key} k={key} as="span" />
          ))}
        </div>
      </article>
    </li>
  );
}

export default function Timeline() {
  const { t } = useAppState();

  return (
    <Reveal as="section" className="section" id="pengalaman">
      <header className="section-head">
        <p className="section-num">02</p>
        <div>
          <T k="nav.pengalaman" as="p" className="eyebrow" />
          <SplitHeading as="h2" html={t("exp.h2")} />
        </div>
      </header>

      <ol className="tl">
        {TIMELINE.map((item, i) => (
          <TimelineRow key={i} item={item} />
        ))}
      </ol>
    </Reveal>
  );
}
