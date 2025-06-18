<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-white">Create New Media</h1>
        <p class="mt-2 text-sm text-gray-300">
          Add a new movie or series to the database.
        </p>
      </div>
    </div>

    <div class="mt-8">
      <MediaForm @submit="handleSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import api from '~/services/api'
import MediaForm from '~/components/media/media-form.vue'
import type { CreateMediaDto } from '~/types/media.interface'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const router = useRouter()

const handleSubmit = async (formData: CreateMediaDto) => {
  try {
    await api.request('/media', {
      method: 'POST',
      body: formData
    })
    router.push('/admin/media')
  } catch (error) {
    console.error('Error creating media:', error)
  }
}
</script>