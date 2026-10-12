import "./styles/index.css";
import type { ReactNode } from "react";
import type { CatalogProduct } from "@/features/catalog/catalog-model";
import { ProductScenes } from "./components/product-scenes";
import { ProductShowcase } from "./components/product-showcase";
import { PackageWeightControl } from "./components/package-weight-control";
import { ImageTrailHero } from "@/components/media/image-trail-hero";
import { BrandStory } from "./components/brand-story";
import { ZipStory } from "./components/zip-story";
import { ZipStage } from "./components/zip-stage";
import { PvdStory } from "./components/pvd-story";
import { PvdStage } from "./components/pvd-stage";
import { CupStory } from "./components/cup-story";
import { CupStage } from "./components/cup-stage";
import { ClosingStory } from "./components/closing-story";
import { ProductGuide } from "./components/product-guide";

// Packaging geometry is independent of the shared catalog and cart data.
const slots = [
  { kind: "zip", productId: "cube" },
  { kind: "pvd", productId: "sphere" },
  { kind: "cup", productId: "cylinder" },
] as const;

const heroMedia = [1, 2, 3, 4, 5, 6, 7].map(
  (id) => `/media/product/hero/${id}.webp`,
);

export function Product({
  footer,
  products,
}: {
  footer: ReactNode;
  products: CatalogProduct[];
}) {
  return (
    <ProductScenes
      details={<ProductGuide />}
      hero={
        <ImageTrailHero
          id="hero"
          media={heroMedia}
          title={["Барный лёд ВОЙ", "Элемент стихии Байкала"]}
        />
      }
      footer={footer}
      showcases={slots.map(({ kind, productId }) => {
        const product = products.find((item) => item.id === productId);
        return product ? (
          <ProductShowcase key={kind} kind={kind} product={product} />
        ) : null;
      })}
    >
      <BrandStory />
      <ZipStory />
      <ZipStage />
      <PvdStory>
        <PackageWeightControl />
      </PvdStory>
      <PvdStage />
      <CupStory />
      <CupStage />
      <ClosingStory />
    </ProductScenes>
  );
}
