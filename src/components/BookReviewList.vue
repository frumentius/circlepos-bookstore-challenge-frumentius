<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  reviews: {
    average: number
    totalCount: number
  }
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
    <div id="review_section">
      <h3 class="text-lg sm:text-base md:text-lg font-bold mb-2">Customer Reviews</h3>
      <div class="text-6xl">
        {{ props.reviews.average }}
      </div>
      <div class="flex items-center">
        <div class="flex items-center">
          <StarIcon
            v-for="rating in [0, 1, 2, 3, 4]"
            :key="rating"
            :class="[
              props.reviews.average > rating ? 'text-warning' : 'text-gray-200',
              'size-5 shrink-0',
            ]"
            aria-hidden="true"
          />
        </div>
        <p class="sr-only">{{ props.reviews.average }} out of 5 stars</p>
        <div class="ml-2 text-xs sm:text-sm">based on {{ props.reviews.totalCount }} reviews</div>
      </div>
      <div class="mt-8 text-sm sm:text-base">
        <p class="font-medium">Share your thoughts</p>
        <p class="text-gray-500">
          If you've purchased and read this book, share your thoughts with other customers
        </p>
        <button
          type="button"
          class="mt-4 rounded-md border-1 border-gray-300 bg-white px-8 py-3 sm:mb-4 text-sm font-medium text-secondary hover:bg-gray-100 focus:outline-hidden w-full"
        >
          Write a review
        </button>
      </div>
    </div>
    <div class="md:col-span-2 md:pl-10">
      <!---->
      <div>
        <div class="flex items-center gap-4">
          <img
            alt="Emily Selman."
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
            loading="lazy"
            class="aspect-1/1 w-10 rounded-full"
          />
          <div>
            <span class="font-bold text-xs sm:text-sm">Emily Selman</span>
            <div class="flex items-center">
              <StarIcon
                v-for="rating in [0, 1, 2, 3, 4]"
                :key="rating"
                :class="[5 > rating ? 'text-warning' : 'text-gray-200', 'size-3.5 shrink-0']"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <p class="mt-2 italic">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac lorem euismod,
          tincidunt ex ut, elementum nibh.
        </p>
      </div>
      <!---->
      <div class="pt-8 mt-8 border-t-1 border-t-gray-300">
        <div class="flex items-center gap-4">
          <img
            alt="Hector Gibbons"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
            loading="lazy"
            class="aspect-1/1 w-10 rounded-full"
          />
          <div>
            <span class="font-bold text-xs sm:text-sm">Hector Gibbons</span>
            <div class="flex items-center">
              <StarIcon
                v-for="rating in [0, 1, 2, 3, 4]"
                :key="rating"
                :class="[4 > rating ? 'text-warning' : 'text-gray-200', 'size-3.5 shrink-0']"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <p class="mt-2 italic">
          Donec ut sapien at enim vulputate iaculis. Vivamus sit amet justo eget mi facilisis tempus
          ac in risus. Praesent sodales ac mauris ac hendrerit. Aliquam erat volutpat. Quisque
          placerat lectus ut bibendum porttitor.
        </p>
      </div>
      <!---->
      <div class="pt-8 mt-8 border-t-1 border-t-gray-300">
        <div class="flex items-center gap-4">
          <img
            alt="Mark Edwards"
            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            loading="lazy"
            class="aspect-1/1 w-10 rounded-full"
          />
          <div>
            <span class="font-bold text-xs sm:text-sm">Mark Edwards</span>
            <div class="flex items-center">
              <StarIcon
                v-for="rating in [0, 1, 2, 3, 4]"
                :key="rating"
                :class="[3 > rating ? 'text-warning' : 'text-gray-200', 'size-3.5 shrink-0']"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <p class="mt-2 italic">
          Aenean luctus diam elit, ut sodales tellus accumsan id. Etiam nec leo nec lorem sagittis
          euismod. Integer vel est consequat, dignissim ligula non, tempor tellus.
        </p>
      </div>
    </div>
  </div>
</template>
