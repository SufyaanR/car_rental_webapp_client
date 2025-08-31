<script setup>
import RentalProviderHeader from "../components/RentalProviderHeader.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="wrapper">
    <RentalProviderHeader />

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
  padding: 90px 20px 90px;
  overflow-y: auto;
  background: #fff;
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
