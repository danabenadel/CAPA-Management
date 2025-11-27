import { capas } from '../models/data.js';

export const capaController = {
  // GET toutes les CAPA
  getAll: (req, res) => {
    try {
      res.json({
        success: true,
        data: capas,
        count: capas.length
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET une CAPA par ID
  getById: (req, res) => {
    try {
      const capa = capas.find(c => c.id === parseInt(req.params.id));
      if (!capa) {
        return res.status(404).json({ success: false, error: 'CAPA non trouvée' });
      }
      res.json({ success: true, data: capa });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST créer une nouvelle CAPA
  create: (req, res) => {
    try {
      const newCapa = {
        id: capas.length > 0 ? Math.max(...capas.map(c => c.id)) + 1 : 1,
        ...req.body,
        dateCreation: new Date().toISOString().split('T')[0]
      };
      capas.push(newCapa);
      res.status(201).json({ success: true, data: newCapa });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // PUT mettre à jour une CAPA
  update: (req, res) => {
    try {
      const index = capas.findIndex(c => c.id === parseInt(req.params.id));
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'CAPA non trouvée' });
      }
      capas[index] = { ...capas[index], ...req.body };
      res.json({ success: true, data: capas[index] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // DELETE supprimer une CAPA
  delete: (req, res) => {
    try {
      const index = capas.findIndex(c => c.id === parseInt(req.params.id));
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'CAPA non trouvée' });
      }
      const deleted = capas.splice(index, 1);
      res.json({ success: true, data: deleted[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET CAPA par statut
  getByStatus: (req, res) => {
    try {
      const filtered = capas.filter(c => c.statut.toLowerCase() === req.params.status.toLowerCase());
      res.json({ success: true, data: filtered, count: filtered.length });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};