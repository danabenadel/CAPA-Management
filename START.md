# 🚀 Guide de démarrage rapide

## Première installation

### 1. Installer les dépendances du Backend
```bash
cd backend
npm install
```

### 2. Installer les dépendances du Frontend
```bash
cd ../frontend
npm install @nuxtjs/tailwindcss lucide-vue-next
```

## Démarrage de l'application

### Option 1 : Démarrage manuel (2 terminaux)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Le backend démarre sur http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Le frontend démarre sur http://localhost:3000

### Option 2 : Script de démarrage automatique (à venir)

## Connexion à l'application

1. Ouvrez votre navigateur sur http://localhost:3000
2. Utilisez un de ces comptes de démo :
   - Email: `marie.dupont@genericlab.com`
   - Mot de passe: n'importe quoi (mode démo)

## Vérification que tout fonctionne

1. **Backend API** : Visitez http://localhost:3001/api/health
   - Devrait afficher : `{"status":"ok","message":"GenericLab CAPA API is running",...}`

2. **Frontend** : Visitez http://localhost:3000
   - Devrait afficher la page de connexion

3. **Connexion** : Connectez-vous et accédez au dashboard
   - Devrait afficher les statistiques et les CAPA

## Problèmes courants

### Port déjà utilisé
```bash
# Si le port 3000 ou 3001 est utilisé
# Modifiez le port dans les fichiers .env
```

### Erreur de connexion API
Vérifiez que :
- Le backend est démarré (http://localhost:3001/api/health doit répondre)
- Le fichier `frontend/.env` contient : `NUXT_PUBLIC_API_BASE=http://localhost:3001/api`

### Modules manquants
```bash
# Réinstallez les dépendances
cd backend && npm install
cd ../frontend && npm install
```

## Structure des pages disponibles

- `/` - Page de connexion
- `/dashboard` - Dashboard principal (nécessite connexion)
- `/tables` - Gestion des CAPA (à implémenter)
- `/users` - Gestion des utilisateurs (à implémenter)
- `/profile` - Profil utilisateur (à implémenter)

## Prochaines étapes

Une fois l'application lancée, vous pouvez :
1. Explorer le dashboard
2. Tester les appels API
3. Ajouter de nouvelles pages Vue
4. Créer de nouveaux endpoints API

Bon développement ! 🎉