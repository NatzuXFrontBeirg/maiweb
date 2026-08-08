import { Icon } from "./IconSprite.jsx";
import T from "./T.jsx";

export default function Footer() {
  return (
    <footer>
      <p className="foot-name">I Gede Wibhu Natha Abhiyoga</p>
      <T k="footer.text" as="p" />
      <p className="foot-privacy">
        <Icon id="i-shield" size={13} />
        <T k="footer.privacy" />
      </p>
    </footer>
  );
}
