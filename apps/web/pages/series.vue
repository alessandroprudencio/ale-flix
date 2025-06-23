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
            <div class="flex gap-2">
              <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors cursor-pointer"
                @click="goToPlayer(serie.id)">
                Assistir
              </button>
              <button class="p-3 rounded-full bg-gray-700 text-white hover:bg-indigo-600 transition-colors" @click="goToDetails(serie.id)"
                title="Mais informações">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <VideoPlayer v-if="showPlayer" :src="getStreamUrl(currentStreamUrl)" @close="closePlayer" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '~/services/api'
// import VideoPlayer from '~/components/ui/video-player.vue'

definePageMeta({
  middleware: 'auth',
})

const series = ref([])
const loading = ref(true)
const error = ref(null)

const router = useRouter()

const showPlayer = ref(false)
const currentStreamUrl = ref('')

function openPlayer(streamUrl) {
  currentStreamUrl.value = streamUrl
  showPlayer.value = true
}
function closePlayer() {
  showPlayer.value = false
  currentStreamUrl.value = ''
}
function getStreamUrl(streamUrl) {
  if (streamUrl.startsWith('http')) return streamUrl
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
  return `${base}/${streamUrl}`
}

function goToPlayer(id) {
  router.push(`/player/${id}`)
}
function goToDetails(id) {
  router.push(`/media/${id}`)
}

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