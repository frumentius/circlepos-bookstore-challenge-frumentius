<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')

function subscribe() {
  if (email.value !== '') {
    alert('Subscribed with email: ' + email.value)
    email.value = ''
  }
}

const d = new Date()
</script>

<template>
  <footer class="text-gray-700">
    <div class="mt-16 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 pb-4">
      <!-- Grid Section -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 pt-8 border-t border-gray-300">
        <!-- Newsletter Section -->
        <div class="md:col-span-2">
          <h3 class="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
          <p class="mb-4">Get the latest updates and offers.</p>
          <form @submit.prevent="subscribe" class="flex max-w-md">
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email"
              class="block w-full rounded-md bg-white px-3 mr-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
            <button
              type="submit"
              class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Subscribe
            </button>
          </form>
        </div>

        <!-- Shop Links -->
        <div>
          <h4 class="text-lg font-bold mb-4">Shop</h4>
          <ul class="space-y-2">
            <li><a href="#" class="hover:underline">Category 1</a></li>
            <li><a href="#" class="hover:underline">Category 2</a></li>
            <li><a href="#" class="hover:underline">Category 3</a></li>
          </ul>
        </div>

        <!-- About Links -->
        <div>
          <h4 class="text-lg font-bold mb-4">About</h4>
          <ul class="space-y-2">
            <li><a href="#" class="hover:underline">About Us</a></li>
            <li><a href="#" class="hover:underline">Careers</a></li>
            <li><a href="#" class="hover:underline">Blog</a></li>
          </ul>
        </div>

        <!-- Help Links -->
        <div>
          <h4 class="text-lg font-bold mb-4">Help</h4>
          <ul class="space-y-2">
            <li><a href="#" class="hover:underline">FAQ</a></li>
            <li><a href="#" class="hover:underline">Contact Us</a></li>
            <li><a href="#" class="hover:underline">Shipping & Returns</a></li>
          </ul>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="mt-8 pt-8 border-t border-gray-300 text-center">
        <p>&copy;{{ d.getFullYear() }} Circlepos Front-end Challenge. All rights reserved.</p>
        <div class="flex justify-center space-x-4 mt-4">
          <img src="/images/logo/visa.png" alt="Visa" class="h-4" />
          <img src="/images/logo/mastercard.png" alt="Mastercard" class="h-4" />
          <img src="/images/logo/paypal.png" alt="PayPal" class="h-4" />
        </div>
      </div>
    </div>
  </footer>
</template>
