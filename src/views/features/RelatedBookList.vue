<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRelated } from '@/composables/useBook'
import type { Book } from '@/models/books'
import SmallGridBookList from '@/components/SmallGridBookList.vue'

const books = ref<Book[]>([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await getRelated()
    books.value = JSON.parse(JSON.stringify(response))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
})
</script>

<template>
  <SmallGridBookList title="Related" :list="books" />
</template>
