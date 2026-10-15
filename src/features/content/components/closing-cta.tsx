import Link from "next/link";
import closingStyles from "./closing-cta.module.css";
import sharedStyles from "../styles/landing.module.css";

export function ClosingCta({
  title = "ЗАКАЗ ЛЬДА\nДЛЯ ВАШЕГО БАРА",
  href = "/contacts#inquiry",
  action = "Обсудить поставки",
  compact = false,
}: {
  title?: string;
  href?: string;
  action?: string;
  compact?: boolean;
}) {
  return (
    <section
      className={closingStyles.closing}
      data-header-theme="dark"
      data-compact={compact || undefined}
    >
      <h2>
        {title.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h2>
      <Link data-ui-action className={sharedStyles.button} href={href}>
        {action}
      </Link>
    </section>
  );
}
