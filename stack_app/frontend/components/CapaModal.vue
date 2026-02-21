<template>
  <Modal
    v-model="isOpen"
    :title="isEdit ? 'Modifier la CAPA' : 'Nouvelle CAPA'"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Titre -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Titre <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.titre"
          type="text"
          required
          class="input-field"
          placeholder="Titre de la CAPA"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Description <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="form.description"
          required
          rows="4"
          class="input-field resize-none"
          placeholder="Description détaillée du problème"
        ></textarea>
      </div>

      <!-- Type et Priorité -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Type <span class="text-red-500">*</span>
          </label>
          <select v-model="form.type" required class="input-field">
            <option value="">Sélectionner un type</option>
            <option value="Corrective">Corrective</option>
            <option value="Préventive">Préventive</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Priorité <span class="text-red-500">*</span>
          </label>
          <select v-model="form.priorite" required class="input-field">
            <option value="">Sélectionner une priorité</option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
        </div>
      </div>

      <!-- Département et Responsable -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Département <span class="text-red-500">*</span>
          </label>
          <select v-model="form.departement" required class="input-field">
            <option value="">Sélectionner un département</option>
            <option value="Qualité">Qualité</option>
            <option value="Production">Production</option>
            <option value="Laboratoire">Laboratoire</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Responsable <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.responsable"
            type="text"
            required
            class="input-field"
            placeholder="Nom du responsable"
          />
        </div>
      </div>

      <!-- Statut (visible seulement en édition) -->
      <div v-if="isEdit">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Statut
        </label>
        <select v-model="form.statut" class="input-field">
          <option value="Ouverte">Ouverte</option>
          <option value="En cours">En cours</option>
          <option value="Clôturée">Clôturée</option>
        </select>
      </div>

      <!-- Actions planifiées -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Actions planifiées
        </label>
        <textarea
          v-model="form.actions_planifiees"
          rows="3"
          class="input-field resize-none"
          placeholder="Actions à mettre en place"
        ></textarea>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Date d'ouverture
          </label>
          <input
            v-model="form.date_ouverture"
            type="date"
            class="input-field"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Date limite
          </label>
          <input
            v-model="form.date_limite"
            type="date"
            class="input-field"
          />
        </div>
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
        {{ saving ? 'Enregistrement...' : (isEdit ? 'Modifier' : 'Créer') }}
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
  capa: {
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

const isEdit = computed(() => !!props.capa?.id)

const initialForm = {
  titre: '',
  description: '',
  type: '',
  priorite: '',
  departement: '',
  responsable: '',
  statut: 'Ouverte',
  actions_planifiees: '',
  date_ouverture: new Date().toISOString().split('T')[0],
  date_limite: ''
}

const form = ref({ ...initialForm })
const saving = ref(false)
const error = ref('')

// Charger les données de la CAPA si en mode édition
watch(() => props.capa, (newCapa) => {
  if (newCapa) {
    form.value = {
      titre: newCapa.titre || '',
      description: newCapa.description || '',
      type: newCapa.type || '',
      priorite: newCapa.priorite || '',
      departement: newCapa.departement || '',
      responsable: newCapa.responsable || '',
      statut: newCapa.statut || 'Ouverte',
      actions_planifiees: newCapa.actions_planifiees || '',
      date_ouverture: newCapa.date_ouverture ? new Date(newCapa.date_ouverture).toISOString().split('T')[0] : '',
      date_limite: newCapa.date_limite ? new Date(newCapa.date_limite).toISOString().split('T')[0] : ''
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
    let response
    if (isEdit.value) {
      response = await api.updateCAPA(props.capa.id, form.value)
    } else {
      response = await api.createCAPA(form.value)
    }

    if (response.success) {
      emit('saved', response.data)
      handleClose()
    }
  } catch (err) {
    error.value = err.message || 'Une erreur est survenue'
    console.error('Error saving CAPA:', err)
  } finally {
    saving.value = false
  }
}
</script>