export type OpeningLayout = {
  size: number;
  firstWidth: number;
  secondWidth: number;
  side: number;
  centre: number;
  half: number;
  height: number;
  top: number;
  firstLeft: number;
  secondLeft: number;
  mediaAspect: number;
};

export type OpeningElements = {
  media: HTMLDivElement;
  video: HTMLVideoElement;
  words: Array<HTMLParagraphElement | null>;
  letters: Array<Array<HTMLSpanElement | null>>;
  shots: Array<HTMLImageElement | null>;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));

const range = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

const smooth = (value: number) => value * value * (3 - 2 * value);

const mix = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

const expoInOut = (progress: number) => {
  if (progress <= 0) return 0;
  if (progress >= 1) return 1;
  return progress < 0.5
    ? Math.pow(2, 20 * progress - 10) / 2
    : (2 - Math.pow(2, -20 * progress + 10)) / 2;
};

export function measureOpening(
  iceWord: HTMLParagraphElement,
  elementWord: HTMLParagraphElement,
  video: HTMLVideoElement,
  iceText: string,
): OpeningLayout | null {
  const size = window.innerWidth;
  const firstWidth = iceWord.offsetWidth;
  const secondWidth = elementWord.offsetWidth;
  const wordStyle = getComputedStyle(iceWord);
  const fontSize = Number.parseFloat(wordStyle.fontSize);
  const lineHeight = Number.parseFloat(wordStyle.lineHeight) || fontSize;
  const context = document.createElement("canvas").getContext("2d");
  if (!context) return null;

  context.font = `${wordStyle.fontWeight} ${fontSize}px ${wordStyle.fontFamily}`;
  const glyph = context.measureText(iceText);
  const ascent = glyph.fontBoundingBoxAscent || fontSize * 0.8;
  const descent = glyph.fontBoundingBoxDescent || fontSize * 0.2;
  const height = glyph.actualBoundingBoxAscent + glyph.actualBoundingBoxDescent;
  const top =
    iceWord.offsetTop +
    (lineHeight - ascent - descent) / 2 +
    ascent -
    glyph.actualBoundingBoxAscent;
  const side = size < 768 ? 0.06 : 0.15;
  const left = side * size + firstWidth + size * 0.015;
  const right = (1 - side) * size - secondWidth - size * 0.015;
  const mediaAspect =
    video.videoWidth / Math.max(1, video.videoHeight) || 16 / 9;
  const half = Math.min(
    Math.max(12, (right - left) / 2),
    (height * mediaAspect) / 2,
  );
  const centre = (left + right) / 2;
  const gap = size * 0.008;

  return {
    size,
    firstWidth,
    secondWidth,
    side,
    centre,
    half,
    height,
    top,
    firstLeft: centre - half - gap - firstWidth,
    secondLeft: centre + half + gap,
    mediaAspect,
  };
}

export function renderOpeningFrame(
  elements: OpeningElements,
  layout: OpeningLayout,
  introSeconds: number,
  reduceMotion: boolean,
): boolean {
  const time = Math.max(0, introSeconds - 0.9);
  const spread = expoInOut(range(time, 0.7, 2.1));
  const expand = expoInOut(range(time, 3.1, 4.5));

  if (reduceMotion || time >= 4.5) return true;

  const {
    size,
    firstWidth,
    secondWidth,
    side,
    centre,
    half,
    height,
    top,
    firstLeft,
    secondLeft,
    mediaAspect,
  } = layout;
  const previewWidth = mix(half * 2, window.innerWidth, expand);
  const previewHeight = mix(height, window.innerHeight, expand);
  const mediaX = mix(centre - half, 0, expand);
  const mediaY = mix(top, 0, expand);

  elements.media.style.transform = `translate3d(${mediaX}px, ${mediaY}px, 0)`;
  elements.media.style.width = `${previewWidth}px`;
  elements.media.style.height = `${previewHeight}px`;
  elements.media.style.borderRadius = `${10 * (1 - expand)}px`;
  elements.media.style.clipPath = `inset(0 ${(1 - spread) * 50}%)`;
  elements.media.style.opacity = String(smooth(range(time, 1.1, 1.5)));

  const fitWidth = Math.min(previewWidth, previewHeight * mediaAspect);
  const fitHeight = fitWidth / mediaAspect;
  const coverScale = Math.max(
    previewWidth / fitWidth,
    previewHeight / fitHeight,
  );
  elements.video.style.transform = `translateZ(0) scale(${mix(1, coverScale, expand)})`;

  const shotsAreVisible = time >= 0.7 && time < 2.7;
  const activeShotIndex = shotsAreVisible
    ? Math.floor((time - 0.7) / 0.333) % elements.shots.length
    : -1;

  elements.shots.forEach((image, index) => {
    if (!image) return;
    image.style.display = index === activeShotIndex ? "block" : "none";
  });

  elements.words.forEach((word, wordIndex) => {
    if (!word) return;
    const combined = firstWidth + secondWidth + size * 0.025;
    const startLeft = (size - combined) / 2;
    const base =
      wordIndex === 1 ? side * size : (1 - side) * size - secondWidth;
    const start =
      wordIndex === 1 ? startLeft : startLeft + firstWidth + size * 0.025;
    const end = wordIndex === 1 ? firstLeft : secondLeft;

    word.style.transform =
      wordIndex === 0
        ? "translateX(-50%)"
        : `translateX(${mix(start, end, spread) - base}px)`;
    word.style.opacity = "1";

    elements.letters[wordIndex]?.forEach((letter, letterIndex) => {
      if (!letter) return;
      const progress = range(
        time - 0.2 - wordIndex * 0.2 - letterIndex * 0.03125,
        0,
        0.8,
      );
      const rotation =
        90 * Math.pow(2, -10 * progress) * (progress < 1 ? 1 : 0);
      letter.style.transform = `rotateX(${rotation}deg)`;
      letter.style.opacity = String(
        smooth(
          range(time - 0.2 - wordIndex * 0.2 - letterIndex * 0.03125, 0, 0.4),
        ),
      );
    });
  });

  return false;
}

export function advanceLoaderSpring(
  spring: number,
  velocity: number,
  target: number,
  deltaSeconds: number,
) {
  const nextVelocity =
    (velocity + (target - spring) * 260 * deltaSeconds) *
    Math.exp(-34 * deltaSeconds);
  const nextSpring = clamp(spring + nextVelocity * deltaSeconds);

  return { spring: nextSpring, velocity: nextVelocity };
}
