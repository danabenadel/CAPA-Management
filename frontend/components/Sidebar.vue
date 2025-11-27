<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <!-- Logo -->
    <div class="p-6 border-b border-gray-200">
      <NuxtLink to="/" class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">GL</span>
        </div>
        <span class="text-xl font-bold text-gray-800">GenericLab</span>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-6 px-4">
      <div class="mb-6">
        <NuxtLink
          to="/dashboard"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl"
          :class="isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
        >
          <Home :size="20" />
          <span class="font-medium">Dashboard</span>
        </NuxtLink>
      </div>

      <div class="space-y-1">
        <NuxtLink
          to="/tables"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors"
          :class="isActive('/tables') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
        >
          <FileText :size="20" />
          <span class="font-medium">Gestion CAPA</span>
        </NuxtLink>

        <NuxtLink
          to="/users"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors"
          :class="isActive('/users') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
        >
          <Users :size="20" />
          <span class="font-medium">Utilisateurs</span>
        </NuxtLink>

        <NuxtLink
          to="/reports"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors"
          :class="isActive('/reports') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
        >
          <BarChart3 :size="20" />
          <span class="font-medium">Rapports</span>
        </NuxtLink>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">Compte</p>
        <div class="space-y-1">
          <NuxtLink
            to="/profile"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors"
            :class="isActive('/profile') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'"
          >
            <User :size="20" />
            <span class="font-medium">Profile</span>
          </NuxtLink>

          <button
            @click="handleLogout"
            class="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <LogOut :size="20" />
            <span class="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { Home, FileText, Users, BarChart3, User, LogOut } from 'lucide-vue-next'

const route = useRoute()

const isActive = (path) => {
  return route.path.startsWith(path)
}

const handleLogout = () => {
  if (process.client) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  navigateTo('/')
}
</script>