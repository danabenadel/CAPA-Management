#!/bin/bash

# Configuration
CONTAINER_NAME="genericlab-keycloak"
KC_ADM="/opt/keycloak/bin/kcadm.sh"

echo "⏳ Connecting to Keycloak..."
docker exec $CONTAINER_NAME $KC_ADM config credentials --server http://localhost:8080 --realm master --user admin --password admin123

echo "🏗️ Creating Realm 'genericlab'..."
docker exec $CONTAINER_NAME $KC_ADM create realms -s realm=genericlab -s enabled=true -o

echo "📱 Creating Frontend Client..."
docker exec $CONTAINER_NAME $KC_ADM create clients -r genericlab -s clientId=genericlab-capa-frontend -s publicClient=true -s "redirectUris=[\"http://localhost:3000/*\"]" -s "webOrigins=[\"http://localhost:3000\"]" -o

echo "⚙️ Creating Backend Client..."
# Get the ID of the created client to get the secret later if needed, but here we set it directly if possible or let it generate
# Simpler approach: create with service accounts enabled
docker exec $CONTAINER_NAME $KC_ADM create clients -r genericlab -s clientId=genericlab-capa-backend -s serviceAccountsEnabled=true -s secret=PLEASE_REPLACE_WITH_REAL_Secret -o

echo "👤 Creating User 'marie.dupont'..."
docker exec $CONTAINER_NAME $KC_ADM create users -r genericlab -s username=marie.dupont@genericlab.com -s email=marie.dupont@genericlab.com -s firstName=Marie -s lastName=Dupont -s enabled=true -o

echo "🔑 Setting Password..."
docker exec $CONTAINER_NAME $KC_ADM set-password -r genericlab --username marie.dupont@genericlab.com --new-password Admin123!

echo "✅ Configuration Complete! You can now login."
