import { ScrollScene } from "../components/scroll-scene";
import styles from "./journey-prototype.module.css";

const screens = [
  { id: "baikal", label: "Байкал" },
  { id: "water", label: "Вода" },
  { id: "production", label: "Производство" },
  { id: "form", label: "Форма льда" },
  { id: "glass", label: "Подача льда" },
];

export function JourneyPrototype() {
  return (
    <ScrollScene
      kind="journey"
      id="water-journey"
      label="Прототип сторителлинга"
      screenClassName={styles.screen}
    >
      <div className={styles.track} data-story-track>
        {screens.map(({ id, label }, index) => (
          <div
            key={id}
            className={styles.panel}
            data-panel={id}
            role="group"
            aria-label={`Экран ${index + 1}: ${label}`}
          >
            <div className={styles.caption}>
              <span className={styles.number}>{index + 1}</span>
              <p className={styles.copy}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollScene>
  );
}
