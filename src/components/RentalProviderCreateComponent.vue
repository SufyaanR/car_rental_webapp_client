<script setup>
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import {createCar, getUser} from "../routes/routes.js";

const brand = ref();
const model = ref();
const type = ref();
const pricePerDay = ref(Number(0));
const seatCapacity = ref(Number(0));
const bootCapacity= ref(Number(0));
const engineCapacity = ref(Number(0));
const transmission = ref();
const collectionLocation = ref();
const description = ref();
const image = ref();
const proUserId = ref(Number(2));
const proUser = ref(null);

// const addCar = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("brand", brand.value);
//     formData.append("model", model.value);
//     formData.append("type", type.value);
//     formData.append("pricePerDay", pricePerDay.value);
//     formData.append("seatCapacity", seatCapacity.value);
//     formData.append("bootCapacity", bootCapacity.value);
//     formData.append("engineCapacity", engineCapacity.value);
//     formData.append("transmission", transmission.value);
//     formData.append("description", description.value);
//     formData.append("collectionLocation", collectionLocation.value);
//     formData.append("isAvailable", true);
//     formData.append("businessUserId", 1);
//
//     const res = await axios.post("http://localhost:8080/api/cars", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//
//     alert("Car added successfully!");
//     console.log("Car added:", res.data);
//   } catch (err) {
//     console.error("Error adding car:", err.response?.data || err);
//     alert("Failed to add car");
//   }
// };

onBeforeMount(async () => {
  proUser.value = await getUser(proUserId.value);
});

async function onCreateCar(){
  const car = {
    image: image.value,
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
    isAvailable: true,
    proUser: proUser.value
  };

  try {
    const createdCar = await createCar(car);
    console.log("Car added: ", createdCar);
    alert("Car added successfully");
  }catch (err){
    console.error("Error: ", err);
    alert("Something went wrong with adding a car");
  }
}

function onFileChange(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    // reader.result will look like "data:image/png;base64,iVBORw0..."
    // We only want the Base64 part after the comma
    image.value = reader.result.split(",")[1];
  };
  reader.readAsDataURL(file);
}

</script>

<template>
  <div class="form-wrapper">
    <h1>Create a new car for rental</h1>
    <div class="form-content">
      <!-- RIGHT: Image -->
      <div class="imageContainer">
        <img v-if="image" :src="'data:image/jpeg;base64,' + image"  alt="image"/>
        <img v-else src="https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png" alt="Rental Car Image"/>
       
      </div>
      <!-- LEFT: Inputs -->
      <div class="inputContainer">
        <div class="form-group">
          <label>Brand</label>
          <input placeholder="Brand" v-model="brand"/>
        </div>
        <div class="form-group">
          <label>Model</label>
          <input placeholder="Model" v-model="model"/>
        </div>
        <div class="form-group">
          <label>Type</label>
          <input placeholder="Type" v-model="type"/>
        </div>
        <div class="form-group">
          <label>Price Per Day</label>
          <input placeholder="Price Per Day" type="number" v-model="pricePerDay"/>
        </div>
        <div class="form-group">
          <label>Seat Capacity</label>
          <input placeholder="Seat Capacity" type="number" v-model="seatCapacity"/>
        </div>
        <div class="form-group">
          <label>Boot Capacity</label>
          <input placeholder="Boot Capacity" type="number" v-model="bootCapacity"/>
        </div>
        <div class="form-group">
          <label>Engine Capacity</label>
          <input placeholder="Engine Capacity" type="number" v-model="engineCapacity"/>
        </div>
        <div class="form-group">
          <label>Transmission</label>
          <input placeholder="Transmission" v-model="transmission"/>
        </div>
        <div class="form-group">
          <label>Collection Location</label>
          <input placeholder="Collection Location" v-model="collectionLocation"/>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" placeholder="Description" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="inputGroupFile01">Upload Image</label>
          <input type="file" class="form-control" id="inputGroupFile01" @change="onFileChange">
        </div>

        <div class="button-row">
          <button class="add" @click="onCreateCar">Add Rental Car</button>
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
}

.form-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1px 20px;
  flex: 1;
  height: 50vh;
  overflow-y: auto;
}

.form-group {
  flex: 1 1 calc(25% - 20px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  margin-bottom: 4px;
  font-weight: 500;
  color: #f9f9f9;
}

input {
  background: white;
  border-radius: 6px;
  padding: 6px 15px;
  border: 1.5px solid #7F0000;
  color: #213547;
  font-size: 0.95rem;
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
}

button {
  background-color: #7F0000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;
  height: 60%;
}

button:hover {
  background-color: #a10000;
}

button:active {
  transform: scale(0.97);
}

.button-row {
  flex: 0 0 100%;
}
</style>