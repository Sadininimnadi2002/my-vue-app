<template>
  <div class="premium-card group" @click="$emit('click')">
    
    <!-- ── Image & Interactive Overlay ─────────────────────── -->
    <div class="card-img-wrap">
      <img :src="product.thumbnail" :alt="product.title" class="card-img" />
      
      <!-- Wishlist Floating Button -->
      <button 
        class="wishlist-btn" 
        :class="{ 'is-active': isWishlisted }"
        @click.stop="$emit('toggle-wishlist', product.id)"
        title="Toggle Wishlist"
      >
        <!-- Notice the dynamic 'filled' class here -->
        <svg class="heart-icon" :class="{ 'filled': isWishlisted }" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <!-- Slide-Up Add to Cart Overlay -->
      <div class="quick-add-overlay">
        <button class="quick-add-btn" @click.stop="$emit('add-to-cart', product)">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Tote
        </button>
      </div>
    </div>

    <!-- ── Card Details ────────────────────────────────────── -->
    <div class="card-content">
      
      <!-- Top Row: Category & Stock -->
      <div class="card-meta">
        <span class="card-category">{{ product.category }}</span>
        <div class="stock-badge" :class="product.stock > 0 ? 'in-stock' : 'out-stock'">
          <span class="stock-dot"></span>
          {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
        </div>
      </div>

      <!-- Title & Rating -->
      <h3 class="card-title">{{ product.title }}</h3>
      
      <div class="card-rating">
        <svg v-for="i in 5" :key="i" class="star" :class="i <= Math.round(product.rating) ? 'star-on' : 'star-off'" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span class="rating-val">{{ product.rating.toFixed(1) }}</span>
      </div>

      <!-- Price Row -->
      <div class="card-price-row">
        <span class="current-price">${{ product.price.toFixed(2) }}</span>
        <span class="old-price" v-if="product.discountPercentage">
          ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
        </span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '../types';

const props = defineProps<{
  product: Product;
  isWishlisted: boolean;
}>();

defineEmits(['click', 'add-to-cart', 'toggle-wishlist']);
</script>

<style scoped>
/* ── Premium Card Container ── */
.premium-card {
  display: flex;
  flex-direction: column;
  background: var(--card);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  position: relative;
}

.premium-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px var(--glass-hover);
}

/* ── Image & Interactive Overlay ── */
.card-img-wrap {
  position: relative;
  width: 100%;
  height: 260px;
  background: var(--modal-img-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.premium-card:hover .card-img {
  transform: scale(1.08);
}

/* ── Floating Wishlist Button ── */
.wishlist-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.wishlist-btn:hover {
  transform: scale(1.1);
  color: var(--rose);
}

.wishlist-btn.is-active {
  color: var(--rose);
  border-color: rgba(244, 63, 94, 0.4);
  background: rgba(244, 63, 94, 0.15);
}

.heart-icon {
  width: 18px;
  height: 18px;
  fill: none; /* Empty by default */
  transition: fill 0.3s ease, transform 0.2s ease;
}

/* This securely fills the heart when active */
.heart-icon.filled {
  fill: currentColor; 
}

/* ── Modern Quick Add Overlay ── */
.quick-add-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%);
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
}

.premium-card:hover .quick-add-overlay {
  opacity: 1;
  transform: translateY(0);
}

.quick-add-btn {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  color: white;
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(244, 63, 94, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}

.quick-add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(244, 63, 94, 0.6);
}

/* ── Card Content Details ── */
.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-category {
  font-size: 10.5px;
  font-weight: 800;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

/* Stock Status Pill */
.stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 99px;
  letter-spacing: 0.05em;
}

.in-stock {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.out-stock {
  color: var(--muted);
  background: var(--glass-bg);
}

.stock-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
.in-stock .stock-dot {
  box-shadow: 0 0 8px currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Title & Rating */
.card-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
  margin-top: auto; 
}

.star { width: 14px; height: 14px; }
.star-on { color: #fbbf24; }
.star-off { color: var(--muted); opacity: 0.3; }

.rating-val {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  margin-left: 4px;
}

/* Prices */
.card-price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  border-top: 1px solid var(--glass-border);
  padding-top: 16px;
}

.current-price {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -0.02em;
}

.old-price {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--muted);
  text-decoration: line-through;
  opacity: 0.7;
}
</style>