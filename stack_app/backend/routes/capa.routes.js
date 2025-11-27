import express from 'express';
import { capaController } from '../controllers/capa.controller.js';

const router = express.Router();

// GET toutes les CAPA
router.get('/', capaController.getAll);

// GET une CAPA par ID
router.get('/:id', capaController.getById);

// POST créer une nouvelle CAPA
router.post('/', capaController.create);

// PUT mettre à jour une CAPA
router.put('/:id', capaController.update);

// DELETE supprimer une CAPA
router.delete('/:id', capaController.delete);

// GET CAPA par statut
router.get('/status/:status', capaController.getByStatus);

export default router;