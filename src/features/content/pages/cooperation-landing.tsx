import { MediaPlaceholder } from "@/components/media/media-placeholder";
import { InquiryForm } from "@/features/inquiries/inquiry-form";
import { EditorialHero } from "../components/editorial-hero";
import { SectionHeading } from "../components/section-heading";
import { Faq } from "../components/faq";
import { businessFaq } from "../landing.content";
import sharedStyles from "../styles/landing.module.css";
import cooperationStyles from "./cooperation-landing.module.css";
import inquiryStyles from "../components/inquiry-section.module.css";

const audiences = [
  {
    title: "Бары",
    text: "Лёд как часть рецепта. Подбираем форму под коктейльную карту и вашу посуду.",
    media: "Барная стойка · вечерняя подача",
  },
  {
    title: "Рестораны",
    text: "Лёд для аперитивов, коктейлей и крепких напитков из вашей карты.",
    media: "Ресторан · сервировка стола",
  },
  {
    title: "Отели",
    text: "Поставки для лобби-бара, ресторана и банкетной службы.",
    media: "Отель · подача в лобби-баре",
  },
  {
    title: "События",
    text: "Разовая поставка с учётом даты, числа гостей и меню напитков.",
    media: "Мероприятие · коктейльный бар",
  },
];

export function CooperationLanding() {
  return (
    <main id="top" className={sharedStyles.page}>
      <EditorialHero
        variant="business"
        label="Сотрудничество"
        title={["ЛЁД ДЛЯ БАРОВ", "И РЕСТОРАНОВ"]}
        media="Бар в работе · лёд как часть сервиса"
        description="Обсудим формы льда для вашего меню, объём заказа и график поставок в Иркутске."
        href="#inquiry"
        cta="Обсудить сотрудничество"
      />
      <section
        id="discover"
        className={sharedStyles.section}
        data-header-theme="light"
      >
        <SectionHeading
          label="Для вашего формата"
          title={
            <>
              ДЛЯ ЗАВЕДЕНИЙ
              <br />И МЕРОПРИЯТИЙ
            </>
          }
        />
        <div className={cooperationStyles.audienceGrid}>
          {audiences.map((item, index) => (
            <article key={item.title}>
              <div className={cooperationStyles.audienceMedia}>
                <MediaPlaceholder
                  label={item.media}
                  index={`0${index + 2}`}
                  tone={index % 2 ? "ice" : "light"}
                />
              </div>
              <div className={cooperationStyles.audienceTitle}>
                <h3>{item.title}</h3>
              </div>
              <p className={sharedStyles.copy}>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className={cooperationStyles.briefSection}
        data-header-theme="light"
      >
        <SectionHeading
          label="Перед заказом"
          title={
            <>
              ЧТО НУЖНО
              <br />
              ДЛЯ РАСЧЁТА
            </>
          }
        />
        <dl className={cooperationStyles.orderDetails}>
          <div>
            <dt>Меню и посуда</dt>
            <dd>
              Какие напитки вы подаёте и в каких бокалах. Укажите нужную форму
              льда или попросите помочь с выбором.
            </dd>
          </div>
          <div>
            <dt>Объём и частота</dt>
            <dd>
              Примерный расход льда и частота заказов. Для мероприятия укажите
              дату и количество гостей.
            </dd>
          </div>
          <div>
            <dt>Адрес поставки</dt>
            <dd>
              Город, адрес и удобное время получения. Стоимость, упаковку и
              возможность доставки согласуем до заказа.
            </dd>
          </div>
        </dl>
      </section>
      <section
        className={cooperationStyles.faqSection}
        data-header-theme="light"
      >
        <div>
          <h2>
            ВОПРОСЫ
            <br />О ПОСТАВКАХ
          </h2>
        </div>
        <Faq items={businessFaq} />
      </section>
      <section
        id="inquiry"
        className={inquiryStyles.inquirySection}
        data-header-theme="light"
      >
        <div>
          <h2>
            РАССКАЖИТЕ
            <br />О ВАШЕМ
            <br />
            ПРОЕКТЕ.
          </h2>
          <p>
            Укажите название заведения, нужные формы и примерный объём льда.
          </p>
        </div>
        <InquiryForm />
      </section>
    </main>
  );
}
