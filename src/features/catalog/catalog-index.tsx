import { BreadcrumbSeparator } from "@/components/ui/breadcrumb-separator";
import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { iceFormats } from "./ice-formats";
import { getCatalogProducts } from "./catalog.content";
import { CatalogCard } from "./components/catalog-card";
import shellStyles from "./styles/catalog-shell.module.css";
import styles from "./catalog-index.module.css";

export function CatalogIndex({ locale }: { locale: Locale }) {
  return (
    <main
      id="top"
      className={`${shellStyles.catalog} ${styles.page}`}
      data-header-theme="light"
    >
      <nav className={shellStyles.breadcrumb} aria-label="Хлебные крошки">
        <Link href={localizePath("/", locale)}>Главная</Link>
        <BreadcrumbSeparator />
        <span aria-current="page">Каталог</span>
      </nav>
      <header className={styles.heading}>
        <h1>
          ЛЁД ИЗ БАЙКАЛЬСКОЙ ВОДЫ<span>ДЛЯ НАПИТКОВ, КУХНИ И СОБЫТИЙ</span>
        </h1>
      </header>
      <nav
        id="discover"
        className={styles.categories}
        aria-label="Категории льда"
      >
        {iceFormats.map((category) => (
          <Link
            key={category.id}
            href={localizePath(category.href, locale)}
            className={styles.category}
          >
            <div
              className={styles.media}
              data-format={category.id}
              aria-hidden="true"
            >
              {category.id === "formed" && (
                <Image
                  src="/media/products/sphere.png"
                  alt=""
                  fill
                  sizes="(max-width: 700px) 90vw, 33vw"
                />
              )}
            </div>
            <div className={styles.caption}>
              <h2>{category.name}</h2>
            </div>
          </Link>
        ))}
      </nav>
      <section className={styles.selection} aria-labelledby="selection-title">
        <div className={styles.sectionHeading}>
          <h2 id="selection-title">Лёд для напитков</h2>
          <Link
            className={shellStyles.actionLink}
            href={localizePath("/catalog/formed", locale)}
          >
            Вся категория
          </Link>
        </div>
        <div className={styles.shopGrid}>
          {getCatalogProducts().map((product) => (
            <CatalogCard key={product.id} product={product} compact />
          ))}
          <aside className={styles.guide}>
            <h3>
              Какой лёд
              <br />
              подойдёт вам?
            </h3>
            <p>
              Форма льда зависит от напитка и посуды. Сравните куб, сферу и
              цилиндр перед заказом.
            </p>
            <Link
              className={shellStyles.actionLink}
              href={localizePath("/product", locale)}
            >
              Гид по льду
            </Link>
          </aside>
        </div>
      </section>
      <section
        className={styles.editorial}
        aria-label="О производстве и заказах"
      >
        <article className={styles.production}>
          <div className={styles.editorialMedia} aria-hidden="true" />
          <div>
            <h2>
              Производим лёд
              <br />в Иркутске
            </h2>
            <p>От подготовки воды до упаковки.</p>
            <Link
              className={shellStyles.actionLink}
              href={localizePath("/production", locale)}
            >
              О производстве
            </Link>
          </div>
        </article>
        <article className={styles.business}>
          <h2>
            Лёд для вашего
            <br />
            заведения
          </h2>
          <p>
            Обсудим ассортимент, объём и график поставок для бара, ресторана или
            отеля.
          </p>
          <Link
            className={`${shellStyles.actionLink} ${shellStyles.actionLight}`}
            href={localizePath("/cooperation", locale)}
          >
            Сотрудничество
          </Link>
        </article>
      </section>
    </main>
  );
}
