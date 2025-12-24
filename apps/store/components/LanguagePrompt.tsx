// components/LanguagePrompt.tsx
"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "royalty-lang-selected"; // local storage key
const SESSION_PROMPT_KEY = "royalty-lang-prompted"; // session storage key

export function LanguagePrompt() {
	const [open, setOpen] = useState(false);
	const [visible, setVisible] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (typeof window === "undefined") return;

		const alreadyChosen = window.localStorage.getItem(STORAGE_KEY);
		if (alreadyChosen) return;

		const promptedThisSession =
			window.sessionStorage.getItem(SESSION_PROMPT_KEY);
		if (promptedThisSession) return;
		window.sessionStorage.setItem(SESSION_PROMPT_KEY, "true");
		const showTimeout = window.setTimeout(() => {
			setOpen(true);

			requestAnimationFrame(() => {
				setVisible(true);
			});
		}, 3500);

		const hideTimeout = window.setTimeout(() => {
			setVisible(false);

			window.setTimeout(() => {
				setOpen(false);
			}, 2000);
		}, 3500 + 3700);

		return () => {
			window.clearTimeout(showTimeout);
			window.clearTimeout(hideTimeout);
		};
	}, []);

	const chooseLocale = (locale: "en" | "ar") => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem(STORAGE_KEY, locale);
		}
		setOpen(false);

		// Navigate to same path with selected locale
		router.replace(pathname, { locale });
	};

	if (!open) return null;

	return (
		<div
			className={`fixed inset-0 z-50 flex justify-center pt-6 bg-black/20 backdrop-blur-xs transition-opacity duration-300
         				${visible ? "opacity-100" : "opacity-0"}`}
			onClick={() => setOpen(false)}
		>
			<div
				className={`mx-4 max-w-sm rounded-2xl h-fit bg-zinc-900/80 text-zinc-50 shadow-xl shadow-black border border-zinc-700 p-4 relative mt-14
          					transform-gpu transition-transform transition-opacity duration-300 ease-out
          					${
								visible
									? "translate-y-0 opacity-100"
									: "-translate-y-8 opacity-0"
							}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-lg font-semibold text-center mb-2">
					Choose your language
				</h2>
				<button
					onClick={() => setOpen(false)}
					aria-label="Close"
					className="absolute right-2 top-2 leading-none text-white text-md cursor-pointer border border-red-500 rounded-full w-6 h-6 flex items-center justify-center transition bg-red-500/50 hover:bg-red-500/80"
				>
					<X size={14} />
				</button>
				<div className="flex justify-center gap-3 mt-2">
					<button
						onClick={() => chooseLocale("en")}
						className="px-4 py-2 rounded-xl border border-gray-200 bg-zinc-900 hover:bg-white hover:text-black text-sm font-medium transition cursor-pointer"
					>
						English
					</button>
					<button
						onClick={() => chooseLocale("ar")}
						className="px-4 py-2 rounded-xl border border-gray-200 bg-zinc-900 hover:bg-white hover:text-black text-sm font-medium transition cursor-pointer"
					>
						العربية
					</button>
				</div>
				<p
					dir="ltr"
					className="mt-3 text-[11px] text-white text-center"
				>
					You can change this later from the language menu.
				</p>
			</div>
		</div>
	);
}
