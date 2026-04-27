<script setup lang="ts">
// 1. Import the Global State logic
import { useCart } from '../composables/useCart';

// 2. Props now only handle UI state (Dark Mode)
defineProps<{
  isDark: boolean;
}>();

// 3. Emits handle the toggle action
const emit = defineEmits(['toggle-dark']);

// 4. Access the global cart count directly from the "Brain"
const { cartCount } = useCart();
</script>

<template>
  <header class="max-w-6xl mx-auto mb-10 flex justify-between items-center p-4 rounded-2xl shadow-sm border bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
    <h1 class="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">
      SADINI STORE
    </h1>

    <div class="flex items-center gap-4">
      <button 
        @click="emit('toggle-dark')" 
        class="p-2 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white border dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-medium"
      >
        {{ isDark ? '☀️ Light' : '🌙 Dark' }}
      </button>

      <div class="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800 transition-all">
        <span class="text-xl">🛒</span>
        <span class="font-bold text-blue-700 dark:text-blue-300">
          Cart: {{ cartCount }}
        </span>
      </div>
    </div>
  </header>
</template>