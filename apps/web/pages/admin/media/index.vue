<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <!-- <h1 class="text-xl font-semibold text-white">Media</h1> -->
        <p class="mt-2 text-sm text-gray-300">
          A list of all media in your database including their title, type, rating (indicative), and average user rating.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <NuxtLink to="/admin/media/create"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add Media
        </NuxtLink>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-700">
              <thead class="bg-gray-800">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                    Title
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
                    Type
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
                    Release Year
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
                    Status
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
                    Rating
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
                    User Rating
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700 bg-gray-900">
                <tr v-for="media in mediaList" :key="media.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                    {{ media.title }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    {{ media.type }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    {{ media.releaseYear }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    {{ media.status }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    {{ media.rating }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    {{ media.userRating?.toFixed(1) ?? 'N/A' }}
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <NuxtLink :to="`/admin/media/${media.id}/edit`" class="text-indigo-400 hover:text-indigo-300 mr-4">
                      Edit
                    </NuxtLink>
                    <button @click="deleteMedia(media.id)" class="text-red-400 hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '~/services/api'
import type { Media } from '~/types/media.interface'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
  title: 'Media Management'
})

const mediaList = ref<Media[]>([])

const fetchMedia = async () => {
  try {
    const response = await api.request('/media', { method: 'GET' })
    mediaList.value = response.data
  } catch (error) {
    console.error('Error fetching media:', error)
  }
}

const deleteMedia = async (id: string) => {
  if (!confirm('Are you sure you want to delete this media?')) return

  try {
    await api.request(`/media/${id}`, { method: 'DELETE' })
    await fetchMedia()
  } catch (error) {
    console.error('Error deleting media:', error)
  }
}

onMounted(() => {
  fetchMedia()
})
</script>