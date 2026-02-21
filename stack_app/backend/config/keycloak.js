
import Keycloak from 'keycloak-connect';
import dotenv from 'dotenv';

dotenv.config();

let keycloak;

export const initKeycloak = (memoryStore) => {
    if (keycloak) {
        console.warn("Keycloak already initialized!");
        return keycloak;
    }

    const keycloakConfig = {
        "realm": process.env.KEYCLOAK_REALM || "genericlab",
        "auth-server-url": process.env.KEYCLOAK_URL || "http://localhost:8080",
        "ssl-required": "external",
        "resource": process.env.KEYCLOAK_CLIENT_ID || "genericlab-capa-backend",
        "bearer-only": true,
        "credentials": {
            "secret": process.env.KEYCLOAK_CLIENT_SECRET
        },
        "confidential-port": 0
    };

    keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

    console.log("🔒 Keycloak initialized");

    return keycloak;
};

export const getKeycloak = () => {
    if (!keycloak) {
        throw new Error("Keycloak needs to be initialized first!");
    }
    return keycloak;
};
