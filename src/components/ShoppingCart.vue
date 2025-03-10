<script setup lang="ts">
import { computed, defineEmits } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CreditCardIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  isCartOpen: {
    type: Boolean,
    required: true,
  },
})

const open = computed(() => props.isCartOpen)
const emits = defineEmits(['close-cart'])
const close = () => emits('close-cart')

const shoppingBag = useCartStore()

const router = useRouter()
const checkoutStore = useCheckoutStore()

const initiateCheckout = () => {
  checkoutStore.startCheckout(shoppingBag.items)
  router.replace('/checkout')
}
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden text-gray-700">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium">Shopping cart</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="close"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="size-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div v-if="shoppingBag.totalItems > 0" class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li
                            v-for="product in shoppingBag.items"
                            :key="product.id"
                            class="flex py-6"
                          >
                            <img
                              :src="'/images/product/thumbnail/book ' + product.id + '.jpg'"
                              :alt="product.title"
                              class="w-18 rounded-md aspect-2/3 object-cover"
                            />

                            <div class="ml-4 flex flex-1 flex-col">
                              <div class="flex justify-between text-base font-medium">
                                <h3 class="text-gray-700">
                                  <RouterLink :to="'/product/' + product.id">
                                    {{ product.title }}
                                  </RouterLink>
                                </h3>
                                <p class="ml-4 text-gray-900">
                                  NZ&dollar;{{ product.price * product.quantity }}
                                </p>
                              </div>

                              <div class="flex flex-1 items-end justify-between text-sm">
                                <p class="text-gray-500">Qty: {{ product.quantity }}</p>

                                <div class="flex">
                                  <button
                                    type="button"
                                    class="font-medium text-danger hover:text-danger flex items-center"
                                    @click="shoppingBag.removeItem(product.id)"
                                  >
                                    <span class="sr-only">Remove item</span>
                                    <TrashIcon class="size-3.5" aria-hidden="true" />
                                    remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div v-else>No item in shopping bag.</div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>NZ&dollar;{{ shoppingBag.totalPrice }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div v-if="shoppingBag.totalItems > 0" class="mt-6">
                      <button
                        type="button"
                        @click="initiateCheckout"
                        class="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-primary w-full"
                      >
                        <CreditCardIcon class="size-4.5" aria-hidden="true" />&nbsp;Checkout
                      </button>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        <span v-if="shoppingBag.totalItems > 0">or&nbsp;</span>
                        <button
                          type="button"
                          class="font-medium text-primary hover:text-primary"
                          @click="close"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
