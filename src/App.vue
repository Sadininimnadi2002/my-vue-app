<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product, ProductResponse } from './types';
import ProductCard from './components/productcard.vue';
import NavBar from './components/navbar.vue';
import FilterBar from './components/filterbar.vue';
import { useCart } from './composables/useCart';

// 1. Global State from Composable (Bonus Requirement Met)
const { addToCart } = useCart();

// 2. Local State
const products = ref<Product[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('all');
const selectedProduct = ref<Product | null>(null);
const isDark = ref(false);

/**
 * Requirement #5: Data Interaction - Fetching
 */
const fetchProducts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products');
    if (!res.ok) throw new Error('Network response was not ok');
    const data: ProductResponse = await res.json();
    products.value = data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
};

/**
 * Requirement #5: Data Interaction - Search & Filter
 * Uses computed logic to handle both inputs simultaneously.
 */
const filteredProducts = computed(() => {
  if (!products.value) return [];
  
  return products.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'all' || p.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

/**
 * Bonus Feature: Dark Mode persistence
 */
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', theme);
};

onMounted(() => {
  fetchProducts();
  
  // Persist theme choice across reloads
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-6">
    
    <NavBar :is-dark="isDark" @toggle-dark="toggleDarkMode" />

    <FilterBar 
      v-model:searchQuery="searchQuery" 
      @filter-category="(cat) => selectedCategory = cat" 
    />

    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px]">
       <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
       <p class="dark:text-white font-medium animate-pulse">Loading gadgets...</p>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="text-center py-20">
      <p class="text-gray-500 dark:text-gray-400 text-xl font-semibold">
        No gadgets match your selection.
      </p>
      <button @click="searchQuery = ''; selectedCategory = 'all'" class="mt-4 text-blue-600 hover:underline">
        Clear all filters
      </button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      <ProductCard 
        v-for="p in filteredProducts" 
        :key="p.id" 
        :product="p" 
        @open-modal="selectedProduct = p" 
      />
    </div>

    <Transition name="fade">
      <div 
        v-if="selectedProduct" 
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" 
        @click.self="selectedProduct = null"
      >
        <div class="bg-white dark:bg-gray-800 p-8 rounded-3xl max-w-lg w-full relative shadow-2xl transform transition-all border dark:border-gray-700">
          <button 
            @click="selectedProduct = null" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl"
          >
            ✕
          </button>
          
          <div class="flex flex-col items-center">
            <div class="w-full bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 flex justify-center">
              <img 
                :src="selectedProduct.thumbnail" 
                :alt="selectedProduct.title"
                class="h-64 object-contain drop-shadow-lg" 
              />
            </div>
            <h2 class="text-3xl font-bold dark:text-white mt-6 text-center leading-tight">
              {{ selectedProduct.title }}
            </h2>
            <div class="flex gap-3 mt-3">
              <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase">
                {{ selectedProduct.category }}
              </span>
              <span class="text-yellow-500 font-bold">⭐ {{ selectedProduct.rating }}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mt-6 text-center leading-relaxed">
              {{ selectedProduct.description }}
            </p>
          </div>

          <button 
            @click="addToCart(selectedProduct!); selectedProduct = null" 
            class="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
          >
            Add to Cart — ${{ selectedProduct.price }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>