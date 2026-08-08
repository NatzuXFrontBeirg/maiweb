import { Fragment } from "react";
import T from "./T.jsx";

const ITEMS = ["marquee.1", "marquee.2", "marquee.3", "marquee.4", "marquee.5", "marquee.6"];

export default function Marquee() {
  // digandakan sekali supaya animasi scroll-nya mulus tanpa jeda
  const items = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((key, i) => (
          <Fragment key={i}>
            <T k={key} as="span" />
            <i>✳</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
