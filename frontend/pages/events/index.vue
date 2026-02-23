<template>
  <div class="flex h-screen bg-gradient-to-b from-[#e8f4fc] to-[#7cb4e8]">
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header & Filters -->
      <div class="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(194,209,235,0.4)] mx-6 mt-6 mb-6 px-8 py-4 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-accent">Événements Qualité</h1>
            <p class="text-gray-600">Gérer les déclarations d'événements et non-conformités</p>
          </div>
          <button
            @click="selectedEvent = null; showEventModal = true"
            class="btn-primary flex items-center space-x-2"
          >
            <Plus :size="20" />
            <span>Déclarer un événement</span>
          </button>
        </div>

        <div class="flex items-center space-x-4 pt-4 border-t border-gray-200/50">
          <div class="flex-1">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" :size="20" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un événement..."
                class="input-field pl-10 bg-white/50 border-white/60"
              />
            </div>
          </div>
          <select v-model="filterStatus" class="input-field bg-white/50 border-white/60">
            <option value="">Tous les statuts</option>
            <option value="CREE">Créé</option>
            <option value="EN_EVALUATION">En évaluation</option>
            <option value="CLASSE_ANOMALIE">Classé Anomalie</option>
            <option value="CLASSE_DEVIATION">Classé Déviation</option>
          </select>
        </div>
      </div>

      <!-- Content -->
      <main class="p-8">
        <div class="card">
          <div v-if="loading" class="text-center py-12">
            <p class="text-gray-600">Chargement...</p>
          </div>

          <div v-else-if="filteredEvents.length === 0" class="text-center py-12">
            <FileX class="mx-auto text-gray-400 mb-4" :size="48" />
            <p class="text-gray-600">Aucun événement trouvé</p>
          </div>

          <div v-else class="overflow-x-auto px-1 pb-10">
            <table class="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">N° Événement</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Date</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Description</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Déclarant</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Statut</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="event in filteredEvents"
                  :key="event.id"
                  class="bg-white/90 backdrop-blur-md shadow-sm border border-white/40 hover:shadow-md transition-shadow duration-200 group"
                >
                  <td class="py-4 px-6 text-sm font-bold text-accent rounded-l-2xl border-y border-l border-white/60 group-hover:bg-white/90">{{ event.eventNumber }}</td>
                  <td class="py-4 px-6 text-sm text-slate-500 border-y border-white/60 group-hover:bg-white/90">{{ formatDate(event.eventDate) }}</td>
                  <td class="py-4 px-6 text-sm text-slate-600 truncate max-w-xs border-y border-white/60 group-hover:bg-white/90" :title="event.problemDescription">
                    {{ event.problemDescription }}
                  </td>
                  <td class="py-4 px-6 text-sm text-slate-600 flex items-center gap-3 border-y border-white/60 group-hover:bg-white/90">
                    <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-brand-700 font-extrabold shadow-inner border border-white" v-if="event.reporter">
                       {{ event.reporter.firstName.charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-medium">{{ event.reporter ? `${event.reporter.firstName} ${event.reporter.lastName}` : '-' }}</span>
                  </td>
                  <td class="py-4 px-6 border-y border-white/60 group-hover:bg-white/90">
                    <span
                      class="px-3 py-1 text-xs font-bold rounded-full shadow-sm"
                      :class="getStatusClass(event.status)"
                    >
                      {{ formatStatus(event.status) }}
                    </span>
                  </td>
                  <td class="py-4 px-6 rounded-r-2xl border-y border-r border-white/60 group-hover:bg-white/90">
                    <div class="flex items-center justify-center space-x-2">
                       <button
                        @click="viewEvent(event)"
                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir détails"
                      >
                        <Eye :size="18" />
                      </button>
                      <button
                        @click="editEvent(event)"
                        class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit :size="18" />
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

    <!-- Modale Événement -->
    <EventModal
      v-model="showEventModal"
      :event="selectedEvent"
      @saved="handleEventSaved"
    />
  </div>
</template>

<script setup>
import { Plus, Search, FileX, Eye, Edit } from 'lucide-vue-next'

useHead({
  title: 'Gestion des Événements'
})

const api = useApi()

const events = ref([])
const loading = ref(true)
const searchQuery = ref('')
const filterStatus = ref('')
const showEventModal = ref(false)
const selectedEvent = ref(null)

const filteredEvents = computed(() => {
  let result = events.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(event =>
      event.eventNumber.toLowerCase().includes(query) ||
      event.problemDescription?.toLowerCase().includes(query) ||
      (event.reporter && (event.reporter.firstName.toLowerCase().includes(query) || event.reporter.lastName.toLowerCase().includes(query)))
    )
  }

  if (filterStatus.value) {
    result = result.filter(event => event.status === filterStatus.value)
  }

  return result
})

const getStatusClass = (status) => {
  const classes = {
    'CREE': 'bg-blue-50 text-blue-700 border border-blue-200',
    'EN_EVALUATION': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    'CLASSE_ANOMALIE': 'bg-orange-50 text-orange-700 border border-orange-200',
    'CLASSE_DEVIATION': 'bg-rose-50 text-rose-700 border border-rose-200',
    'CLOTURE': 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  }
  return classes[status] || 'bg-slate-50 text-slate-700 border border-slate-200'
}

const formatStatus = (status) => {
  const labels = {
    'CREE': 'Créé',
    'EN_EVALUATION': 'En évaluation',
    'CLASSE_ANOMALIE': 'Anomalie',
    'CLASSE_DEVIATION': 'Déviation',
    'CLOTURE': 'Clôturé'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('fr-FR')
}

const router = useRouter()

const viewEvent = (event) => {
  console.log('Navigating to event:', event.id)
  router.push(`/events/${event.id}`)
}

const editEvent = (event) => {
  selectedEvent.value = event
  showEventModal.value = true
}

const handleEventSaved = (savedEvent) => {
  if (selectedEvent.value?.id) {
    const index = events.value.findIndex(e => e.id === savedEvent.id)
    if (index !== -1) {
      events.value[index] = savedEvent
    }
  } else {
    events.value.unshift(savedEvent)
  }
  selectedEvent.value = null
}

onMounted(async () => {
  try {
    console.log('Fetching events...')
    const response = await api.getAllEvents()
    console.log('Events response:', response)
    if (response.success) {
      events.value = response.data
    } else {
      console.error('Failed to load events:', response)
    }
  } catch (error) {
    console.error('Error loading events:', error)
  } finally {
    loading.value = false
  }
})
</script>
