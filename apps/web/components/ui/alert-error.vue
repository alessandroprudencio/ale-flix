<template>
  <div :class="[
    'mb-4 p-3 border rounded-lg flex items-start',
    type === 'error' && 'bg-red-50 border-red-200 text-red-700',
    type === 'success' && 'bg-green-50 border-green-200 text-green-700',
  ]">
    <Icon :name="icon" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
    <div>
      <p class="font-medium">{{ title }}</p>
      <p v-if="description" class="text-sm mt-1">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'error',
  },
  icon: {
    type: String,
    default: 'heroicons:exclamation-circle',
  },
  title: { type: String, default: 'Erro' },
  description: { type: String, default: 'Ocorreu um erro ao processar a solicitação' },
})
</script>
