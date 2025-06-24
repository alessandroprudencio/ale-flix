<template>
  <div class="min-h-screen flex">
    <LeftSection :subtitle="$t('joinStreaming')" />

    <RightSection :title="$t('createAccount')" :subtitle="$t('startExploring')">
      <form class="space-y-5" @submit.prevent="handleSignup">

        <AlertError v-if="errorMessage" :title="errorMessage" :description="errorDetails" />

        <div>
          <label for="name" class="block mb-1 text-gray-300">{{ $t('name') }}</label>
          <input id="name" v-model="newUser.name" type="text" :placeholder="$t('fullNamePlaceholder')" required
            class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
        </div>

        <div>
          <label for="email" class="block mb-1 text-gray-300">{{ $t('email') }}</label>
          <input id="email" v-model="newUser.email" type="email" :placeholder="$t('emailPlaceholder')" required
            class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
        </div>

        <div>
          <label for="password" class="block mb-1 text-gray-300">{{ $t('password') }}</label>
          <input id="password" v-model="newUser.password" type="password" :placeholder="$t('createPasswordPlaceholder')" required
            class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
        </div>

        <div>
          <label for="confirmPassword" class="block mb-1 text-gray-300">{{ $t('confirmPassword') }}</label>
          <input id="confirmPassword" v-model="newUser.confirmPassword" type="password" :placeholder="$t('repeatPasswordPlaceholder')" required
            class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
        </div>

        <Button :full-width="true" variant="primary">{{ $t('signup') }}</Button>

        <p class="mt-8 text-center text-gray-400">
          {{ $t('alreadyHaveAccount') }}
          <NuxtLink href="/login" class="text-indigo-500 hover:underline">{{ $t('loginHere') }}</NuxtLink>
        </p>
      </form>
    </RightSection>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LeftSection from '~/components/auth/left-aside.vue'
import RightSection from '~/components/auth/right-aside.vue'
import Button from '~/components/ui/button.vue'
import AlertError from '~/components/ui/alert-error.vue'
definePageMeta({
  layout: false,
})

const { t } = useI18n()
const { signup } = useAuthStore();

const newUser = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const errorMessage = ref('');
const errorDetails = ref('');

async function handleSignup() {
  try {
    if (newUser.value.password !== newUser.value.confirmPassword) {
      alert(t('passwordsDoNotMatch'))
      return
    }

    await signup(newUser.value.email, newUser.value.password, newUser.value.confirmPassword, newUser.value.name);
    navigateTo('/');
  } catch (err) {
    if (err.data) {
      errorMessage.value = err.data?.error || t('oops')
      errorDetails.value = err.data?.message || t('errorOnSignup')
      return
    }

    console.log(err);
  }
}
</script>
