<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">{{ categoria?.nome }}</h1>
      <p class="text-gray-400 mt-2">{{ categoria?.descricao }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="item in itens" :key="item.id"
        class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img :src="item.poster" :alt="item.title" class="w-full h-64 object-cover">
        <div class="p-4">
          <h2 class="text-xl font-semibold text-white mb-2">{{ item.title }}</h2>
          <p class="text-gray-400 text-sm">{{ item.year }}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-yellow-400">{{ item.rating }}/10</span>
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
import { useRoute } from 'vue-router'

const route = useRoute()
const categoria = ref(null)
const itens = ref([])

onMounted(async () => {
  try {
    const categoriaId = route.params.id
    // TODO: Implementar chamada à API para buscar categoria e itens
    categoria.value = {
      id: categoriaId,
      nome: 'Ação',
      descricao: 'Filmes e séries de ação e aventura'
    }

    itens.value = [
      {
        id: 1,
        title: 'Die Hard',
        year: 1988,
        rating: 8.2,
        poster: 'https://image.tmdb.org/t/p/w500/yFihWxQhqcz3dA5c2rYjFbEJMh0.jpg'
      },
      {
        id: 2,
        title: 'Mad Max: Fury Road',
        year: 2015,
        rating: 8.1,
        poster: 'https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroR2dfP.jpg'
      },
      // Adicione mais itens aqui
    ]
  } catch (error) {
    console.error('Erro ao carregar categoria:', error)
  }
})
</script>