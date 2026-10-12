import { useEffect, type RefObject } from "react";

export function useImageTrail(
  root: RefObject<HTMLElement | null>,
  media: readonly string[],
) {
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.allSettled(
      [...section.querySelectorAll("img")].map((image) => image.decode()),
    );
    void import("@/lib/motion/image-trail").then(({ createImageTrail }) => {
      if (!disposed) cleanup = createImageTrail(section);
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [root, media]);
}
