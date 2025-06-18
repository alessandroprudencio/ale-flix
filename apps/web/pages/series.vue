<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-8">Séries</h1>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
import api from '~/services/api'

definePageMeta({
  middleware: 'auth',
})

const series = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    const response = await api.getSeries()
    series.value = response
  } catch (err) {
    console.error('Erro ao carregar séries:', err)
    error.value = 'Erro ao carregar séries. Tente novamente mais tarde.'
  } finally {
    loading.value = false
  }
})
</script>