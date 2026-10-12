import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
const fade = CustomEase.create("image-trail-fade", "0.25,0.46,0.45,0.9");
type Point = { x: number; y: number };

/** A bounded pool of frames; pointer sampling and animation lifetimes are independent. */
export function createImageTrail(section: HTMLElement) {
  const frames = [
    ...section.querySelectorAll<HTMLElement>("[data-trail-frame]"),
  ];
  const images = frames.map((frame) => frame.querySelector("img")!);
  if (!frames.length) return () => {};
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const compact = matchMedia(
    "(max-width: 1199px), (hover: none), (pointer: coarse)",
  );
  const timelines = new Map<HTMLElement, gsap.core.Timeline>();
  let pointer: Point | null = null;
  let previous: Point | null = null;
  let last: Point = { x: 0, y: 0 };
  let index = 0;
  let layer = 0;
  let visible = false;
  let state = "";
  let request = 0;
  let timer: ReturnType<typeof setInterval> | undefined;

  const blocked = () =>
    document.hidden ||
    document.body.classList.contains("is-menu-open") ||
    document.body.classList.contains("is-home-arriving");
  const stopSampling = () => {
    cancelAnimationFrame(request);
    request = 0;
    pointer = previous = null;
  };
  const clear = () => {
    stopSampling();
    clearInterval(timer);
    timelines.forEach((timeline) => timeline.kill());
    timelines.clear();
    gsap.killTweensOf([...frames, ...images]);
    gsap.set(frames, {
      clearProps: "transform,translate,rotate,scale,opacity,clipPath,zIndex",
    });
    gsap.set(images, { clearProps: "transform,translate,rotate,scale" });
    layer = 0;
    last = { x: 0, y: 0 };
  };
  const cycle = () => {
    const next = (index + 1) % frames.length;
    if (!images[next].complete || !images[next].naturalWidth) return;
    gsap.to(frames[index], { opacity: 0, duration: 0.4, ease: fade });
    gsap.to(frames[next], { opacity: 1, duration: 0.4, ease: fade });
    index = next;
  };
  const sync = () => {
    const nextState = `${visible}:${blocked()}:${reduced.matches}:${compact.matches}`;
    if (state === nextState) return;
    state = nextState;
    clear();
    if (!visible || blocked() || reduced.matches) return;
    if (compact.matches) {
      gsap.set(frames, { opacity: 0 });
      gsap.set(frames[index], { opacity: 1 });
      gsap.fromTo(
        frames[index],
        { clipPath: "inset(50% 50% round var(--trail-radius))" },
        {
          clipPath: "inset(0% 0% round var(--trail-radius))",
          duration: 0.7,
          ease: "expo.out",
        },
      );
      gsap.fromTo(
        images,
        { scale: 0.75 },
        { scale: 1, duration: 0.7, ease: "expo.out" },
      );
      timer = setInterval(cycle, 1200);
    }
  };
  const show = (point: Point, start: Point) => {
    const frame = frames[index];
    const image = images[index];
    // Keep the sequence intact without interrupting a still-visible frame.
    if (timelines.has(frame) || !image.complete || !image.naturalWidth) return;
    gsap.killTweensOf([frame, image]);
    const width = frame.offsetWidth;
    const height = frame.offsetHeight;
    const timeline = gsap.timeline({
      onComplete: () => {
        timelines.delete(frame);
        if (!timelines.size) layer = 0;
      },
    });
    timelines.set(frame, timeline);
    timeline
      .set(frame, {
        opacity: 1,
        clipPath: `inset(${height / 2}px ${width / 2}px round var(--trail-radius))`,
        x: start.x - width / 2,
        y: start.y - height / 2,
        zIndex: ++layer,
      })
      .set(image, { scale: 0.75 })
      .to(
        frame,
        {
          x: point.x - width / 2,
          y: point.y - height / 2,
          duration: 1.2,
          ease: "expo.out",
        },
        0,
      )
      .to(
        frame,
        {
          clipPath: "inset(0px 0px round var(--trail-radius))",
          duration: 0.7,
          ease: "expo.out",
        },
        0,
      )
      .to(image, { scale: 1, duration: 0.7, ease: "expo.out" }, 0)
      .to(frame, { opacity: 0, duration: 0.2, ease: fade }, 1.2);
    index = (index + 1) % frames.length;
    last = point;
  };
  const tick = () => {
    request = 0;
    if (!pointer || !visible || blocked() || reduced.matches || compact.matches)
      return;
    const bounds = section.getBoundingClientRect();
    const point = { x: pointer.x - bounds.left, y: pointer.y - bounds.top };
    previous ??= { ...point };
    previous.x += (point.x - previous.x) * 0.1;
    previous.y += (point.y - previous.y) * 0.1;
    // The spacing follows the same viewport unit as the square frame size.
    if (
      Math.hypot(point.x - last.x, point.y - last.y) >
      (innerWidth * 150) / 1440
    )
      show(point, previous);
    if (Math.hypot(point.x - previous.x, point.y - previous.y) > 0.1)
      request = requestAnimationFrame(tick);
  };
  const schedule = () => {
    if (!request && pointer) request = requestAnimationFrame(tick);
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch" || compact.matches || reduced.matches)
      return;
    pointer = { x: event.clientX, y: event.clientY };
    schedule();
  };
  const resize = () => {
    state = "";
    sync();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(section);
  const menu = new MutationObserver(sync);
  menu.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  section.addEventListener("pointermove", move, { passive: true });
  section.addEventListener("pointerleave", stopSampling);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  compact.addEventListener("change", sync);
  return () => {
    clear();
    observer.disconnect();
    menu.disconnect();
    section.removeEventListener("pointermove", move);
    section.removeEventListener("pointerleave", stopSampling);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", sync);
    reduced.removeEventListener("change", sync);
    compact.removeEventListener("change", sync);
  };
}
