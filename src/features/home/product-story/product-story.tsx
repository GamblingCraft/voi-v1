import { getCatalogProducts } from "@/features/catalog/catalog.content";
import type { ProductStoryContent } from "./story.types";
import { ProductOrigin } from "./sections/product-origin";
import { ProductionStory } from "./sections/production-story";
import { ServingRitual } from "./sections/serving-ritual";
import { StoryText } from "./sections/story-text";
import { WaterJourney } from "./sections/water-journey";
import { JourneyPrototype } from "./sections/journey-prototype";
import { StoryFinale } from "./sections/story-finale";
import { StoryFaq } from "./sections/story-faq";
import { StoryBlog } from "./sections/story-blog";
import closingStyles from "./sections/story-closing.module.css";
import styles from "./product-story.module.css";

// Temporarily preview the storytelling motion without editorial content.
const showJourneyPrototype = true;

export function ProductStory({ content }: { content: ProductStoryContent }) {
  return (
    <div className={styles.story} role="region" aria-label={content.ariaLabel}>
      <ProductOrigin content={content.origin} products={getCatalogProducts()} />
      <ProductionStory content={content.production} />
      <ServingRitual content={content.ritual} />
      {showJourneyPrototype ? (
        <JourneyPrototype />
      ) : (
        <>
          <StoryText content={content.text} />
          <WaterJourney content={content.journey} />
        </>
      )}
      <div className={closingStyles.closing}>
        <div className={closingStyles.backdrop}>
          <StoryFinale content={content.finale} />
        </div>
        <StoryBlog content={content.blog} />
        <StoryFaq content={content.faq} />
      </div>
    </div>
  );
}
