<script setup>
import SignUpComponent from "../components/SignUpComponent.vue";
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <!-- Sign Up Title -->
    <h2 class="signup-title">Sign Up</h2>

    <!-- Form -->
    <SignUpComponent />
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}

.signup-title {
  margin-top: 40px;   /* pushes title down from top */
  margin-bottom: 20px; /* adds space below title */
  font-weight: bold;
}
</style>
