"use client";
import Link from "next/link";
import "./site-header-delta.css";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BrandMark } from "@/components/brand/brand-mark";
import { localizePath, type Locale } from "@/i18n/config";
import { company } from "@/lib/company";
import { SoundToggle } from "./site-audio";
import { LanguageSelector } from "./header/language-selector";
import { HeaderSearchButton } from "./header/header-search-button";
import { HeaderCartButton } from "./header/header-cart-button";
import type { Dictionary } from "@/i18n/dictionaries";
import { useSiteNavigation } from "./site-shell";
export function SiteHeader({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["header"];
}) {
  const { isMenuOpen, openMenu } = useSiteNavigation();
  const pathname = usePathname();
  const router = useRouter();
  const header = useRef<HTMLElement>(null);
  const [lightSurface, setLightSurface] = useState(false);
  useEffect(() => {
    let frame = 0;
    const sample = () => {
      frame = 0;
      const box = header.current?.getBoundingClientRect();
      if (!box) return;
      let el = document
        .elementsFromPoint(innerWidth / 2, box.top + box.height / 2)
        .find((item) => !header.current?.contains(item)) as
        HTMLElement | undefined;
      // Sample the section beneath the logo, skipping the fixed navigation itself.
      while (el) {
        if (
          el.matches(
            ".delta-hero,.delta-editorial-hero,.delta-journal-hero,.delta-footer-scene,.delta-about-hero",
          )
        ) {
          setLightSurface(false);
          return;
        }
        const rgba = getComputedStyle(el)
          .backgroundColor.match(/[\d.]+/g)
          ?.map(Number);
        if (rgba && (rgba.length === 3 || rgba[3] > 0.8)) {
          setLightSurface(
            rgba[0] * 0.2126 + rgba[1] * 0.7152 + rgba[2] * 0.0722 > 150,
          );
          return;
        }
        el = el.parentElement || undefined;
      }
      setLightSurface(false);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const timer = window.setTimeout(schedule, 1000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);
  return (
    <header
      ref={header}
      className="delta-header"
      data-surface={lightSurface ? "light" : "dark"}
    >
      <a className="delta-header-phone" href={company.phoneHref}>
        {company.phone}
      </a>
      <Link className="delta-logo" href="/" aria-label="ВОЙ — главная">
        <BrandMark priority />
      </Link>
      <div className="delta-header-tools">
        <div className="delta-header-desktop-tools">
          <SoundToggle />
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
          <HeaderCartButton locale={locale} label={dictionary.cartLabel} />
        </div>
        <button
          className="delta-menu-trigger"
          aria-controls="site-navigation"
          aria-expanded={isMenuOpen}
          data-menu-trigger
          onClick={openMenu}
        >
          Меню
        </button>
      </div>
    </header>
  );
}
