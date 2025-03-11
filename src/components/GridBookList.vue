<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { StarIcon } from '@heroicons/vue/20/solid'
import type { Book } from '@/models/books'

const props = defineProps<{
  title: string
  list: Book[]
}>()
</script>

<template>
  <h2 v-if="props.title" class="mb-4 sm:mb-8 text-2xl font-bold tracking-tight text-gray-700">
    {{ props.title }}
  </h2>

  <div class="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="(book, index) in props.list" :key="book.id" class="group relative">
      <RouterLink :to="'/product/' + book.id" class="flex gap-3 sm:gap-4 md:gap-5 w-full">
        <div>{{ index + 1 }}.</div>
        <img
          :src="'/images/product/thumbnail/book ' + book.id + '.jpg'"
          :alt="book.title"
          loading="lazy"
          class="w-20 sm:w-25 rounded-md object-cover block aspect-2/3 shadow-sm shadow-gray-500 group-hover:shadow-md group-hover:opacity-75"
        />
        <div>
          <h3 class="text-gray-700">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ book.title }}
          </h3>
          <div class="flex gap-2">
            <div class="flex items-center">
              <div class="text-sm text-gray-500">5.0</div>
              <div><StarIcon class="text-gray-500 size-3 shrink-0" aria-hidden="true" /></div>
            </div>
            <div class="text-sm font-medium">
              <div v-if="book.availableStock > 0">
                <span class="line-through opacity-75">&dollar;33.50</span>
                &nbsp;
                <span class="text-gray-900">NZ&dollar;{{ book.price }}</span>
              </div>
              <div v-else class="text-gray-900">SOLD OUT</div>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
