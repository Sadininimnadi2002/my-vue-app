import { createRouter, createWebHistory } from 'vue-router'

// 1. Import your view components
import HomeView from '../views/Home.vue' // Updated to point to your new Home view!
import LoginView from '../views/Login.vue' 

// 2. Define your routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

// 3. Create the router instance
const router = createRouter({
  history: createWebHistory(), // This creates clean URLs without the '#' symbol
  routes,
  // This makes sure the page scrolls to the top when navigating between routes
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router