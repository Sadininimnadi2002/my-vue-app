<script setup lang="ts">
import type { Product } from '../types';

defineProps<{ product: Product }>();
defineEmits(['open-modal']);
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border dark:border-gray-700 flex flex-col justify-between h-full transition-colors duration-300">
    <img :src="product.thumbnail" class="w-full h-40 object-contain mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg" />
    <div class="flex-grow">
      <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ product.title }}</h3>
      <p class="text-green-600 dark:text-green-400 font-bold text-xl">${{ product.price }}</p>
    </div>
    <button @click="$emit('open-modal', product)" class="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
      View Details
    </button>
  </div>
</template>