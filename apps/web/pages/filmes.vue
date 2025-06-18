<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-8">Filmes</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="filme in filmes" :key="filme.id"
        class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img :src="filme.poster" :alt="filme.title" class="w-full h-64 object-cover">
        <div class="p-4">
          <h2 class="text-xl font-semibold text-white mb-2">{{ filme.title }}</h2>
          <p class="text-gray-400 text-sm">{{ filme.year }}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-yellow-400">{{ filme.rating }}/10</span>
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

const filmes = ref([])

onMounted(async () => {
  try {
    // TODO: Implementar chamada à API
    filmes.value = [
      {
        id: 1,
        title: 'O Poderoso Chefão',
        year: 1972,
        rating: 9.2,
        poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
      },
      {
        id: 2,
        title: 'Pulp Fiction',
        year: 1994,
        rating: 8.9,
        poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
      },
      // Adicione mais filmes aqui
    ]
  } catch (error) {
    console.error('Erro ao carregar filmes:', error)
  }
})
</script>