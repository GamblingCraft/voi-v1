"use client";

import { useMemo, useRef, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { useHeroIntroAnimation } from "./use-hero-intro-animation";
import styles from "./hero-loader.module.css";

type HeroLoaderProps = {
  isHeroReady: boolean;
  dictionary: Dictionary["intro"];
  onComplete: () => void;
  onReveal: () => void;
  soundControl: ReactNode;
};

const openingShots = [
  "#f6f8f8",
  "#d4d8da",
  "#a1a8ac",
  "#687279",
  "#303a40",
  "#000000",
];

export function HeroLoader({
  isHeroReady,
  dictionary,
  onComplete,
  onReveal,
  soundControl,
}: HeroLoaderProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wordRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const letterRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);
  const shotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const animationRefs = useMemo(
    () => ({
      media: mediaRef,
      video: videoRef,
      words: wordRefs,
      letters: letterRefs,
      shots: shotRefs,
    }),
    [],
  );
  useHeroIntroAnimation({
    isReady: isHeroReady,
    iceText: dictionary.ice,
    refs: animationRefs,
    onComplete,
    onReveal,
  });
  const words = [dictionary.lead, dictionary.ice, dictionary.element];

  return (
    <div className={styles.loader} aria-label={dictionary.ariaLabel}>
      {soundControl}
      <div className={styles.opening} aria-hidden="true">
        <div className={styles.openingTitle}>
          {words.map((word, wordIndex) => (
            <p
              key={word}
              ref={(node) => {
                wordRefs.current[wordIndex] = node;
              }}
              className={styles.openingWord}
            >
              {[...word].map((letter, letterIndex) => (
                <span
                  key={`${letter}-${letterIndex}`}
                  ref={(node) => {
                    if (!letterRefs.current[wordIndex]) {
                      letterRefs.current[wordIndex] = [];
                    }
                    letterRefs.current[wordIndex][letterIndex] = node;
                  }}
                  className={wordIndex === 2 ? styles.elementAccent : undefined}
                >
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))}
            </p>
          ))}
        </div>

        <div ref={mediaRef} className={styles.openingMedia}>
          <video ref={videoRef} muted playsInline preload="auto">
            <source src="/media/hero/main.mp4" type="video/mp4" />
          </video>
          {openingShots.map((color, index) => (
            <div
              key={color}
              ref={(node) => {
                shotRefs.current[index] = node;
              }}
              className={styles.openingShot}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
