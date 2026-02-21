// Données de test (en attendant une vraie base de données)

export let capas = [
  {
    id: 1,
    titre: 'Déviation température chambre froide',
    type: 'Corrective',
    statut: 'En cours',
    priorite: 'Haute',
    dateCreation: '2024-11-15',
    dateEcheance: '2024-12-15',
    responsable: 'Marie Dupont',
    departement: 'Qualité',
    description: 'Température hors limites détectée dans la chambre froide A',
  },
  {
    id: 2,
    titre: 'Mise à jour procédure nettoyage',
    type: 'Préventive',
    statut: 'Ouverte',
    priorite: 'Moyenne',
    dateCreation: '2024-11-20',
    dateEcheance: '2025-01-20',
    responsable: 'Jean Martin',
    departement: 'Production',
    description: 'Révision annuelle des procédures de nettoyage',
  },
  {
    id: 3,
    titre: 'Calibration équipement analytique',
    type: 'Préventive',
    statut: 'Clôturée',
    priorite: 'Haute',
    dateCreation: '2024-10-01',
    dateEcheance: '2024-11-01',
    responsable: 'Sophie Bernard',
    departement: 'Laboratoire',
    description: 'Calibration trimestrielle des balances analytiques',
  },
];

export let users = [
  {
    id: 1,
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@genericlab.com',
    role: 'Admin',
    departement: 'Qualité',
    statut: 'Actif',
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Jean',
    email: 'jean.martin@genericlab.com',
    role: 'User',
    departement: 'Production',
    statut: 'Actif',
  },
  {
    id: 3,
    nom: 'Bernard',
    prenom: 'Sophie',
    email: 'sophie.bernard@genericlab.com',
    role: 'User',
    departement: 'Laboratoire',
    statut: 'Actif',
  },
];

export const currentUser = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Marie',
  email: 'marie.dupont@genericlab.com',
  role: 'Admin',
  departement: 'Qualité',
};

export let activities = [
  {
    id: 1,
    userId: 1,
    action: 'Connexion',
    description: 'Vous vous êtes connecté à l\'application',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];