<script setup>
import { ref, onBeforeMount } from "vue";
import { createCar } from "../routes/routes.js";

// Form fields
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

// User IDs
const proUserId = ref(null);
const businessUserId = ref(null);

onBeforeMount(() => {
  const authenticatedUserId = localStorage.getItem("authenticatedUserId");
  const userType = localStorage.getItem("userType");

  if (!authenticatedUserId || !userType) {
    alert("User not logged in!");
    return;
  }

  if (userType === "PRO") {
    proUserId.value = authenticatedUserId;  
    businessUserId.value = null;
  } else if (userType === "BUSINESS") {
    businessUserId.value = authenticatedUserId;  
    proUserId.value = null;
  }
});



function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result.split(",")[1]; // keep only Base64
  };
  reader.readAsDataURL(file);
}

async function onCreateCar() {
  if (!brand.value || !model.value || !type.value) {
    alert("Please fill in required fields.");
    return;
  }

const car = {
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
    const createdCar = await createCar(car);
    console.log("Car added:", createdCar);
    alert("Car added successfully!");
    // reset form
    brand.value = model.value = type.value = transmission.value = collectionLocation.value = description.value = image.value = "";
    pricePerDay.value = seatCapacity.value = bootCapacity.value = engineCapacity.value = 0;
  } catch (err) {
    console.error("Error adding car:", err);
    alert("Failed to add car.");
  }
}
</script>

<template>
  <div class="form-wrapper">
    <h1>Create a New Rental Car</h1>
    <div class="form-content">
      <div class="imageContainer">
        <img
          v-if="image"
          :src="'data:image/jpeg;base64,' + image"
          alt="Car Image"
        />
        <img
          v-else
          src="https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
          alt="Rental Car Image"
        />
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
          <button @click="onCreateCar">Add Rental Car</button>
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
  align-items: center;
}

.form-wrapper h1 {
  text-align: center;
  margin-bottom: 50px;
}

.form-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.imageContainer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
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
  flex-wrap: wrap;
  gap: 10px 20px;
  flex: 1;
  max-height: 60vh;
  overflow-y: auto;
  padding-bottom: 20px;
}

.form-group {
  flex: 1 1 calc(45% - 20px);
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  margin-bottom: 4px;
  font-weight: 500;
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
  margin-top: 20px;
}

button {
  background-color: #7F0000;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  min-width: 120px;
}

button:hover {
  background-color: #a10000;
}

button:active {
  transform: scale(0.97);
}
</style>
