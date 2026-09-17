import { ref, watch } from 'vue';

// 1. Load the user from memory if they already logged in before
const savedUser = localStorage.getItem('auth_user');
const currentUser = ref(savedUser ? JSON.parse(savedUser) : null);
const isLoggedIn = ref(!!savedUser);

// 2. Automatically save session changes to browser memory so they don't get logged out on refresh
watch(currentUser, (newVal) => {
  if (newVal) {
    localStorage.setItem('auth_user', JSON.stringify(newVal));
  } else {
    localStorage.removeItem('auth_user');
  }
}, { deep: true });

export function useAuth() {
  
  // Handles Logging In
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate a brief loading state to match the premium spinner animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Basic validation (In a production app, you would verify this against a database)
    if (email && password.length >= 6) {
      currentUser.value = { 
        email, 
        name: email.split('@')[0], // Creates a default name based on their email
        joined: new Date().toISOString()
      };
      isLoggedIn.value = true;
      return true;
    }
    return false;
  };

  // Handles Creating a New Account
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if the user filled out all fields and has a secure password
    if (name && email && password.length >= 6) {
      currentUser.value = { 
        email, 
        name, 
        joined: new Date().toISOString() 
      };
      isLoggedIn.value = true;
      return true;
    }
    return false;
  };

  // Handles Logging Out
  const logout = () => {
    currentUser.value = null;
    isLoggedIn.value = false;
  };

  return {
    isLoggedIn,
    currentUser,
    login,
    signup,
    logout
  };
}