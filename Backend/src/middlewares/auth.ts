import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    admin?: any;
}

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authentication required" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_super_secret_key_123!");
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
