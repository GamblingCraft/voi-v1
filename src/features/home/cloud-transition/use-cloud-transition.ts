"use client";

import { useEffect, type RefObject } from "react";
import Lenis from "lenis";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export function useCloudTransition(sceneRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scene = sceneRef.current;
    const stage = scene?.querySelector<HTMLElement>("[data-cloud-stage]");
    if (!scene || !stage) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    // One scroll controller for the home page; video rotation has its own clock.
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
      allowNestedScroll: true,
      anchors: true,
      respectReducedMotion: true,
    });
    let frame = 0;
    const render = () => {
      frame = 0;
      if (document.body.classList.contains("is-menu-open")) return;
      const height = stage.clientHeight;
      const rawOffset = -scene.getBoundingClientRect().top;
      const scrolled = clamp(rawOffset, 0, scene.offsetHeight);
      scene.style.setProperty("--cloud-stage-offset", `${scrolled}px`);
      if (reducedMotion.matches) return;
      const viewportProgress = scrolled / height;
      const rearProgress = smoothstep(clamp(viewportProgress));
      const mistProgress = smoothstep(clamp((viewportProgress - 0.8) / 0.7));
      scene.style.setProperty(
        "--cloud-front-y",
        `${100 - viewportProgress * 90}%`,
      );
      scene.style.setProperty("--cloud-rear-y", `${rearProgress * 35}%`);
      scene.style.setProperty(
        "--cloud-mist-tilt",
        `${90 * (1 - mistProgress)}deg`,
      );
      scene.style.setProperty(
        "--cloud-mist-opacity",
        `${clamp((viewportProgress - 0.72) / 0.12)}`,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const syncLock = () => {
      const locked =
        document.body.classList.contains("is-menu-open") ||
        document.body.classList.contains("is-intro-active");
      if (locked) lenis.stop();
      else lenis.start();
      schedule();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    syncLock();
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      lenis.destroy();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, [sceneRef]);
}
