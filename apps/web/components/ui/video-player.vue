<template>
  <div class="fixed inset-0 w-full h-full bg-black z-50 flex flex-col">
    <!-- Botão de voltar -->
    <button @click="$emit('close')"
      class="absolute top-4 left-4 z-20 text-white text-3xl bg-black/60 rounded-full p-2 hover:bg-indigo-600 transition cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <!-- Video -->
    <video ref="video" :src="src" :poster="poster" class="w-full h-full object-contain flex-1 bg-black" @click="togglePlay" @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata" @ended="onEnded" :autoplay="true" :muted="muted" :playsinline="true" :controls="false" />
    <!-- Controles -->
    <div class="absolute bottom-0 left-0 w-full flex flex-col items-center z-20">
      <!-- Barra de progresso -->
      <div class="w-full px-8 mb-2">
        <div class="relative h-2 bg-gray-700 rounded-full cursor-pointer" @click="seek($event)">
          <div class="absolute top-0 left-0 h-2 bg-indigo-600 rounded-full" :style="{ width: progressPercent + '%' }"></div>
          <div class="absolute top-0" :style="{ left: `calc(${progressPercent}% - 8px)` }">
            <div class="w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow"></div>
          </div>
        </div>
      </div>
      <!-- Controles principais -->
      <div class="flex items-center justify-between w-full px-8 pb-6 pt-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div class="flex items-center gap-4">
          <button @click="togglePlay" class="text-white text-3xl focus:outline-none cursor-pointer">
            <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
            </svg>
          </button>
          <span class="text-gray-200 text-sm w-16 text-right">{{ formatTime(currentTime) }}</span>
          <span class="text-gray-400 text-xs">/</span>
          <span class="text-gray-400 text-sm w-16">{{ formatTime(duration) }}</span>
        </div>
        <div class="flex-1 flex justify-center">
          <span class="text-white text-lg font-semibold text-center">{{ title }}</span>
        </div>
        <div class="w-24"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Hls from 'hls.js'

const props = defineProps<{ src: string, title?: string, poster?: string }>()
const video = ref<HTMLVideoElement | null>(null)
const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const muted = ref(false)

let hls: Hls | null = null

const progressPercent = computed(() => duration.value ? (currentTime.value / duration.value) * 100 : 0)

function togglePlay() {
  if (!video.value) return
  if (video.value.paused) {
    video.value.play()
    playing.value = true
  } else {
    video.value.pause()
    playing.value = false
  }
}
function onTimeUpdate() {
  if (!video.value) return
  currentTime.value = video.value.currentTime
}
function onLoadedMetadata() {
  if (!video.value) return
  duration.value = video.value.duration
}
function seek(event: MouseEvent) {
  if (!video.value) return
  const bar = (event.currentTarget as HTMLElement)
  const rect = bar.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  video.value.currentTime = percent * duration.value
}
function onEnded() {
  playing.value = false
}
function formatTime(sec: number) {
  if (isNaN(sec)) return '00:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

onMounted(() => {
  if (!video.value) return
  if (video.value.canPlayType('application/vnd.apple.mpegurl')) {
    video.value.src = props.src
  } else if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(props.src)
    hls.attachMedia(video.value)
  } else {
    video.value.src = props.src
  }
  video.value.play()
  playing.value = true
})
watch(() => props.src, () => {
  if (!video.value) return
  if (hls) hls.destroy()
  if (video.value.canPlayType('application/vnd.apple.mpegurl')) {
    video.value.src = props.src
  } else if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(props.src)
    hls.attachMedia(video.value)
  } else {
    video.value.src = props.src
  }
  video.value.play()
  playing.value = true
})
onBeforeUnmount(() => {
  if (hls) hls.destroy()
})
</script>