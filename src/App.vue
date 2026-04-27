<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product, ProductResponse } from './types';
import ProductCard from './components/productcard.vue';

const products = ref<Product[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedProduct = ref<Product | null>(null);
const isDark = ref(false);
const cartCount = ref(0);

// FIXED: Added the missing closing bracket }
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', isDark.value);
}; // <--- This was missing!

const fetchProducts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data: ProductResponse = await res.json();
    products.value = data.products;
  } finally {
    loading.value = false;
  }
};

const filteredProducts = computed(() => {
  // Safety check: if products hasn't loaded yet, return empty list
  if (!products.value) return [];
  return products.value.filter(p => 
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-6">
    <header class="max-w-6xl mx-auto mb-10 flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border dark:border-gray-700">
      <h1 class="text-2xl font-black text-blue-600 dark:text-blue-400">SADINI STORE</h1>
      <div class="flex items-center gap-4">
        <button @click="toggleDarkMode" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border dark:border-gray-600">
          {{ isDark ?  '☀️ Light' : '🌙 Dark'}}
        </button>
        <div class="font-bold dark:text-white">🛒 Cart: {{ cartCount }}</div>
      </div>
    </header>

    <div class="max-w-md mx-auto mb-10">
      <input v-model="searchQuery" type="text" placeholder="Search gadgets..." class="w-full p-3 rounded-xl border dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div v-if="loading" class="text-center dark:text-white">Loading...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" @open-modal="selectedProduct = p" />
    </div>

    <div v-if="selectedProduct" class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" @click.self="selectedProduct = null">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl">
        <button @click="selectedProduct = null" class="absolute top-4 right-4 dark:text-white text-xl">✕</button>
        <img :src="selectedProduct.thumbnail" class="w-full h-48 object-contain" />
        <h2 class="text-2xl font-bold dark:text-white mt-4">{{ selectedProduct.title }}</h2>
        <p class="text-gray-600 dark:text-gray-300 mt-2">{{ selectedProduct.description }}</p>
        <button @click="cartCount++; selectedProduct = null" class="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          Add to Cart - ${{ selectedProduct.price }}
        </button>
      </div>
    </div>
  </div>
</template>