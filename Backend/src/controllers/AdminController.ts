import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Admin } from "../entities/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AdminController {
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;

            const adminRepository = AppDataSource.getRepository(Admin);
            const admin = await adminRepository.findOne({ where: { username } });

            if (!admin) {
                res.status(401).json({ message: "Invalid username or password" });
                return;
            }

            const isValidPassword = await bcrypt.compare(password, admin.password);
            if (!isValidPassword) {
                res.status(401).json({ message: "Invalid username or password" });
                return;
            }

            const token = jwt.sign(
                { id: admin.id, username: admin.username },
                process.env.JWT_SECRET || "default_super_secret_key_123!",
                { expiresIn: "24h" }
            );

            res.json({ token, message: "Login successful" });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
