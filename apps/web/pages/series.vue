<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-8">Séries</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="serie in series" :key="serie.id"
        class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img :src="serie.poster" :alt="serie.title" class="w-full h-64 object-cover">
        <div class="p-4">
          <h2 class="text-xl font-semibold text-white mb-2">{{ serie.title }}</h2>
          <p class="text-gray-400 text-sm">{{ serie.year }}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-yellow-400">{{ serie.rating }}/10</span>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
              Assistir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const series = ref([])

onMounted(async () => {
  try {
    // TODO: Implementar chamada à API
    series.value = [
      {
        id: 1,
        title: 'Breaking Bad',
        year: 2008,
        rating: 9.5,
        poster: 'https://image.tmdb.org/t/p/w500/3xwJcQHtFgK5R3cK2SDmUfPHr0m.jpg'
      },
      {
        id: 2,
        title: 'Game of Thrones',
        year: 2011,
        rating: 9.3,
        poster: 'https://image.tmdb.org/t/p/w500/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg'
      },
      // Adicione mais séries aqui
    ]
  } catch (error) {
    console.error('Erro ao carregar séries:', error)
  }
})
</script>