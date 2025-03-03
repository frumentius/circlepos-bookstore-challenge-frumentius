<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref<Book[]>([])

interface Book {
  id: number
  title: string
  author: string
  isbn: string
  price: number
  availableStock: number
}
interface Books {
  books: Book[]
}

const scrollContainer = ref<HTMLElement | null>(null)

// Scroll amount
const scrollAmount = 216

// Scroll left
function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    })
  }
}

// Scroll right
function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }
}

onMounted(() => {
  axios
    .get<Books>('http://localhost:8000/books')
    .then(function (response) {
      products.value = JSON.parse(JSON.stringify(response.data.books))
      console.log(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .finally(function () {
      // always executed
    })
})
</script>

<template>
  <div id="product-carousel" class="relative py-8 sm:py-16">
    <h2 class="mb-4 sm:mb-8 text-2xl font-bold tracking-tight text-gray-900">
      Customers also purchased
    </h2>

    <div class="overflow-x-auto scrollbar-w-none" ref="scrollContainer">
      <div class="flex flex-nowrap gap-4">
        <div v-for="product in products" :key="product.id" class="relative shrink-0 w-50">
          <a :href="'/product/' + product.id" class="block w-full">
            <img
              :src="'/images/product/thumbnail/book ' + product.id + '.jpg'"
              :alt="product.title"
              class="w-full rounded-2xl bg-gray-200 object-cover block"
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
  left: -10px;
}

.next {
  right: -10px;
}

#product-carousel:hover .carousel-control {
  display: block;
}
</style>
