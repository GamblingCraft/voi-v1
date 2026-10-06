import { iceFormats } from "@/features/catalog/ice-formats";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/media-placeholder";
import { getCatalogProducts } from "@/features/catalog/catalog.content";
import { EditorialHero } from "../components/editorial-hero";
import { SectionHeading } from "../components/section-heading";
import { ClosingCta } from "../components/closing-cta";
import sharedStyles from "../styles/landing.module.css";
import productStyles from "./product-landing.module.css";

export function ProductLanding() {
  const products = getCatalogProducts();
  return (
    <main id="top" className={sharedStyles.page}>
      <EditorialHero
        label="О продукте"
        title={["БАЙКАЛЬСКИЙ", "ЛЁД"]}
        media="Макросъёмка льда · свет, грани, вода"
        description="Формованный, рассыпной и блочный лёд из байкальской воды. Для напитков, гастрономии и событий."
        href="/catalog"
        cta="Посмотреть ассортимент"
      />
      <section
        id="discover"
        className={sharedStyles.section}
        data-header-theme="light"
      >
        <SectionHeading
          label="Подбор льда"
          title={
            <>
              ЛЁД ДЛЯ РАЗНЫХ
              <br />
              ЗАДАЧ
            </>
          }
        />
        <div className={sharedStyles.introSplit}>
          <p className={sharedStyles.lead}>
            ВОЙ — лёд из байкальской воды с производством в Иркутске.
            Ассортимент включает формованный, рассыпной и блочный лёд.
          </p>
          <p className={sharedStyles.copy}>
            Выбирайте формат под задачу: напитки, охлаждение, гастрономическая
            подача или оформление события. Размеры и упаковку согласуем при
            обращении.
          </p>
        </div>
        <div className={productStyles.shapeGrid}>
          {iceFormats.map((format) => (
            <article key={format.id}>
              <h3>{format.name}</h3>
              <p className={sharedStyles.copy}>{format.description}</p>
              <Link className={sharedStyles.textLink} href={format.href}>
                {format.id === "formed"
                  ? "Посмотреть формы"
                  : "Обсудить поставку"}
              </Link>
            </article>
          ))}
        </div>
        <div className={productStyles.wideMedia}>
          <MediaPlaceholder
            label="Лёд в бокале · макросъёмка подачи"
            kind="video"
            index="02"
          />
        </div>
      </section>
      <section className={sharedStyles.section} data-header-theme="light">
        <SectionHeading
          label="Ассортимент"
          title={
            <>
              ФОРМОВАННЫЙ
              <br />
              ЛЁД
            </>
          }
        />
        <div className={productStyles.shapeGrid}>
          {products.map((product, index) => (
            <article key={product.id}>
              <div className={productStyles.shapeTop}>
                <span>{product.serving}</span>
              </div>
              <Link
                className={productStyles.shapeMedia}
                href={product.catalogHref}
                aria-label={`Подробнее: ${product.form}`}
              >
                <MediaPlaceholder
                  label={`${product.form} · предметная съёмка`}
                  shape={product.id}
                  index={`0${index + 3}`}
                  tone={index === 1 ? "ice" : "light"}
                />
              </Link>
              <Link
                className={productStyles.shapeTitle}
                href={product.catalogHref}
              >
                <h3>{product.form}</h3>
              </Link>
              <p className={sharedStyles.copy}>{product.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className={productStyles.servingSection}
        data-header-theme="dark"
      >
        <div className={productStyles.servingCopy}>
          <h2>
            ДЛЯ РОКСА
            <br />И ХАЙБОЛА
          </h2>
          <p>
            В каталоге указаны варианты посуды и подачи для каждой формы. Если
            не уверены в выборе, добавьте название напитка и размеры бокала в
            заявку.
          </p>
          <Link className={sharedStyles.textLink} href="/catalog">
            Найти подходящий лёд
          </Link>
        </div>
        <div className={productStyles.servingMedia}>
          <MediaPlaceholder
            label="Барный ритуал · лёд, бокал, руки бармена"
            kind="video"
            tone="dark"
            index="06"
          />
        </div>
      </section>
      <section className={sharedStyles.section} data-header-theme="light">
        <div className={productStyles.storyLink}>
          <div className={productStyles.storyMedia}>
            <MediaPlaceholder
              label="Производство · работа с ледяным блоком"
              index="07"
              tone="ice"
            />
          </div>
          <div>
            <h2>
              КАК МЫ
              <br />
              ДЕЛАЕМ ЛЁД
            </h2>
            <p className={sharedStyles.copy}>
              От подготовки до упаковки — познакомьтесь с этапами создания льда
              ВОЙ.
            </p>
            <Link className={sharedStyles.button} href="/production">
              Как мы делаем лёд
            </Link>
          </div>
        </div>
      </section>
      <ClosingCta />
    </main>
  );
}
