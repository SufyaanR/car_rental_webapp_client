<script setup>
import RentalProviderCarlistComponent from "../components/RentalProviderCarlistComponent.vue";
</script>

<template>
  <div class="rental-provider-carlist-page">
    <h1 class="title">My Car Listings</h1>
    <RentalProviderCarlistComponent />
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 0;
}
</style>
