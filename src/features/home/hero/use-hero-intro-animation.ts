"use client";

import { useEffect, useRef, useState } from "react";
import {
  advanceLoaderSpring,
  measureOpening,
  renderOpeningFrame,
  type OpeningElements,
  type OpeningLayout,
} from "./hero-intro-animation";

type HeroIntroRefs = {
  fill: React.RefObject<HTMLDivElement | null>;
  counter: React.RefObject<HTMLDivElement | null>;
  media: React.RefObject<HTMLDivElement | null>;
  video: React.RefObject<HTMLVideoElement | null>;
  words: React.RefObject<Array<HTMLParagraphElement | null>>;
  letters: React.RefObject<Array<Array<HTMLSpanElement | null>>>;
  shots: React.RefObject<Array<HTMLImageElement | null>>;
};

type UseHeroIntroAnimationOptions = {
  isReady: boolean;
  iceText: string;
  refs: HeroIntroRefs;
  onComplete: () => void;
};

export function useHeroIntroAnimation({
  isReady,
  iceText,
  refs,
  onComplete,
}: UseHeroIntroAnimationOptions) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const readyRef = useRef(isReady);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    readyRef.current = isReady;
  }, [isReady]);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let frameId = 0;
    let lastTimestamp = performance.now();
    let loadSpring = 0;
    let loadVelocity = 0;
    let preloaderCompleteAt = 0;
    let handedAt = 0;
    let openingLayout: OpeningLayout | null = null;
    let completed = false;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const getOpeningElements = (): OpeningElements | null => {
      if (!refs.media.current || !refs.video.current) return null;

      return {
        media: refs.media.current,
        video: refs.video.current,
        words: refs.words.current,
        letters: refs.letters.current,
        shots: refs.shots.current,
      };
    };

    const getOpeningLayout = (elements: OpeningElements) => {
      const iceWord = elements.words[1];
      const elementWord = elements.words[2];
      if (!iceWord || !elementWord) return null;
      return measureOpening(iceWord, elementWord, elements.video, iceText);
    };

    const handleResize = () => {
      openingLayout = null;
    };

    const frame = (timestamp: number) => {
      const deltaSeconds = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
      lastTimestamp = timestamp;

      const springState = advanceLoaderSpring(
        loadSpring,
        loadVelocity,
        readyRef.current ? 1 : 0,
        deltaSeconds,
      );
      loadSpring = springState.spring;
      loadVelocity = springState.velocity;

      const loadComplete = readyRef.current && loadSpring >= 0.995;
      const percent = loadComplete
        ? 100
        : Math.min(99, Math.floor(loadSpring * 100));
      if (refs.fill.current) refs.fill.current.style.width = `${percent}%`;
      if (refs.counter.current) {
        refs.counter.current.textContent = `${percent}%`;
      }

      if (loadComplete && !preloaderCompleteAt) {
        preloaderCompleteAt = timestamp;
      }

      if (
        preloaderCompleteAt &&
        !handedAt &&
        timestamp - preloaderCompleteAt > 500
      ) {
        handedAt = timestamp;
        setPreloaderDone(true);
      }

      if (handedAt) {
        const elements = getOpeningElements();
        if (elements) {
          if (!openingLayout) openingLayout = getOpeningLayout(elements);
          if (openingLayout) {
            completed = renderOpeningFrame(
              elements,
              openingLayout,
              (timestamp - handedAt) / 1000,
              reduceMotion,
            );
          }
        }
      }

      if (completed) {
        refs.video.current?.pause();
        completeRef.current();
        return;
      }

      frameId = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", handleResize);
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [iceText, refs]);

  return { preloaderDone };
}
