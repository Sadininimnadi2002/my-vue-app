<script setup lang="ts">
// Requirement #2: Strict Typing (Ensures no "any" types)
defineProps<{
  searchQuery: string;
}>();

// Defining explicit types for emits for better TypeScript support
const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void;
  (e: 'filter-category', category: string): void;
}>();

// Requirement #5: Category list for filtering
const categories = ['all', 'beauty', 'fragrances', 'furniture', 'groceries'];
</script>

<template>
  <div class="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-4 px-4">
    <div class="relative flex-grow">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      <input 
        :value="searchQuery"
        @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        type="text" 
        placeholder="Search gadgets..." 
        class="w-full pl-10 p-3 rounded-xl border dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm" 
      />
    </div>

    <div class="relative">
      <select 
        @change="emit('filter-category', ($event.target as HTMLSelectElement).value)"
        class="w-full md:w-48 p-3 rounded-xl border dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer appearance-none shadow-sm"
      >
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
        </option>
      </select>
      <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</span>
    </div>
  </div>
</template>