import fs from 'fs';
import path from 'path';

// Files copy wrapper
try {
  const destDir = '/home/danabenadel/PART_TIME/genericlab-capa/Genericlab-CAPA-Management/stack_app/frontend/public';
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  // Logo
  fs.copyFileSync('/home/danabenadel/PART_TIME/genericlab-capa/logo_generic_lab_copie_page-0001-removebg-preview.png', destDir + '/logo-genericlab.png');

  // Icons from AI Brain
  const brainDir = '/mnt/c/Users/danab/.gemini/antigravity/brain/e36d6160-8579-45f1-93a9-7401119739cd';
  const iconsDir = destDir + '/icons';
  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
  const files = fs.readdirSync(brainDir);
  for (const f of files) {
    if (f.endsWith('.png') && f.includes('_icon_')) {
      const type = f.split('_icon_')[0];
      fs.copyFileSync(path.join(brainDir, f), path.join(iconsDir, type + '.png'));
    }
  }
} catch (e) { console.log('File copy failed', e); }

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
