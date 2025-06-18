<template>
  <div class="min-h-screen bg-[#0d1117]">
    <HeroSection v-if="featuredMedia" :media="featuredMedia" />

    <div class="container mx-auto px-4 pb-8">
      <MediaSection v-if="continueWatching.length" title="Continuar assistindo" :media-list="continueWatching" />

      <MediaSection v-if="popularMedia.length" title="Populares" :media-list="popularMedia" />

      <MediaSection v-if="newReleases.length" title="Lançamentos" :media-list="newReleases" />

      <MediaSection v-if="featuredSeries.length" title="Séries em destaque" :media-list="featuredSeries" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSection from '~/components/media/hero-section.vue'
import MediaSection from '~/components/media/media-section.vue'
import type { Media } from '~/types/media'

definePageMeta({
  middleware: 'auth',
})

const { getFeaturedMedia, getContinueWatching, getPopularMedia, getNewReleases } = useMedia()

const featuredMedia = ref<Media | null>(null)
const continueWatching = ref<Media[]>([])
const popularMedia = ref<Media[]>([])
const newReleases = ref<Media[]>([])
const featuredSeries = ref<Media[]>([])

onMounted(async () => {
  try {
    const [featured, continueWatchingData, popular, releases] = await Promise.all([
      getFeaturedMedia(),
      getContinueWatching(),
      getPopularMedia(),
      getNewReleases(),
    ])

    featuredMedia.value = featured
    continueWatching.value = continueWatchingData
    popularMedia.value = popular
    newReleases.value = releases
    featuredSeries.value = popular.filter((media) => media.type === 'SERIES')
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
})
</script>
