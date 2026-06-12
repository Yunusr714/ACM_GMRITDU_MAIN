import { AppDataSource } from "../config/data-source";
import { Event } from "../entities/Event";
import { EventFile } from "../entities/EventFile";

export class EventRepository {
    private repo = AppDataSource.getRepository(Event);
    private fileRepo = AppDataSource.getRepository(EventFile);

    async findAll(): Promise<Event[]> {
        return this.repo.find();
    }

    async findById(id: string): Promise<Event | null> {
        return this.repo.findOneBy({ id });
    }

    async save(event: Partial<Event>): Promise<Event> {
        return this.repo.save(event);
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    async saveFile(file: Partial<EventFile>): Promise<EventFile> {
        return this.fileRepo.save(file);
    }

    async deleteFile(fileId: string): Promise<void> {
        await this.fileRepo.delete(fileId);
    }

    async findFileById(fileId: string): Promise<EventFile | null> {
        return this.fileRepo.findOneBy({ id: fileId });
    }
}
