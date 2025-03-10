<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { CheckBadgeIcon } from '@heroicons/vue/20/solid'

const router = useRouter()
const interval = ref<number>(0)
const countDown = ref(5)

const intervalFunction = () => {
  if (countDown.value > 0) {
    countDown.value--
  } else {
    clearInterval(interval.value)
    router.replace('/')
  }
}

onMounted(() => {
  interval.value = setInterval(intervalFunction, 1000)
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-6 lg:max-w-6xl lg:px-8 py-50 text-center">
    <div>
      <CheckBadgeIcon class="text-primary size-30 mx-auto" />
    </div>
    <div>
      <h1 class="font-bold text-2xl">Checkout Success!</h1>
    </div>
    <p class="text-sm text-gray-500">
      Thank you for Your purchase. You'll be redirected to main page in {{ countDown }} seconds...
    </p>
  </div>
</template>
