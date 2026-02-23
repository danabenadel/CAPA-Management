// Middleware d'authentification Keycloak
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Ignorer la page de login pour éviter les boucles
  if (to.path === '/') return

  const { isAuthenticated, initKeycloak, login } = useKeycloak()

  // S'assurer que Keycloak est initialisé (essentiel pour le SSR/reload)
  if (process.client) {
    try {
      await initKeycloak()
    } catch (error) {
      console.error('Erreur middleware auth:', error)
    }

    if (!isAuthenticated.value) {
      return navigateTo('/')
    }
  }
})