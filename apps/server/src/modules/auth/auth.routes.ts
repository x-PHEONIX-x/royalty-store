import { Router, type Router as ExpressRouter } from "express";

export const authRouter: ExpressRouter = Router();

authRouter.post("/login", (_req, res) => {
	return res.json({ ok: true });
});
