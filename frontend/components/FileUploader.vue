<template>
  <div class="space-y-4">
    <!-- Drop Zone -->
    <div
      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200"
      :class="[
        isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50',
        error ? 'border-red-300 bg-red-50' : ''
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <div v-if="uploading" class="py-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
        <p class="text-sm text-gray-500">Téléchargement en cours...</p>
      </div>

      <div v-else>
        <UploadCloud class="mx-auto h-12 w-12 text-gray-400" :class="{ 'text-purple-500': isDragging }" />
        <div class="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
          <label class="relative cursor-pointer rounded-md font-semibold text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2">
            <span>Téléverser un fichier</span>
            <input type="file" class="sr-only" @change="handleFileSelect" :accept="accept" />
          </label>
          <p class="pl-1">ou glisser-déposer</p>
        </div>
        <p class="text-xs leading-5 text-gray-500">PDF, PNG, JPG jusqu'à 20MB</p>
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-sm text-red-600 flex items-center">
      <AlertCircle class="h-4 w-4 mr-1" />
      {{ error }}
    </p>

    <!-- Success Message -->
    <p v-if="success" class="text-sm text-green-600 flex items-center">
        <CheckCircle class="h-4 w-4 mr-1" />
        Fichier téléchargé avec succès
    </p>

    <!-- File List (if requested) -->
    <div v-if="showList && documents.length > 0" class="mt-4 space-y-2">
      <h4 class="text-sm font-medium text-gray-700">Documents attachés</h4>
      <div v-for="doc in documents" :key="doc.id" class="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
        <div class="flex items-center space-x-3">
            <div class="p-2 bg-gray-100 rounded">
                <FileText class="h-5 w-5 text-gray-500" />
            </div>
            <div>
                <p class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ doc.originalFileName }}</p>
                <p class="text-xs text-gray-500">{{ formatSize(doc.fileSizeKb) }} • {{ formatDate(doc.uploadDate) }}</p>
            </div>
        </div>
        <div class="flex items-center space-x-2">
             <a :href="`${apiBase}/uploads/${doc.fileName}`" target="_blank" class="p-1 text-gray-400 hover:text-blue-500 transition-colors" title="Télécharger">
                <Download :size="18" />
            </a>
            <button @click="deleteDocument(doc)" class="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Supprimer">
                <Trash2 :size="18" />
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UploadCloud, FileText, Trash2, Download, AlertCircle, CheckCircle } from 'lucide-vue-next'

const props = defineProps({
  entityType: { type: String, required: true }, // e.g. 'QUALITY_EVENT', 'CAPA_ACTION'
  entityId: { type: Number, required: true },
  accept: { type: String, default: '*/*' },
  showList: { type: Boolean, default: true }
})

const emit = defineEmits(['uploaded', 'deleted'])

const api = useApi()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase ? config.public.apiBase.replace('/api', '') : 'http://localhost:3001'

const isDragging = ref(false)
const uploading = ref(false)
const error = ref('')
const success = ref(false)
const documents = ref([])

// Load documents on mount
const loadDocuments = async () => {
    try {
        const res = await api.getDocuments(props.entityType, props.entityId)
        if (res.success) {
            documents.value = res.data
        }
    } catch (e) {
        console.error('Error loading docs', e)
    }
}

onMounted(loadDocuments)

const handleDrop = (e) => {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) processFile(files[0])
}

const handleFileSelect = (e) => {
  const files = e.target.files
  if (files.length > 0) processFile(files[0])
}

const processFile = async (file) => {
  error.value = ''
  success.value = false
  
  // Validation 20MB
  if (file.size > 20 * 1024 * 1024) {
    error.value = 'Le fichier dépasse la taille limite de 20MB.'
    return
  }

  uploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('relatedEntityType', props.entityType)
    formData.append('relatedEntityId', props.entityId)
    formData.append('uploadedByUserId', '1') // TODO: Current user

    const res = await api.uploadDocument(formData)
    
    if (res.success) {
        success.value = true
        loadDocuments()
        emit('uploaded', res.data)
        setTimeout(() => success.value = false, 3000)
    }
  } catch (e) {
    console.error('Upload error', e)
    error.value = 'Erreur lors du téléchargement. Veuillez réessayer.'
  } finally {
    uploading.value = false
  }
}

const deleteDocument = async (doc) => {
    if (!confirm('Voulez-vous vraiment supprimer ce document ?')) return

    try {
        await api.deleteDocument(doc.id)
        loadDocuments()
        emit('deleted', doc.id)
    } catch (e) {
        console.error('Delete error', e)
        alert('Erreur lors de la suppression')
    }
}

const formatSize = (kb) => {
    if (kb < 1024) return `${kb} KB`
    return `${(kb / 1024).toFixed(1)} MB`
}

const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR')
</script>
