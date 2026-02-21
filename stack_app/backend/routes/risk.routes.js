import express from 'express';
import { riskController } from '../controllers/risk.controller.js';

const router = express.Router();

router.get('/', riskController.getAll);
router.get('/:id', riskController.getById);
router.post('/', riskController.create);
router.put('/:id', riskController.update);
router.post('/:id/item', riskController.addItem);

export default router;
