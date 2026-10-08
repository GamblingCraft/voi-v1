import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/media-placeholder";
import { EditorialHero } from "../components/editorial-hero";
import { SectionHeading } from "../components/section-heading";
import { ClosingCta } from "../components/closing-cta";
import { productionSteps } from "../landing.content";
import sharedStyles from "../styles/landing.module.css";
import productionStyles from "./production-landing.module.css";

export function ProductionLanding() {
  return (
    <main id="top" className={sharedStyles.page}>
      <EditorialHero
        variant="production"
        label="Производство"
        title={["ПРОИЗВОДСТВО", "БАРНОГО ЛЬДА"]}
        media="Общий план производства · от воды до упаковки"
        description="Подготовка воды, замораживание, формовка и упаковка. Показываем каждый этап производства."
        href="#water"
        cta="Смотреть процесс"
      />
      <section
        id="discover"
        className={sharedStyles.section}
        data-header-theme="light"
      >
        <SectionHeading
          label="Производство"
          title={
            <>
              ОТ ВОДЫ
              <br />
              ДО УПАКОВКИ
            </>
          }
        />
        <div className={sharedStyles.introSplit}>
          <p className={sharedStyles.lead}>
            Вода, холод, форма, упаковка. На каждом этапе мы думаем о том, как
            лёд будет выглядеть и работать в подаче.
          </p>
          <nav
            className={productionStyles.processNav}
            aria-label="Этапы производства"
          >
            {productionSteps.map((step, index) => (
              <a href={`#${step.id}`} key={step.id}>
                <span>0{index + 1}</span>
                {step.title}
                <span aria-hidden="true">↓</span>
              </a>
            ))}
          </nav>
        </div>
      </section>
      <div>
        {productionSteps.map((step, index) => (
          <section
            className={productionStyles.processScene}
            data-layout={index % 2 ? "split" : "wide"}
            id={step.id}
            key={step.id}
            data-header-theme="light"
          >
            <div className={productionStyles.processCopy}>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
            <div className={productionStyles.processMedia}>
              <MediaPlaceholder
                kind="video"
                label={step.media}
                tone={index % 2 ? "ice" : "light"}
                index={`0${index + 2}`}
              />
            </div>
          </section>
        ))}
      </div>
      <section className={sharedStyles.section} data-header-theme="light">
        <SectionHeading
          label="Поставка"
          title={
            <>
              УПАКОВКА И<br />
              ПОСТАВКА
            </>
          }
        />
        <div className={productionStyles.deliveryRow}>
          <p className={sharedStyles.lead}>
            Готовый лёд становится частью работы бара, ресторана или события.
            Формат упаковки и условия поставки согласуем под вашу задачу.
          </p>
          <Link className={sharedStyles.button} href="/cooperation">
            Условия сотрудничества
          </Link>
        </div>
      </section>
      <ClosingCta title={"ОБСУДИТЬ\nПОСТАВКУ ЛЬДА"} />
    </main>
  );
}
