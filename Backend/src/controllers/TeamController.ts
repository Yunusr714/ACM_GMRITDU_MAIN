import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { TeamMember } from "../entities/TeamMember";

export class TeamController {
    private repository = AppDataSource.getRepository(TeamMember);

    getAll = async (req: Request, res: Response) => {
        try {
            const members = await this.repository.find({ order: { createdAt: "ASC" } });
            res.json(members);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch team members" });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const member = await this.repository.findOne({ where: { id: req.params.id as string } });
            if (!member) {
                return res.status(404).json({ error: "Team member not found" });
            }
            res.json(member);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch team member" });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const newMember = this.repository.create(req.body);
            const saved = await this.repository.save(newMember);
            res.status(201).json(saved);
        } catch (error) {
            res.status(500).json({ error: "Failed to create team member" });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const member = await this.repository.findOne({ where: { id: req.params.id as string } });
            if (!member) {
                return res.status(404).json({ error: "Team member not found" });
            }
            this.repository.merge(member, req.body);
            const updated = await this.repository.save(member);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: "Failed to update team member" });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const result = await this.repository.delete(req.params.id);
            if (result.affected === 0) {
                return res.status(404).json({ error: "Team member not found" });
            }
            res.json({ message: "Team member deleted" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete team member" });
        }
    };

    uploadImage = async (req: Request, res: Response) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: "No image provided" });
            }

            const member = await this.repository.findOne({ where: { id: req.params.id as string } });
            if (!member) {
                return res.status(404).json({ error: "Team member not found" });
            }

            const protocol = req.protocol;
            const host = req.get("host");
            const imageUrl = `${protocol}://${host}/${file.path.replace(/\\/g, "/")}`;

            member.image = imageUrl;
            const updated = await this.repository.save(member);

            res.json(updated);
        } catch (error) {
            console.error("Upload error:", error);
            res.status(500).json({ error: "Failed to upload image" });
        }
    };
}
