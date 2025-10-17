<script setup>
import router from "../router/index.js";
import { ref } from "vue";

function logout() {
  localStorage.clear();
  router.replace('/auth/login');
}
const userId = ref(localStorage.getItem("authenticatedUserId"));
</script>

<template>
  <header class="navbar">
    <router-link to="/rental-provider/create" class="logo">
      <i class="fas fa-car-side"></i>
    </router-link>

    <nav class="nav-links">
      <router-link to="/rental-provider/create">Create Rental</router-link>
      <router-link :to="`/rental-provider/bookings/${userId}`">View Bookings</router-link>
      <router-link :to="`/rental-provider/payments/${userId}`">View Payments</router-link>
      <router-link to="/rental-provider/my-account">My Account</router-link>
      <button @click="logout" class="logout-btn">Logout</button>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #7F0000;
  padding: 10px 30px;
  width: 100%;
}

.logo {
  font-size: 2rem;
  color: white;
  text-decoration: none;
}

.logo i {
  transition: transform 0.2s ease;
}

.logo:hover i {
  transform: scale(1.1);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a,
.nav-links .router-link-active,
.logout-btn {
  color: white;
  font-weight: bold;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-links a:hover,
.logout-btn:hover {
  color: #282121;
}
</style>
