// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Force le routing basé sur les fichiers
  pages: true,

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'GenericLab CAPA Management',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Application de gestion des CAPA pour laboratoires' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api',
      keycloak: {
        url: process.env.NUXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080',
        realm: process.env.NUXT_PUBLIC_KEYCLOAK_REALM || 'genericlab',
        clientId: process.env.NUXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'genericlab-capa-frontend'
      }
    }
  }
})
