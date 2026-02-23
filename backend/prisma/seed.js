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
    { email: 'admin@genericlab.com', username: 'admin', roleCode: 'ADMIN', firstName: 'System', lastName: 'Admin', deptCode: 'DIR' },
    { email: 'qa@genericlab.com', username: 'qa_manager', roleCode: 'QA_MANAGER', firstName: 'Marie', lastName: 'Curie', deptCode: 'QA' },
    { email: 'prod@genericlab.com', username: 'prod_manager', roleCode: 'APPROVER', firstName: 'John', lastName: 'Doe', deptCode: 'PROD' },
    { email: 'tech@genericlab.com', username: 'operator', roleCode: 'EMPLOYEE', firstName: 'Bob', lastName: 'Builder', deptCode: 'MAINT' },
    { email: 'log@genericlab.com', username: 'log_manager', roleCode: 'ACTION_RESP', firstName: 'Alice', lastName: 'Truck', deptCode: 'LOG' },
    { email: 'rd@genericlab.com', username: 'rd_lead', roleCode: 'APPROVER', firstName: 'Albert', lastName: 'Einstein', deptCode: 'R&D' },
    { email: 'rh@genericlab.com', username: 'hr_partner', roleCode: 'EMPLOYEE', firstName: 'Sara', lastName: 'Connor', deptCode: 'RH' },
    { email: 'jean.prod@genericlab.com', username: 'jprod', roleCode: 'ACTION_RESP', firstName: 'Jean', lastName: 'Moulin', deptCode: 'PROD' },
    { email: 'lucie.qa@genericlab.com', username: 'lqa', roleCode: 'ACTION_RESP', firstName: 'Lucie', lastName: 'Aubrac', deptCode: 'QA' }
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
  // 5. Fake Data for Dashboard (Comprehensive & Massive)
  // ---------------------------------------------------------------------------
  console.log('Seeding Comprehensive Fake CAPA Data...');

  const allUsers = await prisma.user.findMany();
  const getRandomUser = () => allUsers[Math.floor(Math.random() * allUsers.length)].id;

  const capaStatuses = ['CREE', 'CREE', 'EN_COURS', 'EN_COURS', 'EN_COURS', 'EN_ATTENTE_EFFICACITE', 'EFFICACE', 'EFFICACE', 'NON_EFFICACE', 'CLOTURE', 'CLOTURE', 'CLOTURE', 'ETENDU'];

  const mockEventsData = [
    { desc: 'Température hors limite dans le sas de production', loc: 'Sas Prod 1', proc: 'Fabrication' },
    { desc: 'Défaillance du système de pesée', loc: 'Pesage Ligne 2', proc: 'Pesée' },
    { desc: 'Décoloration inattendue du produit fini', loc: 'Zone Quarantaine', proc: 'Inspection' },
    { desc: 'Rupture de stock critique composant', loc: 'Magasin Central', proc: 'Supply Chain' },
    { desc: 'Fuite détectée sur le réacteur R-05', loc: 'Atelier Synthèse', proc: 'Synthèse' },
    { desc: 'Erreur d\'étiquetage sur lot export', loc: 'Conditionnement', proc: 'Emballage' },
    { desc: 'Contamination microbienne test environnemental', loc: 'Salle Blanche B', proc: 'Contrôle Qualité' },
    { desc: 'Variation pression lyophilisation', loc: 'Lyophilisateur 3', proc: 'Séchage' },
    { desc: 'Déversement accidentel de solvant', loc: 'Zone Solvants', proc: 'Sécurité' },
    { desc: 'Erreur de saisie dans le dossier de lot', loc: 'Bureau Prod', proc: 'Documentation' },
    { desc: 'Non-conformité matières premières (humidité)', loc: 'Réception', proc: 'Contrôle Réception' },
    { desc: 'Retard de livraison fournisseur critique', loc: 'Quai A', proc: 'Logistique' },
    { desc: 'Bris de flacons sur la ligne 4', loc: 'Ligne 4', proc: 'Répartition' },
    { desc: 'Perte de connexion ERP', loc: 'Serveurs', proc: 'IT' },
    { desc: 'Absence prolongée personnel clé', loc: 'Labo Micro', proc: 'Ressources Humaines' }
  ];

  // Generate 25 Events & CAPAs to fill the dashboard completely
  for (let i = 0; i < 25; i++) {
    const eventTemplate = mockEventsData[i % mockEventsData.length];
    const eventDate = new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000); // Up to 6 months ago

    const event = await prisma.qualityEvent.upsert({
      where: { eventNumber: `EV-2026-${(i + 1).toString().padStart(3, '0')}` },
      update: {},
      create: {
        eventNumber: `EV-2026-${(i + 1).toString().padStart(3, '0')}`,
        eventDate: eventDate,
        reporterUserId: getRandomUser(),
        problemDescription: `${eventTemplate.desc} (Occurrence #${i + 1})`,
        problemLocation: eventTemplate.loc,
        affectedProcess: eventTemplate.proc,
        status: ['CREE', 'EN_EVALUATION', 'CLASSE_DEVIATION', 'CLOTURE'][Math.floor(Math.random() * 4)],
      },
    });

    const cStat = capaStatuses[i % capaStatuses.length];
    const isClosedOrEffective = ['CLOTURE', 'EFFICACE', 'NON_EFFICACE'].includes(cStat);

    const capa = await prisma.capa.upsert({
      where: { capaNumber: `CAPA-2026-${(i + 1).toString().padStart(3, '0')}` },
      update: {},
      create: {
        capaNumber: `CAPA-2026-${(i + 1).toString().padStart(3, '0')}`,
        eventId: event.id,
        initiationDate: new Date(event.eventDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000),
        initiatorUserId: getRandomUser(),
        openingReason: `Investigation suite à ${event.eventNumber}`,
        rootCause: `Cause racine identifiée concernant le processus "${eventTemplate.proc}".`,
        status: cStat,
        totalActions: Math.floor(Math.random() * 4) + 1,
        completedActions: isClosedOrEffective ? 4 : Math.floor(Math.random() * 2), // Mock counts
        closureDate: isClosedOrEffective ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : null,
        closedByUserId: isClosedOrEffective ? getRandomUser() : null
      }
    });

    // Create Actions for CAPA
    for (let j = 0; j < capa.totalActions; j++) {
      let actStat;
      if (cStat === 'CREE') actStat = 'PLANIFIEE';
      else if (isClosedOrEffective) actStat = 'TERMINEE';
      else actStat = Math.random() > 0.7 ? 'EN_RETARD' : (Math.random() > 0.5 ? 'EN_COURS' : 'TERMINEE');

      await prisma.capaAction.create({
        data: {
          capaId: capa.id,
          actionReference: `ACT-${capa.id}-0${j + 1}`,
          actionDescription: `Action ${j === 0 ? 'corrective' : 'préventive'} pour la CAPA ${capa.capaNumber}.`,
          actionType: j % 2 === 0 ? 'CORRECTIVE' : 'PREVENTIVE',
          plannedClosureDate: new Date(capa.initiationDate.getTime() + (Math.random() * 30 + 10) * 24 * 60 * 60 * 1000),
          responsibleUserId: getRandomUser(),
          status: actStat,
          actualClosureDate: actStat === 'TERMINEE' ? new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000) : null
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
