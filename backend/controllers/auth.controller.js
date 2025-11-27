import { users, currentUser } from '../models/data.js';

export const authController = {
  // POST connexion
  login: (req, res) => {
    try {
      const { email, password } = req.body;

      // Simulation de connexion (à remplacer par une vraie authentification)
      const user = users.find(u => u.email === email);

      if (!user) {
        return res.status(401).json({ success: false, error: 'Email ou mot de passe incorrect' });
      }

      // En production, vérifier le mot de passe hashé
      // Pour la démo, on accepte n'importe quel mot de passe

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            role: user.role,
            departement: user.departement
          },
          token: 'demo_token_' + Date.now() // En production, générer un vrai JWT
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST déconnexion
  logout: (req, res) => {
    try {
      res.json({ success: true, message: 'Déconnexion réussie' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET profil utilisateur
  getProfile: (req, res) => {
    try {
      // En production, récupérer l'utilisateur depuis le token
      res.json({ success: true, data: currentUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};