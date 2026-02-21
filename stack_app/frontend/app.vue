<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50/30">
    <NuxtPage />
  </div>
</template>

<script setup>
// Configuration globale de l'application
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - GenericLab CAPA` : 'GenericLab CAPA Management';
  }
})

const { initKeycloak } = useKeycloak()

onMounted(async () => {
    try {
        await initKeycloak()
    } catch (error) {
        console.error('Failed to initialize Keycloak', error)
    }
})
</script>