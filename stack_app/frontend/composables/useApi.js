export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const fetchWithAuth = async (endpoint, options = {}) => {
    const token = process.client ? localStorage.getItem('token') : null

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }

    try {
      const response = await $fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers
      })
      return response
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  return {
    // CAPA endpoints
    getCAPAs: () => fetchWithAuth('/capa'),
    getCAPAById: (id) => fetchWithAuth(`/capa/${id}`),
    createCAPA: (data) => fetchWithAuth('/capa', { method: 'POST', body: data }),
    updateCAPA: (id, data) => fetchWithAuth(`/capa/${id}`, { method: 'PUT', body: data }),
    deleteCAPA: (id) => fetchWithAuth(`/capa/${id}`, { method: 'DELETE' }),
    getCAPAsByStatus: (status) => fetchWithAuth(`/capa/status/${status}`),

    // User endpoints
    getUsers: () => fetchWithAuth('/users'),
    getUserById: (id) => fetchWithAuth(`/users/${id}`),
    createUser: (data) => fetchWithAuth('/users', { method: 'POST', body: data }),
    updateUser: (id, data) => fetchWithAuth(`/users/${id}`, { method: 'PUT', body: data }),
    deleteUser: (id) => fetchWithAuth(`/users/${id}`, { method: 'DELETE' }),

    // Auth endpoints
    login: (credentials) => fetchWithAuth('/auth/login', { method: 'POST', body: credentials }),
    logout: () => fetchWithAuth('/auth/logout', { method: 'POST' }),
    getProfile: () => fetchWithAuth('/auth/profile'),

    // Stats endpoints
    getDashboardStats: () => fetchWithAuth('/stats/dashboard'),
    getStatsByPeriod: (period) => fetchWithAuth(`/stats/period/${period}`)
  }
}