<template>
  <Transition name="cart-slide">
    <div v-if="isOpen" class="cart-overlay" @click.self="$emit('close')">
      <div class="cart-drawer">
        
        <!-- ── HEADER ──────────────────────────────────────── -->
        <div class="cart-header">
          <div class="flex items-center gap-3">
            <h2 class="cart-title">Your Tote</h2>
            <span class="cart-count-badge" v-if="totalItems > 0">{{ totalItems }}</span>
          </div>
          <button class="cart-close" @click="$emit('close')" title="Close Cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- ── EMPTY STATE ─────────────────────────────────── -->
        <div v-if="items.length === 0" class="cart-empty">
          <div class="empty-icon">🛍️</div>
          <h3>Your tote is empty</h3>
          <p>Discover our curated collections and add something beautiful to your tote.</p>
          <button class="continue-btn" @click="$emit('close')">Continue Shopping</button>
        </div>

        <!-- ── CART ITEMS ──────────────────────────────────── -->
        <div v-else class="cart-body">
          <div class="cart-items">
            <TransitionGroup name="list">
              <div v-for="item in items" :key="item.id" class="cart-item">
                
                <!-- Item Image -->
                <div class="item-img-wrap">
                  <img :src="item.thumbnail" :alt="item.title" class="item-img" />
                </div>
                
                <!-- Item Details -->
                <div class="item-info">
                  <div class="flex justify-between items-start gap-4">
                    <div>
                      <h4 class="item-title">{{ item.title }}</h4>
                      <p class="item-category">{{ item.category }}</p>
                    </div>
                    <button class="item-remove" @click="$emit('remove', item.id)" title="Remove item">
                      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div class="item-bottom">
                    <span class="item-price">${{ item.price.toFixed(2) }}</span>
                    
                    <!-- Modern Quantity Pill -->
                    <div class="qty-pill">
                      <button class="qty-btn" @click="$emit('decrease', item.id)">
                        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"/></svg>
                      </button>
                      <span class="qty-val">{{ item.quantity }}</span>
                      <button class="qty-btn" @click="$emit('increase', item.id)">
                        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </TransitionGroup>
          </div>
        </div>

        <!-- ── FOOTER / CHECKOUT ───────────────────────────── -->
        <div v-if="items.length > 0" class="cart-footer">
          <div class="summary-row">
            <span class="summary-label">Subtotal</span>
            <span class="summary-val">${{ cartTotal.toFixed(2) }}</span>
          </div>
          <p class="shipping-note">Taxes and shipping calculated at checkout.</p>
          <button class="checkout-btn">
            Proceed to Checkout
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  items: Array<{
    id: number
    title: string
    price: number
    thumbnail: string
    category: string
    quantity: number
  }>
}>()

defineEmits<{
  close: []
  remove: [id: number]
  increase: [id: number]
  decrease: [id: number]
}>()

const cartTotal = computed(() => {
  return props.items.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const totalItems = computed(() => {
  return props.items.reduce((total, item) => total + item.quantity, 0)
})
</script>

<style scoped>
/* ── Overlay & Layout ────────────────────────────────────── */
.cart-overlay {
  position: fixed; inset: 0; z-index: 999;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex; justify-content: flex-end;
}

.cart-drawer {
  width: 100%; max-width: 440px; height: 100%;
  background: var(--bg); /* Uses your light/dark mode background */
  display: flex; flex-direction: column;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
  border-left: 1px solid var(--glass-border);
}

/* ── Header ──────────────────────────────────────────────── */
.cart-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 32px;
  border-bottom: 1px solid var(--glass-border);
  background: var(--surface);
}

.cart-title {
  font-size: 1.5rem; font-weight: 900;
  color: var(--text); letter-spacing: -0.02em;
}

.cart-count-badge {
  background: var(--rose); color: white;
  font-size: 11px; font-weight: 800;
  padding: 2px 8px; border-radius: 99px;
}

.cart-close {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  color: var(--muted); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.cart-close:hover {
  background: rgba(244,63,94,0.1); color: var(--rose); transform: rotate(90deg);
}

/* ── Empty State ─────────────────────────────────────────── */
.cart-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 40px; text-align: center;
}

.empty-icon {
  font-size: 64px; margin-bottom: 24px;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
}

.cart-empty h3 {
  font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 12px;
}

.cart-empty p {
  font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 32px;
}

.continue-btn {
  padding: 14px 28px; border-radius: 99px;
  font-size: 14px; font-weight: 700;
  color: var(--text); background: var(--surface);
  border: 1px solid var(--glass-border); cursor: pointer;
  box-shadow: 0 4px 12px var(--glass-hover);
  transition: all 0.2s;
}
.continue-btn:hover { background: var(--glass-bg); transform: translateY(-2px); }

/* ── Cart Items ──────────────────────────────────────────── */
.cart-body {
  flex: 1; overflow-y: auto; padding: 24px 32px;
}

.cart-items {
  display: flex; flex-direction: column; gap: 24px;
}

.cart-item {
  display: flex; gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--glass-border);
}
.cart-item:last-child { border-bottom: none; padding-bottom: 0; }

.item-img-wrap {
  width: 90px; height: 90px; flex-shrink: 0;
  border-radius: 16px; background: var(--modal-img-bg);
  display: flex; align-items: center; justify-content: center;
  padding: 8px; border: 1px solid var(--glass-border);
}

.item-img {
  width: 100%; height: 100%; object-fit: contain;
}

.item-info {
  flex: 1; display: flex; flex-direction: column; justify-content: space-between;
}

.item-title {
  font-size: 14px; font-weight: 800; color: var(--text);
  line-height: 1.3; margin-bottom: 4px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.item-category {
  font-size: 11px; font-weight: 700; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.1em;
}

.item-remove {
  color: var(--muted); background: none; border: none; cursor: pointer;
  padding: 4px; transition: color 0.2s;
}
.item-remove:hover { color: var(--rose); }

.item-bottom {
  display: flex; align-items: center; justify-content: space-between; margin-top: 12px;
}

.item-price {
  font-size: 16px; font-weight: 900; color: var(--text);
}

/* Modern Quantity Pill */
.qty-pill {
  display: flex; align-items: center; gap: 12px;
  background: var(--surface); border: 1px solid var(--glass-border);
  padding: 4px; border-radius: 99px;
}

.qty-btn {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--glass-bg); border: none; color: var(--text);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.2s;
}
.qty-btn:hover { background: var(--glass-border); }

.qty-val {
  font-size: 13px; font-weight: 800; color: var(--text); min-width: 12px; text-align: center;
}

/* ── Footer / Checkout ───────────────────────────────────── */
.cart-footer {
  padding: 32px; background: var(--surface);
  border-top: 1px solid var(--glass-border);
}

.summary-row {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 8px;
}

.summary-label {
  font-size: 15px; font-weight: 600; color: var(--muted);
}

.summary-val {
  font-size: 24px; font-weight: 900; color: var(--text); letter-spacing: -0.02em;
}

.shipping-note {
  font-size: 12px; color: var(--muted); margin-bottom: 24px;
}

.checkout-btn {
  width: 100%; padding: 18px; border-radius: 16px;
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  color: white; font-size: 16px; font-weight: 800; border: none;
  cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px;
  box-shadow: 0 8px 24px rgba(244,63,94,0.3); transition: transform 0.2s, box-shadow 0.2s;
}
.checkout-btn:hover {
  transform: translateY(-2px); box-shadow: 0 12px 32px rgba(244,63,94,0.45);
}

/* ── Animations ──────────────────────────────────────────── */
.cart-slide-enter-active, .cart-slide-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.cart-slide-enter-from, .cart-slide-leave-to { opacity: 0; }
.cart-slide-enter-from .cart-drawer, .cart-slide-leave-to .cart-drawer { transform: translateX(100%); }

.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from { opacity: 0; transform: translateX(20px); }
.list-leave-to { opacity: 0; transform: translateX(-20px); }

/* Custom Scrollbar for Cart Items */
.cart-body::-webkit-scrollbar { width: 4px; }
.cart-body::-webkit-scrollbar-track { background: transparent; }
.cart-body::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 99px; }
.cart-body::-webkit-scrollbar-thumb:hover { background: var(--muted); }
</style>