import { ReactNode } from "react";

export const metadata = {
	title: "Your Cart | ROYALTY",
	description: "Review the products in your shopping cart before checkout.",
};
type CartLayoutProps = {
	children: ReactNode;
};

export default function CartLayout({ children }: CartLayoutProps) {
	return <>{children}</>;
}
