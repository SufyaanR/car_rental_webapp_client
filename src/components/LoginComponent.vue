
<script setup>
import { ref } from "vue";

const form = ref({
  username: "",
  password: ""
});

const handleLogin = () => {
  console.log("Login Data:", form.value);
  alert(`Welcome back, ${form.value.username}!`);
};
</script>

<template>
  <form @submit.prevent="handleLogin" class="container login-form">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-5">
        <!-- Username -->
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input
              v-model="form.username"
              type="text"
              class="form-control"
              placeholder="Enter username"
              required
          />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
              v-model="form.password"
              type="password"
              class="form-control"
              placeholder="Enter password"
              required
          />
        </div>

        <!-- Login Button -->
        <div class="text-center mt-4">
          <button type="submit" class="btn login-btn">Login</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.login-form {
  margin-top: 30px;
}

.login-btn {
  background-color: #7F0000;
  color: white;
  border: none;
  padding: 8px 24px;
}
.login-btn:hover {
  background-color: #a00000;
}
</style>
