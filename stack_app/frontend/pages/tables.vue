<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Gestion des CAPA</h1>
            <p class="text-gray-600">Gérer toutes les actions correctives et préventives</p>
          </div>
          <!-- Button hidden to enforce workflow via Event page
          <button
            @click="selectedCapa = null; showCapaModal = true"
            class="btn-primary flex items-center space-x-2"
          >
            <Plus :size="20" />
            <span>Nouvelle CAPA</span>
          </button>
          -->
        </div>
      </header>

      <!-- Filters -->
      <div class="bg-white border-b border-gray-200 px-8 py-4">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" :size="20" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher une CAPA..."
                class="input-field pl-10"
              />
            </div>
          </div>
          <select v-model="filterStatus" class="input-field">
            <option value="">Tous les statuts</option>
            <option value="Ouverte">Ouverte</option>
            <option value="En cours">En cours</option>
            <option value="Clôturée">Clôturée</option>
          </select>
          <select v-model="filterPriority" class="input-field">
            <option value="">Toutes priorités</option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
        </div>
      </div>

      <!-- Content -->
      <main class="p-8">
        <div class="card">
          <div v-if="loading" class="text-center py-12">
            <p class="text-gray-600">Chargement...</p>
          </div>

          <div v-else-if="filteredCapas.length === 0" class="text-center py-12">
            <FileX class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Aucune CAPA trouvée</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Titre</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Département</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Priorité</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Responsable</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date création</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="capa in filteredCapas"
                  :key="capa.id"
                  class="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td class="py-3 px-4 text-sm text-gray-600">#{{ capa.id }}</td>
                  <td class="py-3 px-4 text-sm font-medium text-gray-800">{{ capa.capaNumber }}</td>
                  <td class="py-3 px-4 text-sm text-gray-600">{{ capa.qualityEvent ? 'Événement Qualité' : 'Autre' }}</td>
                  <td class="py-3 px-4 text-sm text-gray-600">{{ capa.departmentName || '-' }}</td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getStatusClass(capa.status)"
                    >
                      {{ formatStatus(capa.status) }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getPriorityClass('Moyenne')" 
                    >
                      Moyenne
                    </span>
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-600">
                    {{ capa.initiator ? `${capa.initiator.firstName} ${capa.initiator.lastName}` : '-' }}
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-600">{{ formatDate(capa.initiationDate) }}</td>
                  <td class="py-3 px-4">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="viewCapa(capa)"
                        class="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Voir détails"
                      >
                        <Eye :size="16" />
                      </button>
                      <button
                        @click="editCapa(capa)"
                        class="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        title="Modifier"
                      >
                        <Edit :size="16" />
                      </button>
                      <button
                        @click="deleteCapa(capa)"
                        class="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Supprimer"
                      >
                        <Trash2 :size="16" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Modale CAPA -->
    <CapaModal
      v-model="showCapaModal"
      :capa="selectedCapa"
      @saved="handleCapaSaved"
    />
  </div>
</template>

<script setup>
import { Plus, Search, FileX, Eye, Edit, Trash2 } from 'lucide-vue-next'


// Authentification temporairement désactivée pour tests
// definePageMeta({
//   middleware: 'auth'
// })

useHead({
  title: 'Gestion CAPA'
})

const api = useApi()

const capas = ref([])
const loading = ref(true)
const searchQuery = ref('')
const filterStatus = ref('')
const filterPriority = ref('')
const showCapaModal = ref(false)
const selectedCapa = ref(null)

const filteredCapas = computed(() => {
  let result = capas.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(capa =>
      capa.capaNumber?.toLowerCase().includes(query) ||
      capa.rootCause?.toLowerCase().includes(query)
    )
  }

  if (filterStatus.value) {
    result = result.filter(capa => capa.status === filterStatus.value)
  }

  return result
})

const getStatusClass = (status) => {
  const classes = {
    'CREE': 'bg-blue-100 text-blue-700',
    'EN_COURS': 'bg-yellow-100 text-yellow-700',
    'TERMINEE': 'bg-green-100 text-green-700',
    'CLOTURE': 'bg-gray-100 text-gray-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status) => {
  const labels = {
    'CREE': 'Créée',
    'EN_COURS': 'En cours',
    'TERMINEE': 'Terminée',
    'CLOTURE': 'Clôturée'
  }
  return labels[status] || status
}

const getPriorityClass = (priority) => {
  const classes = {
    'Haute': 'bg-red-100 text-red-700',
    'Moyenne': 'bg-orange-100 text-orange-700',
    'Basse': 'bg-blue-100 text-blue-700'
  }
  return classes[priority] || 'bg-gray-100 text-gray-700'
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('fr-FR')
}

const viewCapa = (capa) => {
  selectedCapa.value = capa
  showCapaModal.value = true
}

const editCapa = (capa) => {
  selectedCapa.value = capa
  showCapaModal.value = true
}

const handleCapaSaved = (savedCapa) => {
  if (selectedCapa.value?.id) {
    // Mise à jour
    const index = capas.value.findIndex(c => c.id === savedCapa.id)
    if (index !== -1) {
      capas.value[index] = savedCapa
    }
  } else {
    // Nouvelle CAPA
    capas.value.unshift(savedCapa)
  }
  selectedCapa.value = null
}

const deleteCapa = async (capa) => {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer la CAPA #${capa.id} ?`)) {
    return
  }

  try {
    await api.deleteCapa(capa.id)
    capas.value = capas.value.filter(c => c.id !== capa.id)
  } catch (error) {
    console.error('Error deleting CAPA:', error)
    alert('Erreur lors de la suppression de la CAPA')
  }
}

onMounted(async () => {
  try {
    const response = await api.getAllCapas()
    if (response.success) {
      capas.value = response.data
    }
  } catch (error) {
    console.error('Error loading CAPAs:', error)
  } finally {
    loading.value = false
  }
})
</script>