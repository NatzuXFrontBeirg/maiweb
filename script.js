/* ============================================================
   Portofolio — interaksi
   Tanpa scroll-hijack: semua seksi mengalir normal.
   ============================================================ */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopQuery = window.matchMedia("(min-width: 821px)");

/* ============================================================
   i18n — dua bahasa, tanpa reload halaman
   ============================================================ */
const I18N = {
  skip: {
    id: "Lewati ke konten utama",
    en: "Skip to main content",
  },
  "nav.about": { id: "Tentang", en: "About" },
  "nav.pengalaman": { id: "Pengalaman", en: "Experience" },
  "nav.prestasi": { id: "Prestasi", en: "Achievements" },
  "nav.contact": { id: "Kontak", en: "Contact" },

  "hero.eyebrow": {
    id: "Portofolio &amp; Pengalaman Organisasi",
    en: "Portfolio &amp; Organizational Experience",
  },
  "hero.h1": { id: "Halo, saya <em>Abhi.</em>", en: "Hi, I&rsquo;m <em>Abhi.</em>" },
  "hero.chip1": { id: "Teknologi Kedokteran ITS", en: "Medical Technology, ITS" },
  "hero.chip2": { id: "Koordinator Sarpras", en: "Facilities Coordinator" },
  "hero.lead": {
    id: "Mahasiswa tahun pertama Teknologi Kedokteran di Institut Teknologi Sepuluh Nopember yang aktif, teliti, dan terbiasa bekerja di lapangan. Dua kali menjabat Koordinator Divisi Sarana dan Prasarana pada acara berskala provinsi — merencanakan kebutuhan, mengelola inventaris, mensurvei lokasi, mengoordinasi vendor, dan menangani kendala logistik di bawah tekanan acara.",
    en: "First-year Medical Technology student at Institut Teknologi Sepuluh Nopember — active, detail-oriented, and used to working on the ground. Twice served as Facilities &amp; Logistics Coordinator for province-scale events: planning requirements, managing inventory, surveying venues, coordinating vendors, and handling logistics issues under event pressure.",
  },
  "hero.btnExp": { id: "Lihat Pengalaman", en: "View Experience" },
  "hero.btnPdf": { id: "Simpan PDF", en: "Save as PDF" },
  "hero.stat1": { id: "Organisasi &amp; kepanitiaan", en: "Organizations &amp; committees" },
  "hero.stat2": { id: "Koordinator Sarpras", en: "Facilities Coordinator roles" },
  "hero.stat3": { id: "Kompetisi diikuti", en: "Competitions entered" },
  "hero.stat4": { id: "Kali juara / finalis", en: "Wins / finalist placements" },

  "profile.role": { id: "Logistik &amp; Sarana Prasarana", en: "Logistics &amp; Facilities" },
  "profile.status": { id: "Terbuka untuk kolaborasi kepanitiaan", en: "Open to committee collaborations" },
  "profile.label": { id: "Yang saya kuasai", en: "What I bring" },
  "profile.skill1": { id: "Manajemen logistik &amp; inventaris acara", en: "Event logistics &amp; inventory management" },
  "profile.skill2": { id: "Koordinasi tim lintas divisi", en: "Cross-division team coordination" },
  "profile.skill3": { id: "Problem-solving cepat di lapangan", en: "Fast on-site problem-solving" },

  "marquee.1": { id: "Manajemen Logistik", en: "Logistics Management" },
  "marquee.2": { id: "Perencanaan Pengadaan", en: "Procurement Planning" },
  "marquee.3": { id: "Koordinasi Tim", en: "Team Coordination" },
  "marquee.4": { id: "Problem Solving", en: "Problem Solving" },
  "marquee.5": { id: "Manajemen Waktu", en: "Time Management" },
  "marquee.6": { id: "Fotografi &amp; Videografi", en: "Photography &amp; Videography" },

  "about.eyebrow": { id: "Tentang Saya", en: "About Me" },
  "about.h2": { id: "Siap turun tangan langsung di lapangan", en: "Ready to work hands-on in the field" },
  "about.leadP": {
    id: "Saya percaya setiap acara berjalan lancar karena perencanaan yang matang dan kesiapan menghadapi kendala di lokasi.",
    en: "I believe every event runs smoothly because of solid planning and readiness to handle on-site issues.",
  },
  "about.p1": {
    id: "Dengan pendekatan yang teliti dan terbiasa bekerja langsung di lapangan, saya memastikan setiap kebutuhan perlengkapan dan logistik terpenuhi tepat waktu — dari survei awal, negosiasi vendor, sampai eksekusi di hari-H.",
    en: "With a meticulous, hands-on approach, I make sure every equipment and logistics need is met on time — from the initial site survey and vendor negotiation through to execution on event day.",
  },
  "about.eduLabel": { id: "Pendidikan", en: "Education" },
  "about.edu1": { id: "Teknologi Kedokteran · Surabaya", en: "Medical Technology · Surabaya" },
  "about.skillsLabel": { id: "Keahlian", en: "Skills" },

  "skill.1": { id: "Manajemen Logistik &amp; Inventaris", en: "Logistics &amp; Inventory Management" },
  "skill.2": { id: "Perencanaan &amp; Penjadwalan Pengadaan", en: "Procurement Planning &amp; Scheduling" },
  "skill.3": { id: "Koordinasi Tim", en: "Team Coordination" },
  "skill.4": { id: "Problem-Solving", en: "Problem-Solving" },
  "skill.5": { id: "Manajemen Waktu", en: "Time Management" },
  "skill.6": { id: "Fotografi &amp; Videografi", en: "Photography &amp; Videography" },

  "exp.h2": { id: "Organisasi &amp; kepanitiaan yang saya jalani", en: "Organizations &amp; committees I&rsquo;ve been part of" },
  "exp.date1": { id: "Mei 2026", en: "May 2026" },
  "exp.date2": { id: "Des 2024", en: "Dec 2024" },
  "exp.date3": { id: "Okt 2024", en: "Oct 2024" },
  "exp.date4": { id: "Agu 2023 – Mar 2025", en: "Aug 2023 – Mar 2025" },
  "exp.title1": { id: "Divisi Perlengkapan", en: "Equipment Division" },
  "exp.title2": { id: "Koordinator Sarana &amp; Prasarana", en: "Facilities &amp; Logistics Coordinator" },
  "exp.title4": { id: "Divisi Digital, Media &amp; Komunikasi", en: "Digital, Media &amp; Communications Division" },
  "exp.badge": { id: "Koordinator", en: "Coordinator" },
  "exp.desc1": {
    id: "Menyiapkan, menata, dan mengelola perlengkapan acara, serta merespons kebutuhan teknis secara cepat selama kegiatan berlangsung.",
    en: "Prepared, arranged, and managed event equipment, and responded quickly to technical needs while the event was running.",
  },
  "exp.desc2": {
    id: "Menyusun kebutuhan fasilitas pelatihan, mengelola aset kegiatan, dan menangani kendala logistik mendadak di lokasi.",
    en: "Planned training facility requirements, managed event assets, and handled sudden on-site logistics issues.",
  },
  "exp.desc3": {
    id: "Merencanakan kebutuhan perlengkapan lintas divisi, mengelola inventaris aset, dan menjadi penghubung utama dengan vendor eksternal.",
    en: "Planned cross-division equipment needs, managed asset inventory, and served as the main point of contact with external vendors.",
  },
  "exp.desc4": {
    id: "Memproduksi konten digital dan mendokumentasikan kegiatan organisasi riset ilmiah siswa melalui foto dan video.",
    en: "Produced digital content and documented a student scientific-research organization's activities through photo and video.",
  },
  "exp.tag1a": { id: "Equipment", en: "Equipment" },
  "exp.tag1b": { id: "Eksekusi Lapangan", en: "Field Execution" },
  "exp.tag2a": { id: "Fasilitas", en: "Facilities" },
  "exp.tag2b": { id: "Aset", en: "Assets" },
  "exp.tag2c": { id: "Troubleshooting", en: "Troubleshooting" },
  "exp.tag3a": { id: "Vendor", en: "Vendors" },
  "exp.tag3b": { id: "Inventaris", en: "Inventory" },
  "exp.tag3c": { id: "Lintas Divisi", en: "Cross-Division" },
  "exp.tag4a": { id: "Konten", en: "Content" },
  "exp.tag4b": { id: "Dokumentasi", en: "Documentation" },

  "ach.eyebrow": { id: "Prestasi &amp; Kompetisi", en: "Achievements &amp; Competitions" },
  "ach.h2": { id: "Beberapa pencapaian yang pernah saya raih", en: "A few achievements along the way" },
  "ach.rank1": { id: "Medali Emas", en: "Gold Medal" },
  "ach.rank2": { id: "Juara Harapan I", en: "1st Honorable Mention" },
  "ach.rank4": { id: "Finalis", en: "Finalist" },
  "ach.rank5": { id: "Peserta", en: "Participant" },

  "filter.all": { id: "Semua", en: "All" },
  "filter.national": { id: "Nasional", en: "National" },
  "filter.regional": { id: "Regional", en: "Regional" },

  "contact.eyebrow": { id: "Kontak", en: "Contact" },
  "contact.h2": { id: "Yuk, <em>bekerja sama.</em>", en: "Let&rsquo;s <em>work together.</em>" },
  "contact.lead": {
    id: "Tertarik mengajak saya bergabung dalam kepanitiaan atau ingin berdiskusi lebih lanjut? Silakan hubungi saya.",
    en: "Interested in inviting me to join a committee, or want to talk further? Feel free to reach out.",
  },
  "contact.btnWa": { id: "Chat WhatsApp", en: "Chat on WhatsApp" },
  "contact.btnMail": { id: "Kirim Email", en: "Send Email" },

  "form.label": { id: "Atau tulis pesan langsung", en: "Or write a message directly" },
  "form.name": { id: "Nama", en: "Name" },
  "form.subject": { id: "Subjek", en: "Subject" },
  "form.message": { id: "Pesan", en: "Message" },
  "form.hint": {
    id: "Tombol di bawah akan membuka aplikasi email kamu dengan pesan ini sudah terisi — tidak ada data yang disimpan di server mana pun.",
    en: "The button below opens your email app with this message pre-filled — no data is stored on any server.",
  },
  "form.submit": { id: "Kirim via Email", en: "Send via Email" },
  "form.errorRequired": {
    id: "Isi nama, subjek, dan pesan dulu ya.",
    en: "Please fill in name, subject, and message first.",
  },

  "footer.text": {
    id: "© 2026 · Dibuat dengan semangat belajar dan berkembang.",
    en: "© 2026 · Built with a drive to keep learning and growing.",
  },
  "footer.privacy": {
    id: "Tidak ada cookie pelacak atau analitik pihak ketiga di situs ini.",
    en: "No tracking cookies or third-party analytics on this site.",
  },

  "aria.themeLight": { id: "Ganti ke mode terang", en: "Switch to light mode" },
  "aria.themeDark": { id: "Ganti ke mode gelap", en: "Switch to dark mode" },
  "aria.menuOpen": { id: "Buka menu", en: "Open menu" },
  "aria.menuClose": { id: "Tutup menu", en: "Close menu" },
  "aria.toTop": { id: "Kembali ke atas", en: "Back to top" },
  "aria.langToId": { id: "Ganti ke Bahasa Indonesia", en: "Switch to Bahasa Indonesia" },
  "aria.langToEn": { id: "Switch to English", en: "Switch to English" },

  "toast.copied": { id: "Email disalin ✓", en: "Email copied ✓" },
  "toast.copyFail": { id: "Gagal menyalin — salin manual ya", en: "Couldn't copy — please copy it manually" },
  "toast.print": { id: "Pilih “Save as PDF” di dialog cetak", en: "Choose “Save as PDF” in the print dialog" },
  "toast.mailOpened": { id: "Membuka aplikasi email…", en: "Opening your email app…" },
};

function currentLang() {
  return document.documentElement.getAttribute("lang") === "en" ? "en" : "id";
}

function t(key) {
  const entry = I18N[key];
  if (!entry) return "";
  return entry[currentLang()] || entry.id || "";
}

function applyLang(lang) {
  document.documentElement.setAttribute("lang", lang);
  try {
    localStorage.setItem("lang", lang);
  } catch (e) {}

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const entry = I18N[key];
    if (!entry) return;
    el.innerHTML = entry[lang] || entry.id;
  });

  const label = document.getElementById("langLabel");
  const langBtn = document.getElementById("langToggle");
  if (label) label.textContent = lang === "en" ? "ID" : "EN";
  if (langBtn) {
    langBtn.setAttribute(
      "aria-label",
      lang === "en" ? t("aria.langToId") : t("aria.langToEn")
    );
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    themeToggle.setAttribute("aria-label", isLight ? t("aria.themeDark") : t("aria.themeLight"));
  }

  const toTop = document.getElementById("toTop");
  if (toTop) toTop.setAttribute("aria-label", t("aria.toTop"));

  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", open ? t("aria.menuClose") : t("aria.menuOpen"));
  }

  document.title =
    lang === "en"
      ? "I Gede Wibhu Natha Abhiyoga — Portfolio"
      : "I Gede Wibhu Natha Abhiyoga — Portofolio";
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      "content",
      lang === "en"
        ? "Portfolio of I Gede Wibhu Natha Abhiyoga — Medical Technology student at ITS, facilities & logistics coordinator, and national science-competition participant."
        : "Portofolio I Gede Wibhu Natha Abhiyoga — mahasiswa Teknologi Kedokteran ITS, koordinator sarana & prasarana, dan pegiat kompetisi ilmiah nasional."
    );
  }

  refreshFilterStatus();
}

function initLangToggle() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;
  applyLang(currentLang());
  btn.addEventListener("click", () => {
    applyLang(currentLang() === "en" ? "id" : "en");
    // re-split judul yang sudah pernah tampil agar animasi kata tetap rapi
    document.querySelectorAll(".split.is-visible").forEach((el) => splitEl(el));
  });
}

/* ---------- tema ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const meta = document.getElementById("themeColorMeta");
  if (!toggle) return;

  const colors = { dark: "#05070d", light: "#f6f7fa" };

  function reflect(theme) {
    toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    toggle.setAttribute("aria-label", theme === "light" ? t("aria.themeDark") : t("aria.themeLight"));
    if (meta) meta.setAttribute("content", colors[theme] || colors.dark);
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

/* ---------- toast ---------- */
let toastTimer = null;
function showToast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-on"), 2400);
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
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" })
    );
  }
}

/* ---------- split text ---------- */
function initSplitText() {
  document.querySelectorAll(".split").forEach((el) => {
    splitEl(el);
  });
}

function splitEl(el) {
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
  // Jika parent sudah pernah "is-in" (mis. reveal sebelumnya, atau ganti
  // bahasa), kata-kata baru langsung kelihatan lewat selector CSS
  // `.split.is-in .word > span` tanpa perlu animasi ulang.
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
      entries.forEach((entry) => entry.target.classList.toggle("is-on", entry.isIntersecting));
    },
    { threshold: 0.4, rootMargin: "-15% 0px -25% 0px" }
  );

  rows.forEach((row) => observer.observe(row));
}

/* ---------- filter prestasi ---------- */
let currentFilter = "all";

function refreshFilterStatus() {
  const grid = document.getElementById("achGrid");
  const status = document.getElementById("filterStatus");
  if (!grid || !status) return;
  const shown = grid.querySelectorAll(".ach:not(.is-hidden)").length;
  const lang = currentLang();
  if (lang === "en") {
    status.textContent =
      currentFilter === "all"
        ? `Showing all ${shown} achievements.`
        : `Showing ${shown} ${currentFilter === "nasional" ? "national" : "regional"} achievements.`;
  } else {
    status.textContent =
      currentFilter === "all"
        ? `Menampilkan ${shown} prestasi.`
        : `Menampilkan ${shown} prestasi tingkat ${currentFilter}.`;
  }
}

function initFilters() {
  const wrap = document.getElementById("filters");
  const grid = document.getElementById("achGrid");
  if (!wrap || !grid) return;

  const buttons = Array.from(wrap.querySelectorAll(".filter"));
  const cards = Array.from(grid.querySelectorAll(".ach"));

  function apply(filter) {
    currentFilter = filter;
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.level === filter;
      card.classList.toggle("is-hidden", !match);
    });

    buttons.forEach((btn) => {
      const on = btn.dataset.filter === filter;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    refreshFilterStatus();
  }

  buttons.forEach((btn) => btn.addEventListener("click", () => apply(btn.dataset.filter)));
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
      showToast(t("toast.copied"));
      setTimeout(() => btn.classList.remove("is-done"), 2000);
    } else {
      showToast(t("toast.copyFail"));
    }
  });
}

/* ---------- form kontak -> mailto (tanpa backend, tanpa penyimpanan data) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

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
      "mailto:nathaabhiyoga@gmail.com" +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    showToast(t("toast.mailOpened"));
    window.location.href = mailto;
  });
}

/* ---------- simpan PDF ---------- */
function initPrint() {
  const btn = document.getElementById("printBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    showToast(t("toast.print"));
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
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  function onScroll() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 10);

    let currentIndex = -1;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) currentIndex = i;
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
    toggle.setAttribute("aria-label", open ? t("aria.menuClose") : t("aria.menuOpen"));
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
  initLangToggle();
  initProgress();
  initSplitText();
  initReveal();
  initTimeline();
  initFilters();
  initCopy();
  initContactForm();
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
