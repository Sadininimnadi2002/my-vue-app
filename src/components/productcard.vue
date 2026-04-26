<script setup>
// This receives the gadget data from the main page
const props = defineProps(['product']);
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
    <img :src="product.thumbnail" class="w-full h-40 object-contain mb-4" />
    <h3 class="font-bold text-lg text-gray-800">{{ product.title }}</h3>
    <p class="text-blue-600 font-semibold">${{ product.price }}</p>
    
    <button 
      @click="$emit('open-modal', product)"
      class="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
    >
      View Details
    </button>
  </div>
</template>