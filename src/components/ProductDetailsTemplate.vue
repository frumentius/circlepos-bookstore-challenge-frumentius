<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Book } from '@/models/books'
import RelatedBookList from '@/views/features/RelatedBookList.vue'
import { BookOpenIcon, HeartIcon as HeartIconSolid, StarIcon } from '@heroicons/vue/20/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/vue/24/outline'
import BookReviewList from './BookReviewList.vue'

const props = defineProps<{
  product: Book | null
  productDummyData: {
    href: string
    breadcrumbs: {
      id: number
      name: string
      href: string
    }[]
    description: string
    details: {
      publisher: string
      published_date: string
      language: string
      pages: number
    }
    isFav: boolean
  }
}>()

const formattedDetails = computed(() => {
  return Object.entries(props.productDummyData.details)
})

const formatKey = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

const reviews = { average: 4.8, totalCount: 117 }

const detailsElement = ref<HTMLDivElement | null>(null)
const detailsClass = ref(['details-wrapper', 'lg:h-max', 'h-30'])
const detailsStyle = ref({})
const detailsActionStyle = ref()

function showDetails() {
  let expandedHeight: number | string = detailsElement.value?.scrollHeight || 0
  if (typeof expandedHeight === 'number' && !isNaN(expandedHeight) && expandedHeight > 0)
    expandedHeight = expandedHeight + 'px'
  else expandedHeight = 'max-content'
  detailsClass.value = ['details-wrapper', 'lg:h-max']
  detailsStyle.value = { height: expandedHeight }
  detailsActionStyle.value = { display: 'none' }
}
</script>

<template>
  <div v-if="props.product !== null" class="md:pt-8 text-gray-700">
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-6xl lg:px-8"
      >
        <li v-for="breadcrumb in props.productDummyData.breadcrumbs" :key="breadcrumb.id">
          <div class="flex items-center">
            <a :href="breadcrumb.href" class="mr-2 text-sm font-medium">{{ breadcrumb.name }}</a>
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="currentColor"
              aria-hidden="true"
              class="h-5 w-4 text-gray-300"
            >
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>
        <li class="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          <a
            :href="props.productDummyData.href"
            aria-current="page"
            class="font-medium text-gray-500 hover:text-gray-600"
            >{{ props.product.title }}</a
          >
        </li>
      </ol>
    </nav>

    <div
      class="mt-6 max-w-2xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 sm:grid sm:grid-cols-5 lg:grid-cols-4 sm:gap-x-4 lg:gap-x-8"
    >
      <div class="col-span-4 lg:col-span-3 sm:border-r sm:border-gray-200 sm:pr-4 lg:pr-8">
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <div class="grid grid-cols-4 gap-x-4">
            <div class="col-span-3 sm:col-span-5">
              <h1 class="text-xl md:text-2xl font-bold tracking-tight sm:text-3xl">
                {{ props.product.title }}
              </h1>
              <p class="text-sm md:text-base font-medium text-gray-500">
                {{ props.product.author }}
              </p>
              <div class="mt-6">
                <h3 class="sr-only">Reviews</h3>
                <div class="flex items-center gap-1.5 sm:gap-4">
                  <div class="flex items-center pr-1.5 sm:pr-4 border-r border-r-gray-200">
                    <span class="text-xs md:text-sm font-bold">{{ reviews.average }}</span>
                    <StarIcon class="size-4 shrink-0" aria-hidden="true" />
                    <a
                      @click="showDetails"
                      href="#review_section"
                      class="text-xs md:text-sm text-gray-500 hover:text-primary-darkened"
                    >
                      &nbsp;{{ reviews.totalCount }} reviews
                    </a>
                  </div>
                  <div class="flex items-center pr-1.5 sm:pr-4 border-r border-r-gray-200">
                    <BookOpenIcon class="size-4 shrink-0" />
                    <span class="text-xs md:text-sm text-gray-500">&nbsp;e-Book</span>
                  </div>
                  <div>
                    <span class="text-sm md:text-base font-bold">
                      {{ props.productDummyData.details.pages }}
                    </span>
                    <span class="text-xs md:text-sm text-gray-500">&nbsp;pages</span>
                  </div>
                </div>
              </div>
            </div>
            <img
              :src="'/images/product/book ' + props.product.id + '.jpg'"
              :alt="props.product.title"
              class="block sm:hidden w-full rounded-lg shadow-sm shadow-gray-400"
            />
          </div>
          <h2 class="sr-only">Product information</h2>

          <form class="mt-10 sm:flex gap-4">
            <button
              v-if="props.product.availableStock > 0"
              type="submit"
              class="flex items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 mb-4 text-sm sm:text-xs lg:text-sm font-medium text-white hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-hidden w-full md:w-65"
            >
              <span class="opacity-75 text-white line-through">&dollar;88.8</span>
              &nbsp;
              <strong class="text-base sm:text-sm lg:text-base"
                >NZ&dollar;{{ props.product.price }}</strong
              >
              &nbsp;Add to bag
            </button>
            <button
              v-else
              disabled
              type="button"
              class="flex items-center justify-center rounded-md border border-transparent bg-secondary px-8 py-3 mb-4 text-sm sm:text-xs lg:text-sm font-medium text-white hover:bg-secondary w-full md:w-65 cursor-not-allowed"
            >
              SOLD OUT
            </button>
            <button
              type="button"
              class="rounded-md border-2 border-primary bg-white px-8 py-3 sm:mb-4 text-sm sm:text-xs lg:text-sm font-medium text-primary hover:bg-gray-100 focus:outline-hidden w-full md:w-65"
            >
              <div class="flex items-center justify-center" v-if="!props.productDummyData.isFav">
                <HeartIconOutline class="size-4 lg:size-5" />&nbsp;Add to favourite
              </div>
              <div class="flex items-center justify-center" v-if="props.productDummyData.isFav">
                <HeartIconSolid class="size-4 lg:size-5 text-danger" />&nbsp;Is in favourite
              </div>
            </button>
          </form>
        </div>
      </div>

      <img
        :src="'/images/product/book ' + props.product.id + '.jpg'"
        :alt="props.product.title"
        class="hidden sm:block w-full object-cover sm:rounded-xl md:rounded-2xl shadow-sm shadow-gray-400"
      />
    </div>

    <div
      class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 lg:grid lg:max-w-6xl lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8"
    >
      <div class="py-10 lg:col-span-3 lg:col-start-1 lg:pr-8 text-sm sm:text-base">
        <div ref="detailsElement" :class="detailsClass" :style="detailsStyle">
          <div>
            <h3 class="text-lg sm:text-base md:text-lg font-bold">About</h3>
            <div
              class="mt-4 grid grid-cols-1 gap-4 text-justify"
              v-html="props.productDummyData.description"
            ></div>
          </div>
          <div class="mt-10">
            <h3 class="text-lg sm:text-base md:text-lg font-bold">Details</h3>

            <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                Author
                <br />
                <span class="text-gray-500">{{ props.product.author }}</span>
              </div>
              <div v-for="(value, key) in formattedDetails" :key="key">
                <span>{{ formatKey(value[0]) }}</span>
                <br />
                <span class="text-gray-500">{{ value[1] }}</span>
              </div>
              <div>
                ISBN
                <br />
                <span class="text-gray-500">{{ props.product.isbn }}</span>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <BookReviewList :reviews="reviews" />
          </div>
        </div>
        <div
          class="more-details-action relative text-center font-medium overflow-hidden pt-20 -mt-20 block lg:hidden"
          :style="detailsActionStyle"
          @click="showDetails"
        >
          <span @click="showDetails" class="cursor-pointer hover:underline"> more details </span>
          <div class="rotate-90 text-xl -mt-1">&raquo;</div>
        </div>
      </div>
      <div class="pb-10 lg:pt-10">
        <RelatedBookList />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.details-wrapper {
  position: relative;
  z-index: 1;
  overflow-y: hidden;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.more-details-action {
  z-index: 3;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 60%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
