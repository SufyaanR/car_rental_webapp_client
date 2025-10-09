<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCar } from "../routes/routes.js";
import RentalProviderUpdateComponent from "../components/RentalProviderUpdateComponent.vue";

const route = useRoute();
const carId = route.params.id;
const car = ref(null);

onMounted(async () => {
  try {
    car.value = await getCar(carId);
    console.log("Fetched car:", car.value);
  } catch (err) {
    console.error("Error fetching car:", err);
    alert("Failed to load car");
  }
});
</script>

<template>
  <div class="page-wrapper">
    <h1>Update Car</h1>
    <div v-if="car">
      <RentalProviderUpdateComponent :initialCar="car" />
    </div>
    <div v-else>
      <p>Loading car data...</p>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  padding: 20px;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  margin-bottom: 30px;
}
</style>
