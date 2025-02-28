<script setup lang="ts">
import MainCarousel from '../components/MainCarousel.vue'
</script>

<template>
  <MainCarousel
    :images="[
      {
        src: 'https://wowslider.com/sliders/demo-93/data1/images/lake.jpg',
        alt: 'Image 1',
      },
      {
        src: 'https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190207/examples/carousel/carousel-1/images/lands-endslide__800x600.jpg',
        alt: 'Image 2',
      },
      { src: 'https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg', alt: 'Image 3' },
      { src: 'https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg', alt: 'Image 4' },
      {
        src: 'https://soliloquywp.com/wp-content/uploads/2017/10/fullwidth-image-slider-in-wordpress.jpg',
        alt: 'Image 5',
      },
    ]"
  />
</template>
