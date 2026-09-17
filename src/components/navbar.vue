<template>
  <nav ref="navRef" class="navbar" :class="{ 'navbar--scrolled': scrolled, 'navbar--light': !isDark }">

    <!-- Top announcement bar -->
    <Transition name="announce">
      <div v-if="!announceClosed && !scrolled" class="announce-bar">
        <span class="announce-dot" />
        <p>Free shipping on orders over $50 &nbsp;·&nbsp; Use code <strong>SADINI20</strong> for 20% off</p>
        <button class="announce-close" @click="announceClosed = true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.5 1.5L1.5 10.5M1.5 1.5l9 9"/>
          </svg>
        </button>
      </div>
    </Transition>

    <!-- Main Nav -->
    <div class="nav-inner">

      <!-- Logo -->
      <RouterLink to="/" class="logo" @click="mobileOpen = false">
        <div class="logo-mark">
          <span>S</span>
          <div class="logo-glow" />
        </div>
        <div class="logo-text">
          <span class="logo-name">Sadini</span>
          <span class="logo-sub">STORE</span>
        </div>
      </RouterLink>

      <!-- Center Links — Desktop -->
      <div class="nav-links">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          active-class="nav-link--active"
        >
          {{ link.label }}
          <span class="nav-link-bar" />
        </RouterLink>
      </div>

      <!-- Right Actions -->
      <div class="nav-actions">

        <!-- Search -->
        <div class="search-wrap">
          <Transition name="search-expand">
            <input
              v-if="searchOpen"
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="search-input"
              @keyup.enter="submitSearch"
              @keyup.escape="closeSearch"
            />
          </Transition>
          <button
            class="icon-btn"
            :class="{ 'icon-btn--active': searchOpen }"
            @click="toggleSearch"
          >
            <svg v-if="!searchOpen" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <svg v-else width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Dark Mode -->
        <button class="icon-btn" :title="isDark ? 'Light mode' : 'Dark mode'" @click="$emit('toggleDark')">
          <Transition name="icon-swap" mode="out-in">
            <svg v-if="isDark" key="sun" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg v-else key="moon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          </Transition>
        </button>

        <!-- Wishlist -->
        <RouterLink to="/wishlist" class="icon-btn icon-btn--wishlist" title="Wishlist">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          <Transition name="badge-pop">
            <span v-if="wishlistCount > 0" class="badge badge--wish">{{ wishlistCount }}</span>
          </Transition>
        </RouterLink>

        <!-- Cart -->
        <button class="icon-btn icon-btn--cart" title="Cart" @click="$emit('openCart')">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <Transition name="badge-pop">
            <span v-if="cartCount > 0" class="badge badge--cart">{{ cartCount }}</span>
          </Transition>
        </button>

        <!-- Auth Pill -->
        <div class="auth-wrap">
          <button v-if="isLoggedIn" class="auth-btn auth-btn--out" @click="$emit('logout')">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Log out
          </button>
          <RouterLink v-else to="/login" class="auth-btn auth-btn--in">
            Sign in
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </RouterLink>
        </div>

        <!-- Hamburger -->
        <button
          class="hamburger"
          :class="{ 'hamburger--open': mobileOpen }"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <span /><span /><span />
        </button>

      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-drop">
      <div v-if="mobileOpen" class="mobile-menu">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="mobile-link"
          active-class="mobile-link--active"
          @click="mobileOpen = false"
        >
          <span class="mobile-link-icon">{{ link.icon }}</span>
          {{ link.label }}
        </RouterLink>
        <div class="mobile-divider" />
        <button v-if="isLoggedIn" class="mobile-link mobile-link--danger" @click="$emit('logout'); mobileOpen = false">
          <span class="mobile-link-icon">→</span> Log out
        </button>
        <RouterLink v-else to="/login" class="mobile-link" @click="mobileOpen = false">
          <span class="mobile-link-icon">✦</span> Sign in
        </RouterLink>
      </div>
    </Transition>

  </nav>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

defineProps<{
  cartCount: number
  wishlistCount: number
  isLoggedIn: boolean
  isDark: boolean
}>()

const emit = defineEmits<{
  openCart: []
  logout: []
  toggleDark: []
  search: [query: string]
}>()

const navLinks = [
  { to: '/',         label: 'Home',     icon: '⌂' },
  { to: '/products', label: 'Shop',     icon: '◈' },
  { to: '/wishlist', label: 'Wishlist', icon: '♡' },
]

const scrolled        = ref(false)
const mobileOpen      = ref(false)
const announceClosed  = ref(false)
const searchOpen      = ref(false)
const searchQuery     = ref('')
const searchInputRef  = ref<HTMLInputElement | null>(null)
const navRef          = ref<HTMLElement | null>(null)

const handleScroll = () => {
  scrolled.value = window.scrollY > 30
}

onMounted(()  => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    await nextTick()
    searchInputRef.value?.focus()
  }
}
const closeSearch  = () => { searchOpen.value = false; searchQuery.value = '' }
const submitSearch = () => { emit('search', searchQuery.value); closeSearch() }
</script>

<style scoped>
/* ── Navbar Shell ───────────────────────────────────────── */
.navbar {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 100;
}

.navbar--scrolled .nav-inner {
  background: rgba(8, 12, 22, 0.88);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
}

/* ── Announcement Bar ───────────────────────────────────── */
.announce-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 7px 48px;
  background: linear-gradient(90deg, #1a0a0f 0%, #200d13 50%, #1a0a0f 100%);
  border-bottom: 1px solid rgba(244, 63, 94, 0.15);
  font-size: 11.5px;
  color: #fda4af;
  letter-spacing: 0.02em;
  position: relative;
}

.announce-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #f43f5e;
  box-shadow: 0 0 8px #f43f5e;
  flex-shrink: 0;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.45; transform: scale(0.65); }
}

.announce-close {
  position: absolute; right: 14px;
  color: #fda4af; opacity: 0.5;
  display: flex;
  transition: opacity 0.2s;
  background: none; border: none; cursor: pointer;
  padding: 2px;
}
.announce-close:hover { opacity: 1; }

/* ── Inner Layout ───────────────────────────────────────── */
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px; 
  padding: 0 24px;
  max-width: 1280px;
  margin: 0 auto;
  transition: background 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease;
}

/* ── Logo (SCALED UP) ───────────────────────────────────── */
.logo {
  display: flex;
  align-items: center;
  gap: 14px; 
  text-decoration: none;
  flex-shrink: 0;
}

.logo-mark {
  position: relative;
  width: 48px; 
  height: 48px; 
  border-radius: 14px; 
  background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; 
  font-size: 24px; 
  color: white;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(244, 63, 94, 0.4);
  transition: box-shadow 0.2s, transform 0.2s;
}

.logo:hover .logo-mark {
  box-shadow: 0 6px 20px rgba(244, 63, 94, 0.6);
  transform: rotate(-4deg) scale(1.05);
}

.logo-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3), transparent 70%);
}

.logo-text {
  display: flex; flex-direction: column;
  line-height: 1; gap: 4px;
}

.logo-name {
  font-size: 22px; 
  font-weight: 900;
  color: #f8fafc;
  letter-spacing: -0.02em;
}

.logo-sub {
  font-size: 11px; 
  font-weight: 800;
  color: #f43f5e;
  letter-spacing: 0.25em; 
}

/* ── Nav Links ──────────────────────────────────────────── */
.nav-links {
  display: none;
  align-items: center;
  gap: 4px;
}

@media (min-width: 768px) {
  .nav-links { display: flex; }
}

.nav-link {
  position: relative;
  padding: 6px 14px;
  font-size: 13.5px; font-weight: 600;
  color: #64748b;
  text-decoration: none;
  border-radius: 8px;
  letter-spacing: 0.01em;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.05);
}

.nav-link--active { color: #f8fafc; }

.nav-link-bar {
  position: absolute;
  bottom: 3px; left: 14px; right: 14px;
  height: 2px;
  border-radius: 99px;
  background: linear-gradient(90deg, #f43f5e, #fb7185);
  transform: scaleX(0);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: left;
}

.nav-link:hover .nav-link-bar,
.nav-link--active .nav-link-bar {
  transform: scaleX(1);
}

/* ── Right Actions ──────────────────────────────────────── */
.nav-actions {
  display: flex; align-items: center; gap: 4px;
}

/* ── Icon Buttons ───────────────────────────────────────── */
.icon-btn {
  position: relative;
  width: 38px; height: 38px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: #64748b;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, border-color 0.2s, transform 0.15s;
}

.icon-btn:hover {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.icon-btn--active {
  color: #f43f5e !important;
  border-color: rgba(244, 63, 94, 0.35) !important;
  background: rgba(244, 63, 94, 0.08) !important;
}

.icon-btn--wishlist:hover { color: #fb7185; border-color: rgba(251, 113, 133, 0.3); }

/* ── Badge ──────────────────────────────────────────────── */
.badge {
  position: absolute;
  top: -5px; right: -5px;
  min-width: 17px; height: 17px;
  padding: 0 4px;
  border-radius: 99px;
  font-size: 10px; font-weight: 800;
  color: white;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #080c16;
}

.badge--cart { background: #f43f5e; box-shadow: 0 0 10px rgba(244, 63, 94, 0.5); }
.badge--wish { background: #fb7185; }

/* ── Search ─────────────────────────────────────────────── */
.search-wrap {
  display: flex; align-items: center; gap: 4px;
}

.search-input {
  width: 200px; height: 38px;
  padding: 0 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input::placeholder { color: #475569; }
.search-input:focus {
  border-color: rgba(244, 63, 94, 0.5);
  box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.1);
}

/* ── Auth ───────────────────────────────────────────────── */
.auth-wrap { display: none; margin-left: 4px; }

@media (min-width: 640px) {
  .auth-wrap { display: flex; }
}

.auth-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 0 16px; height: 36px;
  border-radius: 10px;
  font-size: 13px; font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.auth-btn--in {
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  color: white;
  box-shadow: 0 4px 16px rgba(244, 63, 94, 0.3);
}
.auth-btn--in:hover {
  box-shadow: 0 6px 24px rgba(244, 63, 94, 0.5);
  transform: translateY(-1px);
}

.auth-btn--out {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #64748b;
}
.auth-btn--out:hover {
  color: #fda4af;
  border-color: rgba(244, 63, 94, 0.3);
  background: rgba(244, 63, 94, 0.06);
}

/* ── Hamburger ──────────────────────────────────────────── */
.hamburger {
  display: flex; flex-direction: column; gap: 5px;
  padding: 8px; cursor: pointer;
  background: none; border: none;
  margin-left: 4px;
}
@media (min-width: 768px) { .hamburger { display: none; } }

.hamburger span {
  display: block;
  width: 20px; height: 2px;
  border-radius: 2px;
  background: #64748b;
  transform-origin: center;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.hamburger:hover span { background: #f8fafc; }
.hamburger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #f43f5e; }
.hamburger--open span:nth-child(2) { transform: scaleX(0); opacity: 0; }
.hamburger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #f43f5e; }

/* ── Mobile Menu ────────────────────────────────────────── */
.mobile-menu {
  padding: 8px 12px 16px;
  background: rgba(8, 12, 22, 0.97);
  backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
@media (min-width: 768px) { .mobile-menu { display: none; } }

.mobile-link {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 14px; font-weight: 600;
  color: #64748b;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  cursor: pointer;
  border: none; background: none;
  width: 100%; text-align: left;
}
.mobile-link:hover         { background: rgba(255,255,255,0.05); color: #f8fafc; }
.mobile-link--active       { color: #f43f5e; }
.mobile-link--danger:hover { color: #fda4af; }

.mobile-link-icon { width: 22px; text-align: center; font-size: 13px; opacity: 0.6; }

.mobile-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin: 6px 14px;
}

/* ── Transitions ────────────────────────────────────────── */
.announce-enter-active, .announce-leave-active { transition: all 0.3s ease; }
.announce-enter-from, .announce-leave-to       { opacity: 0; transform: translateY(-100%); }

.search-expand-enter-active, .search-expand-leave-active {
  transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}
.search-expand-enter-from, .search-expand-leave-to {
  opacity: 0; width: 0 !important;
}

.icon-swap-enter-active, .icon-swap-leave-active { transition: all 0.18s ease; }
.icon-swap-enter-from  { opacity: 0; transform: rotate(-30deg) scale(0.6); }
.icon-swap-leave-to    { opacity: 0; transform: rotate(30deg)  scale(0.6); }

.badge-pop-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.badge-pop-leave-active { transition: all 0.15s ease; }
.badge-pop-enter-from, .badge-pop-leave-to { opacity: 0; transform: scale(0); }

.mobile-drop-enter-active { transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1); }
.mobile-drop-leave-active { transition: all 0.2s ease; }
.mobile-drop-enter-from, .mobile-drop-leave-to { opacity: 0; transform: translateY(-10px); }

/* ── LIGHT MODE OVERRIDES ───────────────────────────────── */
/* These rules seamlessly switch the text and icon colors to a dark, readable slate when in Light Mode */
.navbar--light .logo-name {
  color: #0f172a;
}
.navbar--light .nav-link {
  color: #475569;
}
.navbar--light .nav-link:hover,
.navbar--light .nav-link--active {
  color: #0f172a;
}
.navbar--light .icon-btn {
  color: #475569;
}
.navbar--light .icon-btn:hover {
  color: #0f172a;
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.08);
}
.navbar--light .search-input {
  color: #0f172a;
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.1);
}
.navbar--light .search-input::placeholder {
  color: #64748b;
}
.navbar--light .hamburger:hover span {
  background: #0f172a;
}
.navbar--light.navbar--scrolled .nav-inner {
  background: rgba(255, 255, 255, 0.88);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.navbar--light .auth-btn--out {
  color: #475569;
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}
.navbar--light .auth-btn--out:hover {
  color: #0f172a;
  background: rgba(0, 0, 0, 0.06);
}
.navbar--light .mobile-menu {
  background: rgba(255, 255, 255, 0.97);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.navbar--light .mobile-link {
  color: #475569;
}
.navbar--light .mobile-link:hover {
  background: rgba(0, 0, 0, 0.03);
  color: #0f172a;
}
.navbar--light .mobile-link--active {
  color: #f43f5e;
}
.navbar--light .mobile-divider {
  background: rgba(0, 0, 0, 0.05);
}
</style>