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
  const syncPlaybackRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    enabledRef.current = enabled;
    syncPlaybackRef.current?.();
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
    let covered = false;
    let unlocked = false;
    let initialized = false;
    let dragging = false;
    let pointerId: number | null = null;
    let pointerX = 0;
    let stageWidth = 1;
    let lastInput = 0;
    let previousFrame = 0;
    let objectUrl: string | undefined;
    let readyTimeout: number | undefined;
    const preloadController = new AbortController();
    const preloadTimeout = window.setTimeout(
      () => preloadController.abort(),
      15000,
    );

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
      const end = Math.max(0, duration - 0.025);
      // The clip is a loop: manual input wraps across either boundary too.
      targetTime = end > 0 ? (((targetTime + delta) % end) + end) % end : 0;
      lastInput = performance.now();
      syncPlayback();
    };
    const pointerDown = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("button"))
        return;
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
      if (event.target instanceof Element && event.target.closest("button"))
        return;
      if (
        !enabledRef.current ||
        !["ArrowLeft", "ArrowRight"].includes(event.key)
      )
        return;
      event.preventDefault();
      moveTime(event.key === "ArrowRight" ? 0.3 : -0.3);
    };
    const canAnimate = () =>
      active &&
      enabledRef.current &&
      visible &&
      !covered &&
      !document.hidden &&
      !document.body.classList.contains("is-menu-open");
    const syncPlayback = () => {
      if (canAnimate()) {
        if (!frame) frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        previousFrame = 0;
        video.pause();
      }
    };
    syncPlaybackRef.current = syncPlayback;
    const tick = (now: number) => {
      frame = 0;
      if (!canAnimate()) {
        previousFrame = 0;
        return;
      }
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
        // Default counterclockwise rotation follows the source timeline backwards.
        // Pointer/keyboard take priority; page scrolling never changes video time.
        const idle =
          !dragging && !reducedMotion.matches && now - lastInput > 1200;
        if (idle) {
          const end = Math.max(0, duration - 0.025);
          targetTime =
            end > 0 ? (((targetTime - elapsed) % end) + end) % end : 0;
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
      if (canAnimate()) frame = requestAnimationFrame(tick);
    };

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
      syncPlayback();
    });
    visibilityObserver.observe(hero);
    // A sticky hero can still intersect the viewport while the next section covers it.
    const following = document.querySelector("[data-hero-following]");
    const coverObserver = new IntersectionObserver(
      ([entry]) => {
        covered = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: "0px 0px -99% 0px" },
    );
    if (following) coverObserver.observe(following);
    const menuObserver = new MutationObserver(syncPlayback);
    menuObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    document.addEventListener("visibilitychange", syncPlayback);
    measure();
    const selectedSrc = window.innerWidth <= 768 && mobileSrc ? mobileSrc : src;
    // Buffer before random seeks, with a bounded direct-URL fallback (§10 of the scrub rules).
    const attach = (url: string) => {
      if (!active) return;
      readyTimeout = window.setTimeout(drawable, 12000);
      video.src = url;
      video.load();
    };
    void (async () => {
      try {
        const response = await fetch(selectedSrc, {
          signal: preloadController.signal,
        });
        if (!response.ok) throw new Error("Video preload failed");
        const blob = await response.blob();
        if (!active) return;
        objectUrl = URL.createObjectURL(blob);
        attach(objectUrl);
      } catch {
        attach(selectedSrc);
      } finally {
        clearTimeout(preloadTimeout);
      }
    })();
    syncPlayback();

    return () => {
      active = false;
      syncPlaybackRef.current = null;
      cancelAnimationFrame(frame);
      preloadController.abort();
      clearTimeout(preloadTimeout);
      clearTimeout(readyTimeout);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      coverObserver.disconnect();
      menuObserver.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
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
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [heroRef, videoRef, src, mobileSrc]);

  return ready;
}
