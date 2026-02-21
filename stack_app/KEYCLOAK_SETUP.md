# Guide de Configuration Keycloak pour GenericLab CAPA

## 1. Démarrer Keycloak avec Docker

```bash
# Démarrer Keycloak
docker-compose up -d

# Vérifier que Keycloak est démarré
docker-compose ps

# Voir les logs
docker-compose logs -f keycloak
```

**Accès à Keycloak :**
- URL : http://localhost:8080
- Username : `admin`
- Password : `admin123`

## 2. Configuration du Realm

1. **Connectez-vous à la console d'administration Keycloak** : http://localhost:8080/admin

2. **Créer un nouveau Realm :**
   - Cliquez sur le menu déroulant en haut à gauche (à côté de "master")
   - Cliquez sur "Create Realm"
   - Nom du Realm : `genericlab`
   - Cliquez sur "Create"

## 3. Configuration du Client (Application Frontend)

1. **Créer un nouveau Client :**
   - Dans le Realm `genericlab`, allez dans "Clients"
   - Cliquez sur "Create client"

2. **Configuration General Settings :**
   - Client type : `OpenID Connect`
   - Client ID : `genericlab-capa-frontend`
   - Cliquez sur "Next"

3. **Configuration Capability :**
   - Client authentication : `OFF` (public client)
   - Authorization : `OFF`
   - Authentication flow :
     - ✅ Standard flow
     - ✅ Direct access grants
   - Cliquez sur "Next"

4. **Configuration Login settings :**
   - Valid redirect URIs : `http://localhost:3000/*`
   - Valid post logout redirect URIs : `http://localhost:3000/*`
   - Web origins : `http://localhost:3000`
   - Cliquez sur "Save"

## 4. Configuration du Client (Application Backend)

1. **Créer un nouveau Client pour le backend :**
   - Client ID : `genericlab-capa-backend`

2. **Configuration :**
   - Client type : `OpenID Connect`
   - Client authentication : `ON` (confidential client)
   - Authorization : `OFF`
   - Authentication flow :
     - ✅ Service accounts roles
   - Cliquez sur "Save"

3. **Récupérer le Client Secret :**
   - Allez dans l'onglet "Credentials"
   - Copiez le "Client secret" (vous en aurez besoin pour le backend)

## 5. Créer des utilisateurs de test

1. **Aller dans "Users" :**
   - Cliquez sur "Add user"

2. **Créer l'utilisateur Marie Dupont :**
   - Username : `marie.dupont@genericlab.com`
   - Email : `marie.dupont@genericlab.com`
   - Email verified : `ON`
   - First name : `Marie`
   - Last name : `Dupont`
   - Cliquez sur "Create"

3. **Définir le mot de passe :**
   - Onglet "Credentials"
   - Cliquez sur "Set password"
   - Password : `Admin123!`
   - Temporary : `OFF`
   - Cliquez sur "Save"

4. **Répétez pour les autres utilisateurs :**
   - Jean Martin (`jean.martin@genericlab.com`)
   - Sophie Bernard (`sophie.bernard@genericlab.com`)

## 6. Configurer les attributs personnalisés (optionnel)

1. **Ajouter des attributs utilisateur :**
   - Dans la page de l'utilisateur, onglet "Attributes"
   - Ajouter :
     - `role` : `Admin` ou `User`
     - `departement` : `Qualité`, `Production`, ou `Laboratoire`

2. **Créer un Mapper pour inclure ces attributs dans le token :**
   - Allez dans "Clients" > `genericlab-capa-frontend`
   - Onglet "Client scopes"
   - Cliquez sur le scope dédié (ex: `genericlab-capa-frontend-dedicated`)
   - Onglet "Mappers"
   - Cliquez sur "Add mapper" > "By configuration"
   - Choisissez "User Attribute"
   - Configuration :
     - Name : `role`
     - User Attribute : `role`
     - Token Claim Name : `role`
     - Claim JSON Type : `String`
     - Add to ID token : `ON`
     - Add to access token : `ON`
     - Add to userinfo : `ON`

## 7. Configuration des politiques de mot de passe

1. **Aller dans "Realm settings" > "Security defenses" > "Brute force detection" :**
   - Enabled : `ON`

2. **Aller dans "Authentication" > "Policies" > "Password Policy" :**
   - Ajouter les règles :
     - Minimum Length : `8`
     - Uppercase Characters : `1`
     - Lowercase Characters : `1`
     - Digits : `1`
     - Special Characters : `1`

## 8. Valider la configuration de l'email

Si vous voulez que Keycloak envoie des emails (récupération de mot de passe, etc.) :

1. **Aller dans "Realm settings" > "Email" :**
   - Configurer votre serveur SMTP

## 9. Informations pour l'intégration

**Frontend (Nuxt) :**
- Keycloak URL : `http://localhost:8080`
- Realm : `genericlab`
- Client ID : `genericlab-capa-frontend`

**Backend (Express) :**
- Keycloak URL : `http://localhost:8080`
- Realm : `genericlab`
- Client ID : `genericlab-capa-backend`
- Client Secret : (récupéré à l'étape 4)

## 10. Commandes Docker utiles

```bash
# Arrêter Keycloak
docker-compose down

# Redémarrer Keycloak
docker-compose restart

# Supprimer les données (reset complet)
docker-compose down -v

# Voir les logs en temps réel
docker-compose logs -f keycloak
```

## Prochaines étapes

Une fois Keycloak configuré, nous allons :
1. Configurer les variables d'environnement dans le backend et frontend
2. Créer les middlewares d'authentification
3. Adapter la page de connexion pour rediriger vers Keycloak
4. Tester l'authentification complète
