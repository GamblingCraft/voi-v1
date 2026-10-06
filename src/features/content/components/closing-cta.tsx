import Link from "next/link";
import closingStyles from "./closing-cta.module.css";
import sharedStyles from "../styles/landing.module.css";

export function ClosingCta({
  title = "ЗАКАЗ ЛЬДА\nДЛЯ ВАШЕГО БАРА",
  href = "/contacts#inquiry",
  action = "Обсудить поставки",
}: {
  title?: string;
  href?: string;
  action?: string;
}) {
  return (
    <section className={closingStyles.closing} data-header-theme="dark">
      <h2>
        {title.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h2>
      <Link className={sharedStyles.lightButton} href={href}>
        {action}
      </Link>
    </section>
  );
}
