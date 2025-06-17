<template>
  <div class="group relative rounded-lg overflow-hidden bg-[#161b22] transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <div class="aspect-[16/9] relative">
      <img :src="media.thumbnailUrl" :alt="media.title" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h3 class="text-white font-semibold text-lg mb-1">{{ media.title }}</h3>
          <div class="flex items-center gap-2 text-sm text-gray-300">
            <span>{{ media.releaseYear }}</span>
            <span>•</span>
            <span>{{ media.type }}</span>
            <span>•</span>
            <span>{{ media.rating }}</span>
          </div>
        </div>
      </div>
      <button
        class="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </div>
    <div class="p-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="px-2 py-1 text-xs rounded bg-indigo-600 text-white">{{ media.rating }}</span>
          <span class="text-sm text-gray-400">{{ formatDuration(media.duration) }}</span>
        </div>
        <button class="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
        </button>
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

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}
</script>