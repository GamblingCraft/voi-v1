import "server-only";

const heading = ["Lorem", "ipsum"];
const script = "dolor sit amet";
const paragraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const media = "Lorem ipsum";

// Placeholder copy for the Russian prototype; CMS content will replace it later.
export const productStoryContent = {
  ariaLabel: "Lorem ipsum",
  origin: { title: heading, script, note: paragraph, waterMedia: media },
  production: {
    eyebrow: "Lorem ipsum",
    steps: [
      { id: "water", title: heading, description: paragraph, media },
      { id: "freezing", title: heading, description: paragraph, media },
      { id: "shaping", title: heading, description: paragraph, media },
    ],
  },
  ritual: { title: "Lorem ipsum", script, media },
  text: {
    title: "Lorem ipsum",
    paragraphs: [
      paragraph,
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
  },
  journey: {
    title: "Lorem ipsum",
    script,
    ariaLabel: "Lorem ipsum",
    baikal: { description: paragraph, media },
    water: { title: heading, description: paragraph, media },
    production: {
      title: heading,
      script,
      description: paragraph,
      media,
      teamMedia: media,
    },
    form: { title: heading, description: paragraph, media, detailMedia: media },
    glass: { title: heading, description: paragraph, media },
  },
  finale: { title: heading, script, media, note: paragraph },
  blog: {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    actionLabel: "Lorem",
    items: [
      {
        id: "feature",
        readingMinutes: 5,
        tags: ["Lorem", "Ipsum"],
        title: "Lorem ipsum dolor sit amet",
        excerpt: paragraph,
        media,
      },
      {
        id: "second",
        readingMinutes: 3,
        tags: ["Dolor", "Sit amet"],
        title: "Consectetur adipiscing elit",
        excerpt:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        media,
      },
      {
        id: "third",
        readingMinutes: 4,
        tags: ["Lorem", "Consectetur"],
        title: "Sed do eiusmod tempor",
        excerpt:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
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
