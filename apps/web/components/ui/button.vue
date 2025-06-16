<template>
  <button
    :class="[
      'py-3 rounded font-semibold transition',
      variantClass,
      fullWidth ? 'w-full' : 'w-auto',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger'].includes(v)
  },
  disabled: Boolean,
  fullWidth: Boolean
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-indigo-600 text-white hover:bg-indigo-500'
    case 'secondary':
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-500'
    default:
      return 'bg-indigo-600 text-white hover:bg-indigo-500'
  }
})

</script>
