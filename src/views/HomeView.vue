<script setup lang="ts">
import { ref } from 'vue'
import BannerStyle1 from '@/components/BannerStyle1.vue'
import MultiBrowseCarousel from '@/components/MultiBrowseCarousel.vue'
import BestSellerHorizontalBookList from '@/views/features/BestSellerHorizontalBookList.vue'
import ChartsBookList from '@/views/features/ChartsBookList.vue'
import NewArrivalHorizontalBookList from '@/views/features/NewArrivalHorizontalBookList.vue'
import RomanceHorizontalBookList from '@/views/features/RomanceHorizontalBookList.vue'
import SciFiFantasyHorizontalBookList from '@/views/features/SciFiFantasyHorizontalBookList.vue'
import HeroCarousel from '@/components/HeroCarousel.vue'

const carouselImages = ref([
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
])
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-6xl lg:px-8">
    <div class="block md:hidden">
      <HeroCarousel :images="carouselImages" />
    </div>
    <div class="hidden md:block pt-6">
      <MultiBrowseCarousel :images="carouselImages" />
    </div>
    <div class="pt-6 md:pt-14">
      <BestSellerHorizontalBookList />
    </div>
    <div class="pt-6 md:pt-14">
      <NewArrivalHorizontalBookList />
    </div>
    <div class="pt-6 md:pt-14">
      <BannerStyle1 />
    </div>
    <div class="pt-6 md:pt-14">
      <RomanceHorizontalBookList />
    </div>
    <div class="pt-6 md:pt-14">
      <SciFiFantasyHorizontalBookList />
    </div>
    <div class="pt-6 md:pt-14">
      <ChartsBookList />
    </div>
  </div>
</template>
