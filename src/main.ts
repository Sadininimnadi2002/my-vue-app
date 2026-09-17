import { createApp } from 'vue'
import './style.css' // Assuming you have a global style file like this for Tailwind
import App from './App.vue'
import router from './router' // Import the router configuration

const app = createApp(App)

// Tell the Vue app to use the router
app.use(router)

// Mount the app to the DOM
app.mount('#app')