import prisma from '../config/prisma.js';

export const auditController = {
    // GET logs (optionally filtered by entity)
    getLogs: async (req, res) => {
        try {
            const { entityType, entityId } = req.query;
            const where = {};

            if (entityType) where.entityType = entityType;
            if (entityId) where.entityId = parseInt(entityId);

            const logs = await prisma.auditLog.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { username: true } } },
                take: 100 // Limit 100
            });
            res.json({ success: true, data: logs });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
