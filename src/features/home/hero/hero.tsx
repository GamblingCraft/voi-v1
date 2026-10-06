"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { HeroLoader } from "./hero-loader";
import { useVideoScrubber } from "./use-video-scrubber";
import styles from "./hero.module.css";

type HeroProps = {
  dictionary: Dictionary["home"]["hero"];
  introDictionary: Dictionary["intro"];
};

const introSessionKey = "voi-intro-complete";
let introCompletedInMemory = false;

function hasCompletedIntro() {
  if (introCompletedInMemory) return true;
  try {
    return sessionStorage.getItem(introSessionKey) === "1";
  } catch {
    return false;
  }
}

const subscribeToSession = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function Hero({ dictionary, introDictionary }: HeroProps) {
  const [fontsReady, setFontsReady] = useState(false);
  const [finished, setIntroComplete] = useState(false);
  const introChecked = useSyncExternalStore(
    subscribeToSession,
    clientReady,
    serverReady,
  );
  const previouslyCompleted = useSyncExternalStore(
    subscribeToSession,
    hasCompletedIntro,
    serverReady,
  );
  const introComplete = finished || previouslyCompleted;
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const videoReady = useVideoScrubber({
    videoRef,
    heroRef,
    src: "/media/hero/main-scrub.mp4",
    mobileSrc: "/media/hero/main-scrub-mobile.mp4",
    enabled: introComplete,
  });

  useLayoutEffect(() => {
    if (!introChecked) return;
    if (introComplete) return;
    let active = true;
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";
    document.body.classList.add("is-intro-active");
    window.scrollTo(0, 0);

    document.fonts.ready.then(() => {
      if (active) setFontsReady(true);
    });

    return () => {
      active = false;
      window.history.scrollRestoration = previousScrollRestoration;
      document.body.classList.remove("is-intro-active");
    };
  }, [introChecked, introComplete]);

  useLayoutEffect(() => {
    document.body.classList.toggle(
      "is-intro-active",
      introChecked && !introComplete,
    );
    return () => document.body.classList.remove("is-intro-active");
  }, [introChecked, introComplete]);

  const completeIntro = useCallback(() => {
    introCompletedInMemory = true;
    try {
      sessionStorage.setItem(introSessionKey, "1");
    } catch {
      /* In-memory fallback keeps navigation working without storage. */
    }
    setIntroComplete(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="hero-title"
      aria-describedby="hero-interaction"
      tabIndex={0}
      data-hero-intro-active={!introComplete || undefined}
    >
      <video
        ref={videoRef}
        className={styles.video}
        muted
        playsInline
        disablePictureInPicture
        aria-hidden="true"
        preload="auto"
      />

      <h1 id="hero-title" className={styles.seoTitle}>
        {dictionary.title}
      </h1>
      <p id="hero-interaction" className={styles.seoTitle}>
        Вращайте объект перетаскиванием влево или вправо или стрелками
        клавиатуры.
      </p>

      {introChecked && !introComplete && (
        <HeroLoader
          isHeroReady={videoReady && fontsReady}
          dictionary={introDictionary}
          onComplete={completeIntro}
        />
      )}
    </section>
  );
}
