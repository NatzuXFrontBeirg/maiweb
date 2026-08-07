/* ============================================================
   Portofolio — interaksi
   ============================================================ */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopQuery = window.matchMedia("(min-width: 821px)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

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

/* ---------- preloader ---------- */
function initLoader() {
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  if (!loader) return;

  if (reducedMotion.matches) {
    loader.remove();
    document.body.classList.add("is-ready");
    return;
  }

  let value = 0;
  const timer = setInterval(() => {
    value = Math.min(value + Math.random() * 22 + 8, 100);
    if (fill) fill.style.width = value + "%";
    if (value >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        loader.classList.add("is-done");
        document.body.classList.add("is-ready");
        setTimeout(() => loader.remove(), 950);
      }, 180);
    }
  }, 130);
}

/* ---------- progress bar ---------- */
function initProgress() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;

  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = Math.min(Math.max(pct, 0), 100) + "%";
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- kursor kustom ---------- */
function initCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring || !finePointer.matches || reducedMotion.matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    document.body.classList.add("has-cursor");
  });

  document.addEventListener("mouseleave", () =>
    document.body.classList.remove("has-cursor")
  );

  (function loop() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(loop);
  })();

  const hot = "a, button, .tag-list span, .chip, .slide";
  document.querySelectorAll(hot).forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-hot"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-hot"));
  });
}

/* ---------- split text ---------- */
function initSplitText() {
  document.querySelectorAll(".split").forEach((el) => {
    if (el.dataset.split) return;
    el.dataset.split = "1";

    const frag = document.createDocumentFragment();
    let index = 0;

    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/(\s+)/).forEach((chunk) => {
          if (!chunk) return;
          if (/^\s+$/.test(chunk)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const word = document.createElement("span");
          word.className = "word";
          const inner = document.createElement("span");
          inner.textContent = chunk;
          inner.style.setProperty("--d", index * 34 + "ms");
          word.appendChild(inner);
          frag.appendChild(word);
          index++;
        });
      } else {
        const word = document.createElement("span");
        word.className = "word";
        const inner = document.createElement("span");
        inner.appendChild(node.cloneNode(true));
        inner.style.setProperty("--d", index * 34 + "ms");
        word.appendChild(inner);
        frag.appendChild(word);
        index++;
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
  const duration = 1400;
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

/* ---------- magnetic buttons ---------- */
function initMagnetic() {
  if (!finePointer.matches || reducedMotion.matches) return;

  document.querySelectorAll(".magnetic").forEach((el) => {
    const strength = 0.28;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

/* ---------- parallax ---------- */
function initParallax() {
  const items = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!items.length || reducedMotion.matches) return;

  let ticking = false;

  function update() {
    const y = window.scrollY;
    items.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0;
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();
}

/* ---------- marquee (gandakan agar mulus) ---------- */
function initMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track || track.dataset.cloned) return;
  track.dataset.cloned = "1";
  track.innerHTML += track.innerHTML;
}

/* ---------- nav ---------- */
function initNav() {
  const nav = document.getElementById("siteNav");
  const links = Array.from(
    document.querySelectorAll("#navLinks a[href^='#']")
  );
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

/* ---------- carousel prestasi ---------- */
function initPrestasiScroll() {
  const pin = document.getElementById("prestasiPin");
  const sticky = pin ? pin.querySelector(".scroll-sticky") : null;
  const track = document.getElementById("slideTrack");
  const prevBtn = document.getElementById("slidePrev");
  const nextBtn = document.getElementById("slideNext");
  const status = document.getElementById("slideStatus");
  if (!pin || !sticky || !track) return;

  const slides = Array.from(track.children);
  let currentIndex = 0;

  function usesPinMode() {
    return desktopQuery.matches && !reducedMotion.matches;
  }

  function applyFocusEffect(containerWidth, shiftX) {
    const centerX = containerWidth / 2;
    let closestIndex = 0;
    let closestDist = Infinity;

    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2 + shiftX;
      const distance = Math.abs(slideCenter - centerX);
      const norm = Math.min(distance / (slide.offsetWidth * 0.85), 1);
      slide.style.filter = `blur(${(norm * 5).toFixed(2)}px)`;
      slide.style.opacity = (1 - norm * 0.55).toFixed(2);
      slide.style.transform = `scale(${(1 - norm * 0.1).toFixed(3)})`;
      slide.classList.toggle("is-active", norm < 0.15);

      if (distance < closestDist) {
        closestDist = distance;
        closestIndex = i;
      }
    });

    currentIndex = closestIndex;
    updateControls();
  }

  function updateControls() {
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
    if (status) {
      const title = slides[currentIndex].querySelector("h3");
      status.textContent = `Prestasi ${currentIndex + 1} dari ${slides.length}: ${
        title ? title.textContent : ""
      }`;
    }
  }

  function setPinHeight() {
    if (!usesPinMode()) {
      pin.style.height = "auto";
      return;
    }
    const maxTranslate = Math.max(track.scrollWidth - sticky.offsetWidth, 0);
    pin.style.height = `${maxTranslate + window.innerHeight}px`;
  }

  function updateDesktop() {
    const containerWidth = sticky.offsetWidth;
    const maxTranslate = Math.max(track.scrollWidth - containerWidth, 0);
    const totalScroll = pin.offsetHeight - window.innerHeight;
    const rectTop = pin.getBoundingClientRect().top;
    let progress = totalScroll > 0 ? -rectTop / totalScroll : 0;
    progress = Math.min(Math.max(progress, 0), 1);
    const translateX = -progress * maxTranslate;
    track.style.transform = `translateX(${translateX}px)`;
    applyFocusEffect(containerWidth, translateX);
  }

  function updateMobile() {
    track.style.transform = "none";
    applyFocusEffect(track.clientWidth, -track.scrollLeft);
  }

  function update() {
    track.classList.toggle("is-scrollable", !usesPinMode());
    if (usesPinMode()) updateDesktop();
    else updateMobile();
  }

  function goToSlide(index) {
    const clamped = Math.min(Math.max(index, 0), slides.length - 1);
    const slide = slides[clamped];
    if (!slide) return;

    if (usesPinMode()) {
      const containerWidth = sticky.offsetWidth;
      const maxTranslate = Math.max(track.scrollWidth - containerWidth, 0);
      const desired = Math.min(
        Math.max(slide.offsetLeft + slide.offsetWidth / 2 - containerWidth / 2, 0),
        maxTranslate
      );
      const progress = maxTranslate > 0 ? desired / maxTranslate : 0;
      const totalScroll = pin.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: pin.offsetTop + progress * totalScroll,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    } else {
      slide.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }
    currentIndex = clamped;
  }

  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  function handleResize() {
    setPinHeight();
    requestUpdate();
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  track.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", handleResize);
  reducedMotion.addEventListener("change", handleResize);

  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  setPinHeight();
  update();
}

/* ---------- deck flip pengalaman ---------- */
function initDeckFlip() {
  const pin = document.getElementById("deckPin");
  const sticky = pin ? pin.querySelector(".deck-sticky") : null;
  const stage = document.getElementById("deckStage");
  const prevBtn = document.getElementById("deckPrev");
  const nextBtn = document.getElementById("deckNext");
  const dotsWrap = document.getElementById("deckDots");
  const status = document.getElementById("deckStatus");
  if (!pin || !sticky || !stage) return;

  const cards = Array.from(stage.children);
  const count = cards.length;
  if (!count) return;

  let currentIndex = 0;

  cards.forEach((card, i) => {
    card.style.zIndex = String(count - i);
  });

  const dots = [];
  if (dotsWrap) {
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "deck-dot";
      dot.setAttribute("aria-label", `Ke organisasi ${i + 1}`);
      dot.addEventListener("click", () => goToCard(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  function usesPinMode() {
    return desktopQuery.matches && !reducedMotion.matches && count > 1;
  }

  function updateControls() {
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === count - 1;
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === currentIndex));
    if (status) {
      const title = cards[currentIndex].querySelector("h3");
      status.textContent = `Organisasi ${currentIndex + 1} dari ${count}: ${
        title ? title.textContent : ""
      }`;
    }
  }

  function setPinHeight() {
    pin.style.height = usesPinMode() ? `${count * window.innerHeight}px` : "auto";
  }

  function updatePinned() {
    const totalScroll = pin.offsetHeight - window.innerHeight;
    const rectTop = pin.getBoundingClientRect().top;
    let progress = totalScroll > 0 ? -rectTop / totalScroll : 0;
    progress = Math.min(Math.max(progress, 0), 1);

    const raw = progress * (count - 1);
    const active = Math.min(Math.max(Math.floor(raw), 0), count - 2);
    const local = raw - active;

    cards.forEach((card, i) => {
      let rotation = 0;
      if (i < active) rotation = -180;
      else if (i === active) rotation = -180 * local;
      card.style.transform = `rotateY(${rotation}deg)`;
    });

    currentIndex = Math.min(Math.round(raw), count - 1);
    updateControls();
  }

  function update() {
    const flat = !usesPinMode();
    stage.classList.toggle("is-flat", flat);
    pin.classList.toggle("is-flat", flat);
    if (flat) {
      cards.forEach((card) => {
        card.style.transform = "";
      });
      updateControls();
    } else {
      updatePinned();
    }
  }

  function goToCard(index) {
    const clamped = Math.min(Math.max(index, 0), count - 1);
    if (usesPinMode()) {
      const totalScroll = pin.offsetHeight - window.innerHeight;
      const progress = count > 1 ? clamped / (count - 1) : 0;
      window.scrollTo({
        top: pin.offsetTop + progress * totalScroll,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }
    currentIndex = clamped;
    updateControls();
  }

  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  function handleResize() {
    setPinHeight();
    requestUpdate();
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", handleResize);
  reducedMotion.addEventListener("change", handleResize);

  if (prevBtn) prevBtn.addEventListener("click", () => goToCard(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goToCard(currentIndex + 1));

  setPinHeight();
  update();
}

/* ---------- init ---------- */
function init() {
  initThemeToggle();
  initLoader();
  initProgress();
  initCursor();
  initSplitText();
  initReveal();
  initMagnetic();
  initParallax();
  initMarquee();
  initNav();
  initMobileMenu();
  initPrestasiScroll();
  initDeckFlip();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
