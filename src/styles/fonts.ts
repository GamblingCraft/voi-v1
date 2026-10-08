import localFont from "next/font/local";

const myriadFont = localFont({
  src: "./fonts/MyriadPro-Regular.otf",
  variable: "--font-myriad-pro",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
});
const ttNormsFont = localFont({
  src: "./fonts/TT_Norms_Pro_Trial_Expanded_Regular.ttf",
  variable: "--font-tt-norms-expanded",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
});

export const localFontClassName = `${myriadFont.variable} ${ttNormsFont.variable}`;
export const siteFontClassName = localFontClassName;
