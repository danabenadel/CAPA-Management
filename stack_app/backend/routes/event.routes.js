import express from 'express';
import { eventController } from '../controllers/event.controller.js';

const router = express.Router();

router.get('/', eventController.getAll);
router.get('/:id', eventController.getById);
router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.post('/:id/immediate-action', eventController.addImmediateAction);
router.post('/:id/evaluate', eventController.evaluate);
router.post('/:id/investigation', eventController.createInvestigation);
router.post('/investigation/:invId/ishikawa', eventController.addIshikawaCause);
router.delete('/ishikawa/:causeId', eventController.deleteIshikawaCause);
router.post('/investigation/:invId/root-cause', eventController.identifyRootCause);
router.delete('/root-cause/:causeId', eventController.removeIdentifiedCause);

router.post('/investigation/:invId/solutions', eventController.addSolution);
router.patch('/solutions/:solId', eventController.updateSolution);
router.delete('/solutions/:solId', eventController.deleteSolution);

router.post('/investigation/:invId/close', eventController.closeInvestigation);

// CAPA
router.post('/:id/capa', eventController.initCapa);
router.post('/capa/:capaId/actions', eventController.addCapaAction);
router.put('/capa/actions/:actionId', eventController.updateCapaAction);
router.delete('/capa/actions/:actionId', eventController.deleteCapaAction);
router.post('/capa/:capaId/effectiveness', eventController.saveCapaEffectiveness);
router.post('/capa/:capaId/close', eventController.closeCapa);

export default router;
