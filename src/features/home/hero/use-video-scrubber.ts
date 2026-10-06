"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** Paused video controlled by pointer drag, keyboard and constant-speed idle rotation. */
export function useVideoScrubber({
  videoRef,
  heroRef,
  src,
  mobileSrc,
  enabled,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  heroRef: RefObject<HTMLElement | null>;
  src: string;
  mobileSrc?: string;
  enabled: boolean;
}) {
  const [ready, setReady] = useState(false);
  const enabledRef = useRef(enabled);
  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let frame = 0;
    let targetTime = 0;
    let renderedTime = 0;
    let duration = 0;
    let visible = true;
    let unlocked = false;
    let initialized = false;
    let dragging = false;
    let pointerId: number | null = null;
    let pointerX = 0;
    let stageWidth = 1;
    let direction = 1;
    let lastInput = 0;
    let previousFrame = 0;

    const measure = () => {
      stageWidth = hero.clientWidth;
    };
    const metadata = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      video.pause();
      measure();
      renderedTime = targetTime;
      initialized = false;
    };
    const drawable = () => {
      if (!active) return;
      clearTimeout(readyTimeout);
      setReady(true);
    };
    const unlock = () => {
      if (unlocked || !enabledRef.current) return;
      unlocked = true;
      void video
        .play()
        .then(() => {
          video.pause();
        })
        .catch(() => undefined);
      unlockEvents.forEach((event) =>
        window.removeEventListener(event, unlock),
      );
    };
    const unlockEvents = ["touchstart", "pointerdown", "keydown"] as const;
    const moveTime = (delta: number) => {
      targetTime = Math.min(
        Math.max(0, duration - 0.025),
        Math.max(0, targetTime + delta),
      );
      if (delta !== 0) direction = delta > 0 ? 1 : -1;
      lastInput = performance.now();
    };
    const pointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !enabledRef.current || duration <= 0) return;
      dragging = true;
      pointerId = event.pointerId;
      pointerX = event.clientX;
      lastInput = performance.now();
      hero.dataset.dragging = "true";
      hero.setPointerCapture(event.pointerId);
      if (event.pointerType === "mouse") event.preventDefault();
    };
    const pointerMove = (event: PointerEvent) => {
      if (!dragging || pointerId !== event.pointerId) return;
      moveTime(
        ((event.clientX - pointerX) / Math.max(1, stageWidth)) * duration,
      );
      pointerX = event.clientX;
    };
    const pointerEnd = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      dragging = false;
      pointerId = null;
      lastInput = Number.NEGATIVE_INFINITY;
      renderedTime = targetTime;
      delete hero.dataset.dragging;
      if (hero.hasPointerCapture(event.pointerId))
        hero.releasePointerCapture(event.pointerId);
    };
    const keyboard = (event: KeyboardEvent) => {
      if (
        !enabledRef.current ||
        !["ArrowLeft", "ArrowRight"].includes(event.key)
      )
        return;
      event.preventDefault();
      moveTime(event.key === "ArrowRight" ? 0.3 : -0.3);
    };
    const tick = (now: number) => {
      const elapsed = previousFrame
        ? Math.min(0.05, (now - previousFrame) / 1000)
        : 0;
      previousFrame = now;
      if (
        active &&
        enabledRef.current &&
        visible &&
        !document.hidden &&
        !document.body.classList.contains("is-menu-open")
      ) {
        // User-requested idle pendulum overrides the default paused-at-rest rule.
        // Pointer/keyboard take priority; page scrolling never changes video time.
        const idle =
          !dragging && !reducedMotion.matches && now - lastInput > 1200;
        if (idle) {
          const end = Math.max(0, duration - 0.025);
          targetTime += elapsed * direction;
          if (targetTime >= end) {
            targetTime = end;
            direction = -1;
          }
          if (targetTime <= 0) {
            targetTime = 0;
            direction = 1;
          }
        }
        const gap = targetTime - renderedTime;
        renderedTime +=
          gap * (dragging || idle || reducedMotion.matches ? 1 : 0.115);
        if (
          duration > 0 &&
          video.readyState >= 2 &&
          !video.seeking &&
          (!initialized || Math.abs(video.currentTime - renderedTime) > 0.0008)
        ) {
          try {
            video.currentTime = renderedTime;
            initialized = true;
          } catch {
            /* A transient decoder error is retried on the next frame. */
          }
        }
      }
      if (active) frame = requestAnimationFrame(tick);
    };

    const readyTimeout = window.setTimeout(drawable, 12000);
    video.addEventListener("loadedmetadata", metadata);
    video.addEventListener("loadeddata", drawable);
    video.addEventListener("canplay", drawable);
    video.addEventListener("error", drawable);
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    hero.addEventListener("pointerdown", pointerDown);
    hero.addEventListener("pointermove", pointerMove);
    hero.addEventListener("pointerup", pointerEnd);
    hero.addEventListener("pointercancel", pointerEnd);
    hero.addEventListener("lostpointercapture", pointerEnd);
    hero.addEventListener("keydown", keyboard);
    unlockEvents.forEach((event) =>
      window.addEventListener(event, unlock, { passive: true }),
    );
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(hero);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(hero);
    measure();
    // Local MP4: native preload/range requests avoid a second full Blob copy in memory.
    video.src = window.innerWidth <= 768 && mobileSrc ? mobileSrc : src;
    video.load();
    frame = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      clearTimeout(readyTimeout);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      video.pause();
      if (pointerId !== null && hero.hasPointerCapture(pointerId))
        hero.releasePointerCapture(pointerId);
      delete hero.dataset.dragging;
      hero.removeEventListener("pointerdown", pointerDown);
      hero.removeEventListener("pointermove", pointerMove);
      hero.removeEventListener("pointerup", pointerEnd);
      hero.removeEventListener("pointercancel", pointerEnd);
      hero.removeEventListener("lostpointercapture", pointerEnd);
      hero.removeEventListener("keydown", keyboard);
      video.removeEventListener("loadedmetadata", metadata);
      video.removeEventListener("loadeddata", drawable);
      video.removeEventListener("canplay", drawable);
      video.removeEventListener("error", drawable);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      unlockEvents.forEach((event) =>
        window.removeEventListener(event, unlock),
      );
      video.removeAttribute("src");
      video.load();
    };
  }, [heroRef, videoRef, src, mobileSrc]);

  return ready;
}
