import { useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView.js";

/**
 * Judul yang muncul kata-per-kata saat di-scroll. `html` boleh berisi
 * markup statis (mis. "Halo, saya <em>Abhi.</em>") — nilainya selalu
 * datang dari kamus i18n yang kita tulis sendiri, bukan input pengguna.
 */
export default function SplitHeading({ as: Tag = "h2", html, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.18, rootMargin: "0px 0px -50px 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.innerHTML = html;

    const frag = document.createDocumentFragment();
    let index = 0;

    function addWord(content) {
      const word = document.createElement("span");
      word.className = "word";
      const inner = document.createElement("span");
      if (typeof content === "string") inner.textContent = content;
      else inner.appendChild(content);
      inner.style.setProperty("--d", index * 34 + "ms");
      word.appendChild(inner);
      frag.appendChild(word);
      index++;
    }

    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/(\s+)/).forEach((chunk) => {
          if (!chunk) return;
          if (/^\s+$/.test(chunk)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          addWord(chunk);
        });
      } else {
        addWord(node.cloneNode(true));
      }
    });

    el.textContent = "";
    el.appendChild(frag);
  }, [html]);

  return <Tag ref={ref} className={`split ${className} ${inView ? "is-in is-visible" : ""}`} />;
}
