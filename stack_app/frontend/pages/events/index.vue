<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Événements Qualité</h1>
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
                placeholder="Rechercher un événement..."
                class="input-field pl-10"
              />
            </div>
          </div>
          <select v-model="filterStatus" class="input-field">
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

          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">N° Événement</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Déclarant</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="event in filteredEvents"
                  :key="event.id"
                  class="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td class="py-3 px-4 text-sm font-medium text-gray-800">{{ event.eventNumber }}</td>
                  <td class="py-3 px-4 text-sm text-gray-600">{{ formatDate(event.eventDate) }}</td>
                  <td class="py-3 px-4 text-sm text-gray-600 truncate max-w-xs" :title="event.problemDescription">
                    {{ event.problemDescription }}
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-600">
                    {{ event.reporter ? `${event.reporter.firstName} ${event.reporter.lastName}` : '-' }}
                  </td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getStatusClass(event.status)"
                    >
                      {{ formatStatus(event.status) }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="viewEvent(event)"
                        class="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Voir détails"
                      >
                        <Eye :size="16" />
                      </button>
                      <button
                        @click="editEvent(event)"
                        class="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        title="Modifier"
                      >
                        <Edit :size="16" />
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
    'CREE': 'bg-blue-100 text-blue-700',
    'EN_EVALUATION': 'bg-yellow-100 text-yellow-700',
    'CLASSE_ANOMALIE': 'bg-orange-100 text-orange-700',
    'CLASSE_DEVIATION': 'bg-red-100 text-red-700',
    'CLOTURE': 'bg-green-100 text-green-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
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
