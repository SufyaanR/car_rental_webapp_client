<script setup>
import RentalProviderCarListCardComponent from './RentalProviderCarListCardComponent.vue';
import { ref, onMounted } from 'vue';
import { getUserCars } from '../routes/routes.js';

const cars = ref([]);
const userId = localStorage.getItem('authenticatedUserId');
const userType = localStorage.getItem('userType');

onMounted(async () => {
  try {
    if (userId && userType) {
      cars.value = await getUserCars(userId, userType.toLowerCase());
    }
  } catch (error) {
    console.error('Failed to load cars:', error);
  }
});

function getCarImage(car) {
  if (car.image) {
    return `data:image/jpeg;base64,${car.image}`;
  }
  return null; 
}
</script>

<template>
  <div class="car-list-container">
    <h1 class="title">My Cars</h1>

    <div class="car-grid">
      <RentalProviderCarListCardComponent
        v-for="car in cars"
        :key="car.carId"
        :carId="car.carId"
        :brand="car.brand"
        :model="car.model"
        :image="getCarImage(car)"
        :pricePerDay="car.pricePerDay"
      />
    </div>

    <p v-if="cars.length === 0" class="empty-message">
      You have no cars listed yet.
    </p>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.car-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  row-gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.car-grid > * {
  flex: 1 1 calc(25% - 2rem);
  max-width: 320px;
  min-width: 260px;
}

.empty-message {
  text-align: center;
  color: #777;
  font-size: 1.2rem;
  margin-top: 2rem;
}
</style>
