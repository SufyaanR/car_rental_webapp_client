
<script setup>

</script>

<template>
  <header class="navbar">
    <!-- Logo Icon Link -->
    <a href="/" class="logo">
      <i class="fas fa-car-side"></i>
    </a>

    <!-- Nav Links -->
    <nav class="nav-links">
      <a href="/about">Home</a>
      <a href="/contact">Rent Cars</a>
      <a href="/rent">Contact Us</a>
      <a href="/list">About Us</a>
      <a href="/login">Login</a>
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

.nav-links a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}

.divider {
  color: white;
  margin: 0 5px;
}
</style>