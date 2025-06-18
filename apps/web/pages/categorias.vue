<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-8">Categorias</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="categoria in categorias" :key="categoria.id"
        class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        @click="navegarParaCategoria(categoria.id)">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-white mb-2">{{ categoria.nome }}</h2>
          <p class="text-gray-400">{{ categoria.descricao }}</p>
          <div class="mt-4">
            <span class="text-indigo-400">{{ categoria.quantidade }} títulos</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const categorias = ref([])

onMounted(async () => {
  try {
    // TODO: Implementar chamada à API
    categorias.value = [
      {
        id: 1,
        nome: 'Ação',
        descricao: 'Filmes e séries de ação e aventura',
        quantidade: 150
      },
      {
        id: 2,
        nome: 'Comédia',
        descricao: 'Filmes e séries para rir',
        quantidade: 120
      },
      {
        id: 3,
        nome: 'Drama',
        descricao: 'Histórias emocionantes',
        quantidade: 200
      },
      {
        id: 4,
        nome: 'Ficção Científica',
        descricao: 'Explorando o futuro e o desconhecido',
        quantidade: 80
      },
      {
        id: 5,
        nome: 'Terror',
        descricao: 'Para os corajosos',
        quantidade: 90
      },
      {
        id: 6,
        nome: 'Romance',
        descricao: 'Histórias de amor',
        quantidade: 110
      }
    ]
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  }
})

function navegarParaCategoria(id) {
  router.push(`/categorias/${id}`)
}
</script>