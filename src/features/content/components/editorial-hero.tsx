import Link from "next/link";
import clsx from "clsx";
import { MediaPlaceholder } from "@/components/media/media-placeholder";
import heroStyles from "./editorial-hero.module.css";
import sharedStyles from "../styles/landing.module.css";

type Props = {
  label: string;
  title: string[];
  description: string;
  media: string;
  href: string;
  cta: string;
  variant?: "product" | "production" | "business";
};

export function EditorialHero({
  label,
  title,
  description,
  media,
  href,
  cta,
  variant = "product",
}: Props) {
  const dark = variant !== "product";
  return (
    <section
      className={clsx(heroStyles.hero, heroStyles[variant])}
      data-header-theme={dark ? "dark" : "light"}
    >
      <div className={heroStyles.heroCopy}>
        <p className={heroStyles.eyebrow}>{label}</p>
        <div className={heroStyles.heroTitle}>
          <h1>
            {title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </div>
        <div className={heroStyles.heroBottom}>
          <p>{description}</p>
          <Link
            className={dark ? sharedStyles.lightButton : sharedStyles.button}
            href={href}
          >
            {cta}
          </Link>
        </div>
      </div>
      <MediaPlaceholder
        className={heroStyles.heroMedia}
        label={media}
        kind="video"
        tone={dark ? "dark" : "ice"}
      />
    </section>
  );
}
