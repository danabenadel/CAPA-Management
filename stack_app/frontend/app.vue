<template>
  <div>
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
</script>