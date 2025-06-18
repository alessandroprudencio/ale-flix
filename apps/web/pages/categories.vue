<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-8">Categorias</h1>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <NuxtLink v-for="category in categories" :key="category.id" :to="`/categories/${category.id}`"
        class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-white mb-2">{{ category.name }}</h2>
          <p class="text-gray-400">{{ category.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '~/services/api'

const categories = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    const response = await api.getCategories()
    categories.value = response
  } catch (err) {
    console.error('Error loading categories:', err)
    error.value = 'Error loading categories. Please try again later.'
  } finally {
    loading.value = false
  }
})
</script>