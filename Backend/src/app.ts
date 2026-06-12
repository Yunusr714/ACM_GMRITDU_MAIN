import express from "express";
import cors from "cors";
import path from "path";
import { AppDataSource } from "./config/data-source";
import { eventRouter } from "./routes/eventRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API Routes
app.use("/api/events", eventRouter);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("TypeORM connection error: ", error));
