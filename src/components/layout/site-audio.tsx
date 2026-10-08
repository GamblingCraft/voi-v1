"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./site-audio.module.css";

type SiteAudio = { soundOn: boolean; play: () => void; toggle: () => void };
const AudioContext = createContext<SiteAudio | null>(null);

export function useSiteAudio() {
  const audio = useContext(AudioContext);
  if (!audio) throw new Error("useSiteAudio requires SiteAudioProvider");
  return audio;
}

export function SiteAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    void audio.play().catch((error: unknown) => {
      setSoundOn(false);
      console.warn("Hero audio playback was blocked or interrupted", error);
    });
  }, []);
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused && !audio.muted) audio.muted = true;
    else play();
  };
  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, []);
  const sync = () => {
    const audio = audioRef.current;
    setSoundOn(!!audio && !audio.paused && !audio.muted && !audio.ended);
  };
  return (
    <AudioContext.Provider value={{ soundOn, play, toggle }}>
      <audio
        ref={audioRef}
        src="/media/hero/backaudio.mp3"
        preload="auto"
        onPlaying={sync}
        onVolumeChange={sync}
        onPause={sync}
        onEnded={sync}
        onError={() => setSoundOn(false)}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function SoundToggle({ className = "" }: { className?: string }) {
  const { soundOn, toggle } = useSiteAudio();
  const label = soundOn ? "Выключить звук" : "Включить звук";
  return (
    <button
      type="button"
      className={`${styles.control} ${className}`}
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={soundOn}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M11 4 6 8H3v8h3l5 4V4Z" />
        {soundOn ? (
          <>
            <path d="M15 8a6 6 0 0 1 0 8" />
            <path d="M18 5a10 10 0 0 1 0 14" />
          </>
        ) : (
          <path d="m16 9 6 6m0-6-6 6" />
        )}
      </svg>
    </button>
  );
}
