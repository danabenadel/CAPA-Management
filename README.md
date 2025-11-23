# Genericlab-CAPA-Management

Application web de gestion des CAPA (Corrective and Preventive Actions) pour les laboratoires pharmaceutiques et de santé.

## Description

GenericLab CAPA est une application de gestion complète permettant le suivi et la gestion des actions correctives et préventives dans un environnement de laboratoire. Elle offre des tableaux de bord interactifs, des outils de gestion des utilisateurs, et un suivi détaillé des CAPA avec reporting intégré.

## Fonctionnalités

- **Tableau de bord interactif** : Vue d'ensemble des CAPA actives, en attente et clôturées avec statistiques en temps réel
- **Gestion des CAPA** : Création, modification et suivi des actions correctives et préventives
- **Gestion des utilisateurs** : Administration des utilisateurs et des rôles
- **Profil utilisateur** : Gestion des informations personnelles et préférences
- **Authentification** : Système de connexion et d'inscription sécurisé
- **Rapports et analytics** : Visualisation des données avec graphiques et métriques de performance
- **Interface responsive** : Design adapté à tous les écrans

## Technologies utilisées

- **React 19** : Framework JavaScript pour l'interface utilisateur
- **Tailwind CSS** : Framework CSS pour le styling
- **Lucide React** : Bibliothèque d'icônes
- **Recharts** : Bibliothèque de graphiques pour les visualisations de données
- **React Scripts** : Outils de build et développement

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## Installation

1. Cloner le repository :
\`\`\`bash
git clone <url-du-repository>
cd genericlab-capa
\`\`\`

2. Installer les dépendances :
\`\`\`bash
npm install
\`\`\`

3. Démarrer l'application en mode développement :
\`\`\`bash
npm start
\`\`\`

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

### \`npm start\`

Lance l'application en mode développement.
Ouvre [http://localhost:3000](http://localhost:3000) dans votre navigateur.

La page se rechargera automatiquement lors des modifications.

### \`npm test\`

Lance le runner de tests en mode interactif.

### \`npm run build\`

Crée une version optimisée de l'application pour la production dans le dossier \`build\`.

L'application est minifiée et prête pour le déploiement.

### \`npm run eject\`

**Note : cette opération est irréversible !**

Si vous n'êtes pas satisfait des outils de build, vous pouvez utiliser \`eject\` pour avoir un contrôle total sur la configuration.

## Structure du projet

\`\`\`
genericlab-capa/
├── public/           # Fichiers statiques
├── src/
│   ├── components/   # Composants réutilisables
│   │   └── Logo.jsx
│   ├── pages/        # Pages de l'application
│   │   ├── Dashboard.jsx
│   │   ├── Tables.jsx
│   │   ├── Profile.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   └── UserManagement.jsx
│   ├── App.js        # Composant racine
│   └── index.js      # Point d'entrée
├── package.json
└── README.md
\`\`\`

## Pages principales

- **Dashboard** : Tableau de bord avec statistiques et CAPA récentes
- **Gestion de CAPA** : Liste et gestion des actions correctives et préventives
- **Profile** : Page de profil utilisateur
- **Utilisateurs** : Gestion des utilisateurs (admin)
- **Sign In / Sign Up** : Pages d'authentification

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (\`git checkout -b feature/AmazingFeature\`)
3. Committez vos changements (\`git commit -m 'Add some AmazingFeature'\`)
4. Poussez vers la branche (\`git push origin feature/AmazingFeature\`)
5. Ouvrez une Pull Request

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur le repository GitHub.

## Licence

Ce projet est privé et destiné à un usage interne.
