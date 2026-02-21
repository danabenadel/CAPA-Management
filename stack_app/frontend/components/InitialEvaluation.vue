<template>
  <div class="max-w-4xl mx-auto space-y-8">
    
    <!-- Status Card -->
    <div v-if="hasEvaluation" class="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start space-x-4">
      <div class="p-2 bg-green-100 rounded-lg text-green-600">
        <CheckCircle :size="24" />
      </div>
      <div>
        <h3 class="text-lg font-bold text-green-900">Évaluation terminée</h3>
        <p class="text-green-700 mt-1">
          Classifié comme 
          <span class="font-bold">{{ event.initialEvaluation?.isAnomaly ? 'ANOMALIE' : (event.initialEvaluation?.isDeviation ? 'DÉVIATION' : 'AUTRE') }}</span>
          le {{ formatDate(event.initialEvaluation?.createdAt) }}
        </p>
        <p class="text-green-800 mt-2 italic">"{{ event.initialEvaluation?.evaluationComment }}"</p>
      </div>
    </div>

    <!-- Evaluation Form -->
    <div v-else class="card overflow-visible">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-900">Formulaire d'Évaluation Initiale</h2>
        <p class="text-sm text-gray-500">À remplir par le service Assurance Qualité</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        
        <!-- Questions -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700">Classification de l'événement</label>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Option Anomalie -->
            <div 
              @click="form.classification = 'ANOMALIE'"
              class="cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 hover:border-brand-300"
              :class="form.classification === 'ANOMALIE' ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-200 ring-offset-2' : 'border-gray-200'"
            >
              <div class="flex items-center space-x-3 mb-2">
                <AlertTriangle :size="20" class="text-orange-500" />
                <span class="font-bold text-gray-900">Anomalie</span>
              </div>
              <p class="text-sm text-gray-500">Non-respect d'une procédure ou spécification établie (interne).</p>
            </div>

            <!-- Option Déviation -->
            <div 
              @click="form.classification = 'DEVIATION'"
              class="cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 hover:border-red-300"
              :class="form.classification === 'DEVIATION' ? 'border-red-500 bg-red-50 ring-2 ring-red-200 ring-offset-2' : 'border-gray-200'"
            >
              <div class="flex items-center space-x-3 mb-2">
                <GitMerge :size="20" class="text-red-500" />
                <span class="font-bold text-gray-900">Déviation</span>
              </div>
              <p class="text-sm text-gray-500">Écart planifié ou non par rapport à un standard enregistré.</p>
            </div>
          </div>
        </div>

        <!-- Grade (si déviation) -->
        <div v-if="form.classification === 'DEVIATION'" class="animate-fade-in-down">
          <label class="block text-sm font-medium text-gray-700 mb-2">Criticité de la déviation</label>
          <select v-model="form.deviationClassification" class="input-field">
            <option value="">Sélectionner...</option>
            <option value="MINEURE">Mineure</option>
            <option value="MAJEURE">Majeure</option>
            <option value="CRITIQUE">Critique</option>
          </select>
        </div>

        <!-- Commentaire -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Justification / Commentaire <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="form.comment"
            required
            rows="4"
            class="input-field resize-none"
            placeholder="Justifiez la classification..."
          ></textarea>
        </div>

        <!-- Actions -->
        <div class="pt-4 flex items-center justify-end space-x-4">
          <button 
            type="submit" 
            :disabled="submitting || !isValid"
            class="btn-primary w-full md:w-auto"
          >
            {{ submitting ? 'Validation...' : 'Valider l\'évaluation' }}
          </button>
        </div>

        <div v-if="error" class="text-red-500 text-sm mt-2">
          {{ error }}
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, AlertTriangle, GitMerge } from 'lucide-vue-next'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['evaluated'])
const api = useApi()
const keycloak = useKeycloak()

const submitting = ref(false)
const error = ref('')

const form = ref({
  classification: '', // ANOMALIE | DEVIATION
  deviationClassification: '',
  comment: ''
})

const hasEvaluation = computed(() => {
  return !!props.event.initialEvaluation
})

const isValid = computed(() => {
  if (!form.value.classification) return false
  if (!form.value.comment) return false
  if (form.value.classification === 'DEVIATION' && !form.value.deviationClassification) return false
  return true
})

const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR')

const handleSubmit = async () => {
  error.value = ''
  submitting.value = true

  try {
    const payload = {
      isAnomaly: form.value.classification === 'ANOMALIE',
      isDeviation: form.value.classification === 'DEVIATION',
      deviationClassification: form.value.deviationClassification || undefined,
      evaluationComment: form.value.comment,
      // FIXME: We are using ID 1 (Admin) temporarily because keycloak.user.value.id is a UUID 
      // and the DB expects an Integer. We need a way to map Keycloak User to Local User.
      evaluatorUserId: 1
    }

    const response = await api.evaluateEvent(props.event.id, payload)
    
    if (response.success) {
      // Reload page or emit event to update parent WITHOUT page reload for smooth UX
      // We need to fetch the updated event to get the fresh status and initialEvaluation object
      const updatedEvent = await api.getEventById(props.event.id)
      emit('evaluated', updatedEvent.data)
    }
  } catch (err) {
    console.error(err)
    error.value = "Erreur lors de l'enregistrement."
  } finally {
    submitting.value = false
  }
}
</script>
