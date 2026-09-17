<template>
  <footer class="footer-wrapper" :class="{ 'is-dark': isDark }">
    <div class="footer-inner">
      
      <!-- COLUMN 1: Brand & Newsletter -->
      <div class="footer-col col-brand">
        <RouterLink to="/" class="logo" @click="window.scrollTo({ top: 0, behavior: 'smooth' })">
          <div class="logo-mark">
            <span>S</span>
          </div>
          <div class="logo-text">
            <span class="logo-name">Sadini</span>
            <span class="logo-sub">STORE</span>
          </div>
        </RouterLink>
        
        <p class="footer-text mt-4">
          Redefining modern living with a curated selection of premium essentials.
        </p>
        
        <div class="newsletter-wrap mt-6">
          <input type="email" placeholder="JOIN THE INNER CIRCLE." class="newsletter-input" />
          <button class="newsletter-btn" title="Subscribe">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- COLUMN 2: Shop Links -->
      <div class="footer-col col-center">
        <h4 class="footer-heading">SHOP</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">THE CATALOG</a></li>
          <li><a href="#" class="footer-link">BEST SELLERS</a></li>
        </ul>
      </div>

      <!-- COLUMN 3: Connect Links -->
      <div class="footer-col col-center">
        <h4 class="footer-heading">CONNECT</h4>
        <ul class="footer-links">
          <li>
            <a href="#" class="footer-link">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              INSTAGRAM
            </a>
          </li>
          <li>
            <a href="#" class="footer-link">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              FACEBOOK
            </a>
          </li>
          <li>
            <a href="#" class="footer-link">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              WHATSAPP
            </a>
          </li>
          <li>
            <a href="#" class="footer-link">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              EMAIL US
            </a>
          </li>
        </ul>
      </div>

      <!-- COLUMN 4: Flagship Store & Map -->
      <div class="footer-col col-map">
        <h4 class="footer-heading">FLAGSHIP STORE</h4>
        <p class="footer-text mb-4">
          RUHUNUPURA<br/>
          WESTERN PROVINCE<br/>
          SRI LANKA
        </p>
        
        <!-- Clickable Map Container -->
        <a 
          href="https://www.google.com/maps/place/Colombo,+Sri+Lanka" 
          target="_blank" 
          class="map-container group"
          title="Open in Google Maps"
        >
          <!-- Map Overlay UI -->
          <div class="map-overlay-badge">
            Maps
            <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </div>
          
          <!-- Embedded Google Map -->
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162586711!2d79.77380312675902!3d6.921833529323062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk" 
            width="100%" 
            height="140" 
            style="border:0;" 
            allowfullscreen="false" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            class="map-iframe"
          ></iframe>
        </a>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  isDark?: boolean
}>()
</script>

<style scoped>
/* ── Ambient Mixed Background Styling (Matches Hero Section) ── */
.footer-wrapper {
  position: relative;
  overflow: hidden;
  /* Light mode ambient mix */
  background:
    radial-gradient(circle at 15% 100%, rgba(244,63,94,0.04) 0%, transparent 50%),
    radial-gradient(circle at 85% 0%, rgba(99,102,241,0.04) 0%, transparent 50%),
    var(--bg);
  border-top: 1px solid var(--glass-border);
  margin-top: 60px;
  width: 100%;
  transition: background 0.4s ease, border-color 0.4s ease;
}

.footer-wrapper.is-dark {
  /* Dark mode ambient mix (matches your screenshot exactly) */
  background:
    radial-gradient(circle at 15% 100%, rgba(235, 101, 124, 0.08) 0%, transparent 60%),
    radial-gradient(circle at 85% 0%, rgba(93, 95, 224, 0.06) 0%, transparent 60%),
    var(--bg);
}

/* ── Perfectly Justified Grid Layout ── */
.footer-inner {
  position: relative;
  z-index: 2;
  max-width: 1340px;
  margin: 0 auto;
  padding: 80px 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
}

@media (min-width: 768px) {
  .footer-inner {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-inner {
    grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
    gap: 32px;
  }
  
  .col-brand { justify-self: start; }
  .col-center { justify-self: center; }
  .col-map { justify-self: end; width: 100%; max-width: 300px; }
}

/* ── Logo ── */
.logo {
  display: flex; align-items: center; gap: 12px; text-decoration: none;
}
.logo-mark {
  width: 42px; height: 42px; border-radius: 12px;
  background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 20px; color: white;
  box-shadow: 0 4px 14px rgba(244, 63, 94, 0.4);
}
.logo-text { display: flex; flex-direction: column; line-height: 1; gap: 4px; }
.logo-name { font-size: 20px; font-weight: 900; color: var(--text); letter-spacing: -0.02em; transition: color 0.4s ease; }
.logo-sub { font-size: 10px; font-weight: 800; color: var(--rose); letter-spacing: 0.25em; }

/* ── Typography & Spacing helpers ── */
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mb-4 { margin-bottom: 16px; }

.footer-text {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
  max-width: 280px;
  transition: color 0.4s ease;
}

.footer-heading {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--text);
  margin-bottom: 24px;
  transition: color 0.4s ease;
}

.footer-links {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.footer-link:hover {
  color: var(--rose);
  transform: translateX(4px);
}

/* ── Newsletter Pill ── */
.newsletter-wrap {
  display: flex;
  align-items: center;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 6px;
  border-radius: 99px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.4s ease;
  max-width: 320px;
}

.newsletter-wrap:focus-within {
  border-color: rgba(244, 63, 94, 0.4);
  box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.1);
}

.newsletter-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 0 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text);
  transition: color 0.4s ease;
}

.newsletter-input::placeholder {
  color: var(--muted);
  opacity: 0.7;
}

.newsletter-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.newsletter-btn:hover {
  transform: scale(1.05) rotate(-15deg);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.6);
}

/* ── Map Styling ── */
.map-container {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 20px var(--glass-hover);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.4s ease;
}

.map-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px var(--glass-hover);
}

.map-overlay-badge {
  position: absolute;
  top: 12px; left: 12px;
  z-index: 10;
  background: var(--surface);
  color: var(--text);
  font-size: 11px; font-weight: 700;
  padding: 6px 10px;
  border-radius: 6px;
  display: flex; align-items: center; gap: 6px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid var(--glass-border);
  transition: color 0.2s ease, background 0.4s ease;
}

.map-container:hover .map-overlay-badge {
  color: var(--rose);
}

.map-iframe {
  pointer-events: none;
  filter: grayscale(100%) opacity(0.8);
  transition: filter 0.5s ease;
}

.map-container:hover .map-iframe {
  filter: grayscale(0%) opacity(1);
}
</style>