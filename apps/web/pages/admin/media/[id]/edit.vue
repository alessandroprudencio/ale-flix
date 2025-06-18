<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-white">Edit Media</h1>
        <p class="mt-2 text-sm text-gray-300">
          Update the information for this media item.
        </p>
      </div>
    </div>

    <div class="mt-8">
      <MediaForm v-if="media" :model-value="media" @submit="handleSubmit" :loading="loading" />
      <div v-else class="text-gray-300">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '~/services/api'
import MediaForm from '~/components/media/media-form.vue'
import type { Media, CreateMediaDto } from '~/types/media.interface'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const router = useRouter()
const route = useRoute()
const media = ref<Media | null>(null)
const loading = ref(false)

const fetchMedia = async () => {
  try {
    loading.value = true
    const response = await api.request(`/media/${route.params.id}`, { method: 'GET' })
    media.value = response
  } catch (error) {
    console.error('Error loading media:', error)
    router.push('/admin/media')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (formData: CreateMediaDto) => {
  try {
    loading.value = true
    await api.request(`/media/${route.params.id}`, {
      method: 'PUT',
      body: formData
    })
    router.push('/admin/media')
  } catch (error) {
    console.error('Error updating media:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchMedia)
</script>