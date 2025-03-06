<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getChart } from '@/composables/useBook'
import type { Book } from '@/models/books'
import GridBookList from '@/components/GridBookList.vue'

const books = ref<Book[]>([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await getChart()
    books.value = JSON.parse(JSON.stringify(response))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
})
</script>

<template>
  <GridBookList title="Some Other List / Charts" :list="books" />
</template>
