import prisma from '../config/prisma.js';

export const capaController = {
  // GET toutes les CAPA
  getAll: async (req, res) => {
    try {
      const capas = await prisma.capa.findMany({
        orderBy: { id: 'desc' },
        include: {
          initiator: {
            select: {
              firstName: true,
              lastName: true,
              department: true
            }
          },
          actions: true,
          qualityEvent: { select: { eventNumber: true } }
        }
      });
      res.json({
        success: true,
        data: capas,
        count: capas.length
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET une CAPA par ID ou Numéro
  getById: async (req, res) => {
    try {
      const param = req.params.id;
      const query = isNaN(param) ? { capaNumber: param } : { id: parseInt(param) };

      const capa = await prisma.capa.findUnique({
        where: query,
        include: {
          initiator: { select: { firstName: true, lastName: true } },
          approver: { select: { firstName: true, lastName: true } },
          closer: { select: { firstName: true, lastName: true } },
          actions: {
            include: {
              responsibleUser: { select: { firstName: true, lastName: true } }
            }
          },
          qualityEvent: true,
          riskAnalysis: true,
          effectiveness: true,
          extensions: true
        }
      });

      if (!capa) {
        return res.status(404).json({ success: false, error: 'CAPA non trouvée' });
      }
      res.json({ success: true, data: capa });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST créer une nouvelle CAPA
  create: async (req, res) => {
    try {
      const { eventId, riskAnalysisId, initiatorUserId, ...data } = req.body;

      // Génération automatique du numéro CAPA: AA/CPA/XXX
      const year = new Date().getFullYear().toString().slice(-2);
      const count = await prisma.capa.count();
      const sequence = (count + 1).toString().padStart(3, '0');
      const capaNumber = `${year}/CPA/${sequence}`;

      const newCapa = await prisma.capa.create({
        data: {
          ...data,
          capaNumber,
          eventId,
          riskAnalysisId,
          initiatorUserId,
          initiationDate: new Date(),
          status: 'CREE'
        }
      });

      res.status(201).json({ success: true, data: newCapa });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // PUT mettre à jour une CAPA
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const existing = await prisma.capa.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ success: false, error: 'CAPA non trouvée' });
      }

      const updated = await prisma.capa.update({
        where: { id },
        data: req.body
      });

      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // DELETE supprimer une CAPA
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      // Note: check permissions, usually deleting a CAPA is restricted

      await prisma.capa.delete({ where: { id } });
      res.json({ success: true, message: 'CAPA supprimée' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET CAPA stats
  getStats: async (req, res) => {
    // Implement statistics if needed locally or delegate to stats controller
    res.json({ message: "Use stats controller" });
  },

  // GET CAPA par statut
  getByStatus: async (req, res) => {
    try {
      const filtered = await prisma.capa.findMany({
        where: { status: { equals: req.params.status, mode: 'insensitive' } }
      });
      res.json({ success: true, data: filtered, count: filtered.length });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};