import type { ProductType } from "@/types/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = ProductType & {
	selectedColor: string | null;
	selectedSize: string | null;
	quantity: number;
};
type CartStore = {
	cart: CartItem[];
	hasHydrated: boolean;
	addToCart: (product: CartItem) => void;
	removeFromCart: (product: CartItem) => void;
	clearCart: () => void;
	increaseQuantity: (product: CartItem) => void;
	decreaseQuantity: (product: CartItem) => void;
	setQuantity: (product: CartItem, quantity: number | string) => void;
};
const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			cart: [],
			hasHydrated: false,
			addToCart: (product) =>
				set((state) => {
					const existingIndex = state.cart.findIndex(
						(p) =>
							p.id === product.id &&
							p.selectedColor === product.selectedColor &&
							p.selectedSize === product.selectedSize
					);
					if (existingIndex !== -1) {
						const updatedCart = [...state.cart];
						updatedCart[existingIndex]!.quantity +=
							product.quantity || 1;
						return { cart: updatedCart };
					}
					return {
						cart: [...state.cart, product],
					};
				}),
			removeFromCart: (product) =>
				set((state) => ({
					cart: state.cart.filter(
						(p) =>
							!(
								p.id === product.id &&
								p.selectedColor === product.selectedColor &&
								p.selectedSize === product.selectedSize
							)
					),
				})),
			clearCart: () => set(() => ({ cart: [] })),
			increaseQuantity: (product) =>
				set((state) => ({
					cart: state.cart.map((item) =>
						item.id === product.id &&
						item.selectedColor === product.selectedColor &&
						item.selectedSize === product.selectedSize
							? { ...item, quantity: item.quantity + 1 }
							: item
					),
				})),

			decreaseQuantity: (product) =>
				set((state) => ({
					cart: state.cart.map((item) =>
						item.id === product.id &&
						item.selectedColor === product.selectedColor &&
						item.selectedSize === product.selectedSize &&
						item.quantity > 1
							? { ...item, quantity: item.quantity - 1 }
							: item
					),
				})),

			setQuantity: (product, quantity) =>
				set((state) => ({
					cart: state.cart.map((item) =>
						item.id === product.id &&
						item.selectedColor === product.selectedColor &&
						item.selectedSize === product.selectedSize
							? { ...item, quantity: Number(quantity) }
							: item
					),
				})),
		}),
		{
			name: "cart",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.hasHydrated = true;
				}
			},
		}
	)
);

export default useCartStore;
