<script setup>
import { ref } from "vue";

const form = ref({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  idNumber: "",
  email: "",
  phoneNumber: "",
  username: "",
  password: "",
  userType: "PRIVATE"
});

const handleSubmit = () => {
  console.log("Form Data:", form.value);
  alert(`Welcome, ${form.value.firstName} ${form.value.lastName}!`);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="container form-box">
    <div class="row g-3">
      <!-- Left column -->
      <div class="col-md-6">
        <label class="form-label">First Name</label>
        <input v-model="form.firstName" type="text" class="form-control" required />

        <label class="form-label mt-3">Date of Birth</label>
        <input v-model="form.dateOfBirth" type="date" class="form-control" required />

        <label class="form-label mt-3">ID Number</label>
        <input v-model="form.idNumber" type="text" class="form-control" required />

        <label class="form-label mt-3">Phone Number</label>
        <input v-model="form.phoneNumber" type="tel" class="form-control" required />
      </div>

      <!-- Right column -->
      <div class="col-md-6">
        <label class="form-label">Last Name</label>
        <input v-model="form.lastName" type="text" class="form-control" required />

        <label class="form-label mt-3">Email</label>
        <input v-model="form.email" type="email" class="form-control" required />

        <label class="form-label mt-3">Username</label>
        <input v-model="form.username" type="text" class="form-control" required />

        <label class="form-label mt-3">Password</label>
        <input v-model="form.password" type="password" class="form-control" required />
      </div>

      <!-- Dropdown full width -->
      <div class="col-12 mt-3">
        <label class="form-label">User Type</label>
        <select v-model="form.userType" class="form-select">
          <option value="Basic User">Private</option>
          <option value="Pro User">Enterprise</option>
          <option value="Business User">Business</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="col-12 text-center mt-4">
        <button type="submit" class="btn custom-btn px-5">Sign Up</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-box {
  margin-bottom: 50px; /* pushes form up from footer */
}

.custom-btn {
  background-color: #7F0000; /* dark red */
  color: white;
  border: none;
}

.custom-btn:hover {
  background-color: #660000;
}
</style>
