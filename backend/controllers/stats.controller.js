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

      // 4. CAPA Récentes (Last 8 to fill the table better)
      const recentDbCapas = await prisma.capa.findMany({
        take: 8,
        orderBy: { initiationDate: 'desc' },
        include: {
          initiator: {
            include: { department: true }
          },
          qualityEvent: true
        }
      });

      const mapStatus = (status) => {
        if (status === 'CREE') return 'Nouveau';
        if (status === 'EN_ATTENTE_EFFICACITE') return 'Attente V.E';
        if (status === 'EFFICACE') return 'Efficace';
        if (status === 'CLOTURE') return 'Clôturée';
        return 'En cours';
      };

      const capasRecentes = recentDbCapas.map(c => {
        // Derive a pseudo priority from the process or actions count for visual diversity
        let priorite = 'Moyenne';
        if (c.totalActions > 2) priorite = 'Haute';
        if (c.status === 'CLOTURE' || c.status === 'EFFICACE') priorite = 'Basse';

        return {
          id: c.id,
          titre: c.capaNumber,
          type: c.qualityEvent?.affectedProcess || 'Processus Général',
          statut: mapStatus(c.status),
          priorite: priorite,
          responsable: `${c.initiator?.firstName || ''} ${c.initiator?.lastName || ''}`.trim() || c.initiator?.username,
          departement: c.initiator?.department?.departmentCode || 'N/A'
        };
      });

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