<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import ShoppingCart from './ShoppingCart.vue'

const navigation = {
  categories: [
    {
      id: 'book',
      name: 'Books',
      featured: [
        {
          name: 'Best Sellers',
          href: '#',
          imageSrc: '/images/carousel/carousel 1.jpg',
          imageAlt: 'Black Book Sparkly',
        },
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: '/images/carousel/carousel 6.jpg',
          imageAlt: 'Woman holding a book',
        },
      ],
      sections: [
        {
          id: 'cat1',
          name: 'Category 1',
          items: [
            { name: 'Lorem', href: '#' },
            { name: 'Ipsum', href: '#' },
            { name: 'Dolor', href: '#' },
            { name: 'Sit', href: '#' },
            { name: 'Amet', href: '#' },
            { name: 'Adspicing', href: '#' },
            { name: 'Consectetur', href: '#' },
            { name: 'Elit', href: '#' },
            { name: 'Nulia pretium', href: '#' },
          ],
        },
        {
          id: 'cat2',
          name: 'Category 2',
          items: [
            { name: 'Est nec', href: '#' },
            { name: 'Tincidunt', href: '#' },
            { name: 'Porttitor', href: '#' },
            { name: 'Felis sem', href: '#' },
            { name: 'Lobortis', href: '#' },
            { name: 'Erat', href: '#' },
          ],
        },
        {
          id: 'cat 3',
          name: 'Category 3',
          items: [
            { name: 'Sed interdum', href: '#' },
            { name: 'Enim', href: '#' },
            { name: 'Justo', href: '#' },
            { name: 'Luctus', href: '#' },
            { name: 'Faucibus', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'ebook',
      name: 'e-Book',
      featured: [
        {
          name: 'Best Sellers',
          href: '#',
          imageSrc: '/images/carousel/carousel 4.jpg',
          imageAlt: 'Graphic Design',
        },
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: '/images/carousel/carousel 7.jpg',
          imageAlt: 'New England',
        },
      ],
      sections: [
        {
          id: 'cat4',
          name: 'Category 4',
          items: [
            { name: 'Maecenas', href: '#' },
            { name: 'Pulvinar', href: '#' },
            { name: 'Integer', href: '#' },
            { name: 'Dictum', href: '#' },
            { name: 'Metus', href: '#' },
            { name: 'Viberra', href: '#' },
            { name: 'Urna ut', href: '#' },
          ],
        },
        {
          id: 'cat5',
          name: 'Category 5',
          items: [
            { name: 'Fermentum', href: '#' },
            { name: 'Posuere', href: '#' },
            { name: 'Placerat', href: '#' },
            { name: 'Vel rutrum', href: '#' },
            { name: 'Quam', href: '#' },
            { name: 'Ligula vel', href: '#' },
          ],
        },
        {
          id: 'cat 6',
          name: 'Category 6',
          items: [
            { name: 'Nam portitor', href: '#' },
            { name: 'Fusce', href: '#' },
            { name: 'Maximus', href: '#' },
            { name: 'Phasellus', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

const shoppingBag = useCartStore()
const open = ref(false)
const isCartOpen = ref(false)

// Function to open the cart
const openCart = () => {
  isCartOpen.value = true
}

// Function to close the cart
const closeCart = () => {
  isCartOpen.value = false
}
</script>

<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  @click="open = false"
                >
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="size-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab
                      as="template"
                      v-for="category in navigation.categories"
                      :key="category.name"
                      v-slot="{ selected }"
                    >
                      <button
                        :class="[
                          selected
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-700',
                          'flex-1 border-b-2 px-1 py-4 text-base font-medium whitespace-nowrap',
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel
                    v-for="category in navigation.categories"
                    :key="category.name"
                    class="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div class="grid grid-cols-2 gap-x-4">
                      <div
                        v-for="item in category.featured"
                        :key="item.name"
                        class="group relative text-sm"
                      >
                        <img
                          :src="item.imageSrc"
                          :alt="item.imageAlt"
                          class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          loading="lazy"
                        />
                        <a :href="item.href" class="mt-6 block font-medium text-gray-700">
                          <span class="absolute inset-0 z-10" aria-hidden="true" />
                          {{ item.name }}
                        </a>
                        <p aria-hidden="true" class="mt-1">Shop now</p>
                      </div>
                    </div>
                    <div v-for="section in category.sections" :key="section.name">
                      <p
                        :id="`${category.id}-${section.id}-heading-mobile`"
                        class="font-medium text-gray-700"
                      >
                        {{ section.name }}
                      </p>
                      <ul
                        role="list"
                        :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                        class="mt-6 flex flex-col space-y-6"
                      >
                        <li v-for="item in section.items" :key="item.name" class="flow-root">
                          <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{
                            item.name
                          }}</a>
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-700">{{
                    page.name
                  }}</a>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-700">Sign in</a>
                </div>
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-700">Create account</a>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <p
        class="flex h-10 items-center justify-center px-4 text-sm font-medium text-white sm:px-6 lg:px-8 bg-primary"
      >
        Get free delivery on orders over $100
      </p>

      <nav aria-label="Top" class="mx-auto pr-3 sm:px-6 lg:px-8">
        <div class="">
          <div class="flex h-16 items-center">
            <button
              type="button"
              class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              @click="open = true"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="size-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <RouterLink to="/">
                <span class="sr-only">Your Company</span>
                <img
                  class="h-8 w-auto"
                  src="/images/logo/circlepos.png"
                  loading="lazy"
                  alt="Circlepos"
                />
              </RouterLink>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <Popover
                  v-for="category in navigation.categories"
                  :key="category.name"
                  class="flex"
                  v-slot="{ open }"
                >
                  <div class="relative flex">
                    <PopoverButton
                      :class="[
                        open
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-700 hover:text-gray-800',
                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                      ]"
                      >{{ category.name }}</PopoverButton
                    >
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <PopoverPanel class="absolute inset-x-0 top-full text-sm text-gray-500 z-50">
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div class="absolute inset-0 top-1/2 bg-white shadow-sm" aria-hidden="true" />

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-6xl px-8">
                          <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div
                                v-for="item in category.featured"
                                :key="item.name"
                                class="group relative text-base sm:text-sm"
                              >
                                <img
                                  :src="item.imageSrc"
                                  :alt="item.imageAlt"
                                  loading="lazy"
                                  class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                />
                                <a :href="item.href" class="mt-6 block font-medium text-gray-700">
                                  <span class="absolute inset-0 z-10" aria-hidden="true" />
                                  {{ item.name }}
                                </a>
                                <p aria-hidden="true" class="mt-1">Shop now</p>
                              </div>
                            </div>
                            <div class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                              <div v-for="section in category.sections" :key="section.name">
                                <p
                                  :id="`${section.name}-heading`"
                                  class="font-medium text-gray-700"
                                >
                                  {{ section.name }}
                                </p>
                                <ul
                                  role="list"
                                  :aria-labelledby="`${section.name}-heading`"
                                  class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                >
                                  <li v-for="item in section.items" :key="item.name" class="flex">
                                    <a :href="item.href" class="hover:text-gray-800">{{
                                      item.name
                                    }}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <a
                  v-for="page in navigation.pages"
                  :key="page.name"
                  :href="page.href"
                  class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >{{ page.name }}</a
                >
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Sign in</a
                >
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Create account</a
                >
              </div>

              <!-- Search -->
              <div class="flex lg:ml-6">
                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <MagnifyingGlassIcon class="size-6" aria-hidden="true" />
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <div @click="openCart" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {{ shoppingBag.totalItems }}
                  </span>
                  <span class="sr-only">items in cart, view bag</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
  <ShoppingCart @close-cart="closeCart" :isCartOpen="isCartOpen" />
</template>
