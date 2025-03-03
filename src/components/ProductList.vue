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
  <div class="py-8 sm:py-16">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

    <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-8">
      <div v-for="product in products" :key="product.id" class="group relative">
        <img
          :src="'/images/product/thumbnail/book ' + product.id + '.jpg'"
          :alt="product.title"
          class="w-full rounded-2xl bg-gray-200 object-cover group-hover:opacity-75"
        />
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a :href="'/product'">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ product.title }}
              </a>
            </h3>
            <!-- <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p> -->
          </div>
          <p class="text-sm font-medium text-gray-900">NZ&dollar;{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
