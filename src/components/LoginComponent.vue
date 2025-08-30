<script setup>
import { ref, computed } from "vue";

const form = ref({
  userType: "BASIC", // default selection
  username: "",
  password: "",
  businessName: "",
  registrationNumber: ""
});

const handleSubmit = () => {
  console.log("Login Data:", form.value);
  if (form.value.userType === "BUSINESS") {
    alert(`Welcome Business: ${form.value.businessName}`);
  } else {
    alert(`Welcome User: ${form.value.username}`);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="container mt-5">
    <div class="row g-3 justify-content-center">
      <!-- User Type Selection -->
      <div class="col-md-6">
        <label class="form-label">User Type</label>
        <select v-model="form.userType" class="form-select">
          <option value="BASIC">Basic User</option>
          <option value="PRO">Pro User</option>
          <option value="BUSINESS">Business User</option>
        </select>
      </div>

      <!-- Basic + Pro Users -->
      <template v-if="form.userType === 'BASIC' || form.userType === 'PRO'">
        <div class="col-md-6">
          <label class="form-label">Username</label>
          <input v-model="form.username" type="text" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>
      </template>

      <!-- Business Users -->
      <template v-if="form.userType === 'BUSINESS'">
        <div class="col-md-6">
          <label class="form-label">Business Name</label>
          <input v-model="form.businessName" type="text" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Registration Number</label>
          <input v-model="form.registrationNumber" type="text" class="form-control" required />
        </div>
      </template>

      <!-- Submit Button -->
      <div class="col-12 text-center mt-4">
        <button type="submit" class="btn login-btn px-5">Login</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.container {
  max-width: 700px;
}

.login-btn {
  background-color: #7F0000; /* dark red */
  color: white;
  border: none;
}

.login-btn:hover {
  background-color: #660000;
}
</style>
