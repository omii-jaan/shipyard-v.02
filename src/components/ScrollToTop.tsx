import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/components/SmoothScroll";

function forceScrollToTop() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    forceScrollToTop();
  }, [pathname]);

  return null;
}
