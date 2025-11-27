import { users } from '../models/data.js';

export const userController = {
  // GET tous les utilisateurs
  getAll: (req, res) => {
    try {
      res.json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET un utilisateur par ID
  getById: (req, res) => {
    try {
      const user = users.find(u => u.id === parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST créer un nouvel utilisateur
  create: (req, res) => {
    try {
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...req.body,
        statut: 'Actif'
      };
      users.push(newUser);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // PUT mettre à jour un utilisateur
  update: (req, res) => {
    try {
      const index = users.findIndex(u => u.id === parseInt(req.params.id));
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
      }
      users[index] = { ...users[index], ...req.body };
      res.json({ success: true, data: users[index] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // DELETE supprimer un utilisateur
  delete: (req, res) => {
    try {
      const index = users.findIndex(u => u.id === parseInt(req.params.id));
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
      }
      const deleted = users.splice(index, 1);
      res.json({ success: true, data: deleted[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};