import { ref } from 'vue'
import type { Product } from '../types'

interface CartItem extends Product {
  quantity: number
}

const cartItems = ref<CartItem[]>([])

export function useCart() {
  const addToCart = (product: Product) => {
    const existing = cartItems.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (id: number) => {
    cartItems.value = cartItems.value.filter(i => i.id !== id)
  }

  const increaseQty = (id: number) => {
    const item = cartItems.value.find(i => i.id === id)
    if (item) item.quantity++
  }

  const decreaseQty = (id: number) => {
    const item = cartItems.value.find(i => i.id === id)
    if (item && item.quantity > 1) {
      item.quantity--
    } else {
      removeFromCart(id)
    }
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty
  }
}