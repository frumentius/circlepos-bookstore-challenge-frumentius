<script setup lang="ts">
import { computed, ref } from 'vue'

interface ImageItem {
  src: string
  alt: string
}

const props = defineProps<{
  images: ImageItem[]
}>()

const currentIndex = ref(0)

const totalItems = computed(() => props.images.length)

const wrapperStyle = computed(() => {
  let multiplier = 0
  if (totalItems.value > 3) {
    const currentPos = currentIndex.value
    if (currentPos === 0) {
      multiplier = 0
    } else {
      multiplier = currentPos - 1
      if (currentPos === totalItems.value - 1) {
        multiplier = currentPos - 2
      }
    }
  }

  return { transform: `translateX(calc(-10% * ${multiplier}))` }
})

const slideClasses = computed(() => {
  const classes = []
  const totalImages = totalItems.value
  for (let index = 0; index < totalImages; index++) {
    if (index === currentIndex.value) {
      classes.push('carousel-slide-big')
    } else if (
      (currentIndex.value < totalImages - 1 && index === currentIndex.value + 1) ||
      (currentIndex.value === totalImages - 1 && index === currentIndex.value - 1)
    ) {
      classes.push('carousel-slide-medium')
    } else {
      classes.push('carousel-slide-small')
    }
  }
  return classes
})

/*
function next() {
  if (currentIndex.value < totalItems.value - 1) {
    currentIndex.value++
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
*/

function goto(idx: number) {
  currentIndex.value = idx
}
</script>

<template>
  <div :class="['material-carousel']">
    <!-- Carousel slides -->
    <div class="carousel-wrapper" :style="wrapperStyle">
      <div
        v-for="(image, index) in props.images"
        :key="index"
        :class="['carousel-slide', slideClasses[index]]"
        @click="goto(index)"
      >
        <div class="image-container">
          <img :src="image.src" :alt="image.alt" class="rounded-3xl" />
        </div>
      </div>
    </div>

    <!-- Navigation buttons -->
    <!--
    <button class="carousel-control prev" @click="prev" :disabled="currentIndex === 0">
      <span class="material-icons">chevron_left</span>
    </button>
    <button class="carousel-control next" @click="next" :disabled="currentIndex === totalItems - 1">
      <span class="material-icons">chevron_right</span>
    </button>
  --></div>
</template>

<style scoped>
.material-carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel-wrapper {
  display: flex;
  aspect-ratio: 5 / 2;
  transition: transform 0.4s ease;
}

.carousel-slide {
  flex: 0 0 auto;
  padding: 0 8px;
  height: 100%;
  transition: width 0.3s ease;
}

.carousel-slide-big {
  width: 60%;
}

.carousel-slide-medium {
  width: 30%;
}

.carousel-slide-small {
  width: 10%;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 10px;
  cursor: pointer;
  color: white;
}

.carousel-control:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}
</style>
