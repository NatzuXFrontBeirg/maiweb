/* Dijalankan blocking sebelum render agar tidak ada flash tema salah.
   Dipisah dari index.html supaya CSP script-src bisa 'self' saja,
   tanpa unsafe-inline. */
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}
  var theme =
    stored ||
    (window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark");
  document.documentElement.setAttribute("data-theme", theme);

  var lang = null;
  try {
    lang = localStorage.getItem("lang");
  } catch (e) {}
  document.documentElement.setAttribute("lang", lang === "en" ? "en" : "id");
})();
