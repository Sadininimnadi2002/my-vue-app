<template>
  <div class="auth-page">
    
    <!-- Ambient Background -->
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="dot-matrix-overlay" />

    <!-- Back to Store Button -->
    <RouterLink to="/" class="back-btn">
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Return to Store
    </RouterLink>

    <div class="auth-container animate-fade-in-up">
      <!-- Premium Glass Card -->
      <div class="auth-card">
        
        <!-- Left Side: Visual Branding -->
        <div class="auth-visual">
          <div class="visual-content">
            <div class="logo-mark mb-6">
              <span>S</span>
            </div>
            <h2 class="visual-title">Unlock Premium<br/>Essentials.</h2>
            <p class="visual-sub">Join our exclusive circle to curate your personal wishlist, track orders, and access member-only collections.</p>
          </div>
          <div class="visual-overlay"></div>
        </div>

        <!-- Right Side: Forms -->
        <div class="auth-form-area">
          
          <!-- Mode Toggle (Login vs Signup) -->
          <div class="auth-toggle">
            <button :class="{ active: mode === 'login' }" @click="mode = 'login'">Sign In</button>
            <button :class="{ active: mode === 'signup' }" @click="mode = 'signup'">Create Account</button>
          </div>

          <h3 class="form-title">{{ mode === 'login' ? 'Welcome Back' : 'Join the Circle' }}</h3>
          <p class="form-sub">{{ mode === 'login' ? 'Enter your details to access your account.' : 'Set up your exclusive account in seconds.' }}</p>

          <form @submit.prevent="handleSubmit" class="auth-form">
            
            <!-- Name Input (Only for Signup) -->
            <div class="input-group" v-if="mode === 'signup'">
              <label>Full Name</label>
              <input v-model="form.name" type="text" placeholder="e.g. Jane Doe" required />
            </div>

            <!-- Email Input -->
            <div class="input-group">
              <label>Email Address</label>
              <input v-model="form.email" type="email" placeholder="name@example.com" required />
            </div>

            <!-- Password Input -->
            <div class="input-group">
              <div class="flex justify-between">
                <label>Password</label>
                <a href="#" v-if="mode === 'login'" class="forgot-link">Forgot?</a>
              </div>
              <input v-model="form.password" type="password" placeholder="Min. 6 characters" required minlength="6" />
            </div>

            <!-- Error Message -->
            <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

            <!-- Submit Button -->
            <button type="submit" class="submit-btn" :disabled="isLoading">
              <span v-if="!isLoading">{{ mode === 'login' ? 'Sign In' : 'Create Account' }}</span>
              <svg v-else class="spinner" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.25" />
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
              </svg>
            </button>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { login, signup } = useAuth();

const mode = ref<'login' | 'signup'>('login');
const isLoading = ref(false);
const errorMsg = ref('');

const form = ref({
  name: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  isLoading.value = true;
  errorMsg.value = '';
  
  let success = false;
  
  try {
    if (mode.value === 'login') {
      success = await login(form.value.email, form.value.password);
    } else {
      success = await signup(form.value.name, form.value.email, form.value.password);
    }

    if (success) {
      // Redirect back to the store homepage upon success
      router.push('/');
    } else {
      errorMsg.value = 'Invalid credentials or password too short.';
    }
  } catch (err) {
    errorMsg.value = 'An error occurred. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* ── Page Layout ────────────────────────────────────────── */
.auth-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  overflow: hidden;
  padding: 24px;
}

/* Background Blobs (Matches App.vue) */
.blob {
  position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.15;
}
.blob-1 { width: 500px; height: 500px; background: #f43f5e; top: -100px; left: -100px; }
.blob-2 { width: 600px; height: 600px; background: #6366f1; bottom: -100px; right: -100px; }
.dot-matrix-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(var(--grid-dot) 1.5px, transparent 1.5px);
  background-size: 32px 32px;
}

/* ── Back Button ────────────────────────────────────────── */
.back-btn {
  position: absolute;
  top: 40px; left: 40px;
  z-index: 10;
  display: flex; align-items: center; gap: 8px;
  color: var(--muted);
  font-weight: 700; font-size: 14px;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
}
.back-btn:hover { color: var(--text); transform: translateX(-4px); }

/* ── Auth Card & Split Layout ───────────────────────────── */
.auth-container {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 1000px;
}

.auth-card {
  display: flex;
  flex-direction: column;
  background: var(--glass-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  border-radius: 32px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.15);
  overflow: hidden;
}

@media (min-width: 860px) {
  .auth-card { flex-direction: row; min-height: 600px; }
}

/* ── Left Side: Visual Branding ─────────────────────────── */
.auth-visual {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  padding: 48px;
  display: flex; flex-direction: column; justify-content: flex-end;
  overflow: hidden;
}

@media (max-width: 859px) { .auth-visual { padding: 32px; min-height: 250px; } }

.visual-content { position: relative; z-index: 2; }

.logo-mark {
  width: 48px; height: 48px; border-radius: 14px;
  background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 24px; color: white;
  box-shadow: 0 8px 24px rgba(244, 63, 94, 0.4);
}

.visual-title {
  font-size: 2.5rem; font-weight: 900; color: white;
  line-height: 1.1; letter-spacing: -0.04em; margin-bottom: 16px;
}
.visual-sub {
  font-size: 15px; color: rgba(255,255,255,0.7);
  line-height: 1.6; max-width: 320px;
}

.visual-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 100% 0%, rgba(244,63,94,0.3) 0%, transparent 60%);
}

/* ── Right Side: Forms ──────────────────────────────────── */
.auth-form-area {
  flex: 1;
  padding: 48px;
  display: flex; flex-direction: column; justify-content: center;
  background: var(--surface);
}

@media (max-width: 859px) { .auth-form-area { padding: 32px 24px; } }

/* Toggle */
.auth-toggle {
  display: flex; gap: 8px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 6px; border-radius: 16px;
  margin-bottom: 40px;
  width: fit-content;
}
.auth-toggle button {
  padding: 10px 24px; font-size: 13px; font-weight: 700;
  color: var(--muted); border-radius: 12px;
  border: none; background: transparent; cursor: pointer;
  transition: all 0.2s;
}
.auth-toggle button.active {
  background: var(--card); color: var(--text);
  box-shadow: 0 4px 12px var(--glass-hover);
}

/* Typography */
.form-title { font-size: 2rem; font-weight: 900; color: var(--text); letter-spacing: -0.03em; margin-bottom: 8px; }
.form-sub { font-size: 14px; color: var(--muted); margin-bottom: 32px; }

/* Inputs */
.auth-form { display: flex; flex-direction: column; gap: 20px; }

.input-group label {
  display: block; font-size: 12px; font-weight: 800;
  color: var(--text); letter-spacing: 0.05em; text-transform: uppercase;
  margin-bottom: 8px;
}

.input-group input {
  width: 100%; padding: 16px;
  background: var(--bg); border: 1px solid var(--glass-border);
  border-radius: 14px; color: var(--text); font-size: 14px;
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
}

.input-group input:focus {
  border-color: rgba(244, 63, 94, 0.5);
  box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.1);
}

.forgot-link {
  font-size: 12px; font-weight: 700; color: var(--rose);
  text-decoration: none; transition: opacity 0.2s;
}
.forgot-link:hover { opacity: 0.8; }

.error-msg {
  color: var(--rose); font-size: 13px; font-weight: 600;
  padding: 12px; background: rgba(244,63,94,0.1); border-radius: 10px;
}

/* Submit Button */
.submit-btn {
  margin-top: 10px; padding: 18px; border-radius: 14px;
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  color: white; font-size: 15px; font-weight: 800; border: none;
  cursor: pointer; display: flex; justify-content: center; align-items: center;
  box-shadow: 0 8px 24px rgba(244,63,94,0.3); transition: transform 0.2s, box-shadow 0.2s;
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px); box-shadow: 0 12px 32px rgba(244,63,94,0.45);
}
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

/* Loading Spinner */
.spinner {
  width: 24px; height: 24px;
  animation: spin 1s linear infinite;
}
@keyframes spin { 100% { transform: rotate(360deg); } }

/* Animations */
.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
</style>