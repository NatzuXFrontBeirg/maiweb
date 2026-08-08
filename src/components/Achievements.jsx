import { useMemo, useState } from "react";
import { Icon } from "./IconSprite.jsx";
import T from "./T.jsx";
import Reveal from "./Reveal.jsx";
import SplitHeading from "./SplitHeading.jsx";
import { useAppState } from "../hooks/useAppState.jsx";
import { ACHIEVEMENTS } from "../data/achievements.js";

const FILTERS = [
  { id: "all", key: "filter.all" },
  { id: "nasional", key: "filter.national" },
  { id: "regional", key: "filter.regional" },
];

export default function Achievements() {
  const { t, lang } = useAppState();
  const [filter, setFilter] = useState("all");

  const counts = useMemo(
    () => ({
      all: ACHIEVEMENTS.length,
      nasional: ACHIEVEMENTS.filter((a) => a.level === "nasional").length,
      regional: ACHIEVEMENTS.filter((a) => a.level === "regional").length,
    }),
    []
  );

  const shown = filter === "all" ? counts.all : counts[filter];
  const statusText =
    lang === "en"
      ? filter === "all"
        ? `Showing all ${shown} achievements.`
        : `Showing ${shown} ${filter === "nasional" ? "national" : "regional"} achievements.`
      : filter === "all"
      ? `Menampilkan ${shown} prestasi.`
      : `Menampilkan ${shown} prestasi tingkat ${filter}.`;

  return (
    <Reveal as="section" className="section" id="prestasi">
      <header className="section-head">
        <p className="section-num">03</p>
        <div>
          <T k="ach.eyebrow" as="p" className="eyebrow" />
          <SplitHeading as="h2" html={t("ach.h2")} />
        </div>
      </header>

      <div className="filters" role="group" aria-label="Saring prestasi">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`filter ${filter === f.id ? "is-on" : ""}`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            <T k={f.key} /> <b>{counts[f.id]}</b>
          </button>
        ))}
      </div>

      <div className="ach-grid">
        {ACHIEVEMENTS.map((a, i) => {
          const hidden = filter !== "all" && a.level !== filter;
          return (
            <article
              key={i}
              className={`ach gcard ${hidden ? "is-hidden" : ""}`}
              data-level={a.level}
              data-gradient={a.gradient}
            >
              <div className="ach-top">
                <span className="ach-ic">
                  <Icon id={a.icon} size={22} />
                </span>
                {a.rankKey ? (
                  <T k={a.rankKey} as="span" className={`ach-rank ${a.rankClass || ""}`} />
                ) : (
                  <span className="ach-rank">{a.rank}</span>
                )}
              </div>
              <h3>{a.title}</h3>
              <p>{a.org}</p>
              <T k={a.level === "nasional" ? "filter.national" : "filter.regional"} as="span" className="ach-lvl" />
            </article>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {statusText}
      </p>
    </Reveal>
  );
}
