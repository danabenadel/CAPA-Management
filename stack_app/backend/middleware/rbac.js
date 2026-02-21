// Middleware de contrôle d'accès basé sur les rôles (RBAC)

// Définition des Rôles
const ROLES = {
    ADMIN: 'Admin',
    INITIATEUR: 'Demandeur/Initiateur',
    RESPONSABLE_AC: 'Responsable d\'action corrective',
    SUPERVISEUR: 'Superviseur / Validateur',
    APPROBATEUR: 'Approbateur',
    NOTIFICATEUR: 'Notificateur'
};

// Matrice de permissions (simplifiée pour le code)
// X = true, O = false
const PERMISSIONS = {
    MANAGE_USERS: [ROLES.ADMIN],
    CREATE_CAPA: [ROLES.ADMIN, ROLES.INITIATEUR],
    APPROVE_CAPA: [ROLES.APPROBATEUR],
    CREATE_FNC: [ROLES.ADMIN, ROLES.INITIATEUR],
    ANALYZE_RISK: [ROLES.RESPONSABLE_AC, ROLES.SUPERVISEUR],
    DEFINE_SOLUTION: [ROLES.RESPONSABLE_AC],
    VALIDATE_SOLUTION: [ROLES.SUPERVISEUR],
    CLOSE_CAPA: [ROLES.APPROBATEUR, ROLES.SUPERVISEUR],
    VIEW_ALL: Object.values(ROLES)
};

export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // Si l'utilisateur est authentifié via Keycloak
        const userRole = req.user?.role || req.kauth?.grant?.access_token?.content?.realm_access?.roles?.[0] || 'User';

        if (allowedRoles.includes(userRole) || userRole === ROLES.ADMIN) {
            next();
        } else {
            res.status(403).json({
                success: false,
                error: "Accès refusé. Vous n'avez pas les droits nécessaires."
            });
        }
    };
};

export const checkPermission = (permissionKey) => {
    return (req, res, next) => {
        const userRole = req.user?.role || 'User';
        const allowedRoles = PERMISSIONS[permissionKey] || [];

        if (allowedRoles.includes(userRole) || userRole === ROLES.ADMIN) {
            next();
        } else {
            res.status(403).json({
                success: false,
                error: `Action non autorisée pour le rôle ${userRole}.`
            });
        }
    };
};
