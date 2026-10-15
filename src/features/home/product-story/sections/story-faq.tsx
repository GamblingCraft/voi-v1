"use client";

import { StoryEyebrow } from "../components/story-eyebrow";
import { useId } from "react";
import { Faq } from "@/features/content/components/faq";
import faqStyles from "@/features/content/components/faq.module.css";
import type { ProductStoryContent } from "../story.types";
import styles from "./story-faq.module.css";

export function StoryFaq({ content }: { content: ProductStoryContent["faq"] }) {
  const id = useId();

  return (
    <section
      id="story-faq"
      className={faqStyles.section}
      aria-labelledby={`${id}-title`}
      data-header-theme="light"
    >
      <div className={styles.intro}>
        <StoryEyebrow>Вопросы и ответы</StoryEyebrow>
        <h2 id={`${id}-title`}>{content.title}</h2>
        <p>{content.description}</p>
      </div>
      <Faq items={content.items} />
    </section>
  );
}
