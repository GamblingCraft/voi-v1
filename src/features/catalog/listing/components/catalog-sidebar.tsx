import Link from "next/link";
import sidebarStyles from "./catalog-sidebar.module.css";
import shellStyles from "../../styles/catalog-shell.module.css";
import { CatalogFilters } from "./catalog-filters";
import type { CatalogProduct } from "../../catalog-data";
import { usageOptions } from "../../catalog-data";
import type { CatalogSelection } from "../../catalog-selection";

export function CatalogSidebar({
  all,
  selection,
}: {
  all: CatalogProduct[];
  selection: CatalogSelection;
}) {
  const { shape, usage, q, sort } = selection;
  return (
    <aside className={sidebarStyles.sidebar}>
      <CatalogFilters
        key={[shape, usage, q, sort].join(":")}
        shape={shape}
        usage={usage}
        q={q}
        sort={sort}
        shapes={all.map(({ id, form }) => ({ id, label: form }))}
        usages={usageOptions}
      />
      <div className={sidebarStyles.sidebarHelp}>
        <h3>Какой лёд выбрать?</h3>
        <p>Сравните назначение форм и варианты подачи.</p>
        <Link className={shellStyles.actionLink} href="/product">
          Гид по льду{" "}
        </Link>
      </div>
    </aside>
  );
}
