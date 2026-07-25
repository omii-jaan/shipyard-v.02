import { useEffect, useRef, useState } from "react";

export interface ScrollState {
  scrollY: number;
  velocity: number;
  progress: number;
}

export const useScrollVelocity = () => {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    velocity: 0,
    progress: 0,
  });
  const targetRef = useRef<ScrollState>({ scrollY: 0, velocity: 0, progress: 0 });
  const currentRef = useRef<ScrollState>({ scrollY: 0, velocity: 0, progress: 0 });
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let rafId = 0;

    const update = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime.current);
      lastTime.current = now;

      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const instantVelocity = (scrollY - lastScrollY.current) / dt * 16;
      lastScrollY.current = scrollY;

      targetRef.current = {
        scrollY,
        velocity: instantVelocity,
        progress: scrollY / maxScroll,
      };

      const cur = currentRef.current;
      cur.scrollY += (targetRef.current.scrollY - cur.scrollY) * 0.18;
      cur.velocity += (targetRef.current.velocity - cur.velocity) * 0.12;
      cur.progress += (targetRef.current.progress - cur.progress) * 0.18;

      setState({
        scrollY: cur.scrollY,
        velocity: cur.velocity,
        progress: cur.progress,
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return state;
};
