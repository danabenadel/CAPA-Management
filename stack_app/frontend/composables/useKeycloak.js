let keycloakInstance = null
let tokenRefreshInterval = null

export const useKeycloak = () => {
  const config = useRuntimeConfig()
  const router = useRouter()

  // État de l'authentification
  const isAuthenticated = useState('keycloak-authenticated', () => false)
  const user = useState('keycloak-user', () => null)
  const token = useState('keycloak-token', () => null)

  // Initialiser Keycloak
  const initKeycloak = async () => {
    if (keycloakInstance) return keycloakInstance

    try {
      // Import dynamique pour éviter les problèmes SSR
      const KeycloakJS = (await import('keycloak-js')).default

      keycloakInstance = new KeycloakJS({
        url: config.public.keycloak.url,
        realm: config.public.keycloak.realm,
        clientId: config.public.keycloak.clientId
      })

      const authenticated = await keycloakInstance.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false
      })

      if (authenticated) {
        isAuthenticated.value = true
        token.value = keycloakInstance.token
        if (process.client) {
          localStorage.setItem('token', keycloakInstance.token)
        }

        // Récupérer les informations utilisateur
        await loadUserProfile()

        // Auto-refresh du token
        setupTokenRefresh()
      }

      return keycloakInstance
    } catch (error) {
      console.error('Erreur initialisation Keycloak:', error)
      throw error
    }
  }

  // Charger le profil utilisateur
  const loadUserProfile = async () => {
    try {
      const profile = await keycloakInstance.loadUserProfile()
      user.value = {
        id: profile.id,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        // Attributs personnalisés (si configurés dans Keycloak)
        role: keycloakInstance.tokenParsed?.role,
        departement: keycloakInstance.tokenParsed?.departement
      }
    } catch (error) {
      console.error('Erreur chargement profil:', error)
    }
  }

  // Configuration du rafraîchissement automatique du token
  const setupTokenRefresh = () => {
    // Nettoyer l'intervalle existant si présent
    if (tokenRefreshInterval) clearInterval(tokenRefreshInterval)

    tokenRefreshInterval = setInterval(() => {
      keycloakInstance.updateToken(70).then((refreshed) => {
        if (refreshed) {
          token.value = keycloakInstance.token
          if (process.client) {
            localStorage.setItem('token', keycloakInstance.token)
          }
          console.log('Token rafraîchi')
        }
      }).catch(() => {
        console.error('Échec du rafraîchissement du token')
        logout()
      })
    }, 60000) // Vérifier toutes les 60 secondes
  }

  // Nettoyage lors du démontage du composant qui utilise ce composable
  // Note: Comme c'est un composable global, on peut aussi gérer ça différemment
  if (process.client) {
    window.addEventListener('beforeunload', () => {
      if (tokenRefreshInterval) clearInterval(tokenRefreshInterval)
    })
  }

  // Connexion
  const login = async () => {
    try {
      if (!keycloakInstance) {
        await initKeycloak()
      }
      await keycloakInstance.login({
        redirectUri: window.location.origin + '/'
      })
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      throw error
    }
  }

  // Déconnexion
  const logout = async () => {
    try {
      if (keycloakInstance) {
        await keycloakInstance.logout({
          redirectUri: window.location.origin
        })
      }
      isAuthenticated.value = false
      user.value = null
      token.value = null
      if (process.client) {
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  // Vérifier si l'utilisateur a un rôle
  const hasRole = (role) => {
    if (!keycloakInstance) return false
    return keycloakInstance.hasRealmRole(role)
  }

  // Obtenir le token d'accès
  const getToken = () => {
    return token.value || keycloakInstance?.token
  }

  return {
    initKeycloak,
    login,
    logout,
    isAuthenticated,
    user,
    token,
    hasRole,
    getToken,
    keycloak: keycloakInstance
  }
}
