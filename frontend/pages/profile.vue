<template>
  <div class="flex h-screen bg-gradient-to-b from-[#e8f4fc] to-[#7cb4e8]">
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <header class="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(194,209,235,0.4)] mx-6 mt-6 mb-6 px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-accent">Mon Profil</h1>
            <p class="text-gray-600">Gérer vos informations personnelles et préférences</p>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="p-8">
        <div class="max-w-4xl mx-auto">
          <!-- Profile Header -->
          <div class="card mb-8">
            <div class="flex items-start space-x-6">
              <div class="flex-shrink-0">
                <div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-3xl font-bold">{{ userInitials }}</span>
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-gray-800">{{ user.prenom }} {{ user.nom }}</h2>
                <p class="text-gray-600">{{ user.email }}</p>
                <div class="flex items-center space-x-4 mt-4">
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {{ getRoleLabel(user.role) }}
                  </span>
                  <span class="text-sm text-gray-600">{{ user.departement }}</span>
                </div>
              </div>
              <button
                @click="editing = !editing"
                class="btn-primary"
              >
                {{ editing ? 'Annuler' : 'Modifier' }}
              </button>
            </div>
          </div>

          <!-- Personal Information -->
          <div class="card mb-8">
            <h3 class="text-lg font-bold text-gray-800 mb-6">Informations Personnelles</h3>
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                  <input
                    v-model="formData.prenom"
                    type="text"
                    :disabled="!editing"
                    class="input-field"
                    :class="{ 'bg-gray-50': !editing }"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                  <input
                    v-model="formData.nom"
                    type="text"
                    :disabled="!editing"
                    class="input-field"
                    :class="{ 'bg-gray-50': !editing }"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    :disabled="!editing"
                    class="input-field"
                    :class="{ 'bg-gray-50': !editing }"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Département</label>
                  <select
                    v-model="formData.departement"
                    :disabled="!editing"
                    class="input-field"
                    :class="{ 'bg-gray-50': !editing }"
                  >
                    <option value="Qualité">Qualité</option>
                    <option value="Production">Production</option>
                    <option value="Laboratoire">Laboratoire</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div v-if="editing" class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="cancelEdit"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  class="btn-primary"
                  :disabled="saving"
                >
                  {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Change Password -->
          <div class="card mb-8">
            <h3 class="text-lg font-bold text-gray-800 mb-6">Changer le Mot de Passe</h3>
            <form @submit.prevent="changePassword" class="space-y-6">
              <div class="max-w-md">
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Mot de passe actuel</label>
                  <div class="relative">
                    <input
                      v-model="passwordForm.currentPassword"
                      :type="showCurrentPassword ? 'text' : 'password'"
                      class="input-field pr-10"
                    />
                    <button
                      type="button"
                      @click="showCurrentPassword = !showCurrentPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Eye v-if="!showCurrentPassword" :size="20" />
                      <EyeOff v-else :size="20" />
                    </button>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nouveau mot de passe</label>
                  <div class="relative">
                    <input
                      v-model="passwordForm.newPassword"
                      :type="showNewPassword ? 'text' : 'password'"
                      class="input-field pr-10"
                    />
                    <button
                      type="button"
                      @click="showNewPassword = !showNewPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Eye v-if="!showNewPassword" :size="20" />
                      <EyeOff v-else :size="20" />
                    </button>
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                  <div class="relative">
                    <input
                      v-model="passwordForm.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="input-field pr-10"
                    />
                    <button
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Eye v-if="!showConfirmPassword" :size="20" />
                      <EyeOff v-else :size="20" />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn-primary"
                  :disabled="changingPassword"
                >
                  {{ changingPassword ? 'Modification...' : 'Changer le mot de passe' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Activity Log -->
          <div class="card">
            <h3 class="text-lg font-bold text-gray-800 mb-6">Activité Récente</h3>
            <div class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity :size="20" class="text-blue-600" />
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">{{ activity.action }}</p>
                  <p class="text-sm text-gray-600">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ formatDate(activity.timestamp) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { Eye, EyeOff, Activity } from 'lucide-vue-next'

// Authentification temporairement désactivée pour tests
// definePageMeta({
//   middleware: 'auth'
// })

useHead({
  title: 'Profil'
})

const api = useApi()

const user = ref({
  id: 0,
  prenom: '',
  nom: '',
  email: '',
  departement: '',
  role: 'user'
})

const formData = ref({ ...user.value })
const editing = ref(false)
const saving = ref(false)

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const changingPassword = ref(false)

const recentActivity = ref([])

const loadActivities = async () => {
  if (!user.value.id) return
  
  try {
    const response = await api.getUserActivities(user.value.id)
    if (response.success) {
      recentActivity.value = response.data
    }
  } catch (error) {
    console.error('Error loading activities:', error)
  }
}

const userInitials = computed(() => {
  return `${user.value.prenom?.[0] || ''}${user.value.nom?.[0] || ''}`.toUpperCase() || 'U'
})

const getRoleLabel = (role) => {
  const labels = {
    'admin': 'Administrateur',
    'manager': 'Manager',
    'user': 'Utilisateur'
  }
  return labels[role] || role
}

const cancelEdit = () => {
  editing.value = false
  formData.value = { ...user.value }
}

const updateProfile = async () => {
  saving.value = true
  try {
    const response = await api.updateUser(user.value.id, formData.value)
    if (response.success) {
      user.value = { ...formData.value }
      editing.value = false

      // Mettre à jour le localStorage
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(user.value))
      }

      alert('Profil mis à jour avec succès')
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Erreur lors de la mise à jour du profil')
  } finally {
    saving.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Les mots de passe ne correspondent pas')
    return
  }

  if (passwordForm.value.newPassword.length < 6) {
    alert('Le mot de passe doit contenir au moins 6 caractères')
    return
  }

  changingPassword.value = true
  try {
    const response = await api.changePassword({
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword
    })

    if (response.success) {
      alert('Mot de passe changé avec succès')
      passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  } catch (error) {
    console.error('Error changing password:', error)
    alert('Erreur lors du changement de mot de passe')
  } finally {
    changingPassword.value = false
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  const { user: keycloakUser } = useKeycloak()

  if (keycloakUser.value) {
    // 1. Initialiser avec les données Keycloak
    user.value = {
      ...user.value,
      email: keycloakUser.value.email,
      prenom: keycloakUser.value.firstName,
      nom: keycloakUser.value.lastName,
      username: keycloakUser.value.username,
      // Default roles if not present
      role: keycloakUser.value.role || 'user',
      departement: keycloakUser.value.departement || ''
    }
    
    // 2. Essayer de trouver l'utilisateur correspondant dans le backend pour récupérer l'ID et les activités
    if (process.client) {
      try {
        const response = await api.getAllUsers()
        if (response.success) {
          const backendUser = response.data.find(u => u.email === keycloakUser.value.email)
          
          if (backendUser) {
            console.log('User synced with backend:', backendUser)
            user.value = { ...user.value, ...backendUser }
            loadActivities()
          } else {
            console.warn('User not found in backend mock data')
          }
        }
      } catch (error) {
        console.error('Failed to sync user:', error)
      }
    }
    
    formData.value = { ...user.value }
  } else if (process.client) {
      // Fallback legacy (si pas connecté via Keycloak pour une raison quelconque)
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        user.value = JSON.parse(storedUser)
        formData.value = { ...user.value }
        loadActivities()
      }
  }
})
</script>