import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const scrollToTop = () => window.scrollTo(0, 0);
    scrollToTop();
    requestAnimationFrame(scrollToTop);
    setTimeout(scrollToTop, 50);
  }, []);

  return null;
}
