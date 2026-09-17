import { ref, watch } from 'vue';

// 1. Define state OUTSIDE the function so it acts as a global memory.
// This ensures the NavBar, Home View, and Cards all share the exact same data.
const savedData = localStorage.getItem('luxury_wishlist');
const wishlistItems = ref<number[]>(savedData ? JSON.parse(savedData) : []);

// 2. Automatically save to browser storage whenever a heart is clicked
watch(wishlistItems, (newVal) => {
  localStorage.setItem('luxury_wishlist', JSON.stringify(newVal));
}, { deep: true });

export function useWishlist() {
  
  const toggleWishlist = (id: number) => {
    const index = wishlistItems.value.indexOf(id);
    if (index > -1) {
      // If the item is already in the wishlist, remove it
      wishlistItems.value.splice(index, 1);
    } else {
      // If it is not in the wishlist, add it
      wishlistItems.value.push(id);
    }
  };

  const isWishlisted = (id: number): boolean => {
    return wishlistItems.value.includes(id);
  };

  return {
    wishlistItems,
    toggleWishlist,
    isWishlisted
  };
}