import prisma from '../config/prisma.js';

export const userController = {
  // GET tous les utilisateurs
  getAll: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        orderBy: { id: 'asc' },
        include: {
          role: true,
          department: true
        }
      });
      res.json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET un utilisateur par ID ou Email ou Username
  getById: async (req, res) => {
    try {
      const param = req.params.id;
      let query;

      if (!isNaN(param)) {
        query = { id: parseInt(param) };
      } else if (param.includes('@')) {
        query = { email: param };
      } else {
        query = { username: param };
      }

      const user = await prisma.user.findFirst({
        where: query,
        include: {
          role: true,
          department: true,
          managedDepartments: true
        }
      });

      if (!user) {
        return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST créer un nouvel utilisateur
  create: async (req, res) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          ...req.body,
          isActive: true
        },
        include: {
          role: true,
          department: true
        }
      });
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // PUT mettre à jour un utilisateur
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const existing = await prisma.user.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
      }

      const updated = await prisma.user.update({
        where: { id },
        data: req.body,
        include: {
          role: true,
          department: true
        }
      });

      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // DELETE supprimer un utilisateur
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const existing = await prisma.user.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
      }

      // Soft delete preferred? Schema has isActive.
      // For now, implementing hard delete as requested, but standard practice is soft delete.
      await prisma.user.delete({ where: { id } });

      res.json({ success: true, message: 'Utilisateur supprimé', data: existing });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};