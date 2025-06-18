<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-200">Title</label>
        <input type="text" id="title" v-model="form.title"
          class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required />
      </div>

      <!-- Release Year -->
      <div>
        <label for="releaseYear" class="block text-sm font-medium text-gray-200">Release Year</label>
        <input type="number" id="releaseYear" v-model.number="form.releaseYear" min="1900" :max="new Date().getFullYear()"
          class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required />
      </div>

      <!-- Type -->
      <div>
        <label for="type" class="block text-sm font-medium text-gray-200">Type</label>
        <select id="type" v-model="form.type"
          class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required>
          <option value="MOVIE">Movie</option>
          <option value="SERIES">Series</option>
        </select>
      </div>

      <!-- Duration -->
      <div>
        <label for="duration" class="block text-sm font-medium text-gray-200">Duration (minutes)</label>
        <input type="number" id="duration" v-model.number="form.duration" min="1"
          class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required />
      </div>

      <!-- Categories -->
      <div>
        <label class="block text-sm font-medium text-gray-200">Categories</label>
        <div class="mt-1 flex flex-wrap gap-2">
          <div v-for="category in availableCategories" :key="category" class="flex items-center">
            <input type="checkbox" :id="category" :value="category" v-model="form.categories"
              class="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500" />
            <label :for="category" class="ml-2 text-sm text-gray-200">{{ category }}</label>
          </div>
        </div>
      </div>

      <!-- Thumbnail URL -->
      <div>
        <label for="thumbnailUrl" class="block text-sm font-medium text-gray-200">Thumbnail URL</label>
        <input type="url" id="thumbnailUrl" v-model="form.thumbnailUrl"
          class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required />
      </div>

      <!-- Poster URL -->
      <div>
        <label for="poster" class="block text-sm font-medium text-gray-200">Poster URL</label>
        <input type="url" id="poster" v-model="form.poster"
          class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required />
      </div>
    </div>

    <!-- Description -->
    <div>
      <label for="description" class="block text-sm font-medium text-gray-200">Description</label>
      <textarea id="description" v-model="form.description" rows="4"
        class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <button type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Media' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Category, CreateMediaDto } from '~/types/media.interface'

const props = defineProps<{
  modelValue?: Partial<CreateMediaDto & { id?: string }>
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: CreateMediaDto): void
}>()

const loading = ref(false)

const availableCategories: Category[] = [
  'ACTION',
  'ADVENTURE',
  'ANIMATION',
  'COMEDY',
  'CRIME',
  'DOCUMENTARY',
  'DRAMA',
  'FAMILY',
  'FANTASY',
  'HISTORY',
  'HORROR',
  'MUSIC',
  'MYSTERY',
  'ROMANCE',
  'SCIENCE_FICTION',
  'TV_MOVIE',
  'THRILLER',
  'WAR',
  'WESTERN'
]

const form = ref<CreateMediaDto>({
  title: '',
  description: '',
  releaseYear: new Date().getFullYear(),
  type: 'MOVIE',
  duration: 0,
  categories: [],
  thumbnailUrl: '',
  poster: ''
})

// Atualiza o formulário quando modelValue muda (edição)
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      form.value = { ...form.value, ...val }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  loading.value = true
  emit('submit', form.value)
  loading.value = false
}
</script>