<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  loginBasicUser,
  loginProUser,
  loginBusinessUser,
  findBasicUserByUsername,
  findProUserByUsername, findBusinessUserByUsername
} from "../routes/routes.js";

const router = useRouter();

const form = ref({
  username: "",
  password: "",
  userType: "", 
});

const handleLogin = async () => {
  if (!form.value.userType) {
    alert("Please select a user type");
    return;
  }

  try {
    let message;
    let user;

    switch (form.value.userType) {
      case "BASIC":
        message = await loginBasicUser({
          username: form.value.username,
          password: form.value.password,
        });
        user = await findBasicUserByUsername(form.value.username);
        break;
      case "PRO":
        message = await loginProUser({
          username: form.value.username,
          password: form.value.password,
        });
        user = await findProUserByUsername(form.value.username);
        break;
      case "BUSINESS":
        message = await loginBusinessUser({
          username: form.value.username,
          password: form.value.password,
        });
        user = await findBusinessUserByUsername(form.value.username);
        break;
      default:
        throw new Error("Invalid user type");
    }

    if (message === "Login successful") {
      localStorage.setItem("authenticatedUserId", user.userId);
      localStorage.setItem("username", form.value.username);
      localStorage.setItem("userType", form.value.userType);

      if (form.value.userType === "BASIC") {
        await router.push("/user/home");
      } else if (["BUSINESS", "PRO"].includes(form.value.userType)) {
        await router.push("/rental-provider/home");
      } else{
        await router.push("auth/login")
      }

      alert(`Welcome back, ${form.value.username}!`);
    } else {
      alert(message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);
  }
};
</script>


<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="card-title">Login</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Username</label>
          <input
              v-model="form.username"
              type="text"
              placeholder="Enter username"
              required
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
          />
        </div>

        <div class="form-inner">

          <div class="form-group user-type-group">
            <label>User Type</label>

            <div class="radio-row">
              <div class="radio-item">
                <input id="basic" type="radio" value="BASIC" v-model="form.userType" />
                <span>Basic</span>
              </div>

              <div class="radio-item">
                <input id="pro" type="radio" value="PRO" v-model="form.userType" />
                <span>Pro</span>
              </div>

              <div class="radio-item">
                <input id="business" type="radio" value="BUSINESS" v-model="form.userType" />
                <span>Business</span>
              </div>
            </div>
          </div>

          <button class="login-btn" type="submit">Login</button>

          <p class="signup-text">
            Don’t have an account?
            <router-link to="/auth/signup" class="signup-link">Sign Up</router-link>
          </p>
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;        
  display: grid;
  place-items: center;       
  padding: 24px;             
  box-sizing: border-box;
}

.login-card {
  background: #3b3b3b;
  padding: 36px;
  border-radius: 14px;
  width: 92vw;
  max-width: 900px;          
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  color: #eee;
  box-sizing: border-box;
}

.card-title {
  margin: 0 0 22px 0;
  font-size: 2rem;
  color: white;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

.login-form .form-inner {
  width: 100%;
  max-width: 800px;   
  margin: 0 auto;     
  box-sizing: border-box;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #ddd;
  text-align: left;
  font-weight: 700;
}

.form-group input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: none;
  background: white;
  color: #3b3b3b;
  font-size: 1rem;
}

.form-group input:focus {
  outline: 2px solid #7f0000;
}

.user-type-group {
  display: flex;
  flex-direction: column;
  align-items: center;     
  width: 100%;
}

.user-type-group > label {
  text-align: center;      
  width: 100%;
  margin-bottom: 12px;
  font-weight: 700;
  color: #ddd;
}

.radio-row {
  display: flex;
  width: 100%;
  justify-content: space-between; 
  gap: 12px;
  align-items: center;
  box-sizing: border-box;
  max-width: 700px;        
}

.radio-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;                 
  gap: 6px;
}

.radio-row input[type="radio"] {
  margin: 0;
  accent-color: #7f0000;
  transform: scale(1.0);
}

.radio-item span {
  margin-top: 6px;
  color: #ddd;
  font-weight: 600;
}

.login-btn {
  background-color: #7f0000;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  max-width: 800px;
  margin: 6px auto 0 auto; 
}

.signup-text {
  margin-top: 16px;
  color: #ccc;
  font-size: 0.95rem;
  text-align: center;      
}

.signup-link {
  color: #ff7f7f;
  font-weight: 700;
  text-decoration: none;
  margin-left: 8px;
}

@media (max-width: 768px) {
  .login-card {
    padding: 24px;
  }

  .radio-row {
    gap: 8px;
  }

  .radio-item span { font-size: 0.95rem; }
}
</style>

