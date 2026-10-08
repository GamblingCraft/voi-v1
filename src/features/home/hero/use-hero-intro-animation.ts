"use client";

import { useEffect, useRef } from "react";
import {
  measureOpening,
  renderOpeningFrame,
  type OpeningElements,
  type OpeningLayout,
} from "./hero-intro-animation";

type HeroIntroRefs = {
  media: React.RefObject<HTMLDivElement | null>;
  video: React.RefObject<HTMLVideoElement | null>;
  words: React.RefObject<Array<HTMLParagraphElement | null>>;
  letters: React.RefObject<Array<Array<HTMLSpanElement | null>>>;
  shots: React.RefObject<Array<HTMLDivElement | null>>;
};

type UseHeroIntroAnimationOptions = {
  isReady: boolean;
  iceText: string;
  refs: HeroIntroRefs;
  onComplete: () => void;
  onReveal: () => void;
};

export function useHeroIntroAnimation({
  isReady,
  iceText,
  refs,
  onComplete,
  onReveal,
}: UseHeroIntroAnimationOptions) {
  const readyRef = useRef(isReady);
  const completeRef = useRef(onComplete);
  const revealRef = useRef(onReveal);

  useEffect(() => {
    readyRef.current = isReady;
  }, [isReady]);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);
  useEffect(() => {
    revealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    let frameId = 0;
    let active = true;
    let fontsReady = false;
    void document.fonts.ready.then(() => {
      if (active) fontsReady = true;
    });
    let handedAt = 0;
    let openingLayout: OpeningLayout | null = null;
    let completed = false;
    let revealed = false;
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
      if (fontsReady && !handedAt) handedAt = timestamp;

      if (handedAt) {
        const elements = getOpeningElements();
        if (elements) {
          if (!openingLayout) openingLayout = getOpeningLayout(elements);
          if (openingLayout) {
            if (!revealed && (reduceMotion || timestamp - handedAt >= 4000)) {
              revealed = true;
              revealRef.current();
            }
            completed = renderOpeningFrame(
              elements,
              openingLayout,
              Math.min(
                (timestamp - handedAt) / 1000,
                readyRef.current ? Infinity : 5.399,
              ),
              reduceMotion,
            );
          }
        }
      }

      if (completed && readyRef.current) {
        refs.video.current?.pause();
        completeRef.current();
        return;
      }

      frameId = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", handleResize);
    frameId = requestAnimationFrame(frame);

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [iceText, refs]);
}
