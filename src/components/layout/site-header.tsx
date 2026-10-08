"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { BrandMark } from "@/components/brand/brand-mark";
import { HeaderCartButton } from "./header/header-cart-button";
import { LanguageSelector } from "./header/language-selector";
import { HeaderSearchButton } from "./header/header-search-button";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useSiteNavigation } from "./site-shell";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary["header"];
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const { isMenuOpen, openMenu } = useSiteNavigation();
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => {
      const following = document.querySelector<HTMLElement>(
        "[data-hero-following]",
      );
      header.dataset.onHero = String(
        !!following &&
          following.getBoundingClientRect().top > header.offsetHeight,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header ref={headerRef} className={styles.header}>
      <a className={styles.phone} href="tel:+73952000000">
        +7 (3952) 00-00-00
      </a>
      <Link
        className={styles.brand}
        href={localizePath("/", locale)}
        aria-label={dictionary.homeLabel}
      >
        <BrandMark className={styles.mark} priority />
      </Link>

      <div className={styles.headerControls}>
        <div className={styles.desktopTools}>
          <LanguageSelector
            currentLocale={locale}
            label={dictionary.languageLabel}
            groupLabel={dictionary.languageGroupLabel}
          />
          <HeaderSearchButton
            openLabel={dictionary.searchOpenLabel}
            closeLabel={dictionary.searchCloseLabel}
            placeholder={dictionary.searchPlaceholder}
            submitLabel={dictionary.searchSubmitLabel}
            onSearch={(query) =>
              router.push(
                `${localizePath("/catalog", locale)}?q=${encodeURIComponent(query)}#discover`,
              )
            }
          />
        </div>
        <HeaderCartButton locale={locale} label={dictionary.cartLabel} />
        <button
          className={styles.menuButton}
          type="button"
          aria-label={dictionary.openMenuLabel}
          aria-controls="site-navigation"
          aria-expanded={isMenuOpen}
          data-menu-trigger
          onClick={openMenu}
        >
          <span>{dictionary.menu}</span>
          <span className={styles.menuPlus} aria-hidden="true">
            +
          </span>
        </button>
      </div>
    </header>
  );
}
