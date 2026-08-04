import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

export const adminRouter = Router();

adminRouter.post("/login", AdminController.login);
