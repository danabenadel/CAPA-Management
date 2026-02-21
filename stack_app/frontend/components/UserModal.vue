<template>
  <Modal
    v-model="isOpen"
    :title="user ? 'Modifier l\'utilisateur' : 'Nouvel Utilisateur'"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
          <input
            v-model="formData.prenom"
            type="text"
            required
            class="input-field"
            placeholder="Prénom"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            v-model="formData.nom"
            type="text"
            required
            class="input-field"
            placeholder="Nom"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="formData.email"
          type="email"
          required
          class="input-field"
          placeholder="email@genericlab.com"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Département</label>
          <select v-model="formData.departement" required class="input-field">
            <option value="">Sélectionner...</option>
            <option value="Qualité">Qualité</option>
            <option value="Production">Production</option>
            <option value="Laboratoire">Laboratoire</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
          <select v-model="formData.role" required class="input-field">
            <option value="user">Utilisateur</option>
            <option value="manager">Manager</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          @click="handleClose"
          class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="btn-primary"
          :disabled="loading"
        >
          {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { UserPlus } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
  user: Object
})

const emit = defineEmits(['update:show', 'saved'])

const api = useApi()
const loading = ref(false)

const formData = ref({
  prenom: '',
  nom: '',
  email: '',
  departement: '',
  role: 'user'
})

const isOpen = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

watch(() => props.show, (newVal) => {
  if (newVal) {
    if (props.user) {
      formData.value = { ...props.user }
    } else {
      formData.value = {
        prenom: '',
        nom: '',
        email: '',
        departement: '',
        role: 'user'
      }
    }
  }
})

const handleClose = () => {
  isOpen.value = false
}

const handleSubmit = async () => {
  loading.value = true
  try {
    let result
    if (props.user?.id) {
      result = await api.updateUser(props.user.id, formData.value)
    } else {
      result = await api.createUser(formData.value)
    }

    if (result.success) {
      emit('saved', result.data)
      handleClose()
    }
  } catch (error) {
    console.error('Error saving user:', error)
    alert('Erreur lors de l\'enregistrement')
  } finally {
    loading.value = false
  }
}
</script>
