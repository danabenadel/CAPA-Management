import prisma from '../config/prisma.js';

export const statsController = {
  // GET statistiques du dashboard
  getDashboard: async (req, res) => {
    try {
      // 1. KPI Globaux
      const totalCapas = await prisma.capa.count();
      const ouvertes = await prisma.capa.count({ where: { status: 'CREE' } });
      const enCours = await prisma.capa.count({ where: { status: 'EN_COURS' } });
      const cloturees = await prisma.capa.count({ where: { status: 'CLOTURE' } });

      // 2. Par Departement (Utilisateurs initiateurs)
      const allCapas = await prisma.capa.findMany({
        include: {
          initiator: {
            include: { department: true }
          }
        }
      });

      const deptCounts = {};
      allCapas.forEach(c => {
        const deptName = c.initiator?.department?.departmentName || 'Non défini';
        deptCounts[deptName] = (deptCounts[deptName] || 0) + 1;
      });

      const capaParDepartement = Object.entries(deptCounts).map(([departement, nombre]) => ({ departement, nombre }));

      const correctives = await prisma.capaAction.count({ where: { actionType: 'CORRECTIVE' } });
      const preventives = await prisma.capaAction.count({ where: { actionType: 'PREVENTIVE' } });

      // 3. Graphique par Mois (Current Year)
      const currentYear = new Date().getFullYear();
      const capasThisYear = await prisma.capa.findMany({
        where: {
          initiationDate: {
            gte: new Date(currentYear, 0, 1),
            lt: new Date(currentYear + 1, 0, 1)
          }
        },
        select: { initiationDate: true }
      });

      const capaParMois = {};
      const moisLabels = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
      moisLabels.forEach(m => capaParMois[m] = 0);

      capasThisYear.forEach(c => {
        const month = c.initiationDate.getMonth();
        capaParMois[moisLabels[month]]++;
      });

      // 4. CAPA Récentes (Last 5)
      const recentDbCapas = await prisma.capa.findMany({
        take: 5,
        orderBy: { initiationDate: 'desc' },
        include: {
          initiator: true
        }
      });

      const mapStatus = (status) => {
        if (status === 'CREE') return 'Ouverte';
        if (status === 'CLOTURE') return 'Clôturée';
        return 'En cours';
      };

      const capasRecentes = recentDbCapas.map(c => ({
        id: c.id,
        titre: c.capaNumber,
        type: 'Qualité Systémique', // Mock type
        statut: mapStatus(c.status),
        priorite: ['Haute', 'Moyenne', 'Basse'][Math.floor(Math.random() * 3)], // Mock priority
        responsable: `${c.initiator?.firstName || ''} ${c.initiator?.lastName || ''}`.trim() || c.initiator?.username
      }));

      res.json({
        success: true,
        data: {
          stats: {
            totalCapas,
            ouvertes,
            enCours,
            cloturees,
            correctives,
            preventives
          },
          capaParMois,
          capaParDepartement,
          capasRecentes
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET statistiques par période
  getByPeriod: (req, res) => {
    // Placeholder - to be implemented with real date filters
    res.json({ success: true, message: "Endpoint en construction" });
  }
};