import express from 'express';
import { userController } from '../controllers/user.controller.js';

const router = express.Router();

// GET tous les utilisateurs
router.get('/', userController.getAll);

// GET un utilisateur par ID
router.get('/:id', userController.getById);

// POST créer un nouvel utilisateur
router.post('/', userController.create);

// PUT mettre à jour un utilisateur
router.put('/:id', userController.update);

// DELETE supprimer un utilisateur
router.delete('/:id', userController.delete);



export default router;