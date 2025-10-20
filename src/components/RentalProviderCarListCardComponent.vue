<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const { carId, brand, model, image, pricePerDay } = defineProps({
  carId: [String, Number],
  brand: String,
  model: String,
  image: String,
  pricePerDay: [String, Number]
});

const placeholderImage =
  'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';

function goToDetails() {
  router.push(`/rental-provider/update-car/${carId}`);
}
</script>

<template>
  <div class="car-card">
    <div class="car-image">
      <img :src="image || placeholderImage" :alt="`${brand} ${model}`" />
      <div v-if="!image" class="no-image-overlay">No Image Available</div>
    </div>

    <div class="car-info">
      <h2 class="car-make">{{ brand }}</h2>
      <p class="car-model">{{ model }}</p>

      <div class="car-footer">
        <p class="car-price">
          R{{ pricePerDay }} <span class="per-day">/day</span>
        </p>
        <button class="details-btn" @click="goToDetails">
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.car-card {
  width: 280px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  transition: all 0.3s ease;
}

.car-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.car-image {
  position: relative;
  width: 100%;
  height: 180px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.car-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(60, 60, 60, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
}

.car-info {
  padding: 1rem 1.2rem;
}

.car-make {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 0.2rem;
}

.car-model {
  color: #6b6b6b;
  font-size: 1rem;
  margin-bottom: 0.8rem;
}

.car-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.car-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #c4001d;
}

.per-day {
  font-size: 0.8rem;
  color: #777;
  font-weight: 400;
}

.details-btn {
  background-color: #c4001d;
  color: white;
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.25s ease;
}

.details-btn:hover {
  background-color: #a70018;
}
</style>
