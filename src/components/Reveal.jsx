import { useRef } from "react";
import { useInView } from "../hooks/useInView.js";

export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <Tag ref={ref} className={`reveal ${className} ${inView ? "is-visible" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}
