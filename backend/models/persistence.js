import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { capas as defaultCapas, users as defaultUsers, activities as defaultActivities } from './data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../data/db.json');

// État global
export const state = {
    capas: [],
    users: [],
    activities: []
};

// Charger les données
export const loadData = () => {
    try {
        if (fs.existsSync(DB_PATH)) {
            const rawData = fs.readFileSync(DB_PATH, 'utf8');
            const data = JSON.parse(rawData);
            state.capas = data.capas || defaultCapas;
            state.users = data.users || defaultUsers;
            state.activities = data.activities || defaultActivities;
            console.log('Données chargées depuis db.json');
        } else {
            // Initialiser avec les données par défaut
            state.capas = [...defaultCapas];
            state.users = [...defaultUsers];
            state.activities = [...defaultActivities];
            saveData(); // Créer le fichier
            console.log('Base de données initialisée avec les valeurs par défaut');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // Fallback
        state.capas = [...defaultCapas];
        state.users = [...defaultUsers];
        state.activities = [...defaultActivities];
    }
};

// Sauvegarder les données
export const saveData = () => {
    try {
        const data = {
            capas: state.capas,
            users: state.users,
            activities: state.activities
        };
        // Assurer que le dossier existe
        const dir = path.dirname(DB_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
        console.log('Données sauvegardées');
    } catch (error) {
        console.error('Erreur lors de la sauvegarde des données:', error);
    }
};
