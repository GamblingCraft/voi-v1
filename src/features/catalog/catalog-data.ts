import { productSlug } from "./product-slug";
import type { IceCategoryId } from "./ice-formats";

export type ProductId = "cube" | "sphere" | "cylinder";
export type CatalogProduct = {
  id: ProductId;
  category: IceCategoryId;
  name: string;
  form: string;
  image: string;
  packImage: string;
  description: string;
  serving: string;
  usage: string[];
  tags: string[];
  occasion: string;
  glass: string;
  catalogHref: string;
  slug: string;
  code: string;
};

const productRecords: Omit<CatalogProduct, "slug" | "catalogHref">[] = [
  {
    id: "cube",
    image: "/media/products/cube.png",
    packImage: "/media/products/pack.png",
    category: "formed",
    code: "01",
    name: "Формованный лёд Куб",
    form: "Куб",
    description: "Куб для коктейлей и крепких напитков в низком бокале.",
    serving: "Для коктейлей",
    usage: ["cocktails", "spirits"],
    tags: ["cocktails", "spirits", "cube"],
    occasion:
      "Для подачи в роксе или олд фэшн. Перед заказом сопоставьте размер куба с внутренним диаметром вашего бокала.",
    glass: "Рокс / олд фэшн",
  },
  {
    id: "sphere",
    image: "/media/products/sphere.png",
    packImage: "/media/products/pack.png",
    category: "formed",
    code: "02",
    name: "Формованный лёд Сфера",
    form: "Сфера",
    description: "Сфера для виски и других крепких напитков в широком бокале.",
    serving: "Для крепких напитков",
    usage: ["spirits", "cocktails"],
    tags: ["spirits", "cocktails", "sphere"],
    occasion:
      "Для широкого бокала с достаточным диаметром горлышка. Укажите размеры посуды, чтобы согласовать подходящую сферу.",
    glass: "Широкий бокал / рокс",
  },
  {
    id: "cylinder",
    image: "/media/products/cylinder.png",
    packImage: "/media/products/pack.png",
    category: "formed",
    code: "03",
    name: "Формованный лёд Цилиндр",
    form: "Цилиндр",
    description:
      "Вертикальная форма для длинных напитков. Подчёркивает силуэт высокого бокала.",
    serving: "Для высокой подачи",
    usage: ["longdrinks"],
    tags: ["longdrinks", "cylinder"],
    occasion:
      "Для хайболов и лонг-дринков. При подборе учитывайте высоту и внутренний диаметр бокала.",
    glass: "Хайбол / коллинз",
  },
];

const products: CatalogProduct[] = productRecords.map((product) => {
  const slug = productSlug(product.name);
  return {
    ...product,
    slug,
    catalogHref: `/catalog/${product.category}/${slug}`,
  };
});

export const usageOptions = [
  { id: "all", label: "Любая подача" },
  { id: "cocktails", label: "Коктейли" },
  { id: "spirits", label: "Крепкие напитки" },
  { id: "longdrinks", label: "Высокая подача" },
];

export function getCatalogProducts() {
  return products;
}

// Temporary prototype values explicitly requested by the user; not review data.
export const productWeights = [1, 2, 3] as const;
export type ProductWeight = (typeof productWeights)[number];
export const previewPackPrice = 100;
export const previewRating = 5;
export function productTitle(product: CatalogProduct, weight: number) {
  return `${product.name} ${weight} кг`;
}
