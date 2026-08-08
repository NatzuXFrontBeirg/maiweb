import { useRef } from "react";
import { useInView } from "../hooks/useInView.js";
import { useCountUp } from "../hooks/useCountUp.js";
import T from "./T.jsx";

export default function StatCounter({ target, suffix = "", labelKey }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const display = useCountUp(target, suffix, inView);

  return (
    <div className="stat" ref={ref}>
      <strong>{display}</strong>
      <T k={labelKey} />
    </div>
  );
}
