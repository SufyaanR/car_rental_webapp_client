<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <!-- Logo Icon Link -->
    <RouterLink to="/user/home" class="logo">
      <i class="fas fa-car-side"></i>
    </RouterLink>

    <!-- Nav Links -->
    <nav class="nav-links">
      <RouterLink to="/user/home">Home</RouterLink>
      <RouterLink to="/user/cars">Rent Cars</RouterLink>
      <RouterLink to="/user/contact">Contact Us</RouterLink>
      <RouterLink to="/user/about-us">About Us</RouterLink>
      <RouterLink to="/user/login">Login</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #7F0000; /* dark red */
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
.nav-links .router-link-active {
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
