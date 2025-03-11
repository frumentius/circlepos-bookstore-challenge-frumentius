<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import { LockClosedIcon } from '@heroicons/vue/20/solid'

import { processCheckout } from '@/composables/useCheckout'
import { useCheckoutStore } from '@/stores/checkout'

const router = useRouter()
const checkoutStore = useCheckoutStore()

onBeforeUnmount(() => {
  checkoutStore.clearCheckout()
})

onMounted(() => {
  if (!checkoutStore.sessionId) {
    router.replace('/')
  }
})

const taxValue = computed(() => checkoutStore.totalPrice * 0.15)
const shippingCost = 10

const formElement = ref()
const isLoading = ref(false)
const d = new Date()

const checkoutSubmit = (e: Event) => {
  e.preventDefault()
  isLoading.value = true
  processCheckout(checkoutStore.items)
    .then(() => {
      if (formElement.value) formElement.value.reset()
      router.replace('/checkout/success')
      isLoading.value = false
    })
    .catch((err: Error) => {
      alert(err)
      isLoading.value = false
    })
}
</script>

<template>
  <div class="bg-checkout text-gray-700">
    <div class="block md:hidden bg-white">
      <div class="mx-auto max-w-2xl px-6 py-6">
        <img class="w-6" src="/images/logo/circlepos.png" loading="lazy" alt="Circlepos" />
      </div>
    </div>
    <div class="mx-auto md:max-w-2xl lg:max-w-6xl md:grid md:grid-cols-5 md:gap-4">
      <div class="md:col-span-2 text-sm/6 font-medium bg-gray-100 px-6 pt-6 pb-10">
        <h2 class="block md:hidden text-2xl">Your Order</h2>
        <div class="text-sm/4 font-normal italic text-gray-500 pb-10 text-justify">
          For now only the first item will be checked out due to the limitation of the Back-end API.
          The API doesn't have support for bulk purchase.
        </div>
        <div v-if="checkoutStore.totalItems > 0" class="flow-root pb-10">
          <ul role="list" class="-my-6 divide-y divide-gray-300">
            <li
              v-for="product in checkoutStore.items"
              :key="product.id"
              class="flex justify-between py-6"
            >
              <div class="mr-4">
                <h3>
                  <RouterLink :to="'/product/' + product.id">
                    {{ product.title }}
                  </RouterLink>
                </h3>
                <p>NZ&dollar;{{ product.price * product.quantity }}</p>
                <p class="text-gray-500">Qty: {{ product.quantity }}</p>
              </div>
              <img
                :src="'/images/product/thumbnail/book ' + product.id + '.jpg'"
                :alt="product.title"
                loading="lazy"
                class="w-18 rounded-md aspect-2/3 object-cover"
              />
            </li>
          </ul>
        </div>

        <div class="border-t-1 border-t-gray-300 pb-5">
          <div class="flex flex-1 items-end justify-between pt-4">
            <div class="text-gray-500">Subtotal</div>
            <div>NZ&dollar;{{ checkoutStore.totalPrice.toFixed(2) }}</div>
          </div>
          <div class="flex flex-1 items-end justify-between pt-4">
            <div class="text-gray-500">Taxes</div>
            <div>NZ&dollar;{{ taxValue.toFixed(2) }}</div>
          </div>
          <div class="flex flex-1 items-end justify-between pt-4">
            <div class="text-gray-500">Shipping</div>
            <div>NZ&dollar;{{ shippingCost.toFixed(2) }}</div>
          </div>
        </div>
        <div class="border-t-1 border-t-gray-300">
          <div class="flex flex-1 items-end justify-between pt-4 text-lg">
            <div>Total</div>
            <div>
              NZ&dollar;{{ (checkoutStore.totalPrice + taxValue + shippingCost).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
      <div class="md:col-span-3 bg-white px-6 sm:px-10 md:px-16 lg:px-20 py-10">
        <img
          class="hidden md:block w-8 mb-16"
          src="/images/logo/circlepos.png"
          loading="lazy"
          alt="Circlepos"
        />
        <form ref="formElement" @submit="checkoutSubmit($event)">
          <button
            type="button"
            class="rounded-md bg-warning px-8 py-3 text-sm sm:text-xs lg:text-sm font-medium hover:bg-warning focus:outline-hidden w-full"
          >
            <img
              class="mx-auto h-5"
              src="/images/logo/paypal.png"
              loading="lazy"
              alt="Pay with PayPal"
            />
          </button>
          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t-1 border-t-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white px-4 text-sm text-gray-500">or</span>
            </div>
          </div>
          <div class="space-y-12">
            <div class="pb-12">
              <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="col-span-full">
                  <label for="name-on-card" class="block text-sm/6 font-medium">Name on card</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="name-on-card"
                      id="name-on-card"
                      autocomplete="cc-name"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>
                <div class="col-span-full">
                  <label for="email" class="block text-sm/6 font-medium">Email address</label>
                  <div class="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>
                <div class="col-span-full">
                  <label for="card-number" class="block text-sm/6 font-medium">Card number</label>
                  <div class="mt-2">
                    <input
                      id="card-number"
                      name="card-number"
                      type="text"
                      autocomplete="cc-number"
                      inputmode="numeric"
                      pattern="[0-9\s]{13,19}"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>
                <div class="sm:col-span-4">
                  <label class="block text-sm/6 font-medium">Expiration date</label>
                  <div class="mt-2 grid grid-cols-9">
                    <div class="col-span-4">
                      <label for="card-exp-month" class="sr-only">Month</label>
                      <input
                        id="card-exp-month"
                        name="card-exp-month"
                        type="text"
                        autocomplete="cc-exp-month"
                        inputmode="numeric"
                        pattern="(0[1-9]|1[0-2])"
                        placeholder="MM"
                        maxlength="2"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                        required
                        :disabled="isLoading"
                      />
                    </div>
                    <div class="col-span-1 text-center">/</div>
                    <div class="col-span-4">
                      <label for="card-exp-year" class="sr-only">Year</label>
                      <input
                        id="card-exp-year"
                        name="card-exp-year"
                        type="text"
                        autocomplete="cc-exp-year"
                        inputmode="numeric"
                        pattern="(2[5-9])"
                        placeholder="YY"
                        maxlength="2"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                        required
                        :disabled="isLoading"
                      />
                    </div>
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="card-cvv" class="block text-sm/6 font-medium">CVV</label>
                  <div class="mt-2">
                    <input
                      id="card-cvv"
                      name="card-cvv"
                      type="password"
                      autocomplete="cc-csc"
                      inputmode="numeric"
                      pattern="\d{3,4}"
                      maxlength="4"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>
                <div class="col-span-full">
                  <label for="street-address" class="block text-sm/6 font-medium">
                    Street address
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autocomplete="street-address"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>
                <div class="col-span-full">
                  <label for="country" class="block text-sm/6 font-medium">Country</label>
                  <div class="mt-2 grid grid-cols-1">
                    <select
                      id="country"
                      name="country"
                      autocomplete="country-name"
                      class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      required
                      :disabled="isLoading"
                    >
                      <option value="" disabled selected></option>
                      <option value="AU">Australia</option>
                      <option value="CA">Canada</option>
                      <option value="CN">China, People's republic of</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="MX">Mexico</option>
                      <option value="NZ">New Zealand</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                    </select>
                    <ChevronDownIcon
                      class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2 sm:col-start-1">
                  <label for="city" class="block text-sm/6 font-medium">City</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autocomplete="address-level2"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="region" class="block text-sm/6 font-medium">State / Province</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autocomplete="address-level1"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label for="postal-code" class="block text-sm/6 font-medium">
                    ZIP / Postal code
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autocomplete="postal-code"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>
                <div class="col-span-full">
                  <div class="flex gap-3">
                    <div class="flex h-6 shrink-0 items-center">
                      <div class="group grid size-4 grid-cols-1">
                        <input
                          id="some-checkbox"
                          name="some-checkbox"
                          type="checkbox"
                          checked
                          class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          :disabled="isLoading"
                        />
                        <!-- svg for checkbox stroke -->
                        <svg
                          class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            class="opacity-0 group-has-checked:opacity-100"
                            d="M3 8L6 11L11 3.5"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            class="opacity-0 group-has-indeterminate:opacity-100"
                            d="M3 7H11"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="text-sm/6">
                      <label for="some-checkbox" class="font-medium">
                        Lorem ipsum dolor sit amet adspicing consectetur.
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-span-full">
                  <button
                    type="submit"
                    class="flex items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-sm font-bold text-white hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-hidden w-full"
                    :disabled="isLoading"
                  >
                    <span v-if="!isLoading">
                      Pay&nbsp;NZ&dollar;{{
                        (checkoutStore.totalPrice + taxValue + shippingCost).toFixed(2)
                      }}
                    </span>
                    <svg
                      v-else
                      class="animate-spin h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="col-span-full">
                  <div class="flex justify-center text-gray-500 text-sm">
                    <LockClosedIcon class="size-4.5" />
                    <div>&nbsp;Fusce faucibus neque sapien et condimentum turpis commodo.</div>
                  </div>
                  <div class="flex justify-center space-x-2 mt-2">
                    <img src="/images/logo/visa.png" alt="Visa" class="h-4" loading="lazy" />
                    <img
                      src="/images/logo/mastercard.png"
                      alt="Mastercard"
                      class="h-4"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="mt-16 text-center">
          <p class="text-sm">
            &copy;{{ d.getFullYear() }} <a href="https://webtech.id" target="_blank">Frumentius</a>.
            Circlepos front-end bookstore challenge.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.bg-checkout {
  background-color: white; /* For browsers that do not support gradients */
  background-image: linear-gradient(
    to right,
    oklch(0.967 0.003 264.542) 20%,
    white 30%,
    white 100%
  );
}
</style>
