<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product, ProductResponse } from './types';

// 1. Create reactive variables
const products = ref<Product[]>([]);
const loading = ref(true);

// 2. Fetch data from the API
const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data: ProductResponse = await response.json();
    products.value = data.products;
  } catch (error) {
    console.error("Failed to load products:", error);
  } finally {
    loading.value = false;
  }
};

// 3. Run fetch when the app starts
onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <header class="text-center mb-10">
      <h1 class="text-4xl font-extrabold text-gray-800">Sadini's Gadget Store</h1>
      <p class="text-gray-500 mt-2">Find the best tech at the best prices</p>
    </header>

    <div v-if="loading" class="text-center text-xl font-semibold">
      Searching the warehouse...
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" 
           class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover" />
        <div class="p-4">
          <span class="text-xs font-bold uppercase text-blue-500">{{ product.category }}</span>
          <h2 class="text-lg font-bold text-gray-800 truncate">{{ product.title }}</h2>
          <p class="text-gray-600 text-sm h-12 overflow-hidden">{{ product.description }}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-xl font-bold text-green-600">${{ product.price }}</span>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
