<template>
  <div class="space-y-6">
    <!-- Header / Status -->
    <div v-if="capa" class="card p-6 border-l-4 border-purple-500">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-xl font-bold text-gray-900 flex items-center">
             <FileText :size="24" class="mr-2 text-purple-600" />
             Dossier CAPA : {{ capa.capaNumber }}
          </h2>
          <p class="text-gray-500 mt-1">
            Initié le {{ formatDate(capa.initiationDate) }} par {{ capa.initiator?.firstName }} {{ capa.initiator?.lastName }}
          </p>
        </div>
        <div class="flex flex-col items-end">
             <span class="px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-700">
                {{ capa.status }}
             </span>
        </div>
      </div>
    </div>

    <!-- Initialization State -->
    <div v-else class="card p-8 text-center bg-gray-50 border-dashed border-2 border-gray-300">
        <div class="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
            <Rocket :size="32" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Démarrer le processus CAPA</h3>
        <p class="text-gray-600 max-w-lg mx-auto mb-6">
            L'investigation est terminée. Vous pouvez maintenant initialiser le dossier CAPA pour formaliser le plan d'action, suivre l'efficacité et clôturer l'événement.
        </p>
        <button @click="initCapa" :disabled="initializing" class="btn-primary bg-purple-600 hover:bg-purple-700">
            {{ initializing ? 'Création en cours...' : 'Ouvrir le dossier CAPA' }}
        </button>
    </div>

    <!-- CAPA Content (visible if initialized) -->
    <div v-if="capa">
        <!-- Actions List -->
        <div class="card p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-bold text-gray-900">Actions (Correctives & Préventives)</h3>
                <button @click="openAddActionModal" class="btn-primary text-sm">
                    <Plus :size="16" class="mr-1" /> Ajouter une action
                </button>
            </div>

            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="table-header">Type</th>
                        <th class="table-header">Description</th>
                        <th class="table-header">Responsable</th>
                        <th class="table-header">Échéance</th>
                        <th class="table-header">Statut</th>
                        <th class="table-header w-24">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="capa.actions?.length === 0">
                        <td colspan="6" class="py-4 text-center text-sm text-gray-400 italic">Aucune action CAPA définie.</td>
                    </tr>
                    <tr v-for="action in capa.actions" :key="action.id" class="hover:bg-gray-50">
                        <td class="table-cell">
                            <span :class="action.actionType === 'CORRECTIVE' ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'" class="px-2 py-1 rounded text-xs font-bold">
                                {{ action.actionType }}
                            </span>
                        </td>
                        <td class="table-cell text-sm text-gray-900">{{ action.actionDescription }}</td>
                        <td class="table-cell text-sm text-gray-700">{{ action.responsibleUser?.firstName }} {{ action.responsibleUser?.lastName }}</td>
                        <td class="table-cell text-sm text-gray-700">{{ formatDate(action.plannedClosureDate) }}</td>
                        <td class="table-cell">
                             <span class="px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                                {{ action.status }}
                             </span>
                        </td>
                        <td class="table-cell flex space-x-2">
                             <button @click="openEditActionModal(action)" class="text-blue-600 hover:bg-blue-50 p-1 rounded">
                                 <Edit :size="16" />
                             </button>
                             <button @click="deleteAction(action)" class="text-red-600 hover:bg-red-50 p-1 rounded">
                                 <Trash2 :size="16" />
                             </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal Add Action -->
    <Modal v-model="showModal" title="Nouvelle Action CAPA">
      <form @submit.prevent="submitAction" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type d'action</label>
            <div class="flex space-x-4">
                <label class="inline-flex items-center">
                    <input type="radio" v-model="form.actionType" value="CORRECTIVE" class="text-purple-600 focus:ring-purple-500">
                    <span class="ml-2">Corrective</span>
                </label>
                <label class="inline-flex items-center">
                    <input type="radio" v-model="form.actionType" value="PREVENTIVE" class="text-purple-600 focus:ring-purple-500">
                    <span class="ml-2">Préventive</span>
                </label>
            </div>
        </div>

        <div>
           <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
           <textarea v-model="form.actionDescription" required rows="3" class="input-field"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                 <select v-model="form.responsibleUserId" class="input-field" required>
                    <option :value="null">Sélectionner...</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.firstName }} {{ user.lastName }}
                    </option>
                 </select>
            </div>
            <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Date limite</label>
                 <input type="date" v-model="form.plannedClosureDate" class="input-field" required />
            </div>
        </div>

        <div v-if="isEditing" class="mt-4 border-t pt-4">
             <h4 class="text-sm font-medium text-gray-700 mb-2">Preuves de réalisation</h4>
             <FileUploader 
                entityType="CAPA_ACTION" 
                :entityId="currentActionId" 
                accept=".pdf,.jpg,.png,.doc,.docx" 
            />
        </div>

        <div class="flex justify-end pt-4">
          <button type="submit" :disabled="submitting" class="btn-primary bg-purple-600 hover:bg-purple-700">
            {{ submitting ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { FileText, Rocket, Plus, Edit, Trash2, CheckCircle } from 'lucide-vue-next'
import FileUploader from '~/components/FileUploader.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updated'])
const api = useApi()

const initializing = ref(false)
const submitting = ref(false)
const savingEffectiveness = ref(false)
const showModal = ref(false)
const successMessage = ref('')
const users = ref([])

// Form state
const isEditing = ref(false)
const currentActionId = ref(null)

const form = ref({
    actionType: 'CORRECTIVE',
    actionDescription: '',
    responsibleUserId: null,
    plannedClosureDate: ''
})

// Effectiveness Form State
const effectivenessForm = ref({
    verificationDate: '',
    verifierUserId: null,
    staffTrained: false,
    modificationsUsed: false,
    documentChangesMade: false,
    objectiveAchieved: false,
    isEffective: null
})

const capa = computed(() => props.event.capa)
const isClosed = computed(() => capa.value?.status === 'CLOTURE')

// Initialize form from props if exists
watchEffect(() => {
    if (capa.value?.effectiveness) {
        const eff = capa.value.effectiveness
        effectivenessForm.value = {
            verificationDate: eff.verificationDate ? new Date(eff.verificationDate).toISOString().split('T')[0] : '',
            verifierUserId: eff.verifierUserId,
            staffTrained: eff.staffTrained || false,
            modificationsUsed: eff.modificationsUsed || false,
            documentChangesMade: eff.documentChangesMade || false,
            objectiveAchieved: eff.objectiveAchieved || false,
            isEffective: eff.isEffective
        }
    }
})

const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR') : '-'

const initCapa = async () => {
    initializing.value = true
    try {
        const res = await api.initCapa(props.event.id, { initiatorUserId: 1 }) // TODO: curr user
        if (res.success) {
            emit('updated')
        }
    } catch (e) {
        console.error('Error init CAPA', e)
    } finally {
        initializing.value = false
    }
}

const ensureUsersLoaded = async () => {
    if (users.value.length === 0) {
        const res = await api.getAllUsers()
        if (res.success) users.value = res.data
    }
}

const openAddActionModal = async () => {
    isEditing.value = false
    currentActionId.value = null
    form.value = { actionType: 'CORRECTIVE', actionDescription: '', responsibleUserId: null, plannedClosureDate: '' }
    showModal.value = true
    await ensureUsersLoaded()
}

const openEditActionModal = async (action) => {
    isEditing.value = true
    currentActionId.value = action.id
    form.value = {
        actionType: action.actionType,
        actionDescription: action.actionDescription,
        responsibleUserId: action.responsibleUserId,
        plannedClosureDate: action.plannedClosureDate ? new Date(action.plannedClosureDate).toISOString().split('T')[0] : ''
    }
    showModal.value = true
    await ensureUsersLoaded()
}

const deleteAction = async (action) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette action ?')) return

    try {
        await api.deleteCapaAction(action.id)
        emit('updated')
    } catch (e) {
        console.error('Delete error', e)
        alert('Erreur lors de la suppression')
    }
}

const submitAction = async () => {
    submitting.value = true
    try {
        const payload = { ...form.value }
        if (payload.plannedClosureDate) payload.plannedClosureDate = new Date(payload.plannedClosureDate).toISOString()
        
        if (isEditing.value) {
            await api.updateCapaAction(currentActionId.value, payload)
        } else {
            await api.addCapaAction(capa.value.id, payload)
        }
        
        emit('updated')
        showModal.value = false
    } catch (e) {
        console.error('Error saving action', e)
    } finally {
        submitting.value = false
    }
}

const saveEffectiveness = async () => {
    savingEffectiveness.value = true
    successMessage.value = ''
    try {
        await ensureUsersLoaded() // Should be loaded but just in case
        const payload = { ...effectivenessForm.value }
        if (payload.verificationDate) payload.verificationDate = new Date(payload.verificationDate).toISOString()
        
        await api.saveCapaEffectiveness(capa.value.id, payload)
        emit('updated')
        successMessage.value = 'Évaluation sauvegardée avec succès !'
        setTimeout(() => successMessage.value = '', 3000)
    } catch (e) {
        console.error('Error saving effectiveness', e)
    } finally {
        savingEffectiveness.value = false
    }
}

const closeCapa = async () => {
    if (!confirm('Êtes-vous sûr de vouloir CLÔTURER définitivement ce dossier CAPA ? Cette action est irréversible.')) return
    
    try {
        await api.closeCapa(capa.value.id, { 
            closureNotes: 'Clôturé après vérification efficace',
            closedByUserId: 1 // TODO: current user
        })
        emit('updated')
    } catch (e) {
        console.error('Error closing CAPA', e)
        alert('Erreur lors de la clôture')
    }
}
</script>
