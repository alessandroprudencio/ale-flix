<template>
  <div class="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-900 text-white w-1/2 p-10 relative">
    <div class="text-center">
      <button class="mb-8 bg-indigo-600 p-4 rounded-full hover:bg-indigo-500 transition">
        <svg class="w-10 h-10 inline-block" fill="white" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <h1 class="text-4xl font-bold mb-2">AleFlix</h1>
      <p class="mb-6 text-lg">{{ subtitle }}</p>
      <div class="flex gap-8 justify-center">
        <div class="text-center">
          <strong class="block text-2xl">10K+</strong>
          <span class="text-sm opacity-70">Filmes</span>
        </div>
        <div class="text-center">
          <strong class="block text-2xl">5K+</strong>
          <span class="text-sm opacity-70">Séries</span>
        </div>
        <div class="text-center">
          <strong class="block text-2xl">2M+</strong>
          <span class="text-sm opacity-70">Usuários</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  subtitle: {
    type: String,
    required: true
  }
})
</script>
