import { Request, Response } from "express";
import { EventService } from "../services/EventService";

export class EventController {
    private service: EventService;

    constructor() {
        this.service = new EventService();
    }

    getAllEvents = async (req: Request, res: Response) => {
        try {
            const events = await this.service.getAllEvents();
            res.json(events);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    getEventById = async (req: Request, res: Response) => {
        try {
            const event = await this.service.getEventById(req.params.id as string);
            res.json(event);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    };

    createEvent = async (req: Request, res: Response) => {
        try {
            const event = await this.service.createEvent(req.body);
            res.status(201).json(event);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    updateEvent = async (req: Request, res: Response) => {
        try {
            const event = await this.service.updateEvent(req.params.id as string, req.body);
            res.json(event);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteEvent = async (req: Request, res: Response) => {
        try {
            await this.service.deleteEvent(req.params.id as string);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    uploadFile = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            
            const fileUrl = `http://localhost:5000/uploads/documents/${req.file.filename}`;
            
            const fileData = {
                name: req.file.originalname,
                url: fileUrl,
                size: (req.file.size / 1024).toFixed(2) + " KB"
            };

            const savedFile = await this.service.addFileToEvent(req.params.id as string, fileData);
            res.status(201).json(savedFile);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteFile = async (req: Request, res: Response) => {
        try {
            await this.service.removeFileFromEvent(req.params.fileId as string);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
    
    uploadImage = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            
            const imageUrl = `http://localhost:5000/uploads/images/${req.file.filename}`;
            res.status(201).json({ url: imageUrl });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteImage = async (req: Request, res: Response) => {
        try {
            const { imageUrl } = req.body;
            if (!imageUrl) {
                return res.status(400).json({ error: "imageUrl is required" });
            }
            const event = await this.service.removeImageFromEvent(req.params.id as string, imageUrl);
            res.json(event);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
