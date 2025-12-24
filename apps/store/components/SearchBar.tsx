"use client";

import { useRouter } from "@/i18n/routing";
import { useState, type FormEvent } from "react";
import { LuSearch } from "react-icons/lu";

export const SearchBar = () => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!searchTerm.trim()) return;
		router.push(
			`/products?search=${encodeURIComponent(searchTerm.trim())}`
		);
	};
	return (
		<form
			onSubmit={handleSearch}
			className="hidden md:flex mr-4 lg:mr-8 items-center gap-2 rounded-md ring-2 ring-gray-700 bg-white px-2 shadow-lg focus-within:ring-black focus-within:shadow-gray-900 transition-all duration-300 ease-in-out"
		>
			<LuSearch className="w-5 h-5 text-gray-400" />
			<input
				id="Search"
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search..."
				className="peer text-sm outline-none py-2 bg-transparent flex-1"
			/>
			<button
				type="submit"
				className="p-1 text-black hover:scale-110 transition-all duration-200 opacity-0 peer-focus:opacity-100"
			>
				<LuSearch className="w-5 h-5" />
			</button>
		</form>
	);
};
