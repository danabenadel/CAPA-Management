import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-originalName
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter (optional: restrict types if needed, but requirements just said < 20MB)
const fileFilter = (req, file, cb) => {
    // Accept all files for now, or filter by mimetype
    // const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    // if (allowedTypes.includes(file.mimetype)) {
    //     cb(null, true);
    // } else {
    //     cb(new Error('Invalid file type'), false);
    // }
    cb(null, true);
};

// Limits
const limits = {
    fileSize: 20 * 1024 * 1024 // 20 MB in bytes
};

export const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
});
