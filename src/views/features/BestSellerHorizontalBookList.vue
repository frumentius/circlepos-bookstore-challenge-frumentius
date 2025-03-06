<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBestSeller } from '@/composables/useBook'
import type { Book } from '@/models/books'
import HorizontalOverflowBookList from '@/components/HorizontalOverflowBookList.vue'

const books = ref<Book[]>([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await getBestSeller()
    books.value = JSON.parse(JSON.stringify(response))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
})
</script>

<template>
  <HorizontalOverflowBookList title="Best Sellers" :list="books" />
</template>
