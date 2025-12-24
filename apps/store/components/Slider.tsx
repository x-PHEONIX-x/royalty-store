"use client";

import { Link } from "@/i18n/routing";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Slide = {
	id: number;
	image: string;
};

const containerVariants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "linear",
			staggerChildren: 0.7,
			delayChildren: 0.1,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 12 },
	visible: (index: number = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "linear",
			delay: index * 0.5,
		},
	}),
};

const ctaVariants: Variants = {
	hidden: { opacity: 0, y: 50, scale: 0.8 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.25,
			ease: "linear",
			delay: 1.3,
		},
	},
};

export default function Slider() {
	const t = useTranslations("slider");
	const [heroReady, setHeroReady] = useState(false);
	const slides: Slide[] = [
		{ id: 1, image: "/featured.jpeg" },
		{ id: 2, image: "/featured3.jpeg" },
		{ id: 3, image: "/featured.jpg" },
		{ id: 4, image: "/featured4.jpg" },
	];

	return (
		<Swiper
			modules={[Autoplay]}
			spaceBetween={0}
			slidesPerView={1}
			loop
			autoplay={{
				delay: 7000,
				disableOnInteraction: false,
			}}
		>
			{slides.map((slide) => (
				<SwiperSlide key={slide.id}>
					<div className="relative aspect-8/9 sm:aspect-5/2 mb-2 bg-black border-b-2 border-b-gray-800 drop-shadow-md drop-shadow-gray-800">
						<Image
							src={slide.image}
							alt="Featured Articles"
							fill
							className="object-cover min-h-96"
							priority={slide.id === 1}
							onLoad={() => {
								if (slide.id === 1) {
									setHeroReady(true);
								}
							}}
						/>

						<motion.div
							className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center"
							variants={containerVariants}
							initial="hidden"
							animate={heroReady ? "visible" : "hidden"}
						>
							<motion.h1
								variants={itemVariants}
								custom={0}
								className="font-(family-name:--font-playfair) text-gray-200 text-3xl md:text-4xl lg:text-6xl xl:text-8xl tracking-widest text-shadow-lg text-shadow-black font-extrabold text-nowrap mt-8 md:mt-16"
							>
								Welcome To ROYALTY
							</motion.h1>

							<motion.p
								variants={itemVariants}
								custom={1}
								className="font-(family-name:--font-playfair) text-gray-200 text-md md:text-lg lg:text-xl xl:text-2xl tracking-widest text-shadow-lg text-shadow-black font-semibold text-nowrap mt-4 mb-3 lg:mb-6"
							>
								&quot; Where Legacy Meets Style &quot;
							</motion.p>

							<motion.span
								variants={itemVariants}
								custom={2}
								className="p-4 w-screen lg:w-fit lg:p-8 bg-black/60 md:rounded-2xl block text-center text-white text-xs sm:text-sm lg:text-md xl:text-xl tracking-widest text-shadow-xs text-shadow-gray-900 font-medium mb-6 xl:mb-14"
							>
								{t("collection")}
							</motion.span>

							<Link href="/products">
								<motion.button
									variants={ctaVariants}
									custom={3}
									className="font-(family-name:--font-playfair) tracking-wider mt-4 md:mt-8 border-2 border-hero-btn-border shadow-[3px_3px_15px_var(--hero-btn-shadow)] bg-hero-btn-bg text-hero-btn-text hover:bg-hero-btn-hover-bg hover:text-hero-btn-hover-text hover:border-hero-btn-hover-border transition-all duration-300 rounded-xl px-4 lg:px-8 py-3 lg:py-5 flex items-center gap-3 mx-auto font-bold text-xl lg:text-3xl cursor-pointer"
								>
									{t("shopNow")}
								</motion.button>
							</Link>
						</motion.div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
