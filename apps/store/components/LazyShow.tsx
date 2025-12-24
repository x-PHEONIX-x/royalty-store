"use client";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

type LazyShowProps = PropsWithChildren<{ delay?: number }>;
export default function LazyShow({ children, delay = 0 }: LazyShowProps) {
	const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 40, scale: 0.95 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.5, delay: delay, ease: "easeInOut" }}
		>
			{children}
		</motion.div>
	);
}
