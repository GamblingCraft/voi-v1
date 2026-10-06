import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./site-footer.module.css";

type SiteFooterProps = { locale: Locale; dictionary: Dictionary["footer"] };

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const groups = [
    {
      title: dictionary.company,
      links: [
        ["product", "/product"],
        ["production", "/production"],
        ["cooperation", "/cooperation"],
      ],
    },
    {
      title: dictionary.products,
      links: [
        ["catalog", "/catalog"],
        ["cart", "/cart"],
        ["checkout", "/checkout"],
      ],
    },
    { title: dictionary.information, links: [["blog", "/blog"]] },
  ] as const;
  return (
    <footer className={styles.footer}>
      <div className={styles.navigationGrid}>
        <div className={styles.brandColumn}>
          <Link href={localizePath("/", locale)} aria-label="ВОЙ — на главную">
            <BrandMark className={styles.mark} />
          </Link>
          <p>{dictionary.brandDescription}</p>
        </div>
        {groups.map((group) => (
          <nav
            key={group.title}
            className={styles.linkColumn}
            aria-label={group.title}
          >
            <div className={styles.columnTitle}>{group.title}</div>
            {group.links.map(([key, href]) => (
              <Link key={href} href={localizePath(href, locale)}>
                {dictionary.links[key]}
              </Link>
            ))}
            {group.title === dictionary.information && (
              <Link href={localizePath("/contacts", locale)}>
                {dictionary.contact}
              </Link>
            )}
          </nav>
        ))}
      </div>
      <div className={styles.legalBar}>
        <div className={styles.copyright}>
          <span>© ВОЙ {new Date().getFullYear()}</span>
          <span>{dictionary.bottomCaption}</span>
        </div>
        <nav className={styles.legalLinks} aria-label="Сервисные страницы">
          {[
            ["privacy", "/privacy"],
            ["terms", "/terms"],
            ["offer", "/offer"],
          ].map(([key, href]) => (
            <Link key={href} href={localizePath(href, locale)}>
              {dictionary.links[key as keyof typeof dictionary.links]}
            </Link>
          ))}
        </nav>
        <Link className={styles.toTop} href="#top">
          {dictionary.toTop}
        </Link>
      </div>
    </footer>
  );
}
