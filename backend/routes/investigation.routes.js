import express from 'express';
import { investigationController } from '../controllers/investigation.controller.js';

const router = express.Router();

router.get('/', investigationController.getAll);
router.get('/:id', investigationController.getById);
router.post('/', investigationController.create);
router.put('/:id', investigationController.update);
router.post('/:id/ishikawa', investigationController.addIshikawa);
router.post('/:id/cause', investigationController.addCause);

export default router;
