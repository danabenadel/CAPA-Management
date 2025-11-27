<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Form -->
    <div class="w-full lg:w-1/2 flex flex-col">
      <!-- Top Navigation -->
      <nav class="px-8 py-6 flex items-center justify-between border-b border-gray-100">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">GL</span>
          </div>
          <span class="text-xl font-bold text-gray-800">GenericLab</span>
        </NuxtLink>

        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/dashboard" class="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
            <Home :size="16" />
            <span class="text-sm font-medium">Dashboard</span>
          </NuxtLink>
          <NuxtLink to="/profile" class="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
            <FileText :size="16" />
            <span class="text-sm font-medium">Profile</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center space-x-2 font-medium text-blue-600">
            <LogIn :size="16" />
            <span class="text-sm">Sign In</span>
          </NuxtLink>
        </div>
      </nav>

      <!-- Sign In Form -->
      <div class="flex-1 flex items-center justify-center px-8 py-12">
        <div class="w-full max-w-md">
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-blue-600 mb-2">Bienvenue</h2>
            <p class="text-gray-600">Entrez votre email et mot de passe pour vous connecter</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="Votre adresse email"
                class="input-field"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Votre mot de passe"
                  class="input-field pr-10"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Eye v-if="!showPassword" :size="20" />
                  <EyeOff v-else :size="20" />
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input
                  v-model="form.rememberMe"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-700">
                Mot de passe oublié?
              </a>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full btn-primary py-3"
            >
              {{ loading ? 'Connexion...' : 'Se connecter' }}
            </button>
          </form>

          <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Image/Info -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
      <div class="text-white max-w-md">
        <h1 class="text-4xl font-bold mb-6">Gestion CAPA</h1>
        <p class="text-lg text-blue-100 mb-8">
          Gérez efficacement vos actions correctives et préventives dans un environnement pharmaceutique
        </p>
        <ul class="space-y-4">
          <li class="flex items-start">
            <CheckCircle class="mr-3 mt-1 flex-shrink-0" :size="20" />
            <span>Suivi en temps réel des CAPA</span>
          </li>
          <li class="flex items-start">
            <CheckCircle class="mr-3 mt-1 flex-shrink-0" :size="20" />
            <span>Tableaux de bord interactifs</span>
          </li>
          <li class="flex items-start">
            <CheckCircle class="mr-3 mt-1 flex-shrink-0" :size="20" />
            <span>Rapports et analytics avancés</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Home, FileText, LogIn, Eye, EyeOff, CheckCircle } from 'lucide-vue-next'

useHead({
  title: 'Connexion'
})

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    const config = useRuntimeConfig()
    const response = await $fetch(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password
      }
    })

    if (response.success) {
      // Stocker le token (vous pouvez utiliser un store Pinia ici)
      if (process.client) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }

      // Rediriger vers le dashboard
      await navigateTo('/dashboard')
    }
  } catch (err) {
    error.value = 'Email ou mot de passe incorrect'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>