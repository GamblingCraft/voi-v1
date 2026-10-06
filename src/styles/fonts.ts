import {
  Cormorant_Garamond,
  Oswald,
  Roboto,
  Russo_One,
  Unbounded,
} from "next/font/google";

const siteFont = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
  display: "swap",
});
const bodyFont = Roboto({
  subsets: ["cyrillic", "latin"],
  variable: "--font-roboto",
  display: "swap",
});
const displayFont = Russo_One({
  subsets: ["cyrillic", "latin"],
  weight: "400",
  variable: "--font-russo",
  display: "swap",
});
const uiFont = Unbounded({
  subsets: ["cyrillic", "latin"],
  variable: "--font-unbounded",
  display: "swap",
});
const editorialFont = Oswald({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-oswald",
  display: "swap",
});

export const siteFontClassName = `${siteFont.variable} ${bodyFont.variable} ${displayFont.variable} ${uiFont.variable} ${editorialFont.variable}`;
