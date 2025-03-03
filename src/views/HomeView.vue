<script setup lang="ts">
import BannerStyle1 from '@/components/BannerStyle1.vue'
import MainCarousel from '@/components/MainCarousel.vue'
import ProductList from '@/components/ProductList.vue'
</script>

<template>
  <div class="mx-auto max-w-2xl pt-8 px-4 sm:px-6 lg:max-w-6xl lg:px-8">
    <MainCarousel
      :images="[
        {
          src: '/images/carousel/carousel 1.jpg',
          alt: 'Image 1',
        },
        {
          src: '/images/carousel/carousel 2.jpg',
          alt: 'Image 2',
        },
        {
          src: '/images/carousel/carousel 3.jpg',
          alt: 'Image 3',
        },
        {
          src: '/images/carousel/carousel 4.jpg',
          alt: 'Image 4',
        },
        {
          src: '/images/carousel/carousel 5.jpg',
          alt: 'Image 5',
        },
        {
          src: '/images/carousel/carousel 6.jpg',
          alt: 'Image 6',
        },
        {
          src: '/images/carousel/carousel 7.jpg',
          alt: 'Image 7',
        },
        {
          src: '/images/carousel/carousel 8.jpg',
          alt: 'Image 8',
        },
        {
          src: '/images/carousel/carousel 9.jpg',
          alt: 'Image 9',
        },
      ]"
    />
    <ProductList />
    <BannerStyle1 />
  </div>
</template>
