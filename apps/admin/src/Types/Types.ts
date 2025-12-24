export type UserData = {
	Role: "Admin" | "Customer" | "Moderator";
	isVerified: boolean;
	isAdmin: boolean;
	isBanned: boolean;
	isSuspicious: boolean;
	orderCount: number;
	userName: string;
	email: string;
	phone: string;
	wilaya: string;
	city?: string;
	address?: string;
	CreatedAt: string;
	remark?: string;
};
