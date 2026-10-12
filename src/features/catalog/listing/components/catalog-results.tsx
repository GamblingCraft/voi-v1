import Link from "next/link";
import resultsStyles from "./catalog-results.module.css";
import shellStyles from "../../styles/catalog-shell.module.css";
import { CatalogCard } from "../../components/catalog-card";
import { usageOptions } from "../../catalog-model";
import {
  catalogFilterHref,
  type CatalogSelection,
} from "../../catalog-selection";

export function CatalogResults({ selection }: { selection: CatalogSelection }) {
  const { products, shape, usage, q, sort, filters } = selection;
  const withoutFilter = (key: "shape" | "usage" | "q") =>
    catalogFilterHref(selection, key);
  return (
    <div className={resultsStyles.results}>
      <div className={resultsStyles.resultsHeading}>
        <h2 id="collection-title">Формованный лёд</h2>
        <p>Куб, сфера и цилиндр — формы для разных бокалов и рецептов.</p>
      </div>
      <nav
        className={resultsStyles.quickFilters}
        aria-label="Быстрый подбор по подаче"
      >
        {usageOptions.map((item) => (
          <Link
            key={item.id}
            href={`/catalog/formed?${new URLSearchParams({ shape, usage: item.id, q, sort }).toString()}#discover`}
            aria-current={usage === item.id ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={resultsStyles.resultBar}>
        <p role="status">
          {products.length === 0
            ? "Ничего не найдено"
            : `Форм в подборке: ${products.length}`}
        </p>
        <label className={resultsStyles.resultSearch}>
          <input
            key={q}
            type="search"
            form="catalog-filters"
            name="q"
            defaultValue={q}
            placeholder="Найти лёд"
            aria-label="Поиск по каталогу"
            maxLength={200}
          />
          <button type="submit" form="catalog-filters" aria-label="Найти">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="6" />
              <path d="m15 15 6 6" />
            </svg>
          </button>
        </label>
      </div>
      {filters.length > 0 && (
        <div className={resultsStyles.activeFilters}>
          {filters.map((filter) => (
            <Link
              key={filter.key}
              href={withoutFilter(filter.key)}
              aria-label={`Убрать фильтр: ${filter.label}`}
            >
              {filter.label}
              <span aria-hidden="true">×</span>
            </Link>
          ))}
          <Link className={resultsStyles.clear} href="/catalog/formed#discover">
            Сбросить всё
          </Link>
        </div>
      )}
      <div className={resultsStyles.grid}>
        {products.map((product) => (
          <CatalogCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className={resultsStyles.empty}>
          <h3>Подберём другой вариант</h3>
          <p>
            Измените запрос или снимите фильтры, чтобы увидеть все формы льда.
          </p>
          <Link className={shellStyles.button} href="/catalog/formed#discover">
            Показать все формы
          </Link>
        </div>
      )}
    </div>
  );
}
