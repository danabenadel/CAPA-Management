<template>
  <aside class="w-64 bg-white/90 backdrop-blur-md border-r border-gray-100 flex flex-col shadow-soft z-20">
    <!-- Logo -->
    <div class="p-6 border-b border-gray-100/50">
      <NuxtLink to="/" class="flex items-center space-x-3 group">
        <div class="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-400 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
          <span class="text-white font-bold text-xl">GL</span>
        </div>
        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-800 to-brand-600">GenericLab</span>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-6 px-4 space-y-1">
      <div class="mb-6">
        <NuxtLink
          to="/dashboard"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200"
          :class="isActive('/dashboard') ? 'bg-brand-50 text-brand-600 shadow-sm font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'"
        >
          <Home :size="20" :class="isActive('/dashboard') ? 'text-brand-500' : 'text-gray-400 group-hover:text-gray-600'" />
          <span>Dashboard</span>
        </NuxtLink>
      </div>

      <div class="space-y-1">
        <NuxtLink
          to="/events"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group"
          :class="isActive('/events') ? 'bg-brand-50 text-brand-600 shadow-sm font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'"
        >
          <AlertCircle :size="20" :class="isActive('/events') ? 'text-brand-500' : 'text-gray-400 group-hover:text-gray-600'" />
          <span>Événements</span>
        </NuxtLink>
        <NuxtLink
          to="/tables"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group"
          :class="isActive('/tables') ? 'bg-brand-50 text-brand-600 shadow-sm font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'"
        >
          <FileText :size="20" :class="isActive('/tables') ? 'text-brand-500' : 'text-gray-400 group-hover:text-gray-600'" />
          <span>Gestion CAPA</span>
        </NuxtLink>

        <NuxtLink
          to="/users"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group"
          :class="isActive('/users') ? 'bg-brand-50 text-brand-600 shadow-sm font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'"
        >
          <Users :size="20" :class="isActive('/users') ? 'text-brand-500' : 'text-gray-400 group-hover:text-gray-600'" />
          <span>Utilisateurs</span>
        </NuxtLink>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-100">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">Compte</p>
        <div class="space-y-1">
          <NuxtLink
            to="/profile"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group"
            :class="isActive('/profile') ? 'bg-brand-50 text-brand-600 shadow-sm font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'"
          >
            <User :size="20" :class="isActive('/profile') ? 'text-brand-500' : 'text-gray-400 group-hover:text-gray-600'" />
            <span>Profil</span>
          </NuxtLink>

          <button
            @click="handleLogout"
            class="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group"
          >
            <LogOut :size="20" class="text-gray-400 group-hover:text-red-500" />
            <span class="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { Home, FileText, Users, BarChart3, User, LogOut, AlertCircle } from 'lucide-vue-next'

const route = useRoute()

const isActive = (path) => {
  return route.path.startsWith(path)
}

const { logout: keycloakLogout } = useKeycloak()

const handleLogout = async () => {
  try {
    await keycloakLogout()
  } catch (error) {
    console.error('Logout failed', error)
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigateTo('/')
    }
  }
}
</script>