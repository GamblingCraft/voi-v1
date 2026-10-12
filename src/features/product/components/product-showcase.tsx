import type { CatalogProduct } from "@/features/catalog/catalog-model";
import { CatalogCard } from "@/features/catalog/components/catalog-card";
import type { ModelKind } from "@/lib/three/types";

export function ProductShowcase({
  kind,
  product,
}: {
  kind: ModelKind;
  product: CatalogProduct;
}) {
  return (
    <div id={`${kind}-showcase`} aria-hidden="true">
      <div id={`${kind}-model-target`} aria-hidden="true" />
      <div id={`${kind}-product-card`}>
        <CatalogCard product={product} compact horizontalMobile />
      </div>
    </div>
  );
}
