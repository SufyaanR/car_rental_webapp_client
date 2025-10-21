<script setup>
import { ref } from "vue";
import {
  createBasicUser,
  createBusinessUser,
  createProUser, createSubscriptionPayment,
  findBasicUserByUsername, findBusinessUserByUsername,
  findProUserByUsername
} from "../routes/routes.js";
import router from "../router/index.js";

const firstName = ref("");
const lastName = ref("");
const dateOfBirth = ref("");
const idNumber = ref("");
const phoneNumber = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const userType = ref("");
const bankName = ref("");
const accountHolder = ref("");
const accountNumber = ref("");
const accountType = ref("");
const businessName = ref("");
const businessRegistrationNumber = ref("");

async function onCreatedUser() {
  let user = {};

  if (userType.value === "BASIC") {
    user = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      idNumber: idNumber.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      username: username.value,
      password: password.value,
      userType: userType.value,
      login: true,
      bookCar: null
    };
  }
  else if (userType.value === "PRO") {
    user = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      idNumber: idNumber.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      username: username.value,
      password: password.value,
      userType: userType.value,
      login: true,
      bankName: bankName.value,
      accountHolder: accountHolder.value,
      accountNumber: accountNumber.value,
      accountType: accountType.value,
    };
  }
  else if (userType.value === "BUSINESS") {
    user = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      idNumber: idNumber.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      username: username.value,
      password: password.value,
      userType: userType.value,
      login: true,
      bankName: bankName.value,
      accountHolder: accountHolder.value,
      accountNumber: accountNumber.value,
      accountType: accountType.value,
      businessName: businessName.value,
      businessRegistrationNumber: businessRegistrationNumber.value,
    };
  }

  try {
    let createdUser;
    let userId;

    if (userType.value === "BASIC") {
      createdUser = await createBasicUser(user);
    }
    else if (userType.value === "PRO") {
      createdUser = await createProUser(user);
    }
    else if (userType.value === "BUSINESS") {
      createdUser = await createBusinessUser(user);
    }


    if (user.userType === "BASIC") {
      userId = await findBasicUserByUsername(user.username);
    } else if (user.userType === "PRO") {
      userId = await findProUserByUsername(user.username);
      console.log("Found PRO user:", userId);
      console.log("Found PRO userId:", userId.userId);

    } else {
      userId = await findBusinessUserByUsername(user.username);
    }

    if (createdUser.userType === "PRO" || createdUser.userType === "BUSINESS") {
      const paymentRequest = {
        amount: 100.00, 
        paymentDate: new Date().toISOString().split("T")[0], 
        paymentTime: new Date().toLocaleTimeString("en-GB", { hour12: false })
      };

      const payment = await createSubscriptionPayment(userId.userId, createdUser.userType, paymentRequest);
      console.log("Subscription payment created:", payment);
      alert("Subscription payment of R100 created for your account.");
    }

    localStorage.setItem("authenticatedUserId", userId.userId);
    localStorage.setItem("username", user.username);
    localStorage.setItem("userType", user.userType);

    if (user.userType === "BASIC") {
      await router.replace("/user/home");
    } else {
      await router.replace("/rental-provider/home");
    }

    console.log("createduser:", createdUser);
    alert(`Welcome, ${user.firstName} ${user.lastName}!`);

  } catch (error) {
    console.error("error:", error.message);
    alert(error.message);
  }
}


</script>

<template>
  <div class="signup-page">
    <div class="signup-card">
      <h2 class="card-title">Sign Up</h2>
      <div class="signup-form">
        <div class="form-group">
          <label>First Name</label>
          <input v-model="firstName" type="text" placeholder="First Name" required />
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input v-model="lastName" type="text" placeholder="Last Name" required />
        </div>

        <div class="form-group">
          <label>Date of Birth</label>
          <input v-model="dateOfBirth" type="date" required />
        </div>

        <div class="form-group">
          <label>ID Number</label>
          <input v-model="idNumber" type="text" placeholder="ID Number" required />
        </div>

        <div class="form-group">
          <label>Phone Number</label>
          <input v-model="phoneNumber" type="tel" placeholder="Phone Number" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Email" required />
        </div>

        <div class="form-group">
          <label>Username</label>
          <input v-model="username" type="text" placeholder="Username" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Password" required />
        </div>

        <div class="form-group">
          <label>User Type</label>
          <select v-model="userType" required>
            <option value="">Select Type</option>
            <option value="BASIC">Basic</option>
            <option value="PRO">Pro</option>
            <option value="BUSINESS">Business</option>
          </select>
        </div>

        <template v-if="userType === 'PRO' || userType === 'BUSINESS'">
          <div class="form-group">
            <label>Bank Name</label>
            <input v-model="bankName" type="text" placeholder="Bank Name" />
          </div>

          <div class="form-group">
            <label>Account Holder</label>
            <input v-model="accountHolder" type="text" placeholder="Account Holder" />
          </div>

          <div class="form-group">
            <label>Account Number</label>
            <input v-model="accountNumber" type="number" placeholder="Account Number" />
          </div>

          <div class="form-group">
            <label>Account Type</label>
            <input v-model="accountType" type="text" placeholder="Account Type" />
          </div>
        </template>

        <template v-if="userType === 'BUSINESS'">
          <div class="form-group">
            <label>Business Name</label>
            <input v-model="businessName" type="text" placeholder="Business Name" />
          </div>

          <div class="form-group">
            <label>Business Registration Number</label>
            <input v-model="businessRegistrationNumber" type="text" placeholder="Business Reg Number" />
          </div>
        </template>
        <div class="form-actions">
          <button class="submit-btn" @click="onCreatedUser">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-page {
  padding-top: 15vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-card {
  background: #3b3b3b;
  padding: 40px 30px;
  border-radius: 16px;
  width: 70vw;
  min-height: 50vh;
  height: auto;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  color: #eee;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
}

.card-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #ff7f7f;
}

.signup-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 600;
  text-align: left;
}

.form-group input,
.form-group select {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #555;
  color: #fff;
  font-size: 1rem;
}

.form-group input::placeholder {
  color: #ccc;
}

.form-group input:focus,
.form-group select:focus {
  outline: 2px solid #7f0000;
  background: #666;
}

.form-actions {
  grid-column: span 3;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-btn {
  background-color: #7f0000;
  color: white;
  border: none;
  width: 30%;
  padding: 14px 40px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #a00000;
}

@media (max-width: 968px) {
  .signup-card {
    width: 90vw;
    height: auto;
    padding: 30px 20px;
  }
  .signup-form {
    grid-template-columns: 1fr 1fr; 
  }
}

@media (max-width: 576px) {
  .signup-form {
    grid-template-columns: 1fr; 
  }
}
</style>
