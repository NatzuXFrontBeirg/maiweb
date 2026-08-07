/* ============================================================
   Portofolio — interaksi
   Tanpa scroll-hijack: semua seksi mengalir normal.
   ============================================================ */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopQuery = window.matchMedia("(min-width: 821px)");

/* ---------- tema ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const meta = document.getElementById("themeColorMeta");
  if (!toggle) return;

  const colors = { dark: "#05070d", light: "#f6f7fa" };

  function reflect(theme) {
    toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      theme === "light" ? "Ganti ke mode gelap" : "Ganti ke mode terang"
    );
    if (meta) meta.setAttribute("content", colors[theme] || colors.dark);
  }

  reflect(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  toggle.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    reflect(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });
}

/* ---------- toast ---------- */
let toastTimer = null;
function showToast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-on"), 2200);
}

/* ---------- progress + back to top ---------- */
function initProgress() {
  const bar = document.getElementById("progressBar");
  const toTop = document.getElementById("toTop");

  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    if (bar) {
      const pct = max > 0 ? (y / max) * 100 : 0;
      bar.style.width = Math.min(Math.max(pct, 0), 100) + "%";
    }
    if (toTop) toTop.hidden = y < 600;
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();

  if (toTop) {
    toTop.addEventListener("click", () =>
      window.scrollTo({
        top: 0,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      })
    );
  }
}

/* ---------- split text ---------- */
function initSplitText() {
  document.querySelectorAll(".split").forEach((el) => {
    if (el.dataset.split) return;
    el.dataset.split = "1";

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
  });
}

/* ---------- reveal + counter ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count || "0");
  const suffix = el.dataset.suffix || "";
  if (reducedMotion.matches) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 1300;
  const start = performance.now();

  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initReveal() {
  const targets = document.querySelectorAll(".reveal, .split, [data-count]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => {
      el.classList.add("is-visible", "is-in");
      if (el.dataset.count) animateCount(el);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        if (el.classList.contains("split")) el.classList.add("is-in");
        if (el.dataset.count) animateCount(el);
        observer.unobserve(el);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -50px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- timeline: sorot node saat masuk layar ---------- */
function initTimeline() {
  const rows = Array.from(document.querySelectorAll(".tl-row"));
  if (!rows.length) return;

  if (!("IntersectionObserver" in window) || reducedMotion.matches) {
    rows.forEach((r) => r.classList.add("is-on"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("is-on", entry.isIntersecting)
      );
    },
    { threshold: 0.4, rootMargin: "-15% 0px -25% 0px" }
  );

  rows.forEach((row) => observer.observe(row));
}

/* ---------- filter prestasi ---------- */
function initFilters() {
  const wrap = document.getElementById("filters");
  const grid = document.getElementById("achGrid");
  const status = document.getElementById("filterStatus");
  if (!wrap || !grid) return;

  const buttons = Array.from(wrap.querySelectorAll(".filter"));
  const cards = Array.from(grid.querySelectorAll(".ach"));

  function apply(filter) {
    let shown = 0;
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.level === filter;
      card.classList.toggle("is-hidden", !match);
      if (match) shown++;
    });

    buttons.forEach((btn) => {
      const on = btn.dataset.filter === filter;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    if (status) {
      status.textContent = `Menampilkan ${shown} prestasi${
        filter === "all" ? "" : ` tingkat ${filter}`
      }.`;
    }
  }

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => apply(btn.dataset.filter))
  );
}

/* ---------- salin email ---------- */
function initCopy() {
  const btn = document.getElementById("copyEmail");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const value = btn.dataset.copy || "";
    let ok = false;

    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch (e) {
      // fallback untuk browser/konteks tanpa Clipboard API
      const ta = document.createElement("textarea");
      ta.value = value;
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
      btn.classList.add("is-done");
      showToast("Email disalin ✓");
      setTimeout(() => btn.classList.remove("is-done"), 2000);
    } else {
      showToast("Gagal menyalin — salin manual ya");
    }
  });
}

/* ---------- simpan PDF ---------- */
function initPrint() {
  const btn = document.getElementById("printBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    showToast("Pilih “Save as PDF” di dialog cetak");
    setTimeout(() => window.print(), 400);
  });
}

/* ---------- marquee ---------- */
function initMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track || track.dataset.cloned) return;
  track.dataset.cloned = "1";
  track.innerHTML += track.innerHTML;
}

/* ---------- nav ---------- */
function initNav() {
  const nav = document.getElementById("siteNav");
  const links = Array.from(document.querySelectorAll("#navLinks a[href^='#']"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function onScroll() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 10);

    let currentIndex = -1;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
        currentIndex = i;
      }
    });
    links.forEach((a, i) => a.classList.toggle("is-current", i === currentIndex));
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- menu mobile ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;

  const items = Array.from(menu.querySelectorAll("a"));
  items.forEach((a, i) => a.style.setProperty("--i", i));

  function setOpen(open) {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    document.body.classList.toggle("is-locked", open);
  }

  toggle.addEventListener("click", () => setOpen(menu.hidden));
  items.forEach((a) => a.addEventListener("click", () => setOpen(false)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) setOpen(false);
  });

  desktopQuery.addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

/* ---------- init ---------- */
function init() {
  initThemeToggle();
  initProgress();
  initSplitText();
  initReveal();
  initTimeline();
  initFilters();
  initCopy();
  initPrint();
  initMarquee();
  initNav();
  initMobileMenu();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
