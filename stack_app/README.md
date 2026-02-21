# GenericLab CAPA Management

Application web moderne de gestion des CAPA (Corrective and Preventive Actions) pour les laboratoires pharmaceutiques et de santé.

## 🚀 Architecture

Ce projet utilise une architecture moderne séparée en deux parties :

- **Frontend** : Nuxt.js 4 (Vue 3) avec Tailwind CSS
- **Backend** : Express.js (API REST)

## 📁 Structure du projet

```
genericlab-capa/
├── frontend/               # Application Nuxt.js
│   ├── assets/            # CSS et ressources statiques
│   ├── components/        # Composants Vue réutilisables
│   ├── composables/       # Composables Vue (useApi, etc.)
│   ├── middleware/        # Middleware de route (auth)
│   ├── pages/             # Pages de l'application (routing auto)
│   ├── public/            # Fichiers statiques publics
│   ├── app.vue            # Composant racine
│   ├── nuxt.config.ts     # Configuration Nuxt
│   └── package.json
│
├── backend/               # API Express.js
│   ├── controllers/       # Contrôleurs (logique métier)
│   ├── routes/            # Définition des routes API
│   ├── models/            # Modèles de données
│   ├── middleware/        # Middleware Express
│   ├── server.js          # Point d'entrée du serveur
│   └── package.json
│
└── README.md
```

## 🔧 Installation

### Prérequis

- Node.js v20.19.0 ou supérieur
- npm ou yarn

### Installation du Frontend

```bash
cd frontend
npm install
```

### Installation du Backend

```bash
cd backend
npm install
```

## 🚀 Démarrage

### Démarrer le Backend (API)

```bash
cd backend
npm run dev
```

Le serveur API sera accessible sur [http://localhost:3001](http://localhost:3001)

### Démarrer le Frontend

```bash
cd frontend
npm run dev
```

L'application frontend sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

### Authentification
- \`POST /api/auth/login\` - Connexion
- \`POST /api/auth/logout\` - Déconnexion
- \`GET /api/auth/profile\` - Profil utilisateur

### CAPA
- \`GET /api/capa\` - Liste toutes les CAPA
- \`GET /api/capa/:id\` - Détails d'une CAPA
- \`POST /api/capa\` - Créer une CAPA
- \`PUT /api/capa/:id\` - Mettre à jour une CAPA
- \`DELETE /api/capa/:id\` - Supprimer une CAPA
- \`GET /api/capa/status/:status\` - CAPA par statut

### Utilisateurs
- \`GET /api/users\` - Liste tous les utilisateurs
- \`GET /api/users/:id\` - Détails d'un utilisateur
- \`POST /api/users\` - Créer un utilisateur
- \`PUT /api/users/:id\` - Mettre à jour un utilisateur
- \`DELETE /api/users/:id\` - Supprimer un utilisateur

### Statistiques
- \`GET /api/stats/dashboard\` - Statistiques du dashboard
- \`GET /api/stats/period/:period\` - Statistiques par période

## 🎨 Technologies utilisées

### Frontend
- **Nuxt.js 4** - Framework Vue.js pour applications web
- **Vue 3** - Framework JavaScript progressif
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide Vue Next** - Bibliothèque d'icônes
- **TypeScript** - Support TypeScript

### Backend
- **Express.js** - Framework web Node.js
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement
- **Nodemon** - Rechargement automatique en développement

## 🔐 Authentification

Pour vous connecter en mode démo, utilisez l'un de ces comptes :

- **Admin** : marie.dupont@genericlab.com
- **User** : jean.martin@genericlab.com
- **User** : sophie.bernard@genericlab.com

Mot de passe : n'importe quel mot de passe (en mode démo)

## 📝 Variables d'environnement

### Frontend (.env)
```env
NUXT_PUBLIC_API_BASE=http://localhost:3001/api
```

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🌟 Fonctionnalités

- ✅ **Dashboard interactif** - Vue d'ensemble avec statistiques en temps réel
- ✅ **Gestion des CAPA** - Création, modification, suppression des actions
- ✅ **Gestion des utilisateurs** - Administration des comptes
- ✅ **Authentification** - Système de connexion sécurisé
- ✅ **API REST** - Backend découplé avec Express.js
- ✅ **Interface moderne** - Design responsive avec Tailwind CSS
- ✅ **Navigation fluide** - Routing automatique avec Nuxt

## 🛠️ Scripts disponibles

### Frontend
```bash
npm run dev      # Démarrage en mode développement
npm run build    # Build pour la production
npm run generate # Génération statique
npm run preview  # Preview du build de production
```

### Backend
```bash
npm run dev      # Démarrage avec nodemon
npm start        # Démarrage en production
```

## 📦 Déploiement

### Frontend (Vercel)
Le frontend peut être déployé sur Vercel :
```bash
cd frontend
npm run build
```

### Backend (Heroku, Railway, etc.)
Le backend peut être déployé sur n'importe quel service supportant Node.js :
```bash
cd backend
npm start
```

## 🔜 Prochaines étapes

- [ ] Intégration d'une vraie base de données (PostgreSQL/MongoDB)
- [ ] Authentification JWT complète
- [ ] Gestion des rôles et permissions
- [ ] Upload de fichiers pour les CAPA
- [ ] Notifications en temps réel
- [ ] Export de rapports (PDF, Excel)
- [ ] Tests unitaires et d'intégration

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
