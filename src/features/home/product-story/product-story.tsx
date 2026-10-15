import { getCatalogProducts } from "@/features/catalog/catalog.content";
import type { ProductStoryContent } from "./story.types";
import { ProductShowcase } from "./components/product-showcase";
import { ProductOrigin } from "./sections/product-origin";
import { ServingRitual } from "./sections/serving-ritual";
import { StoryText } from "./sections/story-text";
import { WaterJourney } from "./sections/water-journey";
import { StoryFinale } from "./sections/story-finale";
import { StoryFaq } from "./sections/story-faq";
import { StoryBlog } from "./sections/story-blog";
import closingStyles from "./sections/story-closing.module.css";
import styles from "./product-story.module.css";

export function ProductStory({ content }: { content: ProductStoryContent }) {
  return (
    <div className={styles.story} role="region" aria-label={content.ariaLabel}>
      <ProductOrigin content={content.origin} />
      <ProductShowcase products={getCatalogProducts()} />
      <ServingRitual content={content.ritual} />
      <StoryText content={content.text} />
      <WaterJourney content={content.journey} />
      <div className={closingStyles.closing}>
        <div className={closingStyles.backdrop}>
          <StoryFinale content={content.finale} />
        </div>
        <StoryBlog />
        <StoryFaq content={content.faq} />
      </div>
    </div>
  );
}
