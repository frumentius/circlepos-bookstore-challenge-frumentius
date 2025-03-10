<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const isRefreshing = ref(false)

window.addEventListener('beforeunload', () => {
  isRefreshing.value = true
  router.replace('/')
})
</script>

<template>
  <RouterView v-if="!isRefreshing" />
</template>
