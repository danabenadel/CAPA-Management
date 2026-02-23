# 💊 GenericLab - CAPA & Quality Events Management

![GenericLab Platform](https://img.shields.io/badge/Status-Beta%20MVP-success?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Nuxt.js](https://img.shields.io/badge/Nuxt-4.0-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

Application web de nouvelle génération dédiée à la gestion des **Actions Correctives et Préventives (CAPA)** et à la numérisation des événements qualité (déviations, anomalies) pour l'industrie pharmaceutique et les laboratoires de santé.

## 📖 Description du Projet
Le projet **GenericLab CAPA Management** a été conçu pour digitaliser des processus QSE (Qualité, Sécurité, Environnement) souvent lourds et documentaires (papier/Excel). L'objectif est double :
1. **Accélérer la déclaration** terrain des événements qualité.
2. **Centraliser l'investigation** de la cause racine (Root Cause Analysis - QQOQCP) et le suivi des plans d'actions (CAPA) associés.

L'application bénéficie d'une interface utilisateur moderne (Soft-UI / Glassmorphism) s'affranchissant de l'austérité habituelle des logiciels industriels.

## ✨ Fonctionnalités Principales
- 📊 **Tableau de Bord Intéractif** : Vue globale en temps réel (Chart.js) sur les KPIs vitaux (CAPA Actives, Répartition par département et statut).
- 🚨 **Déclaration d'Événements** : Saisie rapide et qualifiée des signalements (avec typologie, lieu, impact produit).
- 🔍 **Moteur d'Investigation** : Processus structuré (Méthode QQOQCP) pour analyser l'événement avant clôture.
- ⚙️ **Suivi des Actions CAPA** : Cycle de vie complet des actions correctives, assignations et traçabilité.
- 🔐 **Sécurité Industrielle (SSO)** : Authentification robuste déléguée à un serveur **Keycloak** (OIDC / OAuth2).

## 🛠️ Stack Technique
### Frontend
- **Framework** : Nuxt 4 (Vue 3, Composition API)
- **Styling** : Tailwind CSS v3 (Design "Atmosphere" Soft-UI)
- **Icônes & Graphiques** : Lucide Vue Next, Chart.js / Vue-chartjs
- **Composants** : Headless UI / Radix Vue pour l'accessibilité
- **HTTP/API** : Axios (gestion centralisée avec intercepteurs pour token JWT)

### Backend
- **Serveur** : Node.js avec Express.js
- **Base de données** : PostgreSQL 15
- **ORM** : Prisma ORM (Modélisation stricte et migrations)
- **Authentification** : Middlewares de validation JWT via Keycloak
- **File System** : Multer (pour l'upload de preuves matérielles / documents)

### Infrastructure & Déploiement
- **Conteneurisation** : Docker & Docker Compose (Base de données locale = Postgres + pgAdmin, Serveur d'authentification = Keycloak 23.0)

---

## 🚀 Installation & Lancement (Local)

### 1. Prérequis
- Node.js (v20+ recommandé)
- Docker Desktop (ou Docker Engine + Docker Compose)
- Git

### 2. Infrastructure Docker (BDD & SSO)
L'application dépend d'une base PostgreSQL et de Keycloak. Ces services sont conteneurisés.
```bash
# Lancer les conteneurs en arrière-plan
docker-compose up -d

# Important : Si c'est votre premier lancement, vous devez configurer le Realm de Keycloak.
# (Voir le guide KEYCLOAK_SETUP.md à la racine).
```

### 3. Backend (API Node.js)
```bash
cd backend

# Installer les dépendances
npm install

# Créer un fichier .env (Copiez le .env.setup existant et modifiez-le si besoin)
cp .env.setup .env

# Génération du client Prisma et application de la structure en base
npx prisma generate
npx prisma db push

# (Optionnel) Seed de la BDD pour charger des jeux d'essais
node utils/seed.js

# Lancer le serveur (Port 3001)
npm run dev
```

### 4. Frontend (Nuxt)
```bash
# Dans un nouveau terminal
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement (Port 3000)
npm run dev
```
💡 **L'interface est maintenant accessible sur `http://localhost:3000` !**

---

## 📂 Architecture du Dépôt (Mono-repo)
```text
Genericlab-CAPA-Management/
├── backend/                  # Serveur Express, Prisma schema, Routes & Controllers
├── frontend/                 # Application Vue 3 / Nuxt 4, Pages & Composants
├── documents/                # Ressources documentaires, specs et maquettes
├── docker-compose.yml        # Infrastructure (Keycloak, Postgres, pgAdmin)
├── DEMO_MVP.md               # Script narratif pour présentation du projet
├── KEYCLOAK_SETUP.md         # Documentation pour la configuration du SSO
└── README.md                 # Documentation principale
```

## 👥 Équipe Projet
- **Développement Fullstack & UI/UX** : Dana Benadel
- **Supervision SI & Contexte Métier** : Amrane Alik (GenericLab)

*(Projet réalisé entre le 18 Septembre 2025 et le 22 Février 2026)*
