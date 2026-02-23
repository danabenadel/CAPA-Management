<template>
  <div class="card p-6 border-t-4 border-blue-500">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-gray-900 flex items-center">
        <ClipboardList :size="20" class="mr-2 text-blue-600" />
        Plan d'Action (Corrections & Solutions)
      </h3>
      <button v-if="!readOnly" @click="openAddModal" class="btn-primary text-sm">
        <Plus :size="16" class="mr-1" /> Nouvelle Action
      </button>
    </div>

    <!-- Actions Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="table-header">Description de l'action</th>
            <th class="table-header">Responsable</th>
            <th class="table-header">Date limite</th>
            <th class="table-header">Statut</th>
            <th v-if="!readOnly" class="table-header text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="solutions.length === 0">
            <td colspan="5" class="py-4 text-center text-sm text-gray-400 italic">
              Aucune action définie pour le moment.
            </td>
          </tr>
          <tr v-for="sol in solutions" :key="sol.id" class="hover:bg-gray-50">
            <td class="table-cell">
              <div class="text-sm text-gray-900">{{ sol.actionDescription }}</div>
            </td>
            <td class="table-cell">
              <div class="text-sm text-gray-700">
                {{ sol.responsible ? `${sol.responsible.firstName} ${sol.responsible.lastName}` : 'Non assigné' }}
              </div>
            </td>
            <td class="table-cell">
              <div class="text-sm text-gray-700">{{ formatDate(sol.deadline) }}</div>
            </td>
            <td class="table-cell">
              <span :class="getStatusBadgeClass(sol.status)" class="px-2 py-1 rounded-full text-xs font-bold">
                {{ formatStatus(sol.status) }}
              </span>
            </td>
            <td v-if="!readOnly" class="table-cell text-right space-x-2">
               <!-- Status Update Dropdown (Simplified) -->
               <select 
                @change="updateStatus(sol, $event.target.value)" 
                :value="sol.status"
                class="text-xs border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 mr-2"
               >
                 <option value="PLANIFIEE">Planifiée</option>
                 <option value="EN_COURS">En cours</option>
                 <option value="TERMINEE">Terminée</option>
               </select>

              <button @click="deleteSolution(sol.id)" class="text-gray-400 hover:text-red-600 transition-colors">
                <Trash2 :size="16" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Add/Edit -->
    <Modal v-model="showModal" title="Nouvelle Action Corrective">
      <form @submit.prevent="submitValue" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description de l'action</label>
          <textarea 
            v-model="form.actionDescription" 
            required 
            rows="3" 
            class="input-field"
            placeholder="Décrire l'action à entreprendre..."
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                 <select v-model="form.responsibleUserId" class="input-field">
                    <option :value="null">Sélectionner...</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.firstName }} {{ user.lastName }}
                    </option>
                 </select>
            </div>
            <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Date Limite</label>
                 <input type="date" v-model="form.deadline" class="input-field" />
            </div>
        </div>

        <div class="flex justify-end pt-4">
          <button type="submit" :disabled="submitting" class="btn-primary">
            {{ submitting ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </Modal>

  </div>
</template>

<script setup>
import { ClipboardList, Plus, Trash2, Edit2 } from 'lucide-vue-next'

const props = defineProps({
  investigationId: {
    type: Number,
    required: true
  },
  solutions: {
    type: Array,
    default: () => []
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['updated'])
const api = useApi()

const showModal = ref(false)
const submitting = ref(false)
const users = ref([])

const form = ref({
    actionDescription: '',
    responsibleUserId: null,
    deadline: ''
})

const openAddModal = async () => {
    form.value = { actionDescription: '', responsibleUserId: null, deadline: '' }
    showModal.value = true
    if (users.value.length === 0) {
        await loadUsers()
    }
}

const loadUsers = async () => {
    try {
        const res = await api.getAllUsers()
        if (res.success) users.value = res.data
    } catch (e) {
        console.error('Error loading users', e)
    }
}

const submitValue = async () => {
    submitting.value = true
    try {
        // Simple create for now
        const payload = { ...form.value }
        if (payload.deadline) payload.deadline = new Date(payload.deadline).toISOString()
        
        await api.addSolution(props.investigationId, payload)
        emit('updated')
        showModal.value = false
    } catch (e) {
        console.error('Error creating solution', e)
    } finally {
        submitting.value = false
    }
}

const updateStatus = async (solution, newStatus) => {
    try {
        await api.updateSolution(solution.id, { status: newStatus })
        emit('updated')
    } catch (e) {
        console.error('Error updating status', e)
    }
}

const deleteSolution = async (id) => {
    if(!confirm("Supprimer cette action ?")) return
    try {
        await api.deleteSolution(id)
        emit('updated')
    } catch (e) {
        console.error('Error deleting solution', e)
    }
}

// Helpers
const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR') : '-'

const formatStatus = (s) => {
    const map = { 'PLANIFIEE': 'Planifiée', 'EN_COURS': 'En Cours', 'TERMINEE': 'Terminée' }
    return map[s] || s
}

const getStatusBadgeClass = (s) => {
    const map = {
        'PLANIFIEE': 'bg-gray-100 text-gray-700',
        'EN_COURS': 'bg-blue-100 text-blue-700',
        'TERMINEE': 'bg-green-100 text-green-700'
    }
    return map[s] || 'bg-gray-100'
}
</script>
