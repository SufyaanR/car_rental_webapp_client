
<script setup>
import RentalProviderHeader from "../components/RentalProviderHeader.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="wrapper">
    <RentalProviderHeader/>
      <div class="content">
        <router-view />
      </div>
    <Footer/>
  </div>
</template>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>