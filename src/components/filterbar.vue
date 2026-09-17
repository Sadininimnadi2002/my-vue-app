<template>
  <!-- Full Width Wrapper. No 'sticky' classes so it scrolls away naturally! -->
  <div class="filterbar-wrapper w-full py-4transition-colors duration-300">
    
    <!-- Edge-to-edge container with padding, fully justified -->
    <div class="w-full px-4 md:px-8 lg:px-12 mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">

      <!-- LEFT: Search Bar -->
      <div class="search-wrap relative w-full lg:w-80 flex-shrink-0">
        <svg class="search-icon absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="search-input w-full pl-14 pr-12 py-3 rounded-full text-base outline-none transition-all duration-200"
          @input="$emit('search', searchQuery)"
        />
        <button
          v-if="searchQuery"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors"
          @click="clearSearch"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <!-- CENTER: Category Pills -->
      <div class="flex items-center justify-center gap-3 overflow-x-auto scrollbar-hide w-full lg:flex-1 px-4">
        <button
          v-for="cat in categories"
          :key="cat.value"
          class="category-pill flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-2"
          :class="selectedCategory === cat.value ? 'pill-active' : 'pill-default'"
          @click="selectCategory(cat.value)"
        >
          <span v-if="cat.icon" class="text-lg drop-shadow-sm">{{ cat.icon }}</span>
          {{ cat.label }}
        </button>
      </div>

      <!-- RIGHT: Modern Sort Select -->
      <div class="flex-shrink-0 w-full lg:w-64 relative">
        <select
          v-model="sortBy"
          class="sort-select w-full py-3 pl-5 pr-12 rounded-full text-base font-semibold outline-none cursor-pointer transition-all duration-200 appearance-none"
          @change="$emit('sort', sortBy)"
        >
          <option value="">Sort by: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Best Deals</option>
        </select>
        <!-- Custom Chevron Arrow -->
        <svg class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  selectedCategory: string
}>()

const emit = defineEmits<{
  search: [query: string]
  filter: [category: string]
  sort: [sortBy: string]
}>()

const searchQuery = ref('')
const sortBy = ref('')

const categories = [
  { value: '', label: 'All', icon: '✦' },
  { value: 'beauty', label: 'Beauty', icon: '💄' },
  { value: 'fragrances', label: 'Fragrances', icon: '🌸' },
  { value: 'furniture', label: 'Furniture', icon: '🛋️' },
  { value: 'groceries', label: 'Groceries', icon: '🛒' },
]

const selectCategory = (value: string) => {
  emit('filter', value)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}
</script>

<style scoped>
/* Base Full-Width Wrapper Background */
.filterbar-wrapper {
  background: var(--card); /* Uses your light/dark mode variables automatically */
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 4px 30px var(--glass-hover);
}

/* Inputs & Select Elements */
.search-input, .sort-select {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text);
}

.search-input::placeholder {
  color: var(--muted);
}

.search-input:focus, .sort-select:focus {
  border-color: rgba(244, 63, 94, 0.4);
  box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.1);
  background: var(--surface);
}

/* Inactive Pills */
.pill-default {
  background: var(--glass-bg);
  color: var(--muted);
  border: 1px solid var(--glass-border);
}

.pill-default:hover {
  background: var(--glass-hover);
  color: var(--text);
  border-color: var(--glass-border);
  transform: translateY(-2px);
}

/* Active Pill - Stays vibrant */
.pill-active {
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  color: white;
  border: 1px solid transparent;
  box-shadow: 0 6px 20px rgba(244, 63, 94, 0.35);
  transform: translateY(-2px);
}

/* Hides scrollbar on smaller screens */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>