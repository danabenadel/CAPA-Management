import express from 'express';
import { authController } from '../controllers/auth.controller.js';

const router = express.Router();

// POST connexion
router.post('/login', authController.login);

// POST déconnexion
router.post('/logout', authController.logout);

// GET profil utilisateur
router.get('/profile', authController.getProfile);

export default router;