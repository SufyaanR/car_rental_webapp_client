<script setup>
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="wrapper">
    <header class="navbar">
      <div class="logo">
        <i class="fas fa-car-side"></i>
      </div>
    </header>

    <div class="content">
      <router-view />
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.wrapper > header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 8vh;
}

.wrapper > footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #7F0000;
  padding: 10px 30px;
  width: 100%;
}

.logo{
  font-size: 2rem;
}

.logo i {
  transition: transform 0.2s ease;
}

.logo:hover i {
  transform: scale(1.1);
}
</style>
