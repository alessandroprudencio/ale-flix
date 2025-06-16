<template>
      <div class="flex flex-col justify-center items-center w-full md:w-1/2 p-10 bg-[#0d1117] text-white">
      <div class="max-w-md w-full">
        <h2 class="text-2xl font-bold mb-2">{{ title }}</h2>
        <p class="mb-6 text-gray-400">{{ subtitle }}</p>
        
        <slot/>
      </div>
    </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  }
})
</script>
