import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FaFacebookSquare, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = async () => {
	const t = await getTranslations("footer");
	return (
		<div className="mt-16 p-4 flex items-center md:flex-col md:items-start md:justify-between gap-6 md:gap-0 bg-[#1d1d1d] border-t-2 border-gray-200">
			<div className="container mx-auto">
				<div
					dir="ltr"
					className="flex justify-between mx-0 md:mx-6 gap-4 items-center"
				>
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/logo-suit.png"
							alt="Logo"
							width={36}
							height={36}
							className="invert"
						/>
						<p className="text-lg md:text-2xl font-extrabold tracking-wider text-white text-nowrap">
							ROYALTY{" "}
							<span className="text-xs md:text-sm text-cyan-400">
								Store.
							</span>
						</p>
					</Link>
					<div className="text-gray-300 flex items-center gap-4">
						<p className="hidden md:block font-semibold text-md lg:text-lg">
							{t("tagline")}
						</p>
						<Link href="/products">
							<button className="p-2.5 lg:p-4 text-nowrap border-2 hover:border-white border-black shadow-md shadow-gray-800 hover:bg-gray-100/80 bg-white transition-all duration-300 font-bold text-black rounded-md text-shadow-md text-sm md:text-lg cursor-pointer">
								{t("startShopping")}
							</button>
						</Link>
					</div>
				</div>

				<hr className="hidden md:block border-white my-4 w-full" />

				<div className="hidden md:flex mt-0 mb-[15px] justify-around items-center gap-4">
					{/* Contact */}
					<div className="flex flex-col gap-3 text-sm text-gray-400 items-center">
						<p className="text-lg tracking-wider font-bold text-white">
							{t("contactUs")}
						</p>
						<span>{t("tel")}</span>
						<span>{t("email")}</span>
						<span>{t("location")}</span>
						<span>{t("service")}</span>
					</div>

					{/* Links */}
					<div className="flex flex-col gap-3 text-sm text-gray-400 items-center">
						<p className="text-lg tracking-wider font-bold text-white">
							{t("links")}
						</p>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("homepage")}
						</Link>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("contact")}
						</Link>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("terms")}
						</Link>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("privacy")}
						</Link>
					</div>

					{/* Products */}
					<div className="flex flex-col gap-3 text-sm text-gray-400 items-center">
						<p className="text-lg tracking-wider font-bold text-white">
							{t("products")}
						</p>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("allProducts")}
						</Link>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("newArrivals")}
						</Link>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("bestSellers")}
						</Link>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("sale")}
						</Link>
					</div>

					{/* Company */}
					<div className="flex flex-col gap-3 text-sm text-gray-400 items-center">
						<p className="text-lg tracking-wider font-bold text-white">
							{t("company")}
						</p>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("aboutUs")}
						</Link>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("contact")}
						</Link>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("blog")}
						</Link>
						<Link
							href="/"
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("affiliate")}
						</Link>
					</div>
				</div>

				<hr className="border-white mt-6 mb-4 w-full" />

				<div className="flex flex-col md:flex-row justify-around items-center">
					<div className="text-center mb-2">
						<h2 className="text-white font-bold text-lg mb-4">
							{t("joinCommunityTitle")}
						</h2>
						<p className="text-gray-300">
							{t("joinCommunityTextLine1")}
							<br />
							{t("joinCommunityTextLine2")}
							<br />
							{t("joinCommunityTextLine3")}
						</p>
						<p className="text-white text-lg font-extrabold my-2 block md:hidden">
							{t("availableOnMobile")}
						</p>
					</div>

					<div
						dir="ltr"
						className="flex justify-center items-center gap-8"
					>
						<Link
							href="https://www.facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaFacebookSquare className="h-10 md:h-14 w-10 md:w-14 hover:scale-110 text-[#1851cd] md:text-gray-300 drop-shadow-[0_0_3px_#1851cd] md:drop-shadow-none transition-all duration-200 hover:text-[#1851cd] hover:drop-shadow-[0_0_3px_#1851cd]" />
						</Link>
						<Link
							href="https://www.instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaInstagram className="h-10 md:h-14 w-10 md:w-14 hover:scale-110 text-[#e1306c] md:text-gray-300 drop-shadow-[0_0_3px_#e1306c] md:drop-shadow-none transition-all duration-200 hover:text-[#e1306c] hover:drop-shadow-[0_0_3px_#e1306c]" />
						</Link>
						<Link
							href="https://www.twitter.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaXTwitter className="h-10 md:h-14 w-10 md:w-14 hover:scale-110 text-white md:text-gray-300 drop-shadow-[0_0_3px_white] md:drop-shadow-none transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_3px_white]" />
						</Link>
						<Link
							href="https://www.linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaTiktok className="h-10 md:h-14 w-10 md:w-14 hover:scale-110 text-white md:text-gray-300 drop-shadow-[0_0_3px_white] md:drop-shadow-none transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_3px_white]" />
						</Link>
					</div>
				</div>

				<hr className="border-white mt-6 mb-2 w-full" />

				<div dir="ltr" className="flex justify-between items-center">
					<p className="flex-1 text-center md:text-start text-sm md:text-md text-gray-300">
						&copy; 2025
						<span className="text-md md:text-lg text-white font-extrabold">
							{" "}
							ROYALTY.{" "}
						</span>
						{t("rightsReserved")}
					</p>
					<div className="hidden md:flex gap-8 text-gray-300">
						<p>{t("privacyShort")}</p>
						<p>{t("termsShort")}</p>
						<p>{t("cookiesShort")}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
