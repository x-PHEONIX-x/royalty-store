import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.string().default("4000"),
	MONGODB_URI: z.string(),
});

export const env = envSchema.parse(process.env);
