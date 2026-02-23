<template>
  <div class="min-h-screen flex bg-gradient-to-b from-[#e8f4fc] to-[#7cb4e8]">
    <!-- Left Side - Form -->
    <div class="w-full lg:w-1/2 flex flex-col relative z-10">
      <!-- Top Navigation -->
      <nav class="px-8 py-6 flex items-center justify-between">
        <div class="h-32 w-72 flex items-center justify-start overflow-hidden ml-4 border-transparent">
          <img src="/logo-genericlab.png" alt="GenericLab Logo" class="w-full h-full object-contain scale-[4.5] transition-transform duration-400 hover:scale-[4.6] mt-24" />
        </div>

        <div class="hidden md:flex items-center space-x-2">
           <NuxtLink to="/dashboard" class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
            Dashboard
          </NuxtLink>
        </div>
      </nav>

      <!-- Sign In Form -->
      <div class="flex-1 flex items-center justify-center px-8 py-12">
        <div class="w-full max-w-md">
          <div class="mb-10">
            <h2 class="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Bienvenue</h2>
            <p class="text-lg text-gray-500">Connectez-vous à votre espace de travail sécurisé.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <button
              type="submit"
              :disabled="loading"
              class="w-full btn-primary py-4 text-lg shadow-xl shadow-brand-500/20 hover:shadow-2xl hover:shadow-brand-500/30 flex justify-center items-center space-x-3 group"
            >
              <LogIn :size="22" class="group-hover:translate-x-1 transition-transform" />
              <span>{{ loading ? 'Redirection...' : 'Se connecter avec SSO' }}</span>
            </button>

            <div class="mt-6 flex items-center justify-center space-x-2">
              <div class="h-px bg-gray-200 w-full"></div>
              <span class="text-xs text-gray-400 whitespace-nowrap px-2 uppercase tracking-wider">Sécurisé par Keycloak</span>
              <div class="h-px bg-gray-200 w-full"></div>
            </div>
          </form>

          <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-3">
            <AlertCircle class="text-red-500 mt-0.5" :size="20" />
            <p class="text-sm text-red-600 font-medium">{{ error }}</p>
          </div>
        </div>
      </div>
      
      <div class="px-8 py-6 text-center text-sm text-gray-400">
        &copy; {{ new Date().getFullYear() }} GenericLab. Tous droits réservés.
      </div>
    </div>

    <!-- Right Side - Image/Info -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 items-center justify-center p-12 relative overflow-hidden">
      <!-- Decorative circles -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-brand-800/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <div class="text-white max-w-lg relative z-10">
        <h1 class="text-5xl font-bold mb-6 tracking-tight leading-tight">L'excellence pharmaceutique</h1>
        <p class="text-xl text-brand-50 mb-10 leading-relaxed font-light">
          Une plateforme unifiée pour gérer vos CAPA, suivre la conformité et assurer la qualité de production.
        </p>
        
        <div class="space-y-6">
          <div class="flex items-center space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
            <div class="bg-white/20 p-2 rounded-lg">
              <CheckCircle class="text-white" :size="24" />
            </div>
            <div>
              <h3 class="font-bold text-lg">Suivi en temps réel</h3>
              <p class="text-brand-100 text-sm">Visualisez l'état d'avancement de vos actions</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
            <div class="bg-white/20 p-2 rounded-lg">
              <BarChart3 class="text-white" :size="24" />
            </div>
            <div>
              <h3 class="font-bold text-lg">Analytics avancés</h3>
              <p class="text-brand-100 text-sm">Tableaux de bord dynamiques et reporting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Home, FileText, LogIn, CheckCircle, AlertCircle, BarChart3 } from 'lucide-vue-next'

useHead({
  title: 'Connexion'
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const api = useApi()

// Connexion avec Keycloak
const { login, isAuthenticated } = useKeycloak()

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    await login()
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'Erreur lors de la redirection vers Keycloak'
    loading.value = false
  }
}

// Redirection automatique si déjà connecté
onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo('/dashboard')
  }
})

watch(isAuthenticated, (isAuth) => {
  if (isAuth) {
    navigateTo('/dashboard')
  }
})
</script>
