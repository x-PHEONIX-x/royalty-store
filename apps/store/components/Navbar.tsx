"use client";
import { Link, useRouter } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type FormEvent,
	type MouseEvent as ReactMouseEvent,
} from "react";
import { BiSolidTagX } from "react-icons/bi";
import {
	LuHouse,
	LuLogIn,
	// LuLogOut,
	LuMenu,
	LuPackage,
	LuSearch,
	// LuPhone,
	LuX,
} from "react-icons/lu";
import LanguageSwitcher from "./LanguageSwitcher";
import ShoppingCart from "./ShoppingCart";
import ThemeToggle from "./ThemeToggle";

export const Navbar = () => {
	const t = useTranslations("navbar");
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchInputRef = useRef<HTMLInputElement | null>(null);
	const { theme, systemTheme } = useTheme();
	const currentTheme = theme === "system" ? systemTheme : theme;
	const [mounted, setMounted] = useState(false);

	// Memoized scroll handler for better performance
	const handleScroll = useCallback(() => {
		setIsScrolled(window.scrollY > 35);
	}, []);
	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!searchTerm.trim()) return;
		router.push(
			`/products?search=${encodeURIComponent(searchTerm.trim())}`
		);
		setIsSearchOpen(false);
	};
	const handleClickOutside = useCallback(
		(event: MouseEvent | ReactMouseEvent<Document>) => {
			const target = event.target as Node | null;
			if (
				menuRef.current &&
				!menuRef.current.contains(target) &&
				buttonRef.current &&
				!buttonRef.current.contains(target)
			) {
				setIsMenuOpen(false);
			}
		},
		[]
	);
	const toggleMenu = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);
	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	useEffect(() => {
		const clickOutside = (event: MouseEvent) => {
			const target = event.target as Node | null;
			if (
				menuRef.current &&
				!menuRef.current.contains(target) &&
				buttonRef.current &&
				!buttonRef.current.contains(target)
			) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener("mousedown", clickOutside);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.removeEventListener("mousedown", clickOutside);
		};
	}, [isMenuOpen, handleClickOutside]);
	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) {
		return (
			<nav className="flex items-center p-4">
				<Image
					src="/logo-suit.png"
					alt="ROYALTY Logo"
					width={40}
					height={40}
					priority
				/>
			</nav>
		);
	}
	const logoSrc =
		currentTheme === "dark" ? "/logo-suit-white.png" : "/logo-suit.png";
	return (
		<>
			<nav
				dir="ltr"
				className={`${
					isScrolled &&
					"backdrop-blur-sm bg-navbar-scrolled-bg lg:rounded-b-[70px] shadow-md shadow-black dark:shadow-gray-400"
				} sticky top-0 z-40 w-full flex justify-between items-center border-b-2 border-navbar-border py-5 px-4 lg:px-12 bg-navbar-bg text-navbar-text drop-shadow-gray-900 dark:drop-shadow-gray-400 drop-shadow-md transition-all duration-200`}
				role="navigation"
				aria-label="Main navigation"
			>
				{/* LEFT */}
				<Link
					href="/"
					className="flex items-center gap-0 sm:gap-1 hover:opacity-70 transition-opacity duration-200"
					prefetch={true}
				>
					<Image
						src={logoSrc}
						alt="ROYALTY Logo"
						width={40}
						height={40}
						className="w-6 h-6 md:w-10 md:h-10"
						priority
					/>
					<span className="font-(family-name:--font-playfair) text-lg md:text-2xl font-extrabold tracking-wider pl-4">
						ROYALTY.
					</span>
				</Link>
				{/* RIGHT  */}
				<div className="flex items-center gap-1 md:gap-5">
					{!isMenuOpen && (
						<button
							onClick={() => setIsSearchOpen(true)}
							className="flex w-7 h-7 items-center justify-center cursor-pointer"
							aria-label={t("searchAria")}
						>
							<LuSearch className="w-6 h-6 md:w-8 md:h-8 hover:scale-130 rounded-full transition-all duration-300 ease-in-out" />
						</button>
					)}
					<Link
						href="/"
						title={t("homeTitle")}
						aria-label={t("homeTitle")}
						prefetch={true}
					>
						<LuHouse className="w-6 h-6 md:w-8 md:h-8 rounded-full hover:scale-130 transition-all duration-300 ease-in-out hidden md:block" />
					</Link>

					{!isMenuOpen && (
						<Link
							href="/cart"
							title={t("cartTitle")}
							aria-label={t("cartTitle")}
							prefetch={true}
						>
							<ShoppingCart hiddenOnMobile={false} />
						</Link>
					)}
					<Link
						href="/products"
						title={t("productsTitle")}
						aria-label={t("productsTitle")}
						prefetch={true}
					>
						<LuPackage className="w-6 h-6 md:w-8 md:h-8 rounded-full hover:scale-130 transition-all duration-300 ease-in-out hidden md:block" />
					</Link>

					{!isMenuOpen && <LanguageSwitcher />}
					{!isMenuOpen && <ThemeToggle />}
					<button
						ref={buttonRef}
						onClick={toggleMenu}
						className="md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:scale-120 transition-all duration-300"
						aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? (
							<LuX className="w-8 h-8" />
						) : (
							<LuMenu className="w-8 h-8" />
						)}
					</button>

					<Link
						href="/login"
						className="hover:text-shadow-xs hover:text-shadow-gray-600 hover:scale-110 transition-all duration-200 ease-in-out text-xl hidden md:block font-bold"
						prefetch={true}
					>
						{t("signIn")}
					</Link>
				</div>
			</nav>
			{/* Mobile dropdown menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<>
						{/* Dimmed backdrop */}
						<motion.div
							className="fixed inset-0 z-50 backdrop-blur-xs"
							style={{
								backgroundColor: "var(--mobile-backdrop)",
							}}
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.85 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsSearchOpen(false)}
						/>
						<motion.div
							ref={menuRef}
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed top-[73px] left-0 right-0 z-60 ring-2 ring-mobile-menu-ring bg-mobile-menu-bg rounded-b-2xl md:hidden shadow-[1px_3px_10px_var(--mobile-menu-shadow)] overflow-hidden"
							style={{ maxHeight: "75vh" }}
						>
							<div>
								<Link
									href="/"
									className="flex p-4 gap-3 hover:bg-mobile-menu-hover font-bold text-xl items-center border-b border-b-mobile-menu-border"
									onClick={() => setIsMenuOpen(false)}
									prefetch={true}
								>
									<LuHouse className="w-6 h-6" />
									{t("home")}
								</Link>
								<Link
									href="/cart"
									className="flex gap-3 p-4 hover:bg-mobile-menu-hover font-bold text-xl items-center border-b border-b-mobile-menu-border"
									onClick={() => setIsMenuOpen(false)}
									prefetch={true}
								>
									<ShoppingCart hiddenOnMobile={false} />
									{t("cart")}
								</Link>
								<Link
									href="/products"
									className="flex p-4 gap-3 hover:bg-mobile-menu-hover font-bold text-xl items-center border-b border-b-mobile-menu-border"
									onClick={() => setIsMenuOpen(false)}
									prefetch={true}
								>
									<LuPackage className="w-6 h-6" />
									{t("products")}
								</Link>
								<Link
									href="/login"
									className="flex p-4 gap-3 hover:bg-mobile-menu-hover font-bold text-xl items-center"
									onClick={() => setIsMenuOpen(false)}
									prefetch={true}
								>
									<LuLogIn className="w-6 h-6" />
									{t("signInMobile")}
								</Link>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
			{/* Search Overlay */}
			<AnimatePresence>
				{isSearchOpen && (
					<>
						{/* Dimmed backdrop */}
						<motion.div
							className="fixed inset-0 backdrop-blur-xs z-65"
							style={{
								backgroundColor: "var(--mobile-backdrop)",
							}}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsSearchOpen(false)}
						/>

						{/* Search Bar */}
						<motion.form
							onSubmit={handleSearch}
							initial={{ y: -50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -50, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
							className="fixed top-[5%] left-0 w-[90%] md:w-[50%] mx-auto rounded-lg border-2 right-0 z-70 bg-search-bg shadow-[3px_5px_10px_var(--product-card-shadow)] border-search-border p-3 flex items-center gap-1"
						>
							<LuSearch className="w-6 h-6 text-search-icon shrink-0" />
							<input
								ref={searchInputRef}
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder={t("searchPlaceholder")}
								className="flex-1 min-w-0 p-2 text-md border-none outline-none bg-transparent text-foreground"
								autoFocus
							/>
							<button
								type="button"
								onClick={() => {
									if (searchTerm.trim()) {
										setSearchTerm("");
										searchInputRef.current?.focus();
									} else {
										setIsSearchOpen(false);
									}
								}}
								className="p-2 rounded-full hover:bg-mobile-menu-hover transition shrink-0"
								aria-label={t("searchClearOrClose")}
							>
								{searchTerm.trim() ? (
									<BiSolidTagX className="w-6 h-6" />
								) : (
									<LuX className="w-6 h-6" />
								)}
							</button>
							{searchTerm.trim() && (
								<button
									type="submit"
									className="p-2 rounded-full hover:bg-mobile-menu-hover transition shrink-0"
									aria-label={t("searchSubmit")}
								>
									<LuSearch className="w-6 h-6" />
								</button>
							)}
						</motion.form>
					</>
				)}
			</AnimatePresence>
		</>
	);
};
