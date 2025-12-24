// app/[locale]/layout.tsx
import SoundPreloader from "@/components/SoundPreloader";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { cairo, playfair } from "../fonts";
import "../globals.css";

export const locales = ["en", "ar"] as const;

export async function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Home | ROYALTY",
	description: "A modern e-commerce store",
};

type LayoutProps = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: LayoutProps) {
	const { locale } = await params;

	if (!locales.includes(locale as (typeof locales)[number])) {
		notFound();
	}

	// Messages (and internal locale) come from request.ts via middleware
	const messages = await getMessages();

	return (
		<html
			lang={locale}
			className={`${cairo.variable} ${playfair.variable}`}
			dir={locale === "ar" ? "rtl" : "ltr"}
			suppressHydrationWarning
		>
			<head>
				<link rel="preload" href="/sounds/addToCart2.mp3" as="audio" />
				<link
					rel="preload"
					href="/sounds/cash-register2.mp3"
					as="audio"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${
					locale === "ar" ? "font-(family-name:--font-cairo)" : ""
				} antialiased bg-gray-50`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					storageKey="theme"
				>
					<NextIntlClientProvider locale={locale} messages={messages}>
						<SoundPreloader />
						<ToastContainer
							autoClose={2000}
							position="bottom-right"
							theme="dark"
							transition={Bounce}
							className="cursor-pointer"
						/>
						{children}
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
