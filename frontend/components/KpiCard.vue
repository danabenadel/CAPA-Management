<template>
  <div class="relative overflow-hidden bg-white/90 rounded-3xl border border-white/40 shadow-[0_8px_30px_rgb(194,209,235,0.4)] p-8 min-h-[160px] flex flex-col justify-center">
    <!-- Abstract Organic Blob Background -->
    <div class="absolute -right-16 -top-16 w-56 h-56 bg-gradient-to-br from-[#DCEBFA] to-[#E3EEFF] rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] z-0 transform rotate-12 transition-transform duration-700 ease-in-out hover:rotate-45 opacity-80"></div>
    <div class="absolute right-0 bottom-0 w-40 h-40 bg-[#DCEBFA] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] z-0 opacity-40 transform -translate-x-4 translate-y-12"></div>
    
    <!-- Content -->
    <div class="relative z-10 pr-20">
      <div class="text-6xl font-extrabold text-[#1e293b] tracking-tighter leading-none mb-3 drop-shadow-sm">
        {{ value }}
      </div>
      <div class="text-sm text-[#475569] font-medium leading-snug max-w-[140px]">
        {{ label }}
        <span v-if="change" class="block font-bold text-[#6da9dd] mt-1 text-sm">
           {{ change }}
        </span>
      </div>
    </div>

    <!-- Huge Outline Icon -->
    <div class="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none drop-shadow-sm">
      <component :is="icon" :size="96" :stroke-width="1" class="text-[#84b5e0] opacity-40" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  change?: string
  icon: any
}>()
</script>
