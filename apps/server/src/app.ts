import cors from "cors";
import express, { Application, json } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./modules/auth/auth.routes";
import { ordersRouter } from "./modules/orders/orders.routes";
import { productsRouter } from "./modules/products/products.routes";

export const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(json());

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

app.get("/health", (_req, res) => {
	res.json({ ok: true });
});
