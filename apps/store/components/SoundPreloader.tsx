"use client";
import { getAudioContext, preloadSounds } from "@/utils/soundManager";
import { useEffect } from "react";

export default function SoundPreloader() {
	useEffect(() => {
		preloadSounds();
		const resume = () => {
			const ctx = getAudioContext();
			if (ctx && ctx.state === "suspended") {
				ctx.resume();
			}
			document.removeEventListener("click", resume);
			document.removeEventListener("touchstart", resume);
		};

		document.addEventListener("click", resume);
		document.addEventListener("touchstart", resume);

		return () => {
			document.removeEventListener("click", resume);
			document.removeEventListener("touchstart", resume);
		};
	}, []);

	return null;
}
