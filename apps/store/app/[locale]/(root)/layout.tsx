import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { ReactNode } from "react";
type MainLayoutProps = {
	children: ReactNode;
};
export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<main>
			<Navbar />
			<ScrollToTop />
			{children}
			<Footer />
		</main>
	);
}
