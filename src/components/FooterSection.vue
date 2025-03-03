<script lang="ts">
export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    subscribe() {
      alert(`Subscribed with email: ${this.email}`)
      this.email = ''
    },
  },
}
</script>

<template>
  <footer class="text-gray-700">
    <div class="mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 pt-8 pb-4">
      <!-- Newsletter Section -->
      <div class="mb-8 text-center">
        <h3 class="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
        <p class="mb-4">Get the latest updates and offers.</p>
        <form @submit.prevent="subscribe" class="flex justify-center max-w-md mx-auto">
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            class="px-4 py-2 rounded-l-md focus:outline-none text-black w-full"
          />
          <button
            type="submit"
            class="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
          >
            Subscribe
          </button>
        </form>
      </div>

      <!-- Grid Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <h4 class="text-lg font-bold mb-4">Company Name</h4>
          <p class="mb-4">Brief description about the company.</p>
          <p>123 Street Name, City, Country</p>
          <p>Phone: (123) 456-7890</p>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-white hover:text-gray-300">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#" class="text-white hover:text-gray-300">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-white hover:text-gray-300">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
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
        <p>&copy; 2023 Company Name. All rights reserved.</p>
        <div class="flex justify-center space-x-4 mt-4">
          <img src="/images/logo/visa.png" alt="Visa" class="h-6" />
          <img src="/images/logo/mastercard.png" alt="Mastercard" class="h-6" />
          <img src="/images/logo/paypal.png" alt="PayPal" class="h-6" />
        </div>
      </div>
    </div>
  </footer>
</template>
