<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()
onMounted(() => {
  router.push('/admin/media')
})
</script>