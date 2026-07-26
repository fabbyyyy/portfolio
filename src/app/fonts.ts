import localFont from "next/font/local";

export const fraunces = localFont({
  src: "../fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf",
  variable: "--font-fraunces",
  weight: "100 900",
});

export const ppEditorial = localFont({
  src: "../fonts/PPEditorialNew-Regular-BF644b214ff145f.otf",
  variable: "--font-pp-editorial",
  weight: "400",
  display: "swap",
});

/** Italic variable file — use `.className` so Next wires @font-face (CSS var alone can miss). */
export const frauncesItalic = localFont({
  src: "../fonts/Fraunces-Italic-VariableFont_SOFT,WONK,opsz,wght.ttf",
  variable: "--font-fraunces-italic",
  weight: "100 900",
  style: "italic",
  display: "swap",
});
