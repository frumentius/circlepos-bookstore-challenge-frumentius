<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/vue/20/solid'
import type { Book } from '@/models/books'

const props = defineProps<{
  title: string
  list: Book[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const scrollAmount = 196

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    })
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <h2 v-if="props.title" class="mb-4 sm:mb-8 text-2xl font-bold tracking-tight text-gray-700">
    {{ props.title }}
  </h2>
  <div class="carousel-container">
    <div class="overflow-x-auto scrollbar-w-none" ref="scrollContainer">
      <div class="flex flex-nowrap gap-3 sm:gap-4 md:gap-5">
        <div v-for="book in props.list" :key="book.id" class="relative shrink-0 w-35 sm:w-48">
          <RouterLink :to="'/product/' + book.id" class="block w-full group relative">
            <img
              :src="'/images/product/thumbnail/book ' + book.id + '.jpg'"
              :alt="book.title"
              class="w-full rounded-lg md:rounded-2xl object-cover block aspect-2/3 shadow-sm shadow-gray-500 group-hover:shadow-md group-hover:opacity-75"
            />
            <div class="mt-2.5">
              <h3 class="text-gray-700">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ book.title }}
              </h3>
              <div class="mt-1 flex justify-between">
                <div class="flex items-center">
                  <div class="text-sm text-gray-500">5.0</div>
                  <div>
                    <StarIcon class="text-gray-500 size-3 shrink-0" aria-hidden="true" />
                  </div>
                </div>
                <div class="text-sm font-medium">
                  <div v-if="book.availableStock > 0">
                    <!--
                    <span class="line-through opacity-75">&dollar;33.50</span>
                    &nbsp;
                    -->
                    <span class="text-gray-900">NZ&dollar;{{ book.price }}</span>
                  </div>
                  <div v-else class="text-gray-900">SOLD OUT</div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <button class="carousel-control prev" @click="scrollLeft">
      <ChevronLeftIcon class="size-7" aria-hidden="true" />
    </button>
    <button class="carousel-control next" @click="scrollRight">
      <ChevronRightIcon class="size-7" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.carousel-control {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  border-radius: 50%;
  box-sizing: border-box;
  padding-left: 10px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  color: var(--color-primary-main);
  box-shadow: 0px 0px 3px 0px #888888;
}
.carousel-control:hover {
  background: var(--color-primary-main);
  color: white;
  box-shadow: 0px 0px 4px 0px #888888;
}

.prev {
  left: -16px;
}

.next {
  right: -16px;
}

.carousel-container {
  position: relative;
}
.carousel-container:hover .carousel-control {
  display: block;
}
</style>
