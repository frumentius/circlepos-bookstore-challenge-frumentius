<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getNewArrival } from '@/composables/useBook'
import type { Book } from '@/models/books'
import HorizontalOverflowBookList from '@/components/HorizontalOverflowBookList.vue'
import { makeSerializable } from '@/utils/parsers'

const books = ref<Book[]>([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await getNewArrival()
    books.value = makeSerializable<Book[]>(response)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
})
</script>

<template>
  <HorizontalOverflowBookList title="New Arrivals" :list="books" />
</template>
