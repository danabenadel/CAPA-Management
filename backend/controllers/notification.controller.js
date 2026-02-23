import prisma from '../config/prisma.js';

export const notificationController = {
    // GET notifications for a user
    getMyNotifications: async (req, res) => {
        try {
            const userId = parseInt(req.params.userId); // In real app, get from req.user
            const notifs = await prisma.notification.findMany({
                where: {
                    userId,
                    isDeleted: false
                },
                orderBy: { createdAt: 'desc' }
            });
            res.json({ success: true, data: notifs });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // PUT mark as read
    markAsRead: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const updated = await prisma.notification.update({
                where: { id },
                data: {
                    isRead: true,
                    readAt: new Date()
                }
            });
            res.json({ success: true, data: updated });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
