"use client";

import { useLayoutEffect, useState, type RefObject } from "react";
import { usePathname } from "next/navigation";

// Sections opt in with data-header-theme. The hero keeps the existing white header.
export function useHeaderSurface(headerRef: RefObject<HTMLElement | null>) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightSurface, setIsLightSurface] = useState(
    () => pathname.endsWith("/product") || pathname.includes("/catalog"),
  );

  useLayoutEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>("[data-header-theme]"),
    ].reverse();
    let frame = 0;
    const render = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 24);
      const y = (headerRef.current?.getBoundingClientRect().height ?? 80) / 2;
      const active = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= y && rect.bottom > y;
      });
      setIsLightSurface(active?.dataset.headerTheme === "light");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headerRef, pathname]);

  return { isLightSurface, isScrolled };
}
