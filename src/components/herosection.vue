<template>
  <!-- HERO SECTION -->
  <section class="hero-section relative min-h-screen flex items-center overflow-hidden pt-16">

    <!-- Animated background blobs -->
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="blob blob-3" />

    <!-- Grid overlay texture -->
    <div class="grid-overlay absolute inset-0 pointer-events-none" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex flex-col lg:flex-row items-center gap-12">

        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 badge-pill">
            <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span class="text-xs font-medium text-rose-300 tracking-widest uppercase">New Season</span>
          </div>

          <h1 class="hero-title text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-4">
            Beauty<br/>
            <span class="hero-accent">Reimagined</span>
          </h1>

          <p class="text-slate-400 text-lg max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
            Discover premium beauty essentials curated for your lifestyle. Luxury made accessible.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              class="cta-primary px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300"
              @click="$emit('shopNow')"
            >
              Shop the Collection
            </button>
            <button
              class="cta-secondary px-8 py-3.5 rounded-full font-semibold text-slate-300 hover:text-white transition-all duration-300"
            >
              View Lookbook →
            </button>
          </div>

          <!-- Stats -->
          <div class="flex items-center gap-8 mt-12 justify-center lg:justify-start">
            <div v-for="stat in stats" :key="stat.label" class="text-center lg:text-left">
              <div class="text-2xl font-black text-white">{{ stat.value }}</div>
              <div class="text-xs text-slate-500 tracking-wide">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Visual side (optional decoration) -->
        <div class="flex-1 flex items-center justify-center">
          <div class="hero-circle relative">
            <div class="inner-glow" />
            <div class="orbit orbit-1">
              <div class="orbit-dot" />
            </div>
            <div class="orbit orbit-2">
              <div class="orbit-dot orbit-dot-2" />
            </div>
            <span class="text-8xl select-none">💄</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{ shopNow: [] }>()

const stats = [
  { value: '2K+', label: 'Products' },
  { value: '98%', label: 'Satisfaction' },
  { value: '50+', label: 'Brands' },
]
</script>

<!-- ============================================================
  ADD THESE TO YOUR style.css (global styles)
  ============================================================ -->
<style>
/* === GLOBAL BASE === */
:root {
  --bg-deep:    #0a0e1a;
  --bg-card:    #111827;
  --bg-surface: #1a2235;
  --rose:       #f43f5e;
  --rose-dark:  #e11d48;
  --text-primary: #f8fafc;
  --text-muted:   #94a3b8;
}

body {
  background-color: var(--bg-deep);
  color: var(--text-primary);
  font-family: 'DM Sans', 'Outfit', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Add to index.html <head>:
   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&display=swap" rel="stylesheet">
*/

/* === HERO STYLES === */
.hero-section {
  background: radial-gradient(ellipse at 20% 50%, rgba(244,63,94,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 50%),
              var(--bg-deep);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: blobFloat 8s ease-in-out infinite;
}
.blob-1 { width: 500px; height: 500px; background: #f43f5e; top: -100px; left: -100px; animation-delay: 0s; }
.blob-2 { width: 400px; height: 400px; background: #6366f1; bottom: -50px; right: 10%; animation-delay: 3s; }
.blob-3 { width: 300px; height: 300px; background: #f43f5e; top: 40%; left: 40%; animation-delay: 5s; }

@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(20px, -20px) scale(1.05); }
  66%       { transform: translate(-15px, 15px) scale(0.97); }
}

.grid-overlay {
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

.badge-pill {
  background: rgba(244, 63, 94, 0.1);
  border: 1px solid rgba(244, 63, 94, 0.25);
}

.hero-title {
  letter-spacing: -0.04em;
  line-height: 0.95;
}

.hero-accent {
  background: linear-gradient(135deg, #f43f5e 0%, #fb7185 50%, #fda4af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-primary {
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  box-shadow: 0 8px 30px rgba(244, 63, 94, 0.35);
}
.cta-primary:hover {
  box-shadow: 0 12px 40px rgba(244, 63, 94, 0.5);
  transform: translateY(-2px);
}

.cta-secondary {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
}
.cta-secondary:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.18);
}

/* Hero decoration */
.hero-circle {
  width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.inner-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%);
  border: 1px solid rgba(244,63,94,0.15);
}

.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(244,63,94,0.2);
  animation: spin 12s linear infinite;
}
.orbit-1 { width: 280px; height: 280px; }
.orbit-2 { width: 350px; height: 350px; animation-duration: 18s; animation-direction: reverse; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.orbit-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f43f5e;
  top: -4px;
  left: 50%;
  margin-left: -4px;
  box-shadow: 0 0 10px rgba(244,63,94,0.6);
}
.orbit-dot-2 {
  background: #818cf8;
  box-shadow: 0 0 10px rgba(129,140,248,0.6);
}

/* === SECTION HEADERS === */
.section-title {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

/* === PRODUCTS GRID === */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

/* === CART SIDEBAR === */
.cart-sidebar {
  background: rgba(14, 20, 35, 0.95);
  backdrop-filter: blur(24px);
  border-left: 1px solid rgba(255,255,255,0.07);
}

/* === MODAL === */
.product-modal {
  background: linear-gradient(145deg, #131b2e 0%, #0f1623 100%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.5rem;
}

/* === SCROLLBAR === */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(244,63,94,0.3); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(244,63,94,0.6); }
</style>
