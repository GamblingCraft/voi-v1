# ВОЙ

Русская версия сайта ВОЙ на Next.js App Router. Проект находится на этапе прототипа: каталог и отзывы содержат согласованные демо-данные, оформление заказа и серверная авторизация пока не подключены.

## Работа с проектом

```sh
npm install
npm run dev
npm run check
npm run build
npm run start
```

`check` запускает ESLint, TypeScript и тесты доменной логики. `format` / `format:check` управляют форматированием; `audit:project` ищет кандидатов на неиспользуемые исходники и публичные файлы без изменения файлов.

## Где править

- Маршруты и metadata — `src/app`, русские публичные URL сопоставляются с внутренним `[locale]` через `src/proxy.ts`.
- Общая шапка, меню, подвал — `src/components/layout`.
- Каталог и товар — `src/features/catalog`, корзина — `src/features/cart`.
- Главная и анимации — `src/features/home`.
- Посадочные — `src/features/content`, связи товаров со статьями — `src/features/blog`.
- Шрифты, токены, базовые стили — `src/styles`.

Подробная карта модулей и границ Server / Client Components: [архитектура](docs/architecture.md). Сценарий главной: [секции после облаков](docs/home-product-story.md).

Публикуется только русский язык. Переключатель языка сохраняется, остальные версии недоступны. Категории: `/catalog/formed`, `/catalog/loose`, `/catalog/block`. URL товара строится из названия без веса: `/catalog/formed/formovannyj-lyod-kub`.

Индексация прототипа закрыта. Публичное включение требует `SITE_INDEXABLE=true` и корректного `NEXT_PUBLIC_SITE_URL`; правила находятся в `src/lib/seo.ts` и `next.config.ts`.

Неиспользуемые исходники, медиа и исторические материалы перенесены в соседний `../voi-archive/refactor-2026-10-06`. Они не входят в приложение. Список и контрольные суммы находятся в `manifest.json` архива.
