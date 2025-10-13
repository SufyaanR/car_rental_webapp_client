<script setup>
import {onMounted, ref} from "vue";
import {getCar} from "../routes/routes.js";
import {useRoute} from "vue-router";


const route = useRoute();
const carId = ref(route.params.id); // get id from URL

const car = ref({
  image: null,
  brand: '',
  model: '',
  type: '',
  pricePerDay: 0,
  seatCapacity: 0,
  bootCapacity: 0,
  engineCapacity: 0,
  transmission: '',
  description: '',
  collectionLocation: ''
});

onMounted(async () => {
  car.value = await getCar(carId.value);
});
</script>

<template>
  <div class="form-wrapper" v-if="car">
    <h1>View Car Details</h1>
    <div class="form-content">
      <div class="imageContainer">
        <img v-if="car.image" :src="'data:image/jpeg;base64,' + car.image" alt="Rental Car Image" />
        <img v-else src="https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png" alt="Rental Car Image"/>
      </div>

      <div class="inputContainer">
        <div class="form-group">
          <label>Brand</label>
          <span>{{car.brand}}</span>
        </div>

        <div class="form-group">
          <label>Model</label>
          <span>{{car.model}}</span>
        </div>

        <div class="form-group">
          <label>Type</label>
          <span>{{car.type}}</span>
        </div>

        <div class="form-group">
          <label>Price Per Day</label>
          <span>{{car.pricePerDay}}</span>
        </div>

        <div class="form-group">
          <label>Seat Capacity</label>
          <span>{{car.seatCapacity}}</span>
        </div>

        <div class="form-group">
          <label>Boot Capacity</label>
          <span>{{car.bootCapacity}}</span>
        </div>

        <div class="form-group">
          <label>Engine Capacity</label>
          <span>{{car.engineCapacity}}</span>
        </div>

        <div class="form-group">
          <label>Transmission</label>
          <span>{{car.transmission}}</span>
        </div>

        <div class="form-group full-width">
          <label>Collection Location</label>
          <span>{{car.collectionLocation}}</span>
        </div>

        <div class="form-group full-width">
          <label>Description</label>
          <span>{{car.description}}</span>
        </div>

        <div class="button-row">
          <button class="add">Book Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  background: #1a1a1a;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 30px;
  width: 90vw;
  border: 1px solid #333;
}

.form-wrapper h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #e0e0e0;
  font-size: 2.2rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.form-content {
  display: flex;
  gap: 30px;
}

.imageContainer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10%;
}

.imageContainer img {
  width: 100%;
  max-width: 80%;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  filter: brightness(0.9);
}

.inputContainer {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  background: #2d2d2d;
  padding: 15px;
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid #3d3d3d;
}

.form-group:hover {
  background: #383838;
  border: 3px solid #7F0000;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form-group label {
  font-weight: 500;
  color: #a0a0a0;
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.form-group span {
  color: #e0e0e0;
  font-size: 1.1rem;
  font-weight: 600;
}

.full-width {
  grid-column: span 2;
}

.button-row {
  grid-column: span 2;
  display: flex;
  justify-content: center;
}

.add {
  background: #7F0000;
  color: white;
  border: none;
  padding: 14px 35px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(157, 0, 0, 0.3);
  width: 200px;
}

.add:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(157, 0, 0, 0.4);
  background: linear-gradient(135deg, #cc0000 0%, #ff1a1a 100%);
}

.add:active {
  transform: translateY(1px);
}

/* Responsive design */
@media (max-width: 968px) {
  .form-content {
    flex-direction: column;
  }

  .imageContainer {
    order: 1;
  }

  .inputContainer {
    order: 2;
  }

  .imageContainer img {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .inputContainer {
    grid-template-columns: 1fr;
  }

  .full-width, .button-row {
    grid-column: span 1;
  }

  .form-wrapper {
    padding: 20px;
  }

  .form-wrapper h1 {
    font-size: 1.8rem;
  }
}
</style>