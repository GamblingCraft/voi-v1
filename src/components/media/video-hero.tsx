"use client";

import { useId, useRef } from "react";
import { SoundToggle } from "@/components/layout/site-audio";
import { useVideoScrubber } from "./use-video-scrubber";
import styles from "./video-hero.module.css";

type VideoHeroProps = {
  title: string;
  src?: string;
  id?: string;
};

/** Shared inner-page hero; the homepage additionally owns its one-time intro. */
export function VideoHero({
  title,
  src = "/media/hero/main-scrub.mp4",
  id,
}: VideoHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = useId();
  const interactionId = useId();
  useVideoScrubber({ heroRef: sectionRef, videoRef, src, enabled: true });
  return (
    <>
      <section
        id={id}
        ref={sectionRef}
        className={styles.hero}
        aria-labelledby={titleId}
        aria-describedby={interactionId}
        tabIndex={0}
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
        <h1 id={titleId} className={styles.seoTitle}>
          {title}
        </h1>
        <p id={interactionId} className={styles.seoTitle}>
          Вращайте объект перетаскиванием влево или вправо или стрелками
          клавиатуры.
        </p>
        <SoundToggle className={styles.soundControl} />
      </section>
      <div data-hero-following aria-hidden="true" />
    </>
  );
}
