export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const fetchWithAuth = async (endpoint, options = {}) => {
    let token = null

    // Essayer de récupérer le token Keycloak d'abord
    try {
      const { getToken } = useKeycloak()
      token = getToken()
    } catch (e) {
      // Fallback si useKeycloak n'est pas disponible ou erreur
      if (process.client) {
        token = localStorage.getItem('token')
      }
    }

    // Fallback explicite localStorage si Keycloak ne retourne rien (mock mode support)
    if (!token && process.client) {
      token = localStorage.getItem('token')
    }

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }

    // Default to application/json if Content-Type is not explicitly skipped or overridden
    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }

    try {
      const response = await $fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers
      })
      return response
    } catch (error) {
      if (error.response?.status === 401) {
        if (process.client) {
          const { logout } = useKeycloak()
          logout()
        }
        throw new Error('Session expirée')
      }
      console.error('API Error:', error)
      throw error // Propager l'erreur pour que les composants la gèrent
    }
  }

  return {
    // CAPA endpoints
    getAllCapas: () => fetchWithAuth('/capa'),
    getCAPAs: () => fetchWithAuth('/capa'),
    getCAPAById: (id) => fetchWithAuth(`/capa/${id}`),
    createCAPA: (data) => fetchWithAuth('/capa', { method: 'POST', body: data }),
    updateCAPA: (id, data) => fetchWithAuth(`/capa/${id}`, { method: 'PUT', body: data }),
    deleteCAPA: (id) => fetchWithAuth(`/capa/${id}`, { method: 'DELETE' }),
    deleteCapa: (id) => fetchWithAuth(`/capa/${id}`, { method: 'DELETE' }),
    getCAPAsByStatus: (status) => fetchWithAuth(`/capa/status/${status}`),

    // Event endpoints
    getAllEvents: () => fetchWithAuth('/events'),
    getEventById: (id) => fetchWithAuth(`/events/${id}`),
    createEvent: (data) => fetchWithAuth('/events', { method: 'POST', body: data }),
    updateEvent: (id, data) => fetchWithAuth(`/events/${id}`, { method: 'PUT', body: data }),
    addImmediateAction: (id, data) => fetchWithAuth(`/events/${id}/immediate-action`, { method: 'POST', body: data }),
    evaluateEvent: (id, data) => fetchWithAuth(`/events/${id}/evaluate`, { method: 'POST', body: data }),
    createInvestigation: (id, data) => fetchWithAuth(`/events/${id}/investigation`, { method: 'POST', body: data }),
    addIshikawaCause: (invId, data) => fetchWithAuth(`/events/investigation/${invId}/ishikawa`, { method: 'POST', body: data }),
    deleteIshikawaCause: (causeId) => fetchWithAuth(`/events/ishikawa/${causeId}`, { method: 'DELETE' }),
    identifyRootCause: (invId, data) => fetchWithAuth(`/events/investigation/${invId}/root-cause`, { method: 'POST', body: data }),
    removeIdentifiedCause: (causeId) => fetchWithAuth(`/events/root-cause/${causeId}`, { method: 'DELETE' }),
    addSolution: (invId, data) => fetchWithAuth(`/events/investigation/${invId}/solutions`, { method: 'POST', body: data }),
    updateSolution: (solId, data) => fetchWithAuth(`/events/solutions/${solId}`, { method: 'PATCH', body: data }),
    deleteSolution: (solId) => fetchWithAuth(`/events/solutions/${solId}`, { method: 'DELETE' }),
    closeInvestigation: (invId) => fetchWithAuth(`/events/investigation/${invId}/close`, { method: 'POST' }),

    // CAPA
    initCapa: (eventId, data) => fetchWithAuth(`/events/${eventId}/capa`, { method: 'POST', body: data }),
    addCapaAction: (capaId, data) => fetchWithAuth(`/events/capa/${capaId}/actions`, { method: 'POST', body: data }),
    updateCapaAction: (actionId, data) => fetchWithAuth(`/events/capa/actions/${actionId}`, { method: 'PUT', body: data }),
    deleteCapaAction: (actionId) => fetchWithAuth(`/events/capa/actions/${actionId}`, { method: 'DELETE' }),
    saveCapaEffectiveness: (capaId, data) => fetchWithAuth(`/events/capa/${capaId}/effectiveness`, { method: 'POST', body: data }),
    closeCapa: (capaId, data) => fetchWithAuth(`/events/capa/${capaId}/close`, { method: 'POST', body: data }),

    // User endpoints
    getAllUsers: () => fetchWithAuth('/users'),
    getUsers: () => fetchWithAuth('/users'),
    getUserById: (id) => fetchWithAuth(`/users/${id}`),
    createUser: (data) => fetchWithAuth('/users', { method: 'POST', body: data }),
    updateUser: (id, data) => fetchWithAuth(`/users/${id}`, { method: 'PUT', body: data }),
    deleteUser: (id) => fetchWithAuth(`/users/${id}`, { method: 'DELETE' }),
    getUserActivities: (id) => fetchWithAuth(`/users/${id}/activities`),

    // Documents
    getDocuments: (type, id) => fetchWithAuth(`/common/documents/${type}/${id}`),
    uploadDocument: (formData) => fetchWithAuth(`/common/documents`, {
      method: 'POST',
      body: formData
    }),
    deleteDocument: (id) => fetchWithAuth(`/common/documents/${id}`, { method: 'DELETE' }),

    // Auth endpoints
    login: (credentials) => fetchWithAuth('/auth/login', { method: 'POST', body: credentials }),
    logout: () => fetchWithAuth('/auth/logout', { method: 'POST' }),
    getProfile: () => fetchWithAuth('/auth/profile'),
    changePassword: (data) => fetchWithAuth('/auth/change-password', { method: 'POST', body: data }),

    // Stats endpoints
    getDashboardStats: () => fetchWithAuth('/stats/dashboard'),
    getStatsByPeriod: (period) => fetchWithAuth(`/stats/period/${period}`),
    getReports: (params) => fetchWithAuth('/stats/reports', {
      method: 'GET',
      params
    })
  }
}