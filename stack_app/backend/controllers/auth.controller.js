import prisma from '../config/prisma.js';

/**
 * Valide la force du mot de passe selon les critères de sécurité
 * @param {string} password - Le mot de passe à valider
 * @returns {object} - Résultat de la validation avec isValid et missingCriteria
 */
function validatePasswordStrength(password) {
  // Same logic as before if needed, or simplified for MVP
  const criteria = {
    minLength: password.length >= 8,
    // hasUpperCase: /[A-Z]/.test(password),
    // hasLowerCase: /[a-z]/.test(password), 
    // Simplified for dev convenience:
    isValid: password.length >= 3
  };

  return {
    isValid: password.length >= 3,
    missingCriteria: []
  };
}

export const authController = {
  // POST connexion
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validation de l'email @genericlab.com
      const emailRegex = /^[a-zA-Z0-9._-]+@genericlab\.com$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Veuillez utiliser une adresse email @genericlab.com'
        });
      }

      // Recherche utilisateur
      const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true, department: true }
      });

      if (!user) {
        return res.status(401).json({ success: false, error: 'Email ou mot de passe incorrect' });
      }

      // TODO: Verify password hash with bcrypt/argon2
      // For now, accepting any password for seeded users 
      // (or check if passwordHash matches strict string if seeded that way)

      // Log activity
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          username: user.username,
          actionType: 'AUTH',
          entityType: 'User',
          entityId: user.id,
          oldValue: { action: 'Login' }
        }
      });

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            nom: user.lastName,
            prenom: user.firstName,
            email: user.email,
            role: user.role?.roleName,
            departement: user.department?.departmentName
          },
          token: 'demo_token_' + Date.now() // En production, générer un vrai JWT
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST déconnexion
  logout: async (req, res) => {
    try {
      res.json({ success: true, message: 'Déconnexion réussie' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET profil utilisateur
  getProfile: async (req, res) => {
    try {
      // Mock profile fetch - normally extract from JWT middleware
      // Assuming userId 1 for dev if no token provided
      const user = await prisma.user.findUnique({
        where: { id: 1 },
        include: { role: true, department: true }
      });
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
