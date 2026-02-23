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
  // 5. Fake Data for Dashboard (Events, CAPAs)
  // ---------------------------------------------------------------------------
  console.log('Seeding Fake CAPA Data...');
  const qaUser = await prisma.user.findFirst({ where: { email: 'qa@genericlab.com' } });

  // 1. Un Evénement Qualité (Déviation)
  const event1 = await prisma.qualityEvent.upsert({
    where: { eventNumber: 'EV-2026-001' },
    update: {},
    create: {
      eventNumber: 'EV-2026-001',
      eventDate: new Date(),
      reporterUserId: qaUser.id,
      problemDescription: 'Température hors limite dans le sas de production (27°C au lieu de 22°C).',
      problemLocation: 'Sas Production 1',
      affectedProcess: 'Fabrication',
      status: 'CLOTURE', // Pour pouvoir lier une CAPA
    },
  });

  // 1. Une CAPA active
  const capa1 = await prisma.capa.upsert({
    where: { capaNumber: 'CAPA-2026-001' },
    update: {},
    create: {
      capaNumber: 'CAPA-2026-001',
      eventId: event1.id,
      initiationDate: new Date(),
      initiatorUserId: qaUser.id,
      openingReason: 'Déviation de température récurrente dans le sas.',
      rootCause: 'Défaillance du capteur de régulation de la centrale de traitement d\'air.',
      status: 'EN_COURS',
      totalActions: 2,
      completedActions: 1,
    }
  });

  // Actions pour CAPA 1
  await prisma.capaAction.upsert({
    where: { id: 9991 }, // Just a fake ID placeholder if needed, or use a distinct find
    // Since id is autoincrement, let's use a try/catch or just create if we assume clean DB
    update: {},
    create: {
      capaId: capa1.id,
      actionReference: 'ACT-001',
      actionDescription: 'Remplacement immédiat du capteur.',
      actionType: 'CORRECTIVE',
      plannedClosureDate: new Date(),
      responsibleUserId: qaUser.id,
      status: 'TERMINEE',
      actualClosureDate: new Date()
    }
  }).catch(() => { });

  await prisma.capaAction.upsert({
    where: { id: 9992 },
    update: {},
    create: {
      capaId: capa1.id,
      actionReference: 'ACT-002',
      actionDescription: 'Mise en place d\'une maintenance préventive trimestrielle du système CVC.',
      actionType: 'PREVENTIVE',
      plannedClosureDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // + 15 days
      responsibleUserId: qaUser.id,
      status: 'PLANIFIEE'
    }
  }).catch(() => { });


  // 2. Une CAPA terminée
  const capa2 = await prisma.capa.upsert({
    where: { capaNumber: 'CAPA-2026-002' },
    update: {},
    create: {
      capaNumber: 'CAPA-2026-002',
      initiationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      initiatorUserId: qaUser.id,
      openingReason: 'Erreur d\'étiquetage sur le lot A123.',
      rootCause: 'Mauvaise configuration de l\'imprimante thermique par l\'opérateur.',
      status: 'CLOTURE',
      totalActions: 1,
      completedActions: 1,
      closureDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      closedByUserId: qaUser.id
    }
  });

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
