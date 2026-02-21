<template>
  <Modal
    v-model="isOpen"
    :title="isEdit ? 'Modifier l\'événement' : 'Déclarer un événement'"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      
      <!-- Date et Lieu -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Date de l'événement <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.eventDate"
            type="date"
            required
            class="input-field"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Heure de détection
          </label>
          <input
            v-model="form.detectionTime"
            type="time"
            class="input-field"
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Description du problème <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="form.problemDescription"
          required
          rows="4"
          class="input-field resize-none"
          placeholder="Décrivez ce qu'il s'est passé..."
        ></textarea>
      </div>

      <!-- Contexte -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Lieu / Zone
          </label>
          <input
            v-model="form.problemLocation"
            type="text"
            class="input-field"
            placeholder="Ex: Laboratoire A"
          />
        </div>

        <div>
           <label class="block text-sm font-semibold text-gray-700 mb-2">
            Produit concerné
          </label>
          <input
            v-model="form.affectedProduct"
            type="text"
            class="input-field"
            placeholder="Ex: Produit XYZ"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Numéro de lot
          </label>
          <input
            v-model="form.affectedLot"
            type="text"
            class="input-field"
            placeholder="Ex: L12345"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Quantité concernée
          </label>
          <input
            v-model="form.quantityConcerned"
            type="text"
            class="input-field"
            placeholder="Ex: 50 boîtes"
          />
        </div>
      </div>

      <!-- Hidden Repoter ID (simulation) -->
      <!-- En production, ceci devrait être géré par le backend via le token -->
      <div v-if="!isEdit">
         <label class="block text-sm font-semibold text-gray-700 mb-2">
            Déclarant (Simulé)
          </label>
          <select v-model="form.reporterUserId" class="input-field">
            <option :value="1">Admin Système</option>
            <!-- Ajouter d'autres users si nécessaire pour tests -->
          </select>
          <p class="text-xs text-gray-500 mt-1">Simule l'utilisateur connecté</p>
      </div>

      <!-- Error message -->
      <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        @click="handleClose"
        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
      >
        Annuler
      </button>
      <button
        type="submit"
        @click="handleSubmit"
        :disabled="saving"
        class="btn-primary"
      >
        {{ saving ? 'Enregistrement...' : (isEdit ? 'Modifier' : 'Déclarer') }}
      </button>
    </template>
  </Modal>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  event: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'saved'])

const api = useApi()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isEdit = computed(() => !!props.event?.id)

const initialForm = {
  eventDate: new Date().toISOString().split('T')[0],
  detectionTime: '',
  problemDescription: '',
  problemLocation: '',
  affectedProduct: '',
  affectedLot: '',
  quantityConcerned: '',
  reporterUserId: 1 // Default to ID 1 for now
}

const form = ref({ ...initialForm })
const saving = ref(false)
const error = ref('')

// Charger les données de l'événement si en mode édition
watch(() => props.event, (newEvent) => {
  if (newEvent) {
    form.value = {
      eventDate: newEvent.eventDate ? new Date(newEvent.eventDate).toISOString().split('T')[0] : '',
      detectionTime: newEvent.detectionTime ? new Date(newEvent.detectionTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '',
      problemDescription: newEvent.problemDescription || '',
      problemLocation: newEvent.problemLocation || '',
      affectedProduct: newEvent.affectedProduct || '',
      affectedLot: newEvent.affectedLot || '',
      quantityConcerned: newEvent.quantityConcerned || '',
      reporterUserId: newEvent.reporterUserId || 1
    }
  } else {
    form.value = { ...initialForm }
  }
}, { immediate: true })

const handleClose = () => {
  isOpen.value = false
  form.value = { ...initialForm }
  error.value = ''
}

const handleSubmit = async () => {
  error.value = ''
  saving.value = true

  try {
    // Format time for backend (DateTime) if needed, or keeping it as string might fail if backend expects Date
    // Prisma `detectionTime DateTime? @db.Time` usually expects a Date object or ISO string in JS, but depends on driver.
    // For now, let's try sending it as part of ISO string date + time if possible, or leave it to backend validation.
    // Actually Prisma `db.Time` maps to `Date` object in JS with 1970-01-01 date part.
    
    const payload = { ...form.value }
    
    // Fix detectionTime format if provided
    if (payload.detectionTime) {
       const [hours, minutes] = payload.detectionTime.split(':')
       const date = new Date()
       date.setHours(parseInt(hours), parseInt(minutes), 0, 0)
       payload.detectionTime = date.toISOString()
    } else {
        delete payload.detectionTime
    }

    let response
    if (isEdit.value) {
      response = await api.updateEvent(props.event.id, payload)
    } else {
      response = await api.createEvent(payload)
    }

    if (response.success) {
      emit('saved', response.data)
      handleClose()
    }
  } catch (err) {
    error.value = err.message || 'Une erreur est survenue'
    console.error('Error saving event:', err)
  } finally {
    saving.value = false
  }
}
</script>
