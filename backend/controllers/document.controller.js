import prisma from '../config/prisma.js';

export const documentController = {
    // GET documents for an entity
    getByEntity: async (req, res) => {
        try {
            const { type, id } = req.params; // e.g. /api/documents/QUALITY_EVENT/1
            const docs = await prisma.document.findMany({
                where: {
                    relatedEntityType: type,
                    relatedEntityId: parseInt(id),
                    isDeleted: false
                }
            });
            res.json({ success: true, data: docs });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // POST create document (Upload handled by Multer middleware)
    create: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, error: 'No file uploaded' });
            }

            const { originalname, mimetype, size, filename, path: filePath } = req.file;
            const { relatedEntityType, relatedEntityId, documentType, documentCategory, description, uploadedByUserId } = req.body;

            const doc = await prisma.document.create({
                data: {
                    relatedEntityType,
                    relatedEntityId: parseInt(relatedEntityId),
                    documentType,
                    documentCategory,
                    fileName: filename, // Stored filename (unique)
                    originalFileName: originalname,
                    filePath: filePath, // Relative path from multer config
                    fileSizeKb: Math.round(size / 1024),
                    mimeType: mimetype,
                    description,
                    uploadedByUserId: uploadedByUserId ? parseInt(uploadedByUserId) : null,
                    uploadDate: new Date()
                }
            });
            res.status(201).json({ success: true, data: doc });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // DELETE soft delete document
    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await prisma.document.update({
                where: { id },
                data: {
                    isDeleted: true,
                    deletedAt: new Date(),
                    // deletedByUserId: req.user.id // If auth context available
                }
            });
            res.json({ success: true, message: 'Document deleted' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
