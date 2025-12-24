// app/fonts.ts
import { Amiri, Cairo, Playfair_Display } from "next/font/google";

export const cairo = Cairo({
	subsets: ["latin", "arabic"], // both scripts in one family [web:247][web:248]
	variable: "--font-cairo",
	display: "swap",
});

export const playfair = Playfair_Display({
	subsets: ["latin"], // headings are English
	variable: "--font-playfair",
	display: "swap",
});

export const amiri = Amiri({
	subsets: ["arabic", "latin"],
	weight: ["400", "700"],
	variable: "--font-amiri",
	display: "swap",
});
