<script setup>
import CarListCardComponent from "../components/CarListCardComponent.vue";
import { ref, onMounted } from "vue";
import { getAllCars } from "../routes/routes.js";

const cars = ref([]);

onMounted(async () => {
  try {
    cars.value = await getAllCars();
  } catch (error) {
    console.error("Failed to load cars:", error);
  }
});

function getCarImage(car) {
  if (car.image) {
    return `data:image/jpeg;base64,${car.image}`;
  }
  return "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
}
</script>

<template>
  <div class="car-list-container">
    <h1 class="title">Available Cars</h1>

    <div class="car-grid">
      <CarListCardComponent
          v-for="car in cars"
          :key="car.carId"
          :carId="car.carId"
          :brand="car.brand"
          :model="car.model"
          :image="getCarImage(car)"
          :pricePerDay="car.pricePerDay"
      />
    </div>
  </div>
</template>

<style scoped>

/* title styling */
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

/* flex container */
.car-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  row-gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* ensure cards have consistent size */
.car-grid > * {
  flex: 1 1 calc(25% - 2rem); /* 4 per row */
  max-width: 320px;
  min-width: 260px;
}
</style>
