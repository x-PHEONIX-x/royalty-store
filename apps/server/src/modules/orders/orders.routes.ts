import { Router, type Router as ExpressRouter } from "express";

export const ordersRouter: ExpressRouter = Router();

ordersRouter.get("/", (_req, res) => {
	return res.json({ orders: [] });
});
