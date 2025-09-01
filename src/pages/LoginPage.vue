<script setup>
import LoginComponent from "../components/LoginComponent.vue";
</script>

<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <!-- Title -->
    <h2 class="mb-5 fw-bold text-center">Login</h2>

    <!-- Login Form -->
    <LoginComponent />
  </div>
</template>

<style scoped>
/* Push title a bit higher so there's space */
h2 {
  margin-top: 40px;
}
</style>

