import clsx from "clsx";
import Image from "next/image";
import styles from "./media-placeholder.module.css";

type Props = {
  label: string;
  src?: string;
  tone?: "light" | "dark" | "ice";
  shape?: "cube" | "sphere" | "cylinder";
  className?: string;
};

/** Reserves the composition and gives the future media a clear editorial brief. */
export function MediaPlaceholder({
  label,
  src,
  tone = "light",
  shape,
  className,
}: Props) {
  return (
    <div
      className={clsx(styles.media, styles[tone], className)}
      role={src ? undefined : "img"}
      aria-label={src ? undefined : `Плейсхолдер: ${label}`}
    >
      {src && (
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 650px) 100vw, 33vw"
          className={styles.image}
        />
      )}
      {!src && shape && (
        <div className={styles.center} aria-hidden="true">
          <svg className={styles.shape} viewBox="0 0 240 240" fill="none">
            {shape === "cube" && (
              <>
                <path d="m120 30 78 44v92l-78 44-78-44V74Z" />
                <path d="m42 74 78 45 78-45M120 119v91" />
                <path
                  d="m42 166 78-45 78 45M120 30v91"
                  strokeDasharray="3 6"
                  opacity=".35"
                />
              </>
            )}
            {shape === "sphere" && (
              <>
                <circle cx="120" cy="120" r="84" />
                <ellipse cx="120" cy="120" rx="42" ry="84" />
                <ellipse cx="120" cy="120" rx="84" ry="26" />
                <path
                  d="M36 120h168M120 36v168"
                  strokeDasharray="3 6"
                  opacity=".35"
                />
              </>
            )}
            {shape === "cylinder" && (
              <>
                <ellipse cx="120" cy="53" rx="59" ry="22" />
                <path d="M61 53v130c0 30 118 30 118 0V53" />
                <path
                  d="M61 183c0-30 118-30 118 0"
                  strokeDasharray="3 6"
                  opacity=".35"
                />
                <path d="M120 31v174" strokeDasharray="3 6" opacity=".35" />
              </>
            )}
          </svg>
        </div>
      )}
    </div>
  );
}
