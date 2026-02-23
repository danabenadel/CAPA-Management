<template>
  <div class="flex h-screen bg-gradient-to-b from-[#e8f4fc] to-[#7cb4e8]">
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <header class="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(194,209,235,0.4)] mx-6 mt-6 mb-6 px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-accent">Dashboard</h1>
            <p class="text-gray-600">Vue d'ensemble de la gestion des CAPA</p>
          </div>
          <div class="flex items-center space-x-4">
            <button class="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell :size="20" class="text-gray-600" />
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-md">
                <span class="text-white font-medium">{{ userInitials }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="p-8">

        <!-- Chiffres clés Section -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-accent">Chiffres clés</h2>
        </div>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <KpiCard
            v-for="(stat, index) in stats"
            :key="index"
            :label="stat.label"
            :value="stat.value"
            :change="stat.change"
            :icon="stat.icon"
          />
        </div>

        <!-- Charts Row -->
        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- CAPA par Status -->
          <div class="bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(194,209,235,0.4)] h-96 flex flex-col p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-extrabold text-accent">CAPA par Statut</h3>
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
          <div class="bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(194,209,235,0.4)] h-96 flex flex-col p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-extrabold text-accent">CAPA par Département</h3>
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
        <div class="bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(194,209,235,0.4)] mt-6 lg:mt-0 overflow-hidden">
          <div class="flex items-center justify-between py-6 px-8 border-b border-white/60 bg-white/40">
            <h3 class="text-xl font-extrabold text-accent">CAPA Récentes</h3>
            <NuxtLink to="/tables" class="text-sm text-brand-600 hover:text-brand-800 font-medium px-4 py-2 hover:bg-brand-50 rounded-lg transition-colors">
              Voir tout
            </NuxtLink>
          </div>

          <div class="overflow-x-auto px-8 pb-6" v-if="recentCAPAs.length > 0">
            <table class="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">ID</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Titre</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Type</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Département</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Statut</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Priorité</th>
                  <th class="pb-2 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Responsable</th>
                </tr>
              </thead>
              <tbody>
                  <tr
                  v-for="capa in recentCAPAs"
                  :key="capa.id"
                  class="bg-white/90 backdrop-blur-md shadow-sm border border-white/40 hover:shadow-md transition-shadow duration-200 group"
                >
                  <td class="py-4 px-6 text-sm text-slate-500 font-mono rounded-l-2xl border-y border-l border-white/60 group-hover:bg-white/90">#{{ capa.id }}</td>
                  <td class="py-4 px-6 text-sm font-bold text-accent border-y border-white/60 group-hover:bg-white/90">{{ capa.titre }}</td>
                  <td class="py-4 px-6 text-sm text-slate-600 border-y border-white/60 group-hover:bg-white/90">{{ capa.type }}</td>
                  <td class="py-4 px-6 text-sm text-slate-500 font-medium border-y border-white/60 group-hover:bg-white/90">{{ capa.departement }}</td>
                  <td class="py-4 px-6 border-y border-white/60 group-hover:bg-white/90">
                    <span
                      class="px-4 py-1.5 text-xs font-bold rounded-full shadow-sm"
                      :class="getStatusClass(capa.statut)"
                    >
                      {{ capa.statut }}
                    </span>
                  </td>
                  <td class="py-4 px-6 border-y border-white/60 group-hover:bg-white/90">
                    <span
                      class="px-4 py-1.5 text-xs font-bold rounded-full shadow-sm"
                      :class="getPriorityClass(capa.priorite)"
                    >
                      {{ capa.priorite }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-sm text-slate-600 flex items-center gap-3 rounded-r-2xl border-y border-r border-white/60 group-hover:bg-white/90">
                    <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-brand-700 font-extrabold shadow-inner border border-white">
                       {{ capa.responsable.charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-medium">{{ capa.responsable }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-12 text-gray-400">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText :size="24" class="text-gray-300" />
            </div>
            <p>Aucune CAPA récente</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bell, FileText, CheckCircle, AlertCircle, BarChart3, TrendingUp, Activity, ClipboardList } from 'lucide-vue-next'
import DoughnutChart from '~/components/charts/DoughnutChart.vue'
import BarChart from '~/components/charts/BarChart.vue'
import KpiCard from '~/components/KpiCard.vue'

// TypeScript Interfaces
interface Capa {
  id: number
  titre: string
  type: string
  statut: string
  priorite: string
  responsable: string
  departement?: string
}

interface User {
  prenom?: string
  nom?: string
}

interface Stat {
  label: string
  value: string
  change: string
  icon: any
  trendIcon?: any
}

// Authentification temporairement désactivée pour tests
// definePageMeta({
//   middleware: 'auth'
// })

useHead({
  title: 'Dashboard'
})

const api = useApi()

const statsData = ref(null)
const recentCAPAs = ref<Capa[]>([])
const loading = ref(true)

const stats = ref<Stat[]>([
  { label: 'CAPA Actives', value: '0', change: '+0 ce mois', icon: Activity, trendIcon: TrendingUp },
  { label: 'En Attente', value: '0', change: '+0 ce mois', icon: AlertCircle, trendIcon: TrendingUp },
  { label: 'Clôturées', value: '0', change: '+0 ce mois', icon: CheckCircle },
  { label: 'Taux Efficacité', value: '0%', change: '+0% ce mois', icon: BarChart3 }
])

const statusData = ref([
  { name: 'En cours', value: 0, color: '#f59e0b' }, // Amber/Orange
  { name: 'Ouverte', value: 0, color: '#14b8a6' }, // Teal
  { name: 'Clôturée', value: 0, color: '#ec4899' } // Pink
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
  // Palette catégorielle distincte pour chaque département
  const colors = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6'];
  return {
    labels: departmentData.value.map(d => d.departement),
    datasets: [
      {
        label: 'Nombre de CAPA',
        backgroundColor: departmentData.value.map((_, index) => colors[index % colors.length]),
        borderRadius: 6,
        categoryPercentage: 0.8, // Ajoute de l'espace entre les barres
        barPercentage: 0.8, // Ajoute de l'espace entre les barres
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

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'En cours': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    'Ouverte': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Clôturée': 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  }
  return classes[status] || 'bg-slate-50 text-slate-700 border border-slate-200'
}

const getPriorityClass = (priority: string) => {
  const classes: Record<string, string> = {
    'Haute': 'bg-rose-50 text-rose-700 border border-rose-200',
    'Moyenne': 'bg-orange-50 text-orange-700 border border-orange-200',
    'Basse': 'bg-blue-50 text-blue-700 border border-blue-200'
  }
  return classes[priority] || 'bg-slate-50 text-slate-700 border border-slate-200'
}

onMounted(async () => {
  try {
    // Charger les statistiques
    const response: any = await api.getDashboardStats()

    if (response && response.success) {
      const data = response.data

      // Mettre à jour les stats cards
      stats.value = [
        { label: 'CAPA Actives', value: data.stats.totalCapas.toString(), change: '+5 ce mois', icon: Activity, trendIcon: TrendingUp },
        { label: 'En Attente', value: data.stats.ouvertes.toString(), change: '+2 ce mois', icon: AlertCircle, trendIcon: TrendingUp },
        { label: 'Clôturées', value: data.stats.cloturees.toString(), change: '+12 ce mois', icon: CheckCircle },
        { label: 'Taux Efficacité', value: '94%', change: '+2% ce mois', icon: BarChart3 }
      ]

      // Mettre à jour statusData: Couleurs catégorielles identiques
      statusData.value = [
        { name: 'En cours', value: data.stats.enCours, color: '#f59e0b' }, // Amber/Orange
        { name: 'Ouverte', value: data.stats.ouvertes, color: '#14b8a6' }, // Teal
        { name: 'Clôturée', value: data.stats.cloturees, color: '#ec4899' } // Pink
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