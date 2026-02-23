import express from 'express';
import { statsController } from '../controllers/stats.controller.js';

const router = express.Router();

// GET statistiques du dashboard
router.get('/dashboard', statsController.getDashboard);

// GET statistiques par période
router.get('/period/:period', statsController.getByPeriod);

export default router;