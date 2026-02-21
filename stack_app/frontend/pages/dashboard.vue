<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p class="text-gray-600">Vue d'ensemble de la gestion des CAPA</p>
          </div>
          <div class="flex items-center space-x-4">
            <button class="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell :size="20" class="text-gray-600" />
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white font-medium">{{ userInitials }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="p-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="card"
          >
            <div class="flex items-center justify-between mb-4">
              <component :is="stat.icon" :size="24" class="text-blue-600" />
            </div>
            <p class="text-3xl font-bold text-gray-800 mb-1">{{ stat.value }}</p>
            <p class="text-sm text-gray-600 mb-2">{{ stat.label }}</p>
            <p class="text-xs text-green-600 font-medium">{{ stat.change }}</p>
          </div>
        </div>

        <!-- Charts Row -->
        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- CAPA par Status -->
          <div class="card h-96 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-bold text-gray-800">CAPA par Statut</h3>
              <button class="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600">
                <BarChart3 :size="20" />
              </button>
            </div>
            <div class="flex-1 min-h-0 relative">
              <ClientOnly>
                <DoughnutChart v-if="chartDataStatus" :data="chartDataStatus" />
              </ClientOnly>
            </div>
          </div>

          <!-- CAPA par Département -->
          <div class="card h-96 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-bold text-gray-800">CAPA par Département</h3>
              <button class="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600">
                <FileText :size="20" />
              </button>
            </div>
            <div class="flex-1 min-h-0 relative">
              <ClientOnly>
                <BarChart v-if="chartDataDept" :data="chartDataDept" />
              </ClientOnly>
            </div>
          </div>
        </div>

        <!-- Recent CAPA Table -->
        <div class="card">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-800">CAPA Récentes</h3>
            <NuxtLink to="/tables" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Voir tout
            </NuxtLink>
          </div>

          <div class="overflow-x-auto" v-if="recentCAPAs.length > 0">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Titre</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Priorité</th>
                  <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Responsable</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="capa in recentCAPAs"
                  :key="capa.id"
                  class="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td class="py-3 px-4 text-sm text-gray-600">#{{ capa.id }}</td>
                  <td class="py-3 px-4 text-sm font-medium text-gray-800">{{ capa.titre }}</td>
                  <td class="py-3 px-4 text-sm text-gray-600">{{ capa.type }}</td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getStatusClass(capa.statut)"
                    >
                      {{ capa.statut }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getPriorityClass(capa.priorite)"
                    >
                      {{ capa.priorite }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-600">{{ capa.responsable }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-10 text-gray-400 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
            <p>Aucune CAPA récente</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { Bell, FileText, CheckCircle, AlertCircle, BarChart3 } from 'lucide-vue-next'
import DoughnutChart from '~/components/charts/DoughnutChart.vue'
import BarChart from '~/components/charts/BarChart.vue'

// Authentification temporairement désactivée pour tests
// definePageMeta({
//   middleware: 'auth'
// })

useHead({
  title: 'Dashboard'
})

const api = useApi()

const statsData = ref(null)
const recentCAPAs = ref([])
const loading = ref(true)

const stats = ref([
  { label: 'CAPA Actives', value: '0', change: '+0 ce mois', icon: FileText },
  { label: 'En Attente', value: '0', change: '+0 ce mois', icon: AlertCircle },
  { label: 'Clôturées', value: '0', change: '+0 ce mois', icon: CheckCircle },
  { label: 'Taux Efficacité', value: '0%', change: '+0% ce mois', icon: BarChart3 }
])

const statusData = ref([
  { name: 'En cours', value: 0, color: '#3B82F6' },
  { name: 'Ouverte', value: 0, color: '#F59E0B' },
  { name: 'Clôturée', value: 0, color: '#10B981' }
])

const departmentData = ref([
  { departement: 'Qualité', nombre: 0 },
  { departement: 'Production', nombre: 0 },
  { departement: 'Laboratoire', nombre: 0 },
  { departement: 'Maintenance', nombre: 0 }
])

const totalCAPAs = computed(() => statusData.value.reduce((sum, s) => sum + s.value, 0))
const maxDept = computed(() => Math.max(...departmentData.value.map(d => d.nombre)))

// Chart Data Computed Properties
const chartDataStatus = computed(() => {
  return {
    labels: statusData.value.map(s => s.name),
    datasets: [
      {
        backgroundColor: statusData.value.map(s => s.color),
        data: statusData.value.map(s => s.value),
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  }
})

const chartDataDept = computed(() => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#EC4899', '#14B8A6'];
  return {
    labels: departmentData.value.map(d => d.departement),
    datasets: [
      {
        label: 'Nombre de CAPA',
        backgroundColor: departmentData.value.map((_, index) => colors[index % colors.length]),
        borderRadius: 4,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        data: departmentData.value.map(d => d.nombre)
      }
    ]
  }
})

const userInitials = computed(() => {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`.toUpperCase() || 'U'
  }
  return 'U'
})

const getStatusClass = (status) => {
  const classes = {
    'En cours': 'bg-blue-50 text-blue-700 border border-blue-200',
    'Ouverte': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Clôturée': 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  }
  return classes[status] || 'bg-gray-50 text-gray-700 border border-gray-200'
}

const getPriorityClass = (priority) => {
  const classes = {
    'Haute': 'bg-red-50 text-red-700 border border-red-200',
    'Moyenne': 'bg-orange-50 text-orange-700 border border-orange-200',
    'Basse': 'bg-blue-50 text-blue-700 border border-blue-200'
  }
  return classes[priority] || 'bg-gray-50 text-gray-700 border border-gray-200'
}

onMounted(async () => {
  try {
    // Charger les statistiques
    const response = await api.getDashboardStats()

    if (response.success) {
      const data = response.data

      // Mettre à jour les stats cards
      stats.value = [
        { label: 'CAPA Actives', value: data.stats.totalCapas.toString(), change: '+5 ce mois', icon: FileText },
        { label: 'En Attente', value: data.stats.ouvertes.toString(), change: '+2 ce mois', icon: AlertCircle },
        { label: 'Clôturées', value: data.stats.cloturees.toString(), change: '+12 ce mois', icon: CheckCircle },
        { label: 'Taux Efficacité', value: '94%', change: '+2% ce mois', icon: BarChart3 }
      ]

      // Mettre à jour statusData
      statusData.value = [
        { name: 'En cours', value: data.stats.enCours, color: '#3B82F6' },
        { name: 'Ouverte', value: data.stats.ouvertes, color: '#F59E0B' },
        { name: 'Clôturée', value: data.stats.cloturees, color: '#10B981' }
      ]

      // Mettre à jour departmentData
      if (data.capaParDepartement) {
        departmentData.value = data.capaParDepartement
      }

      // CAPA récentes
      recentCAPAs.value = data.capasRecentes || []
    }
  } catch (error) {
    console.error('Error loading dashboard:', error)
  } finally {
    loading.value = false
  }
})
</script>