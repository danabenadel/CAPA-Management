import express from 'express';
import { capaController } from '../controllers/capa.controller.js';

const router = express.Router();

// GET toutes les CAPA
router.get('/', capaController.getAll);

// GET CAPA par statut
router.get('/status/:status', capaController.getByStatus);

// GET une CAPA par ID
router.get('/:id', capaController.getById);

// POST créer une nouvelle CAPA
router.post('/', capaController.create);

// PUT mettre à jour une CAPA
router.put('/:id', capaController.update);

// DELETE supprimer une CAPA
router.delete('/:id', capaController.delete);

export default router;
