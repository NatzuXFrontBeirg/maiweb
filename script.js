function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const themeColorMeta = document.getElementById("themeColorMeta");
  if (!toggle) return;

  const themeColors = { dark: "#07111f", light: "#eef2f8" };

  function reflect(theme) {
    toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      theme === "light" ? "Ganti ke mode gelap" : "Ganti ke mode terang"
    );
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", themeColors[theme] || themeColors.dark);
    }
  }

  reflect(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    reflect(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });
}

function initPrestasiScroll() {
  const pin = document.getElementById("prestasiPin");
  const sticky = pin ? pin.querySelector(".scroll-sticky") : null;
  const track = document.getElementById("slideTrack");
  const prevBtn = document.getElementById("slidePrev");
  const nextBtn = document.getElementById("slideNext");
  const status = document.getElementById("slideStatus");
  if (!pin || !sticky || !track) return;

  const slides = Array.from(track.children);
  const desktopQuery = window.matchMedia("(min-width: 821px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let currentIndex = 0;

  function usesPinMode() {
    return desktopQuery.matches && !reducedMotionQuery.matches;
  }

  function applyFocusEffect(containerWidth, shiftX) {
    const centerX = containerWidth / 2;
    let closestIndex = 0;
    let closestDist = Infinity;

    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2 + shiftX;
      const distance = Math.abs(slideCenter - centerX);
      const norm = Math.min(distance / (slide.offsetWidth * 0.85), 1);
      slide.style.filter = `blur(${(norm * 6).toFixed(2)}px)`;
      slide.style.opacity = (1 - norm * 0.6).toFixed(2);
      slide.style.transform = `scale(${(1 - norm * 0.12).toFixed(3)})`;
      slide.classList.toggle("is-active", norm < 0.15);

      if (distance < closestDist) {
        closestDist = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== currentIndex) {
      currentIndex = closestIndex;
    }
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
    const containerWidth = sticky.offsetWidth;
    const maxTranslate = Math.max(track.scrollWidth - containerWidth, 0);
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
    if (usesPinMode()) {
      updateDesktop();
    } else {
      updateMobile();
    }
  }

  function goToSlide(index) {
    const clamped = Math.min(Math.max(index, 0), slides.length - 1);
    const slide = slides[clamped];
    if (!slide) return;

    if (usesPinMode()) {
      const containerWidth = sticky.offsetWidth;
      const maxTranslate = Math.max(track.scrollWidth - containerWidth, 0);
      const desiredTranslate = Math.min(
        Math.max(
          slide.offsetLeft + slide.offsetWidth / 2 - containerWidth / 2,
          0
        ),
        maxTranslate
      );
      const progress = maxTranslate > 0 ? desiredTranslate / maxTranslate : 0;
      const totalScroll = pin.offsetHeight - window.innerHeight;
      const targetY = pin.offsetTop + progress * totalScroll;
      window.scrollTo({
        top: targetY,
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
      });
    } else {
      slide.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
      });
    }
    currentIndex = clamped;
  }

  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
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
  reducedMotionQuery.addEventListener("change", handleResize);

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  }

  setPinHeight();
  update();
}

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
  if (count === 0) return;

  const desktopQuery = window.matchMedia("(min-width: 821px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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
    return desktopQuery.matches && !reducedMotionQuery.matches && count > 1;
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
    if (!usesPinMode()) {
      pin.style.height = "auto";
      return;
    }
    pin.style.height = `${count * window.innerHeight}px`;
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

    const newIndex = Math.min(Math.round(raw), count - 1);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
    }
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
      const targetY = pin.offsetTop + progress * totalScroll;
      window.scrollTo({
        top: targetY,
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
      });
    }
    currentIndex = clamped;
    updateControls();
  }

  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
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
  reducedMotionQuery.addEventListener("change", handleResize);

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToCard(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToCard(currentIndex + 1));
  }

  setPinHeight();
  update();
}

function init() {
  initThemeToggle();
  initPrestasiScroll();
  initDeckFlip();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
