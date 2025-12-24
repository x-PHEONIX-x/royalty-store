let audioContext = null;
let fallbackMode = false;
let sounds = {};

let addToCartSound;
let confirmSound;

export function preloadSounds() {
	if (typeof window === "undefined") return;

	try {
		// Try using Web Audio API
		audioContext = new (window.AudioContext || window.webkitAudioContext)();

		const loadSound = async (url) => {
			const res = await fetch(url);
			const arrayBuffer = await res.arrayBuffer();
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
			sounds[url] = audioBuffer;
		};

		loadSound("/sounds/addToCart2.mp3");
		loadSound("/sounds/cash-register2.mp3");
	} catch (err) {
		console.warn("Web Audio not supported, using fallback <audio>:", err);
		fallbackMode = true;

		addToCartSound = new Audio("/sounds/addToCart2.mp3");
		addToCartSound.preload = "auto";
		addToCartSound.load();

		confirmSound = new Audio("/sounds/cash-register2.mp3");
		confirmSound.preload = "auto";
		confirmSound.load();
	}
}

export async function playSound(type) {
	if (typeof window === "undefined") return;

	let soundUrl;
	if (type === "addToCart") soundUrl = "/sounds/addToCart2.mp3";
	if (type === "confirmCheckout") soundUrl = "/sounds/cash-register2.mp3";

	if (!soundUrl) return;

	if (fallbackMode) {
		let sound = type === "addToCart" ? addToCartSound : confirmSound;
		sound.currentTime = 0;
		sound.play().catch(() => {});
	} else if (audioContext && sounds[soundUrl]) {
		if (audioContext.state === "suspended") await audioContext.resume();
		const bufferSource = audioContext.createBufferSource();
		bufferSource.buffer = sounds[soundUrl];
		bufferSource.connect(audioContext.destination);
		bufferSource.start(0);
	}
}

export function getAudioContext() {
	return audioContext;
}
