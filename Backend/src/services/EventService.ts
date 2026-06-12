import { EventRepository } from "../repositories/EventRepository";
import { Event } from "../entities/Event";
import { EventFile } from "../entities/EventFile";
import fs from "fs";
import path from "path";

export class EventService {
    private repo: EventRepository;

    constructor() {
        this.repo = new EventRepository();
    }

    async getAllEvents() {
        return this.repo.findAll();
    }

    async getEventById(id: string) {
        const event = await this.repo.findById(id);
        if (!event) throw new Error("Event not found");
        return event;
    }

    async createEvent(data: Partial<Event>) {
        if (!data.id) {
            data.id = data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
        }
        return this.repo.save(data);
    }

    async updateEvent(id: string, data: Partial<Event>) {
        const event = await this.repo.findById(id);
        if (!event) throw new Error("Event not found");
        
        // Merge data
        Object.assign(event, data);
        return this.repo.save(event);
    }

    async deleteEvent(id: string) {
        const event = await this.repo.findById(id);
        if (!event) return;

        // Delete main image
        if (event.image && event.image.includes('/uploads/')) {
            this.deleteFileFromDisk(event.image);
        }

        // Delete gallery images
        if (event.details?.gallery && Array.isArray(event.details.gallery)) {
            for (const imgUrl of event.details.gallery) {
                if (imgUrl && imgUrl.includes('/uploads/')) {
                    this.deleteFileFromDisk(imgUrl);
                }
            }
        }

        // Delete files
        if (event.files && Array.isArray(event.files)) {
            for (const file of event.files) {
                if (file.url && file.url.includes('/uploads/')) {
                    this.deleteFileFromDisk(file.url);
                }
            }
        }

        await this.repo.delete(id);
    }

    async addFileToEvent(eventId: string, fileData: Partial<EventFile>) {
        const event = await this.getEventById(eventId);
        fileData.event = event;
        if (!fileData.id) {
            fileData.id = Math.random().toString(36).substring(7);
        }
        return this.repo.saveFile(fileData);
    }

    async removeFileFromEvent(fileId: string) {
        // Get the file record first so we can delete from disk
        const file = await this.repo.findFileById(fileId);
        if (file && file.url) {
            this.deleteFileFromDisk(file.url);
        }
        await this.repo.deleteFile(fileId);
    }

    async removeImageFromEvent(eventId: string, imageUrl: string) {
        // Delete the physical file from disk
        this.deleteFileFromDisk(imageUrl);

        // Remove the URL from the event's gallery array
        const event = await this.getEventById(eventId);
        if (event.details && event.details.gallery) {
            event.details.gallery = event.details.gallery.filter(
                (img: string) => img !== imageUrl
            );
            await this.repo.save(event);
        }
        return event;
    }

    private deleteFileFromDisk(fileUrl: string) {
        try {
            // Extract filename from URL like http://localhost:5000/uploads/images/abc.png
            const urlPath = new URL(fileUrl).pathname; // /uploads/images/abc.png
            const filePath = path.join(__dirname, "../../", urlPath); // resolve to project root
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("Deleted file from disk:", filePath);
            } else {
                console.warn("File not found on disk:", filePath);
            }
        } catch (err) {
            console.error("Failed to delete file from disk:", err);
        }
    }
}
