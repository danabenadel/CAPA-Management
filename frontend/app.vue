<template>
  <div class="min-h-screen bg-gradient-to-b from-[#e8f4fc] to-[#7cb4e8]">
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