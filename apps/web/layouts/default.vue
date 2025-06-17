<template>
  <div class="min-h-screen bg-[#0d1117]">
    <AppHeader />
    <main class="pt-16">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppHeader from '~/components/layout/header.vue'
</script>
