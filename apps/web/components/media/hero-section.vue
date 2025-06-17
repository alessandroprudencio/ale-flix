<template>
  <div class="relative h-[60vh] min-h-[500px] mb-8">
    <div class="absolute inset-0">
      <img :src="media.thumbnailUrl" :alt="media.title" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
    </div>

    <div class="relative h-full flex items-center">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">{{ media.title }}</h1>
          <div class="flex items-center gap-4 text-gray-300 mb-6">
            <span>{{ media.releaseYear }}</span>
            <span>•</span>
            <span>{{ media.type }}</span>
            <span>•</span>
            <span>{{ media.rating }}</span>
          </div>
          <p class="text-gray-300 mb-8 line-clamp-3">{{ media.description }}</p>
          <div class="flex gap-4">
            <button class="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Assistir
            </button>
            <button
              class="flex items-center gap-2 bg-gray-600/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600/70 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mais informações
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  media: {
    type: Object,
    required: true
  }
})
</script>