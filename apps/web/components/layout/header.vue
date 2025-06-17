<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <button class="bg-indigo-600 p-2 rounded-full hover:bg-indigo-500 transition">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <span class="text-xl font-bold text-white">AleFlix</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink to="/" class="text-white hover:text-gray-300 transition">Início</NuxtLink>
          <NuxtLink to="/series" class="text-white hover:text-gray-300 transition">Séries</NuxtLink>
          <NuxtLink to="/filmes" class="text-white hover:text-gray-300 transition">Filmes</NuxtLink>
          <NuxtLink to="/categorias" class="text-white hover:text-gray-300 transition">Categorias</NuxtLink>
        </nav>

        <!-- Search and User Menu -->
        <div class="flex items-center gap-4">
          <button class="text-white hover:text-gray-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <div v-if="authStore.user" class="relative">
            <button class="flex items-center gap-2 text-white hover:text-gray-300 transition" @click="toggleUserMenu">
              <img :src="`https://ui-avatars.com/api/?name=${authStore.user.name}&background=6366f1&color=fff`" :alt="authStore.user.name"
                class="w-8 h-8 rounded-full">
              <span class="hidden md:inline">{{ authStore.user.name }}</span>
            </button>

            <!-- User Menu Dropdown -->
            <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-[#161b22] rounded-lg shadow-lg py-1">
              <NuxtLink to="/perfil" class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition">
                Meu Perfil
              </NuxtLink>
              <NuxtLink to="/favoritos" class="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition">
                Favoritos
              </NuxtLink>
              <button class="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition" @click="handleLogout">
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const isUserMenuOpen = ref(false)

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

function handleClickOutside(event) {
  if (isUserMenuOpen.value && !event.target.closest('.user-menu')) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

async function handleLogout() {
  await authStore.logout()
}
</script>