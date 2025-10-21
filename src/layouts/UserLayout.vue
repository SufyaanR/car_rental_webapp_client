<script setup>
import RentalProviderHeader from "../components/RentalProviderHeader.vue";
import Footer from "../components/Footer.vue";
import UserHeader from "../components/UserHeader.vue";
</script>

<template>
  <div class="wrapper">
    <UserHeader />

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

.content {
  flex: 1;
  padding-top: 120px; 
  padding-bottom: 90px;
  overflow-y: auto;
}

.wrapper > header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.wrapper > footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
</style>
