<template>
  <div class="min-h-screen flex">
    <LeftSection subtitle="Junte-se à melhor plataforma de streaming" />

    <RightSection title="Crie sua conta" subtitle="Comece a explorar o mundo do streaming">
        <form class="space-y-5" @submit.prevent="handleSignup">
          <div>
            <label for="name" class="block mb-1 text-gray-300">Nome</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Seu nome completo"
              required
              class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
          </div>

          <div>
            <label for="email" class="block mb-1 text-gray-300">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              required
              class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
          </div>

          <div>
            <label for="password" class="block mb-1 text-gray-300">Senha</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Crie uma senha"
              required
              class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
          </div>

          <div>
            <label for="confirmPassword" class="block mb-1 text-gray-300">Confirmar Senha</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="Repita a senha"
              required
              class="w-full rounded bg-[#161b22] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function handleSignup() {
  if (password.value !== confirmPassword.value) {
    alert('As senhas não coincidem')
    return
  }

  // Aqui você deve integrar com sua API de criação de usuário
  console.log('Signup com:', name.value, email.value, password.value)
  alert('Cadastro executado. Integre com a API.')
}
</script>
