<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center">
    <div class="w-full max-w-4xl mx-auto mt-8">
      <button @click="goBack" class="mb-4 flex items-center gap-2 text-white hover:text-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>
      <h1 class="text-2xl font-bold text-white mb-4 text-center">{{ media?.title }}</h1>
      <VideoPlayer @close="goBack" v-if="media" :src="getStreamUrl(media.streamUrl)" :title="media.title" :poster="media.poster" />
      <div v-else class="text-gray-300 text-center">Carregando...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VideoPlayer from '~/components/ui/video-player.vue'
import api from '~/services/api'

const route = useRoute()
const router = useRouter()
const media = ref<any>(null)

function getStreamUrl(streamUrl: string) {
  if (streamUrl.startsWith('http')) return streamUrl
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
  return `${base}/${streamUrl}`
}

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
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