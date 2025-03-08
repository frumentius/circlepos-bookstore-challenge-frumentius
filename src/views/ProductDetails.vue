<script setup lang="ts">
import { ref } from 'vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

import { useCartStore } from '@/stores/cart'
import { getBookDetails } from '@/composables/useBook'
import ProductDetailsTemplate from '@/components/ProductDetailsTemplate.vue'
import type { Book } from '@/models/books'

import { makeSerializable } from '@/utils/parsers'

const shoppingBag = useCartStore()

const productDummyData = ref({
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'e-Book', href: '#' },
    { id: 2, name: 'Category', href: '#' },
  ],
  description:
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit congue sem eu laoreet. Proin feugiat faucibus rhoncus. Praesent risus neque, dignissim aliquet viverra ac, bibendum eu mi. Cras suscipit lobortis risus sit amet elementum. Maecenas urna ex, vehicula et arcu id, commodo faucibus velit. Proin imperdiet augue quam, sed feugiat mi varius non. Duis augue urna, dignissim ut felis a, efficitur placerat mi. Integer pulvinar massa ac nisi sollicitudin, in volutpat eros tempor. Suspendisse a leo sapien. Aliquam blandit odio quis congue lobortis. Phasellus tellus ipsum, tristique sed dui vitae, cursus laoreet mi.</p><p>Nulla eget enim congue, venenatis lorem ac, luctus ex. Vivamus at rhoncus justo. Integer ultricies pulvinar leo, interdum rhoncus magna sagittis non. Phasellus aliquet molestie imperdiet. Cras tempus metus vel urna eleifend, sed dapibus mi semper. Aenean sit amet lacus gravida sem mollis vehicula. Curabitur a ligula eleifend, feugiat tellus sed, venenatis nibh. Donec hendrerit scelerisque mauris, consequat convallis ex pharetra vel.</p>',
  details: {
    publisher: 'Circlepos',
    published_date: '03 October 1990',
    language: 'English',
    pages: 300,
  },
  isFav: false,
})

const product = ref<Book | null>(null)

const route = useRoute()
const error = ref('')
const loading = ref(false)

const loadProductDetails = async () => {
  if (loading.value) return

  try {
    loading.value = true

    const productId = Number(route.params.bookId)
    if (isNaN(productId)) throw new Error('Invalid product ID')

    const response = await getBookDetails(productId)
    product.value = makeSerializable<Book>(response)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (product.value) {
    shoppingBag.addItem(makeSerializable<Book>(product.value))
    alert('Added to Cart!')
  }
}

const toggleFav = () => {
  productDummyData.value.isFav = !productDummyData.value.isFav
  if (productDummyData.value.isFav) alert('Added to Your Favourite List!')
  else alert('Removed from Your Favourite List!')
}

watch(
  () => route.params.bookId,
  (newId, oldId) => {
    if (newId !== oldId && newId) {
      loadProductDetails()
    }
  },
  { immediate: true },
)
</script>

<template>
  <ProductDetailsTemplate
    v-if="!loading"
    :product="product"
    :product-dummy-data="productDummyData"
    @add-to-cart="addToCart"
    @toggle-favourite="toggleFav"
  />

  <!--could make a skeleton in the future for better loading aestethic-->
  <h3 v-if="loading" class="py-10 px-8">Loading...</h3>
</template>
