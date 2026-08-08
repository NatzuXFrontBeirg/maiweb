import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./useInView.js";

export function useCountUp(target, suffix = "", inView) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    const duration = 1300;
    const start = performance.now();
    let raf;

    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return `${value}${suffix}`;
}
