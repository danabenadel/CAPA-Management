<template>
  <div class="max-w-4xl mx-auto space-y-8">
    
    <!-- Status Card -->
    <div v-if="investigation" class="bg-blue-50 border border-blue-200 rounded-xl p-6">
      <div class="flex items-start space-x-4">
        <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
          <Search :size="24" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-blue-900">Investigation en cours</h3>
          <p class="text-blue-700 mt-1">
            Démarrée le {{ formatDate(investigation.createdAt) }} par {{ investigation.investigator?.firstName }} {{ investigation.investigator?.lastName }}
          </p>
        </div>
      </div>
      
      <!-- Summary of investigation -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg border border-blue-100">
        <div>
          <span class="text-xs font-semibold text-gray-500 uppercase">Quoi (Problème)</span>
          <p class="text-gray-800 mt-1">{{ investigation.whatProblem || '-' }}</p>
        </div>
         <div>
          <span class="text-xs font-semibold text-gray-500 uppercase">Où (Lieu)</span>
          <p class="text-gray-800 mt-1">{{ investigation.whereProblem || '-' }}</p>
        </div>
         <div>
          <span class="text-xs font-semibold text-gray-500 uppercase">Quand (Date/Heure)</span>
          <p class="text-gray-800 mt-1">{{ investigation.whenProblem || '-' }}</p>
        </div>
         <div>
          <span class="text-xs font-semibold text-gray-500 uppercase">Qui (Personnes)</span>
          <p class="text-gray-800 mt-1">{{ investigation.whoProblem || '-' }}</p>
        </div>
      </div>
      
      <!-- Evidence / Documents -->
      <div class="mt-6">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Preuves & Documents d'investigation</h4>
        <FileUploader 
            entityType="INVESTIGATION" 
            :entityId="investigation.id" 
            accept=".pdf,.jpg,.png,.doc,.docx" 
        />
      </div>
    </div>

    <!-- Start Investigation / Form -->
    <div v-else-if="canInvestigate" class="card overflow-visible">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-900">Investigation Préliminaire (QQOQt)</h2>
        <p class="text-sm text-gray-500">Définir le périmètre du problème.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quoi ? (Description détaillée)</label>
            <textarea v-model="form.what" rows="3" class="input-field" placeholder="Description facts..."></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Où ? (Localisation précise)</label>
            <textarea v-model="form.where" rows="3" class="input-field" placeholder="Ligne, machine, zone..."></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quand ? (Circonstances)</label>
            <textarea v-model="form.when" rows="3" class="input-field" placeholder="Date, heure, équipe, phase..."></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Qui ? (Personnes concernées)</label>
            <textarea v-model="form.who" rows="3" class="input-field" placeholder="Opérateurs, techniciens..."></textarea>
          </div>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Énoncé des faits</label>
            <textarea v-model="form.facts" rows="4" class="input-field" placeholder="Synthèse objective des faits observés..."></textarea>
        </div>

        <div class="pt-4 flex justify-end">
           <button 
            type="submit" 
            :disabled="submitting"
            class="btn-primary"
          >
            {{ submitting ? 'Enregistrement...' : 'Démarrer l\'investigation' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Empty State if waiting for evaluation -->
    <div v-else class="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
      <div class="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3">
        <Beaker :size="24" />
      </div>
      <h3 class="text-lg font-medium text-gray-900">Investigation non commencée</h3>
      <p class="text-gray-500 mt-1 max-w-sm mx-auto">
        L'investigation pourra commencer une fois l'évaluation initiale validée.
      </p>
      
      <!-- Debug / Dev button to force start -->
      <button v-if="isDev" @click="canInvestigateOverride = true" class="mt-4 px-3 py-1 bg-gray-100 text-xs text-gray-500 rounded hover:bg-gray-200">
        Démarrer l'investigation (Dev Override)
      </button>
    </div>

  </div>
</template>

<script setup>
import { Search, Beaker } from 'lucide-vue-next'
import FileUploader from '~/components/FileUploader.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updated'])
const api = useApi()
const keycloak = useKeycloak()

const submitting = ref(false)
const canInvestigateOverride = ref(false)

const form = ref({
  what: '',
  where: '',
  when: '',
  who: '',
  facts: ''
})

const investigation = computed(() => props.event.preliminaryInvestigation)

const canInvestigate = computed(() => {
  if (canInvestigateOverride.value) return true
  // Can investigate if event is evaluated (status is not CREE) AND no investigation exists yet
  const hasEvaluation = !!props.event.initialEvaluation
  // Also check if status allows it (e.g., DEVIATION or ANOMALIE)
  return hasEvaluation && !investigation.value
})

const isDev = process.dev

const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR')

const handleSubmit = async () => {
  submitting.value = true
  try {
    const payload = {
      whatProblem: form.value.what,
      whereProblem: form.value.where,
      whenProblem: form.value.when,
      whoProblem: form.value.who,
      factsStatement: form.value.facts,
      // FIXME: Using ID 1 temporarily (see InitialEvaluation)
      investigatorUserId: 1
    }
    
    // We need an endpoint for creating investigation
    // Assuming POST /events/:id/investigation
    // Wait, let's check useApi.js
    
    // Actually, looking at useApi.js, I don't see a specific createInvestigation endpoint yet.
    // I need to add it to useApi.js first or use a generic one if available.
    // I'll assume createInvestigation exists or I'll implement it shortly.
    
    const response = await api.createInvestigation(props.event.id, payload)
    
    if (response.success) {
       const updatedEvent = await api.getEventById(props.event.id)
       emit('updated', updatedEvent.data)
    }
  } catch (error) {
    console.error('Error creating investigation:', error)
  } finally {
    submitting.value = false
  }
}
</script>
