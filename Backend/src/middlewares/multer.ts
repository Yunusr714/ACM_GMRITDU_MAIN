import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure directories exist
const ensureDir = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isImage = file.mimetype.startsWith("image/");
        const folder = isImage ? "images" : "documents";
        
        // __dirname is dist/middlewares, so we go up two levels to reach the root uploads dir
        const uploadPath = path.join(__dirname, "../../uploads", folder);
        
        ensureDir(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({ storage });
