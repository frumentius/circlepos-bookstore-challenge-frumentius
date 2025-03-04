<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBestSeller } from '@/composables/useBook'
import type { Book } from '@/models/books'

const products = ref<Book[]>([])
const error = ref('')
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

onMounted(async () => {
  try {
    const response = await getBestSeller()
    products.value = JSON.parse(JSON.stringify(response))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  }
})
</script>

<template>
  <div class="py-8 sm:py-16">
    <h2 class="mb-4 sm:mb-8 text-2xl font-bold tracking-tight text-gray-900">
      Customers also purchased
    </h2>

    <div class="carousel-container">
      <div class="overflow-x-auto scrollbar-w-none" ref="scrollContainer">
        <div class="flex flex-nowrap gap-2 sm:gap-4">
          <div v-for="product in products" :key="product.id" class="relative shrink-0 w-35 sm:w-48">
            <a :href="'/product/' + product.id" class="block w-full">
              <img
                :src="'/images/product/thumbnail/book ' + product.id + '.jpg'"
                :alt="product.title"
                class="w-full rounded-lg md:rounded-2xl bg-gray-200 object-cover block aspect-10/16"
              />
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.title }}
                  </h3>
                  <!-- <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p> -->
                </div>
                <p class="text-sm font-medium text-gray-900">NZ&dollar;{{ product.price }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <button class="carousel-control prev" @click="scrollLeft" :disabled="false">
        <span class="material-icons">chevron_left</span>
      </button>
      <button class="carousel-control next" @click="scrollRight" :disabled="false">
        <span class="material-icons">chevron_right</span>
      </button>
    </div>
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
  width: 48px;
  height: 48px;
  padding-top: 6px;
  cursor: pointer;
  color: var(--color-primary-main);
  box-shadow: 0px 0px 3px 0px #888888;
}
.carousel-control:hover {
  background: rgb(240, 240, 240);
  box-shadow: 0px 0px 5px 0px #888888;
}
.carousel-control:disabled {
  opacity: 0.3;
  cursor: not-allowed;
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
