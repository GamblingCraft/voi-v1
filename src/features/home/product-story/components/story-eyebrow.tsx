import styles from "./story-eyebrow.module.css";

export function StoryEyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`${styles.eyebrow} ${className}`}>{children}</p>;
}
