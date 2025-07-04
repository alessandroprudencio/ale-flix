<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <template v-else>
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">{{ categoria?.name }}</h1>
        <p class="text-gray-400">{{ categoria?.description }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div v-for="media in mediaList" :key="media.id"
          class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img :src="media.poster" :alt="media.title" class="w-full h-64 object-cover">
          <div class="p-4">
            <h2 class="text-xl font-semibold text-white mb-2">{{ media.title }}</h2>
            <p class="text-gray-400 text-sm">{{ media.year }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-yellow-400">{{ media.rating }}/10</span>
              <div class="flex gap-2">
                <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors cursor-pointer"
                  @click="goToPlayer(media.id)">
                  {{ $t('player') }}
                </button>
                <button class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors cursor-pointer"
                  @click="goToDetails(media.id)">
                  {{ $t('moreInfo') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <VideoPlayer v-if="showPlayer" :src="getStreamUrl(currentStreamUrl)" @close="closePlayer" /> -->
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '~/services/api'
// import VideoPlayer from '~/components/ui/video-player.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const categoria = ref(null)
const mediaList = ref([])
const loading = ref(true)
const error = ref(null)

const showPlayer = ref(false)
const currentStreamUrl = ref('')

function openPlayer(streamUrl) {
  currentStreamUrl.value = streamUrl
  showPlayer.value = true
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
    const cat = await api.getCategoryById(route.params.id)
    categoria.value = cat
    const media = await api.getMediaByCategory(route.params.id)
    mediaList.value = media
  } catch (err) {
    error.value = t('errorLoadingCategoryOrMedia')
  } finally {
    loading.value = false
  }
})
</script>