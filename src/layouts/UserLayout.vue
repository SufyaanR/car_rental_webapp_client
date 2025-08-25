
<script setup>
import UserHeader from "../components/UserHeader.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="wrapper">
  <UserHeader />
    <router-view />
  <Footer />
  </div>
</template>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>