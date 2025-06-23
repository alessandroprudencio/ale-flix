<template>
  <div class="min-h-screen bg-[#0d1117] flex flex-col items-center py-8">
    <div class="w-full max-w-5xl mx-auto">
      <button @click="goBack" class="mb-4 flex items-center gap-2 text-white hover:text-indigo-400 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>
      <div v-if="media" class="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <img :src="media.poster" :alt="media.title" class="w-94 h-96 object-cover rounded-lg mx-auto md:mx-0" />
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">{{ media.title }}</h1>
            <div class="flex flex-wrap gap-2 mb-2">
              <span class="bg-indigo-600 text-white px-2 py-1 rounded text-xs">{{ media.type }}</span>
              <span class="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs">{{ media.releaseYear }}</span>
              <span class="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs">{{ media.rating }}</span>
              <span v-for="cat in media.categories" :key="cat.id || cat.categoryId || cat"
                class="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                {{ cat.name || (cat.category && cat.category.name) || cat.categoryId || cat }}
              </span>
            </div>
            <p class="text-gray-300 mb-4">{{ media.description }}</p>
          </div>
          <button @click="goToPlayer"
            class="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors w-full md:w-auto cursor-pointer">
            Assistir
          </button>
        </div>
      </div>
      <div v-else class="text-gray-300 text-center">Carregando...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '~/services/api'

const route = useRoute()
const router = useRouter()
const media = ref<any>(null)

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
function goToPlayer() {
  router.push(`/player/${media.value.id}`)
}

onMounted(async () => {
  try {
    const data = await api.request(`/media/${route.params.id}`)
    media.value = data
  } catch (e) {
    router.push('/')
  }
})
</script>