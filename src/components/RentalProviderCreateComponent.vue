<script setup>

</script>

<template>
  <div class="form-wrapper">
    <h1>Create a new car for rental</h1>
    <div class="form-content">
      <!-- RIGHT: Image -->
      <div class="imageContainer">
        <img src="https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png" alt="Rental Car Image"/>
      </div>
      <!-- LEFT: Inputs -->
      <div class="inputContainer">
        <div class="form-group">
          <label>Brand</label>
          <input placeholder="Brand"/>
        </div>
        <div class="form-group">
          <label>Model</label>
          <input placeholder="Model"/>
        </div>
        <div class="form-group">
          <label>Type</label>
          <input placeholder="Type"/>
        </div>
        <div class="form-group">
          <label>Price Per Day</label>
          <input placeholder="Price Per Day"/>
        </div>
        <div class="form-group">
          <label>Seat Capacity</label>
          <input placeholder="Seat Capacity"/>
        </div>
        <div class="form-group">
          <label>Boot Capacity</label>
          <input placeholder="Boot Capacity"/>
        </div>
        <div class="form-group">
          <label>Engine Capacity</label>
          <input placeholder="Engine Capacity"/>
        </div>
        <div class="form-group">
          <label>Transmission</label>
          <input placeholder="Transmission"/>
        </div>
        <div class="form-group">
          <label>Collection Location</label>
          <input placeholder="Collection Location"/>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" placeholder="Description"></textarea>
        </div>
        <div class="form-group">
          <label for="inputGroupFile01">Upload Image</label>
          <input type="file" class="form-control" id="inputGroupFile01">
        </div>

        <div class="button-row">
          <button class="add">Add Rental Car</button>
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
  text-align: center;        /* centers the heading */
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
  flex: 1 1 calc(25% - 20px); /* 4 per row, minus the gap */
  box-sizing: border-box;     /* so padding/border don’t break width */
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