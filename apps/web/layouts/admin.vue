<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-64 bg-gray-800">
      <div class="flex h-16 items-center justify-center border-b border-gray-700">
        <h1 class="text-xl font-bold text-white">Admin Panel</h1>
      </div>
      <nav class="mt-5 px-2">
        <NuxtLink to="/admin/media"
          class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          :class="mediaLinkClasses">
          <svg class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          Media Management
        </NuxtLink>
      </nav>
    </div>

    <!-- Main content -->
    <div class="pl-64">
      <header class="bg-gray-800 shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-white">
            {{ $route.meta.title || 'Admin Dashboard' }}
          </h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const mediaLinkClasses = computed(() => ({
  'bg-gray-700 text-white': route.path.startsWith('/admin/media')
}))

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
</script>