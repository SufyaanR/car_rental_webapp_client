<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { updateCar, deleteCar } from "../routes/routes.js";

const router = useRouter();

const props = defineProps({
  initialCar: { type: Object, required: true }
});

const brand = ref("");
const model = ref("");
const type = ref("");
const pricePerDay = ref(0);
const seatCapacity = ref(0);
const bootCapacity = ref(0);
const engineCapacity = ref(0);
const transmission = ref("");
const collectionLocation = ref("");
const description = ref("");
const image = ref("");

const proUserId = ref(null);
const businessUserId = ref(null);

const loading = ref(true);

watch(
  () => props.initialCar,
  (car) => {
    if (!car) return;

    brand.value = car.brand || "";
    model.value = car.model || "";
    type.value = car.type || "";
    pricePerDay.value = car.pricePerDay || 0;
    seatCapacity.value = car.seatCapacity || 0;
    bootCapacity.value = car.bootCapacity || 0;
    engineCapacity.value = car.engineCapacity || 0;
    transmission.value = car.transmission || "";
    collectionLocation.value = car.collectionLocation || "";
    description.value = car.description || "";
    image.value = car.image || "";

    proUserId.value = car.proUser ? car.proUser.userId : null;
    businessUserId.value = car.businessUser ? car.businessUser.userId : null;

    loading.value = false;
  },
  { immediate: true }
);

function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result.split(",")[1];
  };
  reader.readAsDataURL(file);
}

async function onUpdateCar() {
  if (!props.initialCar) return;

  const updatedCar = {
    ...props.initialCar,
    brand: brand.value,
    model: model.value,
    type: type.value,
    pricePerDay: pricePerDay.value,
    seatCapacity: seatCapacity.value,
    bootCapacity: bootCapacity.value,
    engineCapacity: engineCapacity.value,
    transmission: transmission.value,
    collectionLocation: collectionLocation.value,
    description: description.value,
    image: image.value,
    isAvailable: true,
    proUser: proUserId.value ? { userId: proUserId.value } : null,
    businessUser: businessUserId.value ? { userId: businessUserId.value } : null
  };

  try {
    const res = await updateCar(updatedCar.carId, updatedCar);
    alert("Car updated successfully!");
    console.log("Updated car:", res);
  } catch (err) {
    console.error("Error updating car:", err);
    alert("Failed to update car");
  }
}

async function onDeleteCar() {
  if (!props.initialCar) return;
  if (!confirm("Are you sure you want to delete this car?")) return;

  try {
    await deleteCar(props.initialCar.carId);
    alert("Car deleted successfully!");
    router.push("/user/cars");
  } catch (err) {
    console.error("Error deleting car:", err);
    alert("Failed to delete car");
  }
}
</script>

<template>
  <div class="form-wrapper">
    <h1>Update Car</h1>

    <div v-if="loading">
      <p>Loading car data...</p>
    </div>

    <div v-else class="form-content">
      <div class="imageContainer">
        <img v-if="image" :src="'data:image/jpeg;base64,' + image" alt="Car Image" />
        <img v-else src="https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found.png" alt="Rental Car" />
      </div>

      <div class="inputContainer">
        <div class="form-group"><label>Brand</label><input v-model="brand" placeholder="Brand" /></div>
        <div class="form-group"><label>Model</label><input v-model="model" placeholder="Model" /></div>
        <div class="form-group"><label>Type</label><input v-model="type" placeholder="Type" /></div>
        <div class="form-group"><label>Price Per Day</label><input type="number" v-model="pricePerDay" /></div>
        <div class="form-group"><label>Seat Capacity</label><input type="number" v-model="seatCapacity" /></div>
        <div class="form-group"><label>Boot Capacity</label><input type="number" v-model="bootCapacity" /></div>
        <div class="form-group"><label>Engine Capacity</label><input type="number" v-model="engineCapacity" /></div>
        <div class="form-group"><label>Transmission</label><input v-model="transmission" /></div>
        <div class="form-group"><label>Collection Location</label><input v-model="collectionLocation" /></div>
        <div class="form-group"><label>Description</label><textarea v-model="description"></textarea></div>
        <div class="form-group"><label>Upload Image</label><input type="file" @change="onFileChange" /></div>

        <div class="button-row">
          <button @click="onUpdateCar">Update Car</button>
          <button @click="onDeleteCar" class="delete-btn">Delete Car</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  padding: 20px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-wrapper h1 {
  text-align: center;
  margin-bottom: 50px;
  color: #fff;
}

.form-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
  flex-wrap: wrap;
}

.imageContainer {
  flex: 1;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imageContainer img {
  width: 30vw;
  height: 40vh;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #7F0000;
}

.inputContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 20px;
  flex: 1;
  max-height: 60vh; 
  overflow-y: auto;
  padding-bottom: 20px; 
  box-sizing: border-box;
}

.form-group {
  flex: 1 1 calc(45% - 20px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  margin-bottom: 4px;
  font-weight: 500;
  color: #fff;
  text-align: left;
}

input,
textarea {
  background: white;
  border-radius: 6px;
  padding: 6px 15px;
  border: 1.5px solid #7F0000;
  color: #213547;
  font-size: 0.95rem;
  width: 100%;
}

textarea {
  resize: vertical;
}

.button-row {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
}

button {
  background-color: #7F0000;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;
  cursor: pointer;
  min-width: 120px;
}

button:hover {
  background-color: #a10000;
}

button:active {
  transform: scale(0.97);
}

.delete-btn {
  background-color: #a10000;
}

.delete-btn:hover {
  background-color: #7f0000;
}

@media (max-width: 900px) {
  .form-content {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .imageContainer img {
    width: 80vw;
    height: 40vh;
  }

  .inputContainer {
    max-height: none;
    overflow-y: visible;
  }
}
</style>
