import { Router, type Router as ExpressRouter } from "express";

export const productsRouter: ExpressRouter = Router();

productsRouter.get("/", (_req, res) => {
	return res.json({ items: [] });
});
