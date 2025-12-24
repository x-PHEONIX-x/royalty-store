"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	return (
		<button
			onClick={() =>
				setTheme(resolvedTheme === "light" ? "dark" : "light")
			}
			className="p-1 mx-1 bg-transparent md:bg-icon-bg rounded-full border-icon-border border-l-2 transition-all duration-300 cursor-pointer"
			aria-label="Toggle Dark Mode"
		>
			{resolvedTheme === "light" ? (
				<LuMoon className="text-foreground w-7 h-7" />
			) : (
				<LuSun className="text-foreground w-7 h-7" />
			)}
		</button>
	);
}
