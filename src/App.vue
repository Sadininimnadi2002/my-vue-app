<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'; // Added 'computed'
import type { Product, ProductResponse } from './types';

const products = ref<Product[]>([]);
const loading = ref(true);
const searchQuery = ref(''); // New: holds what the user types

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

// New: This list updates automatically whenever 'searchQuery' changes
const filteredProducts = computed(() => {
  return products.value.filter(product => 
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <header class="text-center mb-10">
      <h1 class="text-4xl font-extrabold text-gray-800">Sadini's Gadget Store</h1>
      <p class="text-gray-500 mt-2">Find the best tech at the best prices</p>
      
      <div class="mt-6 max-w-md mx-auto">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search for a product (e.g. iPhone)..." 
          class="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        <p v-if="searchQuery" class="mt-2 text-sm text-gray-400">
          Showing results for: "{{ searchQuery }}"
        </p>
      </div>
    </header>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-600 font-semibold">Searching the warehouse...</p>
    </div>

    <div v-else>
      <div v-if="filteredProducts.length === 0" class="text-center py-20">
        <p class="text-xl text-gray-500">No products found matching your search.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="product in filteredProducts" :key="product.id" 
             class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover" />
          <div class="p-4">
            <span class="text-xs font-bold uppercase text-blue-500">{{ product.category }}</span>
            <h2 class="text-lg font-bold text-gray-800 truncate">{{ product.title }}</h2>
            <p class="text-gray-600 text-sm h-12 overflow-hidden">{{ product.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-xl font-bold text-green-600">${{ product.price }}</span>
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
