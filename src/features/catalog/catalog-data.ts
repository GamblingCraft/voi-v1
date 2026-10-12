import { productSlug } from "./product-slug";
import type { CatalogProduct } from "./catalog-model";

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

export function getCatalogProducts() {
  return products;
}
