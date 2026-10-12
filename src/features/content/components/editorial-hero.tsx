import Link from "next/link";
import { ImageTrailHero } from "@/components/media/image-trail-hero";
import styles from "./editorial-hero.module.css";
import sharedStyles from "../styles/landing.module.css";

type Props = {
  label: string;
  title: string[];
  description: string;
  href: string;
  cta: string;
  introduction: string[];
  media?: readonly string[];
};
export function EditorialHero({
  label,
  title,
  description,
  href,
  cta,
  introduction,
  media,
}: Props) {
  return (
    <>
      <ImageTrailHero title={title} media={media} />
      <section className={styles.introduction}>
        <p className={styles.eyebrow}>{label}</p>
        <h2>
          {introduction.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <div className={styles.bottom}>
          <p>{description}</p>
          <Link className={sharedStyles.button} href={href}>
            {cta}
          </Link>
        </div>
      </section>
    </>
  );
}
