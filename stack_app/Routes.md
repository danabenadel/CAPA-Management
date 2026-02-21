# 📊 Routes Backend Actuelles (17 routes)
##  🔐 Auth Routes (/api/auth) - 3 routes

```
POST   /api/auth/login        // Connexion utilisateur
POST   /api/auth/logout       // Déconnexion
GET    /api/auth/profile      // Récupérer profil utilisateur connecté
```

Explication :

POST /login : Prend email + password, valide (@genericlab.com + complexité), retourne token + infos user

POST /logout : Déconnecte l'utilisateur (invalide session/token)

GET /profile : Retourne les infos du user connecté (via token)

##  📋 CAPA Routes (/api/capa) - 6 routes

```
GET    /api/capa                  // Liste toutes les CAPA
GET    /api/capa/status/:status   // Filtre par statut (Ouverte/En cours/Clôturée)
GET    /api/capa/:id              // Détails d'une CAPA spécifique
POST   /api/capa                  // Créer nouvelle CAPA
PUT    /api/capa/:id              // Modifier une CAPA existante
DELETE /api/capa/:id              // Supprimer une CAPA
```

Explication :

GET /capa : Retourne tableau de toutes les CAPA avec count

GET /capa/status/:status : Filtre (ex: /api/capa/status/Ouverte)

GET /capa/:id : Détails CAPA #1, #2, etc. (404 si inexistante)

POST /capa : Body JSON → crée CAPA avec auto-ID + date création

PUT /capa/:id : Body JSON → met à jour champs spécifiés

DELETE /capa/:id : Supprime + retourne CAPA supprimée

##  👥 User Routes (/api/users) - 5 routes

```
GET    /api/users             // Liste tous les utilisateurs
GET    /api/users/:id         // Détails utilisateur spécifique
POST   /api/users             // Créer nouvel utilisateur
PUT    /api/users/:id         // Modifier utilisateur
DELETE /api/users/:id         // Supprimer utilisateur
```

Explication :

GET /users : Liste complète (pour admin, page Users)

GET /users/:id : Profil d'un user spécifique

POST /users : Créer account (nom, email, rôle, département)

PUT /users/:id : Modifier rôle/département/statut

DELETE /users/:id : Désactiver/supprimer user

##  📊 Stats Routes (/api/stats) - 2 routes

```
GET    /api/stats/dashboard       // Stats complètes dashboard
GET    /api/stats/period/:period  // Stats par période (week/month/year)
```

Explication :

GET /stats/dashboard : Calcule en temps réel :
    Total CAPA, ouvertes, en cours, clôturées
    Stats par type (corrective/préventive)
    Stats par priorité
    CAPA par département
    5 CAPA les plus récentes

GET /stats/period/:period : Stats filtrées (ex: /api/stats/period/month)

##  ❤️ System Route - 1 route

```
GET    /api/health            // Vérifier que l'API fonctionne
```

Explication :

GET /health : Retourne { status: 'ok', timestamp: ... } - utile pour monitoring
