import express from "express";
import cors from "cors";
import path from "path";
import { AppDataSource } from "./config/data-source";
import { eventRouter } from "./routes/eventRoutes";
import { teamRouter } from "./routes/teamRoutes";
import { adminRouter } from "./routes/adminRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory (using __dirname for safer cPanel deployment)
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

// API Routes
app.use("/api/events", eventRouter);
app.use("/api/test", (req,res)=>{
    res.send("Working...")
    
});
app.use("/api/team", teamRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connection established");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("TypeORM connection error: ", error));
