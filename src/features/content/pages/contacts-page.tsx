import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/media-placeholder";
import { InquiryForm } from "@/features/inquiries/inquiry-form";
import sharedStyles from "../styles/landing.module.css";
import contactsStyles from "./contacts-page.module.css";
import inquiryStyles from "../components/inquiry-section.module.css";

export function ContactsPage() {
  return (
    <main id="top" className={sharedStyles.page}>
      <section className={contactsStyles.contactHero} data-header-theme="dark">
        <div className={contactsStyles.contactTitle}>
          <p>Поставки льда и сотрудничество</p>
          <h1>
            СВЯЗАТЬСЯ
            <br />
            <span>С ВОЙ</span>
          </h1>
          <Link href="#inquiry" className={sharedStyles.lightButton}>
            Подготовить заявку
          </Link>
        </div>
        <div className={contactsStyles.contactChannels}>
          <div>
            <span>Поставки и сотрудничество</span>
            <a href="#inquiry">Перейти к заявке </a>
          </div>
          <div>
            <span>Город</span>
            <p>Иркутск, Россия</p>
          </div>
          <div>
            <span>Прямая связь</span>
            <p className={contactsStyles.contactPending}>
              Телефон и email — скоро
            </p>
          </div>
        </div>
      </section>
      <section
        id="inquiry"
        className={inquiryStyles.inquirySection}
        data-header-theme="light"
      >
        <div>
          <h2>
            ЗАЯВКА
            <br />
            НА ПОСТАВКУ
          </h2>
          <p>Несколько деталей о проекте помогут подготовить ваше обращение.</p>
        </div>
        <InquiryForm />
      </section>
      <section className={contactsStyles.contactBody} data-header-theme="light">
        <div className={contactsStyles.contactDirections}>
          {[
            ["Заказать лёд", "Подбор формы, объёма и условий поставки."],
            [
              "Стать партнёром",
              "Постоянное сотрудничество и совместные проекты.",
            ],
            ["Обсудить событие", "Расчёт объёма льда по числу гостей и меню."],
          ].map(([title, text]) => (
            <a href="#inquiry" key={title}>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </a>
          ))}
        </div>
        <div className={contactsStyles.contactLocation}>
          <MediaPlaceholder
            label="Карта · адрес производства после подтверждения"
            tone="ice"
            index="01"
          />
          <div>
            <p>
              Адрес и режим работы уточняются.
              <br />
              Визит и получение заказа — по согласованию.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
