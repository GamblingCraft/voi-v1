"use client";

import { useId, useState } from "react";
import type { ProductStoryContent } from "../story.types";
import styles from "./story-faq.module.css";

export function StoryFaq({ content }: { content: ProductStoryContent["faq"] }) {
  const [openId, setOpenId] = useState<string | null>(
    content.items[0]?.id ?? null,
  );
  const id = useId();

  return (
    <section
      id="story-faq"
      className={styles.section}
      aria-labelledby={`${id}-title`}
      data-header-theme="light"
    >
      <div className={styles.intro}>
        <h2 id={`${id}-title`}>{content.title}</h2>
        <p>{content.description}</p>
      </div>
      <div>
        {content.items.map((item) => {
          const open = openId === item.id;
          const questionId = `${id}-${item.id}-question`;
          const answerId = `${id}-${item.id}-answer`;
          return (
            <div key={item.id} className={styles.item} data-open={open}>
              <h3>
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span className={styles.plus} aria-hidden="true" />
                </button>
              </h3>
              <div
                className={styles.answer}
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                aria-hidden={!open}
                inert={!open}
              >
                <div className={styles.answerClip}>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
