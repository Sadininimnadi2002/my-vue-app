import { ref, watch, computed } from 'vue';
import type { Product } from '../types';

// State lives outside the function so it is shared globally
const cart = ref<Product[]>([]);

// MAKE SURE THIS LINE SAYS: export function useCart()
export function useCart() {
  
  // 1. Load from LocalStorage on startup
  const savedData = localStorage.getItem('sadini-cart');
  if (savedData) {
    try {
      cart.value = JSON.parse(savedData);
    } catch (e) {
      console.error("Cart loading failed", e);
    }
  }

  // 2. Watch for changes and save to memory automatically
  watch(cart, (newCart) => {
    localStorage.setItem('sadini-cart', JSON.stringify(newCart));
  }, { deep: true });

  // 3. Methods
  const addToCart = (product: Product) => {
    cart.value.push(product);
  };

  // 4. Computed Count
  const cartCount = computed(() => cart.value.length);

  return {
    cart,
    addToCart,
    cartCount
  };
}