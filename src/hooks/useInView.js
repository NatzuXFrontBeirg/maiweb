import { useEffect, useState } from "react";

const reducedMotionQuery =
  typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

export function prefersReducedMotion() {
  return reducedMotionQuery ? reducedMotionQuery.matches : false;
}

/**
 * Menyorot elemen begitu masuk viewport lewat class, bukan animasi
 * kompleks di JS — CSS transition di styles.css yang menangani
 * gerakannya (dan otomatis dimatikan di bawah prefers-reduced-motion).
 */
export function useInView(ref, { threshold = 0.18, rootMargin = "0px", once = true } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (once) {
            if (entry.isIntersecting) {
              setInView(true);
              observer.unobserve(el);
            }
          } else {
            setInView(entry.isIntersecting);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}
