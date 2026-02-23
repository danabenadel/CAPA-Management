import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // ---------------------------------------------------------------------------
  // 1. Roles
  // ---------------------------------------------------------------------------
  console.log('Seeding Roles...');
  const rolesData = [
    { roleName: 'Administrateur', roleCode: 'ADMIN', description: 'Accès complet au système' },
    { roleName: 'Employé', roleCode: 'EMPLOYEE', description: 'Utilisateur de base' },
    { roleName: 'Responsable d\'action', roleCode: 'ACTION_RESP', description: 'Gère les investigations et CAPA' },
    { roleName: 'Responsable Assurance Qualité', roleCode: 'QA_MANAGER', description: 'Approuve et clôture' },
    { roleName: 'Responsable hiérarchique', roleCode: 'APPROVER', description: 'Valide les actions équipe' },
    { roleName: 'Système', roleCode: 'SYSTEM', description: 'Compte système' },
  ];

  for (const role of rolesData) {
    await prisma.role.upsert({
      where: { roleCode: role.roleCode },
      update: {},
      create: role,
    });
  }

  // Retrieve roles for later use
  const roles = await prisma.role.findMany();
  const roleMap = roles.reduce((acc, r) => ({ ...acc, [r.roleCode]: r.id }), {});

  // ---------------------------------------------------------------------------
  // 2. Departments
  // ---------------------------------------------------------------------------
  console.log('Seeding Departments...');
  const departmentsData = [
    { name: 'Direction', code: 'DIR' },
    { name: 'Assurance Qualité', code: 'QA' },
    { name: 'Production', code: 'PROD' },
    { name: 'Maintenance', code: 'MAINT' },
    { name: 'Logistique', code: 'LOG' },
    { name: 'R&D', code: 'R&D' },
    { name: 'Ressources Humaines', code: 'RH' },
  ];

  for (const dept of departmentsData) {
    await prisma.department.upsert({
      where: { departmentCode: dept.code },
      update: {},
      create: {
        departmentName: dept.name,
        departmentCode: dept.code,
      },
    });
  }

  // Retrieve departments for later
  const departments = await prisma.department.findMany();
  const deptMap = departments.reduce((acc, d) => ({ ...acc, [d.departmentCode]: d.id }), {});

  // ---------------------------------------------------------------------------
  // 3. Permissions (Sample set based on ROLES_ET_PERMISSIONS.md)
  // ---------------------------------------------------------------------------
  console.log('Seeding Permissions...');
  const permissionsData = [
    // Events
    { code: 'event.create', name: 'Créer événement', module: 'events' },
    { code: 'event.read.all', name: 'Voir tous événements', module: 'events' },
    { code: 'event.read.own', name: 'Voir ses événements', module: 'events' },
    { code: 'event.update.all', name: 'Modifier tous événements', module: 'events' },
    { code: 'event.close', name: 'Clôturer événement', module: 'events' },

    // CAPA
    { code: 'capa.create', name: 'Créer CAPA', module: 'capa' },
    { code: 'capa.read.all', name: 'Voir toutes CAPA', module: 'capa' },
    { code: 'capa.approve', name: 'Approuver CAPA', module: 'capa' },
    { code: 'capa.close', name: 'Clôturer CAPA', module: 'capa' },

    // Users
    { code: 'user.manage', name: 'Gérer utilisateurs', module: 'admin' },
  ];

  for (const perm of permissionsData) {
    await prisma.permission.upsert({
      where: { permissionCode: perm.code },
      update: {},
      create: {
        permissionName: perm.name,
        permissionCode: perm.code,
        module: perm.module,
      },
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Users
  // ---------------------------------------------------------------------------
  console.log('Seeding Users...');
  const users = [
    {
      email: 'admin@genericlab.com',
      username: 'admin',
      roleCode: 'ADMIN',
      firstName: 'System',
      lastName: 'Admin',
      deptCode: 'DIR',
    },
    {
      email: 'qa@genericlab.com',
      username: 'qa_manager',
      roleCode: 'QA_MANAGER',
      firstName: 'Marie',
      lastName: 'Curie',
      deptCode: 'QA',
    },
    {
      email: 'prod@genericlab.com',
      username: 'prod_manager',
      roleCode: 'APPROVER',
      firstName: 'John',
      lastName: 'Doe',
      deptCode: 'PROD',
    },
    {
      email: 'tech@genericlab.com',
      username: 'operator',
      roleCode: 'EMPLOYEE',
      firstName: 'Bob',
      lastName: 'Builder',
      deptCode: 'MAINT',
    },
  ];

  for (const u of users) {
    const roleId = roleMap[u.roleCode];
    const deptId = deptMap[u.deptCode];

    await prisma.user.upsert({
      where: { email: u.email },
      update: { roleId, departmentId: deptId },
      create: {
        email: u.email,
        username: u.username,
        passwordHash: '$2b$10$EpIs@lT...', // Placeholder hash
        firstName: u.firstName,
        lastName: u.lastName,
        roleId,
        departmentId: deptId,
        isActive: true,
      },
    });
  }

  // ---------------------------------------------------------------------------
  // 5. Fake Data for Dashboard (Comprehensive)
  // ---------------------------------------------------------------------------
  console.log('Seeding Comprehensive Fake CAPA Data...');

  // Fetch users to assign them randomly
  const allUsers = await prisma.user.findMany();
  const getRandomUser = () => allUsers[Math.floor(Math.random() * allUsers.length)].id;

  const mockEvents = [
    { num: 'EV-2026-001', desc: 'Température hors limite dans le sas de production (27°C au lieu de 22°C).', loc: 'Sas Prod 1', proc: 'Fabrication', stat: 'CLOTURE' },
    { num: 'EV-2026-002', desc: 'Défaillance du système de pesée (erreur de calibration > 5g).', loc: 'Pesage Ligne 2', proc: 'Pesée', stat: 'CLOTURE' },
    { num: 'EV-2026-003', desc: 'Décoloration inattendue du produit fini (Lot 458X).', loc: 'Zone Quarantaine', proc: 'Inspection', stat: 'CLOTURE' },
    { num: 'EV-2026-004', desc: 'Rupture de stock critique composant actif X-Rayon.', loc: 'Magasin Central', proc: 'Supply Chain', stat: 'CLOTURE' },
    { num: 'EV-2026-005', desc: 'Fuite détectée sur le réacteur principal R-05.', loc: 'Atelier Synthèse', proc: 'Synthèse', stat: 'CLOTURE' },
    { num: 'EV-2026-006', desc: 'Erreur d\'étiquetage sur lot export (blister FR au lieu de EN).', loc: 'Conditionnement', proc: 'Emballage', stat: 'CLOTURE' },
    { num: 'EV-2026-007', desc: 'Contamination microbienne hors spécifications sur test environnemental.', loc: 'Salle Blanche B', proc: 'Contrôle Qualité', stat: 'CLOTURE' },
    { num: 'EV-2026-008', desc: 'Variation majeure de pression lors de la lyophilisation.', loc: 'Lyophilisateur 3', proc: 'Séchage', stat: 'CLOTURE' }
  ];

  for (let i = 0; i < mockEvents.length; i++) {
    const e = mockEvents[i];
    const event = await prisma.qualityEvent.upsert({
      where: { eventNumber: e.num },
      update: {},
      create: {
        eventNumber: e.num,
        eventDate: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000), // Random date past 2 months
        reporterUserId: getRandomUser(),
        problemDescription: e.desc,
        problemLocation: e.loc,
        affectedProcess: e.proc,
        status: e.stat,
      },
    });

    // Create 1 CAPA per event
    const capaStatuses = ['EN_COURS', 'EN_ATTENTE_EFFICACITE', 'EFFICACE', 'CLOTURE'];
    // Predictable status assignment based on index to ensure variety
    const cStat = capaStatuses[i % capaStatuses.length];

    // Set a risk ID for joining with departments conceptually in the dashboard if needed, or link via event.
    const capa = await prisma.capa.upsert({
      where: { capaNumber: `CAPA-2026-00${i + 1}` },
      update: {},
      create: {
        capaNumber: `CAPA-2026-00${i + 1}`,
        eventId: event.id,
        initiationDate: new Date(event.eventDate.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days after event
        initiatorUserId: getRandomUser(),
        openingReason: `Investigation suite à ${e.num}`,
        rootCause: `Analyse 5M terminée. Causes multiples identifiées concernant le processus "${e.proc}".`,
        status: cStat,
        totalActions: Math.floor(Math.random() * 3) + 1,
        completedActions: cStat === 'CLOTURE' || cStat === 'EFFICACE' ? 2 : Math.floor(Math.random() * 2),
        closureDate: cStat === 'CLOTURE' || cStat === 'EFFICACE' ? new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) : null,
        closedByUserId: cStat === 'CLOTURE' || cStat === 'EFFICACE' ? getRandomUser() : null
      }
    });

    // Create Actions for CAPA
    for (let j = 0; j < capa.totalActions; j++) {
      const actStat = j < capa.completedActions ? 'TERMINEE' : (Math.random() > 0.8 ? 'EN_RETARD' : 'EN_COURS');
      await prisma.capaAction.create({
        data: {
          capaId: capa.id,
          actionReference: `ACT-${capa.id}-0${j + 1}`,
          actionDescription: j === 0 ? 'Mise à jour de la procédure opérationnelle standard (SOP).' : 'Formation des opérateurs du secteur.',
          actionType: j === 0 ? 'PREVENTIVE' : 'CORRECTIVE',
          plannedClosureDate: new Date(capa.initiationDate.getTime() + 15 * 24 * 60 * 60 * 1000),
          responsibleUserId: getRandomUser(),
          status: actStat,
          actualClosureDate: actStat === 'TERMINEE' ? new Date(capa.initiationDate.getTime() + 10 * 24 * 60 * 60 * 1000) : null
        }
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
