import { Icon } from "./IconSprite.jsx";
import T from "./T.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p className="foot-name">I Gede Wibhu Natha Abhiyoga</p>
      <p className="foot-copy">
        {"© "}
        {year} · <T k="footer.text" />
      </p>
      <p className="foot-privacy">
        <Icon id="i-shield" size={13} />
        <T k="footer.privacy" />
      </p>
    </footer>
  );
}
