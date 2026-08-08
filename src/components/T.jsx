import { useAppState } from "../hooks/useAppState.jsx";

/**
 * Teks dari kamus i18n. Dirender lewat innerHTML karena beberapa entri
 * sengaja mengandung markup statis (<em>) atau entity (&amp;) — semua
 * nilainya kita tulis sendiri di data/i18n.js, bukan dari input pengguna.
 */
export default function T({ k, as: Tag = "span", className, ...rest }) {
  const { t } = useAppState();
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: t(k) }} {...rest} />;
}
