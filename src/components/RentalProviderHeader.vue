<script setup>
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
      <router-link to="/login">Logout</router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

// Replace this with actual logged-in user's ID dynamically
const userId = ref(123);
</script>

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

.nav-links a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.nav-links a:hover,
.nav-links .router-link-active {
  color: #282121;
  font-weight: bold;
}
</style>
