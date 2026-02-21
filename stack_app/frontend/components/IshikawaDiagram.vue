<template>
  <div class="card p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-gray-900 flex items-center">
        <GitBranch :size="20" class="mr-2 text-brand-600" />
        Analyse des Causes (Ishikawa / 5M)
      </h3>
      <button v-if="!readOnly" @click="showAddModal = true" class="btn-secondary text-sm">
        <Plus :size="16" class="mr-1" /> Ajouter une cause
      </button>
    </div>

    <!-- 5M Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="category in categories" :key="category.key" class="border rounded-lg bg-gray-50 flex flex-col h-full">
        <!-- Category Header -->
        <div class="bg-white border-b px-4 py-3 rounded-t-lg font-bold text-gray-700 flex items-center justify-between">
            <span>{{ category.label }}</span>
            <span class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{{ getCauses(category.key).length }}</span>
        </div>
        
        <!-- Causes List -->
        <div class="p-4 space-y-3 flex-1">
          <div v-if="getCauses(category.key).length === 0" class="text-center py-4 text-gray-400 text-sm italic">
            Aucune cause
          </div>
          
          <div 
            v-for="cause in getCauses(category.key)" 
            :key="cause.id"
            class="bg-white p-3 rounded shadow-sm border group relative transition-all duration-200"
            :class="isIdentified(cause.causeDescription, category.key) ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-gray-100'"
          >
            <div class="pr-6">
                <p class="text-sm text-gray-800">{{ cause.causeDescription }}</p>
                <div v-if="isIdentified(cause.causeDescription, category.key)" class="mt-1 flex items-center text-xs text-red-600 font-bold">
                    <Target :size="12" class="mr-1" /> Cause Racine
                </div>
            </div>
            
            <div class="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <!-- Toggle Root Cause -->
                <button 
                    v-if="!readOnly"
                    @click="toggleRootCause(cause)"
                    class="p-1 hover:bg-gray-100 rounded"
                    :class="isIdentified(cause.causeDescription, category.key) ? 'text-red-600' : 'text-gray-400 hover:text-red-500'"
                    title="Marquer comme cause racine"
                >
                    <Target :size="14" />
                </button>

                <!-- Delete -->
                <button 
                    v-if="!readOnly"
                    @click="deleteCause(cause.id)"
                    class="p-1 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded"
                >
                    <Trash2 :size="14" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Add Cause -->
    <Modal v-model="showAddModal" title="Ajouter une cause potentielle">
      <form @submit.prevent="submitCause" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie (5M)</label>
          <select v-model="newCause.category" required class="input-field">
            <option v-for="cat in categories" :key="cat.key" :value="cat.key">
              {{ cat.label }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description de la cause</label>
          <textarea 
            v-model="newCause.description" 
            required 
            rows="3" 
            class="input-field"
            placeholder="Ex: Température trop élevée..."
          ></textarea>
        </div>

        <div class="flex justify-end pt-4">
          <button type="submit" :disabled="adding" class="btn-primary">
            {{ adding ? 'Ajout...' : 'Ajouter' }}
          </button>
        </div>
      </form>
    </Modal>

  </div>
</template>

<script setup>
import { GitBranch, Plus, Trash2, Target } from 'lucide-vue-next'

const props = defineProps({
  investigationId: {
    type: Number,
    required: true
  },
  causes: {
    type: Array,
    default: () => []
  },
  identifiedCauses: {
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

const showAddModal = ref(false)
const adding = ref(false)

const newCause = ref({
  category: 'METHODE',
  description: ''
})

const categories = [
  { key: 'MATIERE', label: 'Matière' },
  { key: 'MATERIEL', label: 'Matériel' },
  { key: 'METHODE', label: 'Méthode' },
  { key: 'MAIN_D_OEUVRE', label: 'Main d\'œuvre' },
  { key: 'MILIEU', label: 'Milieu' },
]

const getCauses = (categoryKey) => {
  return props.causes.filter(c => c.category === categoryKey)
}

const isIdentified = (causeDesc, category) => {
    // Check if cause is already identified as root cause (checking by description loosely or exact match)
    // Since IdentifiedCause is a separate table copy, we check by description/category match
    return props.identifiedCauses.some(ic => ic.category === category && ic.causeDescription === causeDesc)
}

const submitCause = async () => {
    adding.value = true
    try {
        const payload = {
            category: newCause.value.category,
            causeDescription: newCause.value.description
        }
        
        const response = await api.addIshikawaCause(props.investigationId, payload)
        
        if (response.success) {
            emit('updated') 
            showAddModal.value = false
            newCause.value.description = '' 
        }
    } catch (error) {
        console.error('Error adding cause:', error)
    } finally {
        adding.value = false
    }
}

const toggleRootCause = async (cause) => {
    if (props.readOnly) return

    const alreadyIdentified = props.identifiedCauses.find(ic => ic.category === cause.category && ic.causeDescription === cause.causeDescription)
    
    try {
        if (alreadyIdentified) {
             if (confirm('Retirer cette cause des causes racines ?')) {
                await api.removeIdentifiedCause(alreadyIdentified.id)
                emit('updated')
             }
        } else {
             // Add as root cause
             const payload = {
                 category: cause.category,
                 causeDescription: cause.causeDescription
             }
             await api.identifyRootCause(props.investigationId, payload)
             emit('updated')
        }
    } catch (error) {
         console.error('Error toggling root cause:', error)
    }
}

const deleteCause = async (id) => {
    if (!confirm('Supprimer cette cause ?')) return
    
    try {
        const response = await api.deleteIshikawaCause(id)
        if (response.success) {
            emit('updated')
        }
    } catch (error) {
        console.error('Error deleting cause:', error)
    }
}
</script>
