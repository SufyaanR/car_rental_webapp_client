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

// Form state
const form = ref({
  username: "",
  password: "",
  userType: "", // BASIC / PRO / BUSINESS
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
      } else {
        await router.push("/rental-provider/create");
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
        <!-- Username -->
        <div class="form-group">
          <label>Username</label>
          <input
              v-model="form.username"
              type="text"
              placeholder="Enter username"
              required
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label>Password</label>
          <input
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
          />
        </div>

        <!-- inside your form -->
        <div class="form-inner">
          <!-- username/password groups here -->

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
/* Outer page: center card vertically & horizontally */
.login-page {
  min-height: 100vh;         /* full height so centering works */
  display: grid;
  place-items: center;       /* perfect centering */
  padding: 24px;             /* breathing room on small screens */
  box-sizing: border-box;
}

/* Card: keep centered, responsive max width */
.login-card {
  background: #3b3b3b;
  padding: 36px;
  border-radius: 14px;
  width: 92vw;
  max-width: 900px;          /* controls overall width */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  color: #eee;
  box-sizing: border-box;
}

/* Title stays large and visually centered */
.card-title {
  margin: 0 0 22px 0;
  font-size: 2rem;
  color: white;
}

/* Form container: center inside card but keep labels left-aligned */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

/* Limit inner content width so controls don't go edge-to-edge if card is very wide */
.login-form .form-inner {
  width: 100%;
  max-width: 800px;   /* keeps content comfortable on very wide screens */
  margin: 0 auto;     /* center the inner content horizontally inside the card */
  box-sizing: border-box;
}

/* Labels are left-aligned (unchanged) */
.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #ddd;
  text-align: left;
  font-weight: 700;
}

/* Inputs fill the inner content width */
.form-group input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: none;
  background: white;
  color: #3b3b3b;
  font-size: 1rem;
}

/* Focus style */
.form-group input:focus {
  outline: 2px solid #7f0000;
}

/* User-type group: center the label and make the radio row full-width */
.user-type-group {
  display: flex;
  flex-direction: column;
  align-items: center;     /* center the label */
  width: 100%;
}

/* Center the "User Type" label */
.user-type-group > label {
  text-align: center;      /* center label text */
  width: 100%;
  margin-bottom: 12px;
  font-weight: 700;
  color: #ddd;
}

/* Radio row: spread radio items evenly across available width */
.radio-row {
  display: flex;
  width: 100%;
  justify-content: space-between; /* evenly spaced across the row */
  gap: 12px;
  align-items: center;
  box-sizing: border-box;
  max-width: 700px;        /* optional: avoid extreme stretching on huge screens */
}

/* Each radio item keep label and input next to each other */
.radio-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;                 /* allow even distribution */
  gap: 6px;
}

/* Style the radio input (modern browsers support accent-color) */
.radio-row input[type="radio"] {
  margin: 0;
  accent-color: #7f0000;
  transform: scale(1.0);
}

/* Small text under each radio (Basic/Pro/Business) */
.radio-item span {
  margin-top: 6px;
  color: #ddd;
  font-weight: 600;
}

/* Login button - full width of the inner content */
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
  margin: 6px auto 0 auto; /* center button within inner area */
}

/* Signup text centered */
.signup-text {
  margin-top: 16px;
  color: #ccc;
  font-size: 0.95rem;
  text-align: center;      /* centered per your request */
}

/* Signup link style */
.signup-link {
  color: #ff7f7f;
  font-weight: 700;
  text-decoration: none;
  margin-left: 8px;
}

/* Responsive tweaks */
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

