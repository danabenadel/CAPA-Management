<template>
  <aside 
    ref="sidebarRef"
    class="relative bg-white/80 backdrop-blur-xl border border-white/40 flex flex-col shadow-[0_8px_30px_rgb(194,209,235,0.4)] z-20 rounded-3xl my-6 ml-6 h-[calc(100vh-3rem)] transition-[width] duration-0 overflow-hidden"
    :style="{ width: sidebarWidth + 'px' }"
  >
    <!-- Resize Handle -->
    <div 
      class="absolute top-0 right-0 w-2 h-full cursor-col-resize hover:bg-brand-500/20 active:bg-brand-500/40 transition-colors z-50 rounded-r-3xl"
      @mousedown.prevent="startResize"
    ></div>

    <!-- Scaled Content Container -->
    <div class="flex flex-col h-full" :style="{ transform: `scale(${scaleFactor})`, transformOrigin: 'top left', width: '256px' }">
      <!-- Logo -->
      <div class="h-28 w-full border-b border-gray-100/50 flex justify-center items-center overflow-hidden shrink-0">
        <NuxtLink to="/" class="block group w-full h-full flex justify-center items-center">
          <img src="/logo-genericlab.png" alt="GenericLab Logo" class="w-full h-full object-contain scale-[3.5] transition-transform duration-300 group-hover:scale-[3.6] mt-20" />
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div class="mb-6">
          <NuxtLink
            to="/dashboard"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200"
            :class="isActive('/dashboard') ? 'bg-white/80 text-accent shadow-sm font-semibold border border-white/40' : 'text-slate-500 hover:bg-white/40 hover:text-accent'"
          >
            <Home :size="20" :class="isActive('/dashboard') ? 'text-accent' : 'text-gray-400 group-hover:text-gray-600'" />
            <span>Dashboard</span>
          </NuxtLink>
        </div>

        <!-- Button "Nouvelle CAPA" removed -->


        <div class="space-y-1">
          <NuxtLink
            to="/events"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group"
            :class="isActive('/events') ? 'bg-white/80 text-accent shadow-sm font-semibold border border-white/40' : 'text-slate-500 hover:bg-white/40 hover:text-accent'"
          >
            <AlertCircle :size="20" :class="isActive('/events') ? 'text-accent' : 'text-gray-400 group-hover:text-gray-600'" />
            <span>Événements</span>
          </NuxtLink>
          <NuxtLink
            to="/tables"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group"
            :class="isActive('/tables') ? 'bg-white/80 text-accent shadow-sm font-semibold border border-white/40' : 'text-slate-500 hover:bg-white/40 hover:text-accent'"
          >
            <FileText :size="20" :class="isActive('/tables') ? 'text-accent' : 'text-gray-400 group-hover:text-gray-600'" />
            <span>Gestion CAPA</span>
          </NuxtLink>

          <NuxtLink
            to="/users"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group"
            :class="isActive('/users') ? 'bg-white/80 text-accent shadow-sm font-semibold border border-white/40' : 'text-slate-500 hover:bg-white/40 hover:text-accent'"
          >
            <Users :size="20" :class="isActive('/users') ? 'text-accent' : 'text-gray-400 group-hover:text-gray-600'" />
            <span>Utilisateurs</span>
          </NuxtLink>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-100">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">Compte</p>
          <div class="space-y-1">
            <NuxtLink
              to="/profile"
              class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group"
              :class="isActive('/profile') ? 'bg-white/80 text-accent shadow-sm font-semibold border border-white/40' : 'text-slate-500 hover:bg-white/40 hover:text-accent'"
            >
              <User :size="20" :class="isActive('/profile') ? 'text-accent' : 'text-gray-400 group-hover:text-gray-600'" />
              <span>Profil</span>
            </NuxtLink>

            <button
              @click="handleLogout"
              class="w-full flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-red-50/50 hover:text-red-500 rounded-xl transition-all duration-200 group"
            >
              <LogOut :size="20" class="text-gray-400 group-hover:text-red-500" />
              <span class="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Home, FileText, Users, BarChart3, User, LogOut, AlertCircle, Plus } from 'lucide-vue-next'

const route = useRoute()

// Resizing logic
const sidebarWidth = ref(256) // w-64 equivalent (16rem = 256px)
const scaleFactor = computed(() => sidebarWidth.value / 256)
const isResizing = ref(false)
const sidebarRef = ref(null)

const startResize = (e) => {
  isResizing.value = true
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  // Prevent text selection while dragging
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'
}

const handleResize = (e) => {
  if (!isResizing.value) return
  
  // Calculate new width based on mouse position relative to sidebar left edge
  // Sidebar has ml-6 (24px) margin left
  const newWidth = e.clientX - 24 
  
  // Constrain width between min and max values
  if (newWidth >= 200 && newWidth <= 480) {
    sidebarWidth.value = newWidth
  }
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.body.style.userSelect = ''
  document.body.style.cursor = ''
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
})

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