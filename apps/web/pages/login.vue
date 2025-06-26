<template>
  <div class="min-h-screen flex">
    <LeftSection :subtitle="$t('yourFavoriteStreaming')" />

    <RightSection :title="$t('welcomeBack')" :subtitle="$t('loginToContinue')">
      <form class="space-y-5" @submit.prevent="handleLogin">

        <AlertError v-if="errorMessage" :title="errorMessage" :description="errorDetails" />

        <div>
          <label for="email" class="block mb-1 text-gray-300">{{ $t('email') }}</label>
          <input id="email" v-model="loginData.email" type="email" :placeholder="$t('emailPlaceholder')" required
            class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
        </div>

        <div>
          <label for="password" class="block mb-1 text-gray-300">{{ $t('password') }}</label>
          <div class="relative">
            <input id="password" v-model="loginData.password" :type="loginData.showPassword ? 'text' : 'password'" placeholder="••••••••" required
              class="w-full rounded bg-[#161b22] px-4 py-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <button type="button" class="absolute right-3 top-3 text-gray-400 hover:text-gray-200" aria-label="Toggle password visibility"
              @click="loginData.showPassword = !loginData.showPassword">
              <svg v-if="loginData.showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.151-6.026M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-1.299 0-2.544-.293-3.638-.818M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="loginData.rememberMe" type="checkbox" class="rounded text-indigo-600 focus:ring-indigo-500">
            {{ $t('rememberMe') }}
          </label>
          <a href="#" class="text-indigo-500 hover:underline">{{ $t('forgotPassword') }}</a>
        </div>

        <Button :full-width="true" variant="primary">{{ $t('login') }}</Button>
      </form>

      <div class="my-6 flex items-center before:flex-1 before:border-t before:border-gray-600 after:flex-1 after:border-t after:border-gray-600">
        <span class="mx-4 text-gray-400">{{ $t('orContinueWith') }}</span>
      </div>

      <div class="flex gap-4">
        <button class="flex-1 border border-gray-700 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-700 transition"
          @click="loginWith('google')">
          <svg fill="#EA4335" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21.35 11.1h-9.15v2.75h5.28c-.22 1.26-1.45 3.7-5.28 3.7-3.18 0-5.77-2.63-5.77-5.86s2.59-5.86 5.77-5.86c1.81 0 3.02.77 3.72 1.43l2.53-2.45c-1.59-1.48-3.65-2.4-6.25-2.4-5.34 0-9.69 4.31-9.69 9.6s4.35 9.6 9.69 9.6c5.56 0 9.26-3.9 9.26-9.42 0-.64-.07-1.12-.17-1.5z" />
          </svg>
          Google
        </button>

        <button class="flex-1 border border-gray-700 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-700 transition"
          @click="loginWith('facebook')">
          <svg fill="#1877F2" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.326v21.348c0 .73.593 1.326 1.326 1.326h11.49v-9.294h-3.125v-3.622h3.125v-2.671c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.466.099 2.797.143v3.244l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.311h3.59l-.467 3.622h-3.123v9.294h6.116c.73 0 1.324-.596 1.324-1.326v-21.35c0-.733-.593-1.326-1.326-1.326z" />
          </svg>
          Facebook
        </button>
      </div>

      <p class="mt-8 text-center text-gray-400">
        {{ $t('dontHaveAccount') }}
        <NuxtLink href="/signup" class="text-indigo-500 hover:underline">{{ $t('signupHere') }}</NuxtLink>
      </p>
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

const { t } = useI18n()
const { login } = useAuthStore();

const errorMessage = ref('');
const errorDetails = ref('');
const loginData = ref({
  email: '',
  password: '',
  showPassword: false,
  rememberMe: false
})

definePageMeta({
  layout: false,
})

async function handleLogin() {
  try {
    const resp = await login(loginData.value);
    console.log("resp", resp);
    navigateTo('/');
  } catch (err) {
    if (err.data) {
      errorMessage.value = err.data?.error || t('errorOnLogin')
      errorDetails.value = err.data?.message || t('errorOnLogin')
      return
    }
    if (
      err?.status === 0 ||
      err?.message?.includes('fetch') ||
      err?.message?.includes('NetworkError') ||
      err?.message?.includes('Failed to fetch') ||
      err?.message?.includes('Network request failed')
    ) {
      errorMessage.value = t('errorApiOffline') || 'API fora do ar. Tente novamente mais tarde.';
      errorDetails.value = '';
      return;
    }

    errorMessage.value = t('errorOnLogin');
    errorDetails.value = err?.message || '';

    console.log(err.status);
    console.log(err.message);
  }
}

function loginWith(provider) {
  alert(t('loginWithProvider', { provider }))
}
</script>
