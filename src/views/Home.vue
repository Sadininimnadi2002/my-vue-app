<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import type { Product, ProductResponse } from '../types';
import ProductCard from '../components/productcard.vue';
import NavBar from '../components/navbar.vue';
import FilterBar from '../components/filterbar.vue';
import Cart from '../components/cart.vue';
import FooterSection from '../components/footer.vue';
import { useCart } from '../composables/useCart';
import { useWishlist } from '../composables/usewishlist';
import { useAuth } from '../composables/useAuth';

// ── Composables ──────────────────────────────────────────
const { cartItems, addToCart, removeFromCart, increaseQty, decreaseQty } = useCart();
const { toggleWishlist, isWishlisted } = useWishlist();
const { isLoggedIn, login, logout } = useAuth();

// ── Local State ──────────────────────────────────────────
const products        = ref<Product[]>([]);
const loading         = ref(true);
const searchQuery     = ref('');
const selectedCategory = ref('');
const sortBy          = ref('');
const selectedProduct = ref<Product | null>(null);
const isDark          = ref(false);
const cartOpen        = ref(false);

const currentView     = ref<'home' | 'wishlist'>('home');

// ── Cart count (total items) ─────────────────────────────
const cartCount = computed(() =>
  cartItems.value.reduce((sum: number, item: any) => sum + item.quantity, 0)
);

const wishlistCount = computed(() =>
  products.value.filter((p: any) => isWishlisted(p.id)).length
);

// ── Fetch Products ───────────────────────────────────────
const fetchProducts = async () => {
  try {
    const res  = await fetch('https://dummyjson.com/products?limit=100');
    const data: ProductResponse = await res.json();
    products.value = data.products;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// ── Filtered + Sorted Products ───────────────────────────
const filteredProducts = computed(() => {
  let list = currentView.value === 'wishlist' 
    ? products.value.filter(p => isWishlisted(p.id)) 
    : products.value;

  list = list.filter(p => {
    const matchesSearch   = p.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedCategory.value || p.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });

  if (sortBy.value === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
  if (sortBy.value === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
  if (sortBy.value === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
  if (sortBy.value === 'discount')   list = [...list].sort((a, b) => b.discountPercentage - a.discountPercentage);

  return list;
});

// ── Dark Mode ────────────────────────────────────────────
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

// ── Auth ─────────────────────────────────────────────────
const handleLogin = async () => {
  const success = await login('emilys', 'emilyspass');
  if (!success) alert('Login Failed.');
};

// ── Lifecycle ────────────────────────────────────────────
onMounted(() => {
  fetchProducts();
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else if (saved === 'light') {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>

<template>
  <div class="app-root w-full overflow-x-hidden">

    <!-- ── NAVBAR ──────────────────────────────────────── -->
    <NavBar
      :cart-count="cartCount"
      :wishlist-count="wishlistCount"
      :is-logged-in="isLoggedIn"
      :is-dark="isDark"
      @toggle-dark="toggleDarkMode"
      @open-cart="cartOpen = true"
      @logout="logout"
      @search="(q) => searchQuery = q"
    />

    <!-- ── CART DRAWER ──────────────────────────────────── -->
    <Cart
      :is-open="cartOpen"
      :items="cartItems"
      @close="cartOpen = false"
      @remove="removeFromCart"
      @increase="increaseQty"
      @decrease="decreaseQty"
    />

    <!-- ── HERO ─────────────────────────────────────────── -->
    <section class="hero-section" v-if="currentView === 'home'">
      <div class="blob blob-1" />
      <div class="blob blob-2" />
      <div class="blob blob-3" />
      <div class="dot-matrix-overlay" />

      <div class="hero-inner">
        <div class="hero-text animate-fade-in-up">
          <div class="badge-pill">
            <span class="badge-dot" />
            <span>All-In-One Destination</span>
          </div>
          
          <h1 class="hero-title">
            Lifestyle<br/>
            <span class="hero-accent">Redefined</span>
          </h1>
          
          <p class="hero-sub">
            From daily groceries to premium home furniture and trending fashion. Discover a world of curated essentials designed to elevate your modern life.
          </p>
          
          <div class="hero-ctas">
            <button class="cta-primary" @click="document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })">
              Explore the Store
            </button>
            <button class="cta-secondary" @click="currentView = 'wishlist'; document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })">
              View Wishlist <span class="ml-2 font-normal">→</span>
            </button>
          </div>
          
          <div class="hero-stats">
            <div v-for="s in [{ v:'10K+', l:'Curated Items' }, { v:'99%', l:'Happy Customers' }, { v:'100+', l:'Global Brands' }]" :key="s.l" class="stat-glass-card">
              <span class="stat-val">{{ s.v }}</span>
              <span class="stat-label">{{ s.l }}</span>
            </div>
          </div>
        </div>

        <div class="hero-deco animate-fade-in">
          <div class="orbit orbit-1"><div class="orbit-dot" /></div>
          <div class="orbit orbit-2"><div class="orbit-dot orbit-dot-2" /></div>
          <div class="orbit orbit-3"></div>
          
          <div class="premium-core">
            <div class="core-glow"></div>
            <div class="core-glass">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── FULL WIDTH FILTER BAR ───────────────────────── -->
    <FilterBar
      :selected-category="selectedCategory"
      @search="(q) => searchQuery = q"
      @filter="(c) => selectedCategory = c"
      @sort="(s) => sortBy = s"
    />

    <!-- ── PRODUCTS SECTION ──────────────────────────────── -->
    <section id="products" class="products-section">

      <div class="section-header flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div class="flex-1 text-center md:text-left">
          <h2 class="section-title text-4xl md:text-5xl">
            {{ currentView === 'home' ? 'Discover Everything' : 'Your Wishlist' }} 
            <span class="ml-2 opacity-80">{{ currentView === 'home' ? '✨' : '🖤' }}</span>
          </h2>
          <p class="section-sub mt-3 text-base opacity-70 tracking-wide uppercase" v-if="!loading">
            Showing {{ filteredProducts.length }} items
          </p>
        </div>

        <div class="premium-toggle-wrapper">
          <button 
            class="premium-toggle-btn"
            :class="currentView === 'home' ? 'active' : ''"
            @click="currentView = 'home'"
          >All Products</button>
          <button 
            class="premium-toggle-btn"
            :class="currentView === 'wishlist' ? 'active' : ''"
            @click="currentView = 'wishlist'"
          >Favorites ({{ wishlistCount }})</button>
        </div>
      </div>

      <div v-if="loading" class="products-grid">
        <div v-for="i in 8" :key="i" class="skeleton-card">
          <div class="skeleton-img" />
          <div class="skeleton-line w-3/4" />
          <div class="skeleton-line w-1/2" />
        </div>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="empty-state">
        <div class="empty-icon-wrap">
          <span class="text-6xl">{{ currentView === 'home' ? '🔍' : '🖤' }}</span>
        </div>
        <h3 class="text-2xl font-black mt-6 mb-2" style="color: var(--text); letter-spacing: -0.02em;">
          {{ currentView === 'home' ? 'Nothing found in this category.' : 'Your wishlist is waiting.' }}
        </h3>
        <p class="text-base opacity-70 max-w-md mx-auto mb-8 line-height-relaxed">
          {{ currentView === 'home' ? 'Try adjusting your search or filters to explore more of our massive catalog.' : 'Tap the heart icon on any product to save it to your personal list.' }}
        </p>
        <button v-if="currentView === 'home'" @click="searchQuery = ''; selectedCategory = ''" class="cta-primary">Reset Filters</button>
        <button v-if="currentView === 'wishlist'" @click="currentView = 'home'" class="cta-primary">Explore Store</button>
      </div>

      <div v-else class="products-grid">
        <ProductCard
          v-for="p in filteredProducts"
          :key="p.id"
          :product="p"
          :is-wishlisted="isWishlisted(p.id)"
          @click="selectedProduct = p"
          @toggle-wishlist="toggleWishlist"
          @add-to-cart="addToCart"
        />
      </div>

    </section>

    <!-- ── PRODUCT MODAL ─────────────────────────────────── -->
    <Transition name="modal-fade">
      <div v-if="selectedProduct" class="modal-overlay" @click.self="selectedProduct = null">
        <div class="modal-box">
          <button class="modal-close" @click="selectedProduct = null">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          
          <div class="modal-img-wrap">
            <img :src="selectedProduct.thumbnail" :alt="selectedProduct.title" class="modal-img" />
            <div class="modal-img-glow" />
          </div>
          
          <div class="modal-info">
            <p class="modal-category">{{ selectedProduct.category }}</p>
            <h2 class="modal-title">{{ selectedProduct.title }}</h2>
            
            <div class="modal-rating">
              <svg v-for="i in 5" :key="i" class="star" :class="i <= Math.round(selectedProduct.rating) ? 'star--on' : 'star--off'" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="modal-rating-val">{{ selectedProduct.rating.toFixed(1) }}</span>
            </div>
            
            <p class="modal-desc">{{ selectedProduct.description }}</p>
            
            <div class="modal-footer">
              <div class="modal-price">
                <span class="modal-price-now">${{ selectedProduct.price.toFixed(2) }}</span>
                <span v-if="selectedProduct.discountPercentage" class="modal-discount">-{{ Math.round(selectedProduct.discountPercentage) }}%</span>
              </div>
              <button class="modal-add-btn" @click="addToCart(selectedProduct!); cartOpen = true; selectedProduct = null">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── FOOTER SECTION ────────────────────────────────── -->
    <!-- We are passing the isDark state to the footer to force the theme sync -->
    <FooterSection :is-dark="isDark" />

  </div>
</template>

<style>
/* ── Reset & Root ────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* LIGHT MODE VARIABLES */
  --bg:           #ffffff;
  --surface:      #d59c9c;
  --card:         #debbbb;
  --rose:         #e11d48;
  --rose-d:       #be123c;
  --text:         #0a0f1c;
  --muted:        #64748b; 
  --glass-bg:     rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.06);
  --glass-hover:  rgba(0, 0, 0, 0.03);
  --grid-dot:     rgba(0, 0, 0, 0.05);
  --skeleton-1:   #e2e8f0;
  --skeleton-2:   #f1f5f9;
  --modal-bg:     linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  --modal-img-bg: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  --overlay:      rgba(255, 255, 255, 0.85);
}

html.dark {
  /* DARK MODE VARIABLES */
  --bg:           #0b1120;
  --surface:      #0f172a;
  --card:         #1f2d4e;
  --rose:         #f43f5e;
  --rose-d:       #e11d48;
  --text:         #f8fafc;
  --muted:        #94a3b8; 
  --glass-bg:     rgba(15, 23, 42, 0.6);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-hover:  rgba(0, 0, 0, 0.2);
  --grid-dot:     rgba(255, 255, 255, 0.03);
  --skeleton-1:   #1e293b;
  --skeleton-2:   #334155;
  --modal-bg:     linear-gradient(145deg, #131c31 0%, #0b1120 100%);
  --modal-img-bg: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  --overlay:      rgba(101, 91, 91, 0.85);
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', 'Outfit', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.app-root {
  min-height: 100vh;
  background: var(--bg);
  transition: background-color 0.4s ease;
}

/* ── Typography & Base Animations ───────────────────────── */
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in {
  animation: fadeIn 1.2s ease forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ── Hero ────────────────────────────────────────────────── */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 50%, rgba(244,63,94,0.06) 0%, transparent 60%),
    radial-gradient(circle at 85% 20%, rgba(99,102,241,0.05) 0%, transparent 50%),
    var(--bg);
  transition: background 0.4s ease;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  animation: blobFloat 12s ease-in-out infinite;
}
.blob-1 { width: 600px; height: 600px; background: #f43f5e; top: -150px; left: -100px; }
.blob-2 { width: 500px; height: 500px; background: #6366f1; bottom: -100px; right: -5%; animation-delay: 4s; }
.blob-3 { width: 400px; height: 400px; background: #f43f5e; top: 40%; left: 35%; animation-delay: 8s; }

@keyframes blobFloat {
  0%,100% { transform: translate(0,0) scale(1); }
  33%      { transform: translate(30px,-40px) scale(1.05); }
  66%      { transform: translate(-20px,30px) scale(0.95); }
}

.dot-matrix-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(var(--grid-dot) 1.5px, transparent 1.5px);
  background-size: 32px 32px;
  transition: background-image 0.4s ease;
}

.hero-inner {
  position: relative; z-index: 1;
  max-width: 1340px; margin: 0 auto;
  padding: 0 24px;
  padding-top: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 64px;
}

@media (min-width: 1024px) {
  .hero-inner { flex-direction: row; padding-top: 0; justify-content: space-between; }
  .hero-text { text-align: left; max-width: 650px; }
  .hero-ctas { justify-content: flex-start; }
  .hero-stats { justify-content: flex-start; }
}

.hero-text { flex: 1; text-align: center; }

.badge-pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 18px;
  border-radius: 99px;
  background: rgba(244,63,94,0.08);
  border: 1px solid rgba(244,63,94,0.2);
  font-size: 11.5px; font-weight: 700;
  color: #fb7185; letter-spacing: 0.15em;
  text-transform: uppercase; margin-bottom: 24px;
}

.badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--rose);
  box-shadow: 0 0 8px var(--rose);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.6); }
}

.hero-title {
  font-size: clamp(3.5rem, 8.5vw, 6.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.05em;
  color: var(--text);
  margin-bottom: 24px;
  text-shadow: 0 10px 40px rgba(0,0,0,0.1);
  transition: color 0.4s ease;
}

.hero-accent {
  background: linear-gradient(135deg, #f43f5e 0%, #fb7185 40%, #fda4af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  color: var(--muted);
  font-size: 1.15rem; line-height: 1.8;
  max-width: 480px;
  margin: 0 auto 40px;
  font-weight: 400;
  transition: color 0.4s ease;
}

@media (min-width: 1024px) { .hero-sub { margin: 0 0 40px; } }

.hero-ctas {
  display: flex; gap: 16px;
  flex-direction: column; align-items: center;
  margin-bottom: 56px;
}

@media (min-width: 480px) { .hero-ctas { flex-direction: row; justify-content: center; } }

.cta-primary {
  padding: 16px 36px; border-radius: 99px;
  font-size: 15px; font-weight: 700;
  color: white; cursor: pointer; border: none;
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  box-shadow: 0 10px 30px rgba(244,63,94,0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.02em;
}
.cta-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(244,63,94,0.45); }

.cta-secondary {
  padding: 16px 36px; border-radius: 99px;
  font-size: 15px; font-weight: 600;
  color: var(--text); cursor: pointer;
  background: transparent;
  border: 1px solid var(--glass-border);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.cta-secondary:hover { 
  border-color: var(--text); 
  background: var(--glass-hover); 
  transform: translateY(-3px);
}

.hero-stats {
  display: flex; gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.stat-glass-card { 
  display: flex; flex-direction: column; gap: 4px; 
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  padding: 16px 24px;
  border-radius: 20px;
  box-shadow: 0 8px 32px var(--glass-hover);
  min-width: 130px;
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}

.stat-val   { font-size: 2rem; font-weight: 900; letter-spacing: -0.04em; color: var(--text); line-height: 1; transition: color 0.4s ease; }
.stat-label { font-size: 10px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; transition: color 0.4s ease; }

.hero-deco {
  flex: 1; display: flex; align-items: center; justify-content: center;
  position: relative; width: 400px; height: 400px;
}

.orbit {
  position: absolute; border-radius: 50%;
  border: 1px solid rgba(244,63,94,0.15); 
  animation: spin 20s linear infinite;
}
.orbit-1 { width: 280px; height: 280px; animation-duration: 25s; }
.orbit-2 { width: 400px; height: 400px; animation-duration: 35s; animation-direction: reverse; border-color: rgba(99,102,241,0.15); }
.orbit-3 { width: 150px; height: 150px; animation-duration: 15s; border-style: dashed; border-color: rgba(255,255,255,0.1); }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.orbit-dot {
  position: absolute; width: 6px; height: 6px; border-radius: 50%;
  background: #f43f5e; top: -3px; left: 50%; margin-left: -3px;
  box-shadow: 0 0 10px rgba(244,63,94,0.8);
}
.orbit-dot-2 { background: #818cf8; box-shadow: 0 0 10px rgba(129,140,248,0.8); }

.premium-core {
  position: relative;
  z-index: 10;
  animation: coreFloat 6s ease-in-out infinite;
}

.core-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(244,63,94,0.35) 0%, transparent 70%);
  filter: blur(20px);
  border-radius: 50%;
  animation: corePulse 4s ease-in-out infinite;
}

.core-glass {
  position: relative;
  width: 96px; height: 96px;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 40px var(--glass-hover), inset 0 0 20px rgba(255,255,255,0.05);
  display: flex; align-items: center; justify-content: center;
  color: var(--rose);
  transition: background 0.4s ease, border-color 0.4s ease;
}

@keyframes coreFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes corePulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.15); opacity: 1; }
}

/* ── Products Section ───────────────────────────────────── */
.products-section {
  max-width: 1340px; margin: 0 auto;
  padding: 64px 24px 100px;
}

.section-title {
  font-weight: 900;
  letter-spacing: -0.04em; 
  color: var(--text);
  line-height: 1.1;
  transition: color 0.4s ease;
}

.premium-toggle-wrapper {
  display: inline-flex;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  padding: 6px;
  border-radius: 99px;
  box-shadow: 0 4px 15px var(--glass-hover);
  transition: background 0.4s ease, border-color 0.4s ease;
}

.premium-toggle-btn {
  padding: 10px 24px;
  font-size: 13.5px;
  font-weight: 700;
  border-radius: 99px;
  color: var(--muted);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: transparent;
  border: none;
  cursor: pointer;
}

.premium-toggle-btn:hover { color: var(--text); }

.premium-toggle-btn.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 4px 12px var(--glass-hover);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
}

.skeleton-card {
  border-radius: 20px;
  background: var(--card);
  border: 1px solid var(--glass-border);
  overflow: hidden;
  padding: 0 0 20px;
  transition: background 0.4s ease, border-color 0.4s ease;
}

.skeleton-img {
  height: 240px; width: 100%;
  background: linear-gradient(90deg, var(--skeleton-1) 25%, var(--skeleton-2) 50%, var(--skeleton-1) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  margin-bottom: 16px;
}

.skeleton-line {
  height: 14px; margin: 10px 20px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--skeleton-1) 25%, var(--skeleton-2) 50%, var(--skeleton-1) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

.skeleton-line.w-3\/4 { width: 75%; }
.skeleton-line.w-1\/2 { width: 50%; }

@keyframes shimmer {
  0%   { background-position:  200% 0; }
  100% { background-position: -200% 0; }
}

.empty-state {
  display: flex; flex-direction: column; align-items: center;
  padding: 100px 24px;
  text-align: center;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px dashed var(--glass-border);
  border-radius: 32px;
  margin-top: 20px;
  transition: background 0.4s ease, border-color 0.4s ease;
}

.empty-icon-wrap {
  width: 100px; height: 100px;
  border-radius: 50%;
  background: rgba(244,63,94,0.05);
  display: flex; align-items: center; justify-content: center;
}

/* ── Product Modal ───────────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: var(--overlay);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}

.modal-box {
  background: var(--modal-bg);
  border: 1px solid var(--glass-border);
  border-radius: 32px;
  max-width: 560px; width: 100%;
  position: relative; overflow: hidden;
  box-shadow: 0 25px 60px rgba(0,0,0,0.15);
  transition: background 0.4s ease, border-color 0.4s ease;
}

.modal-close {
  position: absolute; top: 20px; right: 20px; z-index: 10;
  width: 36px; height: 36px; border-radius: 12px;
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  color: var(--muted); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.modal-close:hover { background: rgba(244,63,94,0.15); border-color: rgba(244,63,94,0.3); color: var(--rose); transform: rotate(90deg); }

.modal-img-wrap {
  position: relative;
  height: 280px;
  background: var(--modal-img-bg);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}

.modal-img {
  height: 220px; object-fit: contain;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-img:hover { transform: scale(1.08) translateY(-5px); }

.modal-img-glow {
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 240px; height: 80px;
  background: radial-gradient(ellipse, rgba(244,63,94,0.15), transparent 70%);
  filter: blur(24px);
}

.modal-info { padding: 32px; }

.modal-category {
  font-size: 11px; font-weight: 700;
  color: var(--rose); letter-spacing: 0.15em;
  text-transform: uppercase; margin-bottom: 12px;
}

.modal-title {
  font-size: 1.5rem; font-weight: 900;
  color: var(--text); letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.modal-rating {
  display: flex; align-items: center; gap: 4px;
  margin-bottom: 20px;
}

.star { width: 16px; height: 16px; }
.star--on  { color: #fbbf24; }
.star--off { color: var(--muted); opacity: 0.3; }

.modal-rating-val {
  font-size: 14px; font-weight: 600; color: var(--text);
  margin-left: 8px;
}

.modal-desc {
  font-size: 14.5px; color: var(--muted);
  line-height: 1.7; margin-bottom: 32px;
}

.modal-footer {
  display: flex; align-items: center;
  justify-content: space-between; gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--glass-border);
}

.modal-price { display: flex; align-items: center; gap: 10px; }

.modal-price-now {
  font-size: 1.8rem; font-weight: 900;
  color: var(--text); letter-spacing: -0.04em;
}

.modal-discount {
  font-size: 12px; font-weight: 800;
  color: #4ade80;
  background: rgba(74,222,128,0.1);
  border: 1px solid rgba(74,222,128,0.2);
  padding: 4px 10px; border-radius: 99px;
}

.modal-add-btn {
  padding: 14px 28px; border-radius: 16px;
  font-size: 14px; font-weight: 800;
  color: white; cursor: pointer; border: none;
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  box-shadow: 0 8px 24px rgba(244,63,94,0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}
.modal-add-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(244,63,94,0.45); }

.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-fade-enter-from, .modal-fade-leave-to       { opacity: 0; transform: scale(0.92) translateY(20px); }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: var(--muted); }
</style>