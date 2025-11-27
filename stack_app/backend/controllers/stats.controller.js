import { capas } from '../models/data.js';

export const statsController = {
  // GET statistiques du dashboard
  getDashboard: (req, res) => {
    try {
      const stats = {
        totalCapas: capas.length,
        ouvertes: capas.filter(c => c.statut === 'Ouverte').length,
        enCours: capas.filter(c => c.statut === 'En cours').length,
        cloturees: capas.filter(c => c.statut === 'Clôturée').length,
        correctives: capas.filter(c => c.type === 'Corrective').length,
        preventives: capas.filter(c => c.type === 'Préventive').length,
        prioriteHaute: capas.filter(c => c.priorite === 'Haute').length,
        prioriteMoyenne: capas.filter(c => c.priorite === 'Moyenne').length,
        prioriteBasse: capas.filter(c => c.priorite === 'Basse').length,
      };

      // Données pour les graphiques
      const capaParMois = {
        janvier: 5,
        fevrier: 8,
        mars: 12,
        avril: 7,
        mai: 10,
        juin: 9,
        juillet: 11,
        aout: 6,
        septembre: 13,
        octobre: 8,
        novembre: 15,
        decembre: 10
      };

      const capaParDepartement = [
        { departement: 'Qualité', count: 25 },
        { departement: 'Production', count: 35 },
        { departement: 'Laboratoire', count: 20 },
        { departement: 'Maintenance', count: 15 },
      ];

      res.json({
        success: true,
        data: {
          stats,
          capaParMois,
          capaParDepartement,
          capasRecentes: capas.slice(0, 5)
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET statistiques par période
  getByPeriod: (req, res) => {
    try {
      const { period } = req.params;

      // Simulation de données par période
      const data = {
        week: { total: 5, new: 2, closed: 1 },
        month: { total: 15, new: 8, closed: 5 },
        year: { total: 120, new: 45, closed: 38 }
      };

      res.json({
        success: true,
        data: data[period] || data.month
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};