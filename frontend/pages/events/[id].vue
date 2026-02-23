<template>
  <div class="flex h-screen bg-gradient-to-b from-[#e8f4fc] to-[#7cb4e8]">
    <Sidebar />

    <div class="flex-1 overflow-auto">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center h-full">
        <p class="text-gray-600">Chargement de l'événement...</p>
      </div>

      <div v-else-if="!event" class="flex flex-col items-center justify-center h-full">
        <AlertCircle :size="48" class="text-red-400 mb-4" />
        <h2 class="text-xl font-bold text-gray-800">Événement introuvable</h2>
        <button @click="$router.push('/events')" class="mt-4 btn-primary">
          Retour à la liste
        </button>
      </div>

      <div v-else>
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 px-8 py-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <button 
                @click="$router.push('/events')"
                class="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
              >
                <ArrowLeft :size="20" />
              </button>
              <div>
                <div class="flex items-center space-x-3">
                  <h1 class="text-2xl font-bold text-accent">
                    {{ event.eventNumber }}
                  </h1>
                  <span 
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="getStatusClass(event.status)"
                  >
                    {{ formatStatus(event.status) }}
                  </span>
                </div>
                <p class="text-gray-500 mt-1">
                  Déclaré le {{ formatDate(event.eventDate) }} par {{ event.reporter?.firstName }} {{ event.reporter?.lastName }}
                </p>
              </div>
            </div>
          </div>

          <!-- Tabs Navigation -->
          <div class="flex space-x-1 border-b border-gray-200 mt-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="currentTab = tab.id"
              class="px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200"
              :class="currentTab === tab.id 
                ? 'border-brand-600 text-brand-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            >
              {{ tab.label }}
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="p-8 max-w-7xl mx-auto">
          
          <!-- Tab 1: Détails Événement -->
          <div v-if="currentTab === 'details'" class="space-y-6">
            <div class="card p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FileText :size="20" class="mr-2 text-gray-400" />
                Description du problème
              </h3>
              <p class="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100">
                {{ event.problemDescription }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="card p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Contexte</h3>
                <dl class="space-y-3">
                  <div class="flex justify-between">
                    <dt class="text-gray-500">Lieu / Zone</dt>
                    <dd class="font-medium">{{ event.problemLocation || '-' }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-500">Heure détection</dt>
                    <dd class="font-medium">{{ formatTime(event.detectionTime) }}</dd>
                  </div>
                </dl>
              </div>

              <div class="card p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Impact Produit</h3>
                <dl class="space-y-3">
                   <div class="flex justify-between">
                    <dt class="text-gray-500">Produit</dt>
                    <dd class="font-medium">{{ event.affectedProduct || '-' }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-500">Lot</dt>
                    <dd class="font-medium">{{ event.affectedLot || '-' }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-500">Quantité</dt>
                    <dd class="font-medium">{{ event.quantityConcerned || '-' }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <!-- Tab 2: Évaluation Initiale -->
          <div v-if="currentTab === 'evaluation'">
            <InitialEvaluation 
              :event="event" 
              @evaluated="handleEventUpdate"
            />
          </div>

            <!-- Tab 3: Investigation -->
            <div v-if="currentTab === 'investigation'" class="space-y-8">
              <Investigation 
                :event="event" 
                :read-only="isInvestigationClosed"
                @updated="handleEventUpdate"
              />

              <div v-if="event.preliminaryInvestigation" class="animate-fade-in-up">
                <IshikawaDiagram 
                  :investigation-id="event.preliminaryInvestigation.id"
                  :causes="event.preliminaryInvestigation.ishikawaAnalysis || []"
                  :identified-causes="event.preliminaryInvestigation.identifiedCauses || []"
                  :read-only="isInvestigationClosed"
                  @updated="loadEvent"
                />
              </div>
              <!-- Action Plan -->
              <div 
                  v-if="event.preliminaryInvestigation?.identifiedCauses?.length > 0" 
                  class="animate-fade-in-up"
              >
                  <ActionPlan 
                      :investigation-id="event.preliminaryInvestigation?.id"
                      :solutions="event.preliminaryInvestigation?.problemSolutions || []"
                      :read-only="isInvestigationClosed"
                      @updated="loadEvent"
                  />
              </div>

              <!-- VALIDATION / CLOSURE -->
              <div 
                  v-if="canCloseInvestigation" 
                  class="flex justify-end pt-6 border-t border-gray-200 mt-8"
              >
                  <button 
                      @click="closeInvestigation" 
                      class="btn-primary bg-green-600 hover:bg-green-700 flex items-center"
                      :disabled="closing"
                  >
                      <CheckCircle :size="18" class="mr-2" />
                      {{ closing ? 'Clôture en cours...' : 'Valider et Clôturer l\'investigation' }}
                  </button>
              </div>

              <!-- SUCCESS MESSAGE -->
              <div v-if="isInvestigationClosed" class="bg-green-50 border border-green-200 rounded-lg p-4 mt-6 flex items-center text-green-800">
                  <CheckCircle :size="24" class="mr-3 text-green-600" />
                  <div>
                      <span class="font-bold">Investigation Terminée</span>
                      <p class="text-sm">Cette investigation a été validée et clôturée.</p>
                  </div>
              </div>
            </div>

            <!-- Tab 4: CAPA -->
            <div v-if="currentTab === 'capa'" class="space-y-8 animate-fade-in">
                <CapaManager 
                    :event="event" 
                    @updated="loadEvent"
                />
            </div>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, AlertCircle, FileText, TestTube2, Target, CheckCircle } from 'lucide-vue-next'

const route = useRoute()
const api = useApi()

const loading = ref(true)
const event = ref(null)
const currentTab = ref('details')

const tabs = computed(() => {
  const t = [
     { id: 'details', label: 'Détails Événement' },
     { id: 'evaluation', label: 'Évaluation Initiale' },
     { id: 'investigation', label: 'Investigation' }
  ]
  // Show CAPA tab only if investigation is finished or CAPA exists
  if (event.value?.preliminaryInvestigation?.status === 'TERMINEE' || event.value?.capa) {
      t.push({ id: 'capa', label: 'Suivi CAPA' })
  }
  return t
})

const loadEvent = async () => {
  loading.value = true
  try {
    const response = await api.getEventById(route.params.id)
    if (response.success) {
      event.value = response.data
    }
  } catch (error) {
    console.error('Error loading event:', error)
  } finally {
    loading.value = false
  }
}

const handleEventUpdate = (updatedEvent) => {
  // Update local event data to reflect new status
  event.value = { ...event.value, ...updatedEvent }
  // Switch to next tab if needed, or stay
}

// Helpers
const formatDate = (date) => date ? new Date(date).toLocaleDateString('fr-FR') : '-'
const formatTime = (date) => date ? new Date(date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}) : '-'

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

const closing = ref(false)

const isInvestigationClosed = computed(() => {
    return event.value?.preliminaryInvestigation?.status === 'TERMINEE'
})

const canCloseInvestigation = computed(() => {
    if (!event.value?.preliminaryInvestigation) return false
    if (isInvestigationClosed.value) return false
    
    const hasRootCauses = event.value.preliminaryInvestigation.identifiedCauses?.length > 0
    // Business rule: Can close if root causes identified. Actions are optional but recommended? 
    // Let's enforce at least one action if we want strict process, or just root causes.
    // For now, let's say root causes are mandatory.
    return hasRootCauses
})

const closeInvestigation = async () => {
    if (!confirm('Êtes-vous sûr de vouloir clôturer cette investigation ? Cette action est irréversible.')) return

    closing.value = true
    try {
        const res = await api.closeInvestigation(event.value.preliminaryInvestigation.id)
        if (res.success) {
            await loadEvent()
        } else {
             alert(res.error || 'Erreur lors de la clôture')
        }
    } catch (error) {
        console.error('Closing error', error)
        alert('Erreur inattendue')
    } finally {
        closing.value = false
    }
}

onMounted(() => {
  loadEvent()
})
</script>
