<template>
  <div class="flex h-screen bg-gradient-to-b from-[#e8f4fc] to-[#7cb4e8]">
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header & Filters -->
      <div class="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(194,209,235,0.4)] mx-6 mt-6 mb-6 px-8 py-4 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-accent">Gestion des CAPA</h1>
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

        <div class="flex items-center space-x-4 pt-4 border-t border-gray-200/50">
          <div class="flex-1">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" :size="20" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher une CAPA..."
                class="input-field pl-10 bg-white/50 border-white/60"
              />
            </div>
          </div>
          <select v-model="filterStatus" class="input-field bg-white/50 border-white/60">
            <option value="">Tous les statuts</option>
            <option value="CREE">Nouvelle (Créée)</option>
            <option value="EN_COURS">En cours</option>
            <option value="EN_ATTENTE_EFFICACITE">Attente V.E.</option>
            <option value="EFFICACE">Efficace</option>
            <option value="NON_EFFICACE">Non Efficace</option>
            <option value="CLOTURE">Clôturée</option>
          </select>
          <select v-model="filterPriority" class="input-field bg-white/50 border-white/60">
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

          <div v-else class="overflow-x-auto px-1 pb-10">
            <table class="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">ID</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Titre</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Type</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Département</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Statut</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Priorité</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Responsable</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Date création</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="capa in filteredCapas"
                  :key="capa.id"
                  class="bg-white/90 backdrop-blur-md shadow-sm border border-white/40 hover:shadow-md transition-shadow duration-200 group"
                >
                  <td class="py-4 px-6 text-sm text-slate-500 font-mono rounded-l-2xl border-y border-l border-white/60 group-hover:bg-white/90">#{{ capa.id }}</td>
                  <td class="py-4 px-6 text-sm font-bold text-accent border-y border-white/60 group-hover:bg-white/90">{{ capa.capaNumber }}</td>
                  <td class="py-4 px-6 text-sm text-slate-600 border-y border-white/60 group-hover:bg-white/90">{{ capa.qualityEvent ? 'Événement Qualité' : 'Autre' }}</td>
                  <td class="py-4 px-6 text-sm text-slate-600 border-y border-white/60 group-hover:bg-white/90">{{ capa.initiator?.department?.departmentName || capa.initiator?.department?.departmentCode || '-' }}</td>
                  <td class="py-4 px-6 border-y border-white/60 group-hover:bg-white/90">
                    <span
                      class="px-3 py-1 text-xs font-bold rounded-full shadow-sm"
                      :class="getStatusClass(capa.status)"
                    >
                      {{ formatStatus(capa.status) }}
                    </span>
                  </td>
                  <td class="py-4 px-6 border-y border-white/60 group-hover:bg-white/90">
                    <span
                      class="px-3 py-1 text-xs font-bold rounded-full shadow-sm"
                      :class="getPriorityClass(capa.priorite)" 
                    >
                      {{ capa.priorite }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-sm text-slate-600 flex items-center gap-3 border-y border-white/60 group-hover:bg-white/90">
                     <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-brand-700 font-extrabold shadow-inner border border-white" v-if="capa.initiator">
                       {{ capa.initiator.firstName.charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-medium">{{ capa.initiator ? `${capa.initiator.firstName} ${capa.initiator.lastName}` : '-' }}</span>
                  </td>
                  <td class="py-4 px-6 text-sm text-slate-500 border-y border-white/60 group-hover:bg-white/90">{{ formatDate(capa.initiationDate) }}</td>
                  <td class="py-4 px-6 rounded-r-2xl border-y border-r border-white/60 group-hover:bg-white/90">
                    <div class="flex items-center justify-center space-x-2">
                      <button
                        @click="viewCapa(capa)"
                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir détails"
                      >
                        <Eye :size="18" />
                      </button>
                      <button
                        @click="editCapa(capa)"
                        class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit :size="18" />
                      </button>
                      <button
                        @click="deleteCapa(capa)"
                        class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 :size="18" />
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

  if (filterPriority.value) {
    result = result.filter(capa => capa.priorite === filterPriority.value)
  }

  return result
})

const mapPriority = (capa) => {
  if (capa.totalActions > 2 || capa.actions?.length > 2) return 'Haute';
  if (['CLOTURE', 'EFFICACE', 'NON_EFFICACE'].includes(capa.status)) return 'Basse';
  return 'Moyenne';
}

const getStatusClass = (status) => {
  const classes = {
    'CREE': 'bg-blue-50 text-blue-700 border border-blue-200',
    'EN_COURS': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    'TERMINEE': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'CLOTURE': 'bg-slate-50 text-slate-700 border border-slate-200',
    'EN_ATTENTE_EFFICACITE': 'bg-amber-50 text-amber-700 border border-amber-200',
    'EFFICACE': 'bg-teal-50 text-teal-700 border border-teal-200',
    'NON_EFFICACE': 'bg-red-50 text-red-700 border border-red-200'
  }
  return classes[status] || 'bg-slate-50 text-slate-700 border border-slate-200'
}

const formatStatus = (status) => {
  const labels = {
    'CREE': 'Créée',
    'EN_COURS': 'En cours',
    'TERMINEE': 'Terminée',
    'CLOTURE': 'Clôturée',
    'EN_ATTENTE_EFFICACITE': 'Attente Efficacité',
    'EFFICACE': 'Efficace',
    'NON_EFFICACE': 'Non Efficace'
  }
  return labels[status] || status
}

const getPriorityClass = (priority) => {
  const classes = {
    'Haute': 'bg-rose-50 text-rose-700 border border-rose-200',
    'Moyenne': 'bg-orange-50 text-orange-700 border border-orange-200',
    'Basse': 'bg-blue-50 text-blue-700 border border-blue-200'
  }
  return classes[priority] || 'bg-slate-50 text-slate-700 border border-slate-200'
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
      capas.value = response.data.map(c => ({
        ...c,
        priorite: mapPriority(c)
      }))
    }
  } catch (error) {
    console.error('Error loading CAPAs:', error)
  } finally {
    loading.value = false
  }
})
</script>