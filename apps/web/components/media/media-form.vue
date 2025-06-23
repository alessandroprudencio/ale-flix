<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-200">Title</label>
        <input type="text" id="title" v-model="form.title"
          class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required />
      </div>

      <!-- Release Year -->
      <div>
        <label for="releaseYear" class="block text-sm font-medium text-gray-200">Release Year</label>
        <input type="number" id="releaseYear" v-model.number="form.releaseYear" min="1900" :max="new Date().getFullYear()"
          class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required />
      </div>

      <!-- Type -->
      <div>
        <label for="type" class="block text-sm font-medium text-gray-200">Type</label>
        <select id="type" v-model="form.type"
          class="w-full rounded bg-[#161b22] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600" required>
          <option value="MOVIE">Movie</option>
          <option value="SERIES">Series</option>
          <option value="DOCUMENTARY">Documentary</option>
        </select>
      </div>

      <!-- Duration -->
      <div>
        <label for="duration" class="block text-sm font-medium text-gray-200">Duration (minutes)</label>
        <input type="number" id="duration" v-model.number="form.duration" min="1"
          class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required />
      </div>

      <!-- Rating -->
      <div>
        <label for="rating" class="block text-sm font-medium text-gray-200">Rating</label>
        <select id="rating" v-model="form.rating"
          class="w-full rounded bg-[#161b22] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600" required>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG13">PG-13</option>
          <option value="R">R</option>
          <option value="NC17">NC-17</option>
        </select>
      </div>

      <!-- Categories -->
      <div>
        <label class="block text-sm font-medium text-gray-200">Categories</label>
        <div class="mt-1 flex flex-wrap gap-2">
          <div v-for="category in availableCategories" :key="category.id" class="flex items-center">
            <input type="checkbox" :id="category.id" :value="category.id" v-model="form.categoryIds"
              class="h-4 w-4 rounded border-gray-600 bg-[#161b22] text-indigo-600 focus:ring-indigo-500" />
            <label :for="category.id" class="ml-2 text-sm text-gray-200 cursor-pointer">{{ category.name }}</label>
          </div>
        </div>
      </div>

      <!-- Thumbnail URL -->
      <div>
        <label for="thumbnailUrl" class="block text-sm font-medium text-gray-200">Thumbnail URL</label>
        <input type="url" id="thumbnailUrl" v-model="form.thumbnailUrl"
          class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required />
      </div>

      <!-- Poster URL -->
      <div>
        <label for="poster" class="block text-sm font-medium text-gray-200">Poster URL</label>
        <input type="url" id="poster" v-model="form.poster"
          class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required />
      </div>

      <!-- Upload Video -->
      <div v-if="!props.modelValue?.id">
        <label for="video" class="block text-sm font-medium text-gray-200">Upload Video</label>
        <div class="flex items-center gap-4 mt-1">
          <label for="video" class="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700 transition-colors">
            Selecionar vídeo
            <input type="file" id="video" accept="video/*" @change="onVideoChange" class="hidden" />
          </label>
          <span v-if="videoFile" class="text-gray-300 text-sm truncate max-w-xs">videoFile.name }}</span>
          <span v-else class="text-gray-500 text-sm">Nenhum arquivo selecionado</span>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div>
      <label for="description" class="block text-sm font-medium text-gray-200">Description</label>
      <textarea id="description" v-model="form.description" rows="4"
        class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"></textarea>
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
import { ref, watch, onMounted } from 'vue'
import api from '~/services/api'
import type { CategoryObject, CreateMediaDto } from '~/types/media.interface'

const props = defineProps<{
  modelValue?: Partial<CreateMediaDto & { id?: string }>
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
}>()

const loading = ref(false)
const availableCategories = ref<CategoryObject[]>([])
const videoFile = ref<File | null>(null)

const form = ref<CreateMediaDto>({
  title: '',
  description: '',
  releaseYear: new Date().getFullYear(),
  type: undefined,
  duration: 0,
  categoryIds: [],
  thumbnailUrl: '',
  poster: '',
  rating: undefined
})

onMounted(async () => {
  try {
    const categories = await api.getCategories()
    availableCategories.value = categories
  } catch (e) {
    // Tratar erro se necessário
    availableCategories.value = []
  }
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
  const data = new FormData()
  Object.entries(form.value).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => data.append(key, v))
    } else if (value !== undefined && value !== null) {
      data.append(key, value as any)
    }
  })
  if (videoFile.value) {
    data.append('video', videoFile.value)
  }
  emit('submit', data)
  loading.value = false
}

function onVideoChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target && target.files && target.files.length > 0) {
    videoFile.value = target.files[0]
  } else {
    videoFile.value = null
  }
}
</script>