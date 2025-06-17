<template>
  <section class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-white">{{ title }}</h2>
      <button class="text-indigo-500 hover:text-indigo-400 transition-colors">
        Ver todos
      </button>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <MediaCard v-for="media in mediaList" :key="media.id" :media="media" />
    </div>
  </section>
</template>

<script setup>
import MediaCard from './media-card.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  mediaList: {
    type: Array,
    required: true
  }
})
</script>