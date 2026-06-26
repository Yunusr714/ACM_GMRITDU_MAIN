import { Router } from "express";
import { TeamController } from "../controllers/TeamController";
import { upload } from "../middlewares/multer";

export const teamRouter = Router();
const controller = new TeamController();

teamRouter.get("/", controller.getAll);
teamRouter.get("/:id", controller.getById);
teamRouter.post("/", controller.create);
teamRouter.put("/:id", controller.update);
teamRouter.delete("/:id", controller.delete);

// Image Upload
teamRouter.post("/:id/image", upload.single("file"), controller.uploadImage);
