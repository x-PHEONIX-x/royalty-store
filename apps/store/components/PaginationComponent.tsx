"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { MdMoreHoriz } from "react-icons/md";
type PaginationProps = {
	currentPage: number;
	totalPages: number;
};
const PaginationComponent = ({ currentPage, totalPages }: PaginationProps) => {
	const router = useRouter();
	const pathname = usePathname();

	// PAGE CHANGE HANDLER
	const handlePageChange = (page: number) => {
		const query: Record<string, string> = {};

		if (page > 1) {
			query.page = page.toString();
		}
		router.push(
			{
				pathname,
				query,
			},
			{ scroll: false }
		);
		// Scroll to top after page change
		setTimeout(() => {
			window.scrollTo({ top: 10, behavior: "smooth" });
		}, 300);
	};

	// ADD PAGE NUMBERS GENERATOR
	const generatePageNumbers = () => {
		const pages: (number | "...")[] = [];
		const showPages = 5;

		if (totalPages <= showPages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, "...", totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(
					1,
					"...",
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages
				);
			} else {
				pages.push(
					1,
					"...",
					currentPage - 1,
					currentPage,
					currentPage + 1,
					"...",
					totalPages
				);
			}
		}
		return pages;
	};
	return (
		<div className="flex items-center justify-center space-x-2 mt-4 md:mt-10">
			{/* Previous Button */}
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-3 py-2 rounded-lg border border-pagination-btn-border disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:bg-pagination-btn-disabled hover:bg-pagination-btn-hover transition-colors"
			>
				<LuChevronLeft className="w-4 h-4" />
			</button>

			{/* Page Numbers */}
			{generatePageNumbers().map((page, index) => (
				<button
					key={index}
					onClick={() =>
						typeof page === "number" && handlePageChange(page)
					}
					disabled={page === "..."}
					className={`py-2 rounded-lg border-2 transition-colors cursor-pointer ${
						page === currentPage
							? "bg-pagination-active-bg text-pagination-active-text border-pagination-active-border px-3 sm:px-4"
							: page === "..."
							? "border-transparent cursor-default px-1 sm:px-2"
							: "border-pagination-page-border hover:bg-pagination-page-hover px-3 sm:px-4"
					}`}
				>
					{page === "..." ? (
						<MdMoreHoriz className="w-4 h-4" />
					) : (
						page
					)}
				</button>
			))}

			{/* Next Button */}
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-3 py-2 rounded-lg border border-pagination-btn-border disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-pagination-btn-hover disabled:bg-pagination-btn-disabled transition-colors"
			>
				<LuChevronRight className="w-4 h-4" />
			</button>
		</div>
	);
};

export default PaginationComponent;
