"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import { BrandMark } from "@/components/brand/brand-mark";
import type { Dictionary } from "@/i18n/dictionaries";
import { useHeroIntroAnimation } from "./use-hero-intro-animation";
import styles from "./hero-loader.module.css";

type HeroLoaderProps = {
  isHeroReady: boolean;
  dictionary: Dictionary["intro"];
  onComplete: () => void;
};

const openingShots = [
  "/media/hero/opening/1.png",
  "/media/hero/opening/2.png",
  "/media/hero/opening/3.png",
  "/media/hero/opening/4.png",
  "/media/hero/opening/5.png",
  "/media/hero/opening/6.png",
  "/media/hero/opening/7.png",
];

export function HeroLoader({
  isHeroReady,
  dictionary,
  onComplete,
}: HeroLoaderProps) {
  const [loadedShots, setLoadedShots] = useState(0);
  const fillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wordRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const letterRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);
  const shotRefs = useRef<Array<HTMLImageElement | null>>([]);
  const animationRefs = useMemo(
    () => ({
      fill: fillRef,
      counter: counterRef,
      media: mediaRef,
      video: videoRef,
      words: wordRefs,
      letters: letterRefs,
      shots: shotRefs,
    }),
    [],
  );
  const { preloaderDone } = useHeroIntroAnimation({
    isReady: isHeroReady && loadedShots === openingShots.length,
    iceText: dictionary.ice,
    refs: animationRefs,
    onComplete,
  });
  const words = [dictionary.lead, dictionary.ice, dictionary.element];

  useEffect(() => {
    const completedShots = shotRefs.current.reduce(
      (count, image) => count + (image?.complete ? 1 : 0),
      0,
    );
    setLoadedShots((count) => Math.max(count, completedShots));
  }, []);

  const registerShotLoad = () => {
    setLoadedShots((count) => Math.min(count + 1, openingShots.length));
  };

  return (
    <div className={styles.loader} aria-label={dictionary.ariaLabel}>
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
          {openingShots.map((source, index) => (
            <img
              key={source}
              ref={(node) => {
                shotRefs.current[index] = node;
              }}
              src={source}
              alt=""
              onLoad={registerShotLoad}
              onError={registerShotLoad}
            />
          ))}
        </div>
      </div>

      <div
        className={`${styles.preloader} ${preloaderDone ? styles.preloaderDone : ""}`}
      >
        <BrandMark className={styles.loadBrand} priority />
        <div className={styles.track} aria-hidden="true">
          <div ref={fillRef} className={styles.fill} />
        </div>
        <div ref={counterRef} className={styles.counter} aria-live="polite">
          0%
        </div>
      </div>
    </div>
  );
}
