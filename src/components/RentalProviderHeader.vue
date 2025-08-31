
<script setup>

</script>

<template>
  <header class="navbar">
    <a href="/" class="logo">
      <i class="fas fa-car-side"></i>
    </a>

    <nav class="nav-links">
      <a href="/about">Create Rental</a>
      <a href="/contact">View Bookings</a>
      <a href="/rent">View Payments</a>
      <a href="/list">My Account</a>
      <a href="/login">Login</a>
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

.nav-links a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}

</style>