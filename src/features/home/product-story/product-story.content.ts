import "server-only";

const heading = ["Lorem", "ipsum"];
const paragraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const media = "Lorem ipsum";

// Placeholder copy for the Russian prototype; CMS content will replace it later.
export const productStoryContent = {
  ariaLabel: "Lorem ipsum",
  origin: { title: heading, note: paragraph, waterMedia: media },
  production: {
    eyebrow: "Lorem ipsum",
    steps: [
      {
        id: "water",
        title: heading,
        description: paragraph,
        media: "Видео: вода для производства льда",
      },
      {
        id: "freezing",
        title: heading,
        description: paragraph,
        media: "Видео: заморозка льда",
      },
      {
        id: "shaping",
        title: heading,
        description: paragraph,
        media: "Видео: упаковка готового льда",
      },
    ],
  },
  ritual: { title: "Lorem ipsum", media },
  text: {
    title: "Lorem ipsum",
    paragraphs: [
      paragraph,
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
  },
  journey: {
    title: "Lorem ipsum",

    ariaLabel: "Lorem ipsum",
    baikal: { description: paragraph, media },
    water: { title: heading, description: paragraph, media },
    production: {
      title: heading,

      description: paragraph,
      media,
      teamMedia: media,
    },
    form: { title: heading, description: paragraph, media, detailMedia: media },
    glass: { title: heading, description: paragraph, media },
  },
  finale: { title: heading, media, note: paragraph },
  blog: {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    items: [
      {
        id: "feature",
        tags: ["Lorem", "Ipsum", "Dolor"],
        date: "2025-02-19",
        dateLabel: "19.02.2025",
        readingMinutes: 5,
        title: "Lorem ipsum dolor sit amet",
        excerpt: paragraph,
        media,
      },
      {
        id: "second",
        tags: ["Dolor", "Sit amet", "Lorem"],
        date: "2025-02-19",
        dateLabel: "19.02.2025",
        readingMinutes: 3,
        title: "Consectetur adipiscing elit",
        excerpt:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        media,
      },
      {
        id: "third",
        tags: ["Consectetur", "Elit", "Lorem"],
        date: "2025-02-19",
        dateLabel: "19.02.2025",
        readingMinutes: 4,
        title: "Sed do eiusmod tempor",
        excerpt:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        media,
      },
      {
        id: "fourth",
        tags: ["Lorem", "Ipsum", "Amet"],
        date: "2025-02-19",
        dateLabel: "19.02.2025",
        readingMinutes: 6,
        title: "Ut enim ad minim veniam",
        excerpt:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        media,
      },
      {
        id: "fifth",
        tags: ["Dolor", "Lorem", "Elit"],
        date: "2025-02-19",
        dateLabel: "19.02.2025",
        readingMinutes: 4,
        title: "Duis aute irure dolor in reprehenderit",
        excerpt:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        media,
      },
    ],
  },
  faq: {
    title: "Lorem ipsum",
    description: paragraph,
    items: [
      {
        id: "first",
        question: "Lorem ipsum dolor sit amet?",
        answer: paragraph,
      },
      {
        id: "second",
        question: "Consectetur adipiscing elit?",
        answer:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: "third",
        question: "Sed do eiusmod tempor incididunt?",
        answer:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        id: "fourth",
        question: "Ut labore et dolore magna aliqua?",
        answer: paragraph,
      },
      {
        id: "fifth",
        question: "Quis nostrud exercitation ullamco?",
        answer:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: "sixth",
        question: "Duis aute irure dolor in reprehenderit?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
};
