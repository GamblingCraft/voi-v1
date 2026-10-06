import clsx from "clsx";
import Image from "next/image";
import styles from "./media-placeholder.module.css";

type MediaPlaceholderProps = {
  label: string;
  src?: string;
  position?: string;
  shape?: "rectangle" | "product" | "water" | "round";
  className?: string;
};

// One replacement point for final media; scene layout never depends on file names.
export function MediaPlaceholder({
  label,
  src,
  position = "center",
  shape = "rectangle",
  className,
}: MediaPlaceholderProps) {
  return (
    <div
      className={clsx(
        styles.placeholder,
        styles[shape],
        src && styles.hasImage,
        className,
      )}
      role={src ? undefined : "img"}
      aria-label={src ? undefined : label}
    >
      {src && (
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          className={styles.image}
          style={{ objectPosition: position }}
        />
      )}
      {!src && shape === "product" && (
        <>
          <i aria-hidden="true" />
          <b aria-hidden="true" />
        </>
      )}
    </div>
  );
}
