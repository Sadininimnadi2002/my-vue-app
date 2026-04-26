<script setup lang="ts">
import type { Product } from '../types'; // Fulfills "Strictly typed Front-End Architecture" [cite: 8, 15]

// 1. Define Props with strict interfaces to avoid "any" types [cite: 15]
defineProps<{
  product: Product
}>();

// 2. Define Emits to handle the "Detail View" requirement [cite: 22]
defineEmits<{
  (e: 'open-modal', product: Product): void
}>();
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
    <img 
      :src="product.thumbnail" 
      :alt="product.title" 
      class="w-full h-40 object-contain mb-4 bg-gray-50 rounded-lg" 
    />
    
    <div class="flex-grow">
      <span class="text-[10px] font-bold uppercase text-blue-500 tracking-wider">{{ product.category }}</span>
      <h3 class="font-bold text-lg text-gray-900 leading-tight mb-1">{{ product.title }}</h3>
      <p class="text-green-700 font-bold text-xl">${{ product.price }}</p>
    </div>
    
    <button 
      @click="$emit('open-modal', product)"
      class="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
    >
      View Details
    </button>
  </div>
</template>