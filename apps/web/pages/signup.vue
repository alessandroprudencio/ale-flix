<template>
  <div class="min-h-screen flex">
    <LeftSection subtitle="Junte-se à melhor plataforma de streaming" />

    <RightSection title="Crie sua conta" subtitle="Comece a explorar o mundo do streaming">
      <form class="space-y-5" @submit.prevent="handleSignup">

        <AlertError v-if="errorMessage" :title="errorMessage" :description="errorDetails" />

        <div>
          <label for="name" class="block mb-1 text-gray-300">Nome</label>
          <input id="name" v-model="newUser.name" type="text" placeholder="Seu nome completo" required
            class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
        </div>

        <div>
          <label for="email" class="block mb-1 text-gray-300">Email</label>
          <input id="email" v-model="newUser.email" type="email" placeholder="seu@email.com" required
            class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
        </div>

        <div>
          <label for="password" class="block mb-1 text-gray-300">Senha</label>
          <input id="password" v-model="newUser.password" type="password" placeholder="Crie uma senha" required
            class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
        </div>

        <div>
          <label for="confirmPassword" class="block mb-1 text-gray-300">Confirmar Senha</label>
          <input id="confirmPassword" v-model="newUser.confirmPassword" type="password" placeholder="Repita a senha" required
            class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
        </div>

        <Button :full-width="true" variant="primary">Cadastrar</Button>

        <p class="mt-8 text-center text-gray-400">
          Já tem uma conta?
          <NuxtLink href="/login" class="text-indigo-500 hover:underline">Faça login</NuxtLink>
        </p>
      </form>
    </RightSection>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LeftSection from '~/components/auth/left-aside.vue'
import RightSection from '~/components/auth/right-aside.vue'
import Button from '~/components/ui/button.vue'
import AlertError from '~/components/ui/alert-error.vue'
definePageMeta({
  layout: false,
})

const { signup } = useAuth();

const newUser = ref({
  name: 'Alessandro',
  email: 'alessandro@gmail.com',
  password: '@Hitman789',
  confirmPassword: '@Hitman789',
})
const errorMessage = ref('');
const errorDetails = ref('');

async function handleSignup() {
  try {
    if (newUser.value.password !== newUser.value.confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    await signup(newUser.value.email, newUser.value.password, newUser.value.confirmPassword, newUser.value.name);
    navigateTo('/');
  } catch (err) {
    if (err.data) {
      errorMessage.value = err.data?.error || 'Ops!'
      errorDetails.value = err.data?.message || 'Erro ao fazer login.'
      return
    }

    console.log(err);
  }
}
</script>
