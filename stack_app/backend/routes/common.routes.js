import express from 'express';
import { documentController } from '../controllers/document.controller.js';
import { notificationController } from '../controllers/notification.controller.js';
import { auditController } from '../controllers/audit.controller.js';

import { upload } from '../config/upload.js';

const router = express.Router();

// Documents
router.get('/documents/:type/:id', documentController.getByEntity);
router.post('/documents', upload.single('file'), documentController.create);
router.delete('/documents/:id', documentController.delete);

// Notifications
router.get('/notifications/:userId', notificationController.getMyNotifications);
router.put('/notifications/:id/read', notificationController.markAsRead);

// Audit
router.get('/audit', auditController.getLogs);

export default router;
