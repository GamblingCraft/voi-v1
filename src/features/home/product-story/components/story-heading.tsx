import clsx from "clsx";
import styles from "../product-story.module.css";

type StoryHeadingProps = {
  lines: string | string[];
  script?: string;
  className?: string;
};

export function StoryHeading({ lines, script, className }: StoryHeadingProps) {
  return (
    <h2 className={clsx(styles.heading, className)}>
      {(Array.isArray(lines) ? lines : [lines]).map((line) => (
        <span key={line}>{line} </span>
      ))}
      {script && <em className={styles.script}>{script}</em>}
    </h2>
  );
}
