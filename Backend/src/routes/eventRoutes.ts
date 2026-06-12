import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { upload } from "../middlewares/multer";

export const eventRouter = Router();
const controller = new EventController();

// Basic CRUD
eventRouter.get("/", controller.getAllEvents);
eventRouter.get("/:id", controller.getEventById);
eventRouter.post("/", controller.createEvent);
eventRouter.put("/:id", controller.updateEvent);
eventRouter.delete("/:id", controller.deleteEvent);

// File and Image Uploads
eventRouter.post("/:id/files", upload.single("file"), controller.uploadFile);
eventRouter.delete("/:id/files/:fileId", controller.deleteFile);
eventRouter.post("/:id/images", upload.single("file"), controller.uploadImage);
eventRouter.delete("/:id/images", controller.deleteImage);
