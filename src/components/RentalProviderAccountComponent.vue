<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getProUserById,
  updateProUser,
  deleteProUser,
  getBusinessUserById,
  updateBusinessUser,
  deleteBusinessUser,
} from "../routes/routes.js";

const router = useRouter();

const form = ref({
  userId: null,
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  idNumber: "",
  email: "",
  phoneNumber: "",
  userType: "",
  username: "",
  password: "",
  login: true,
  bankName: "",
  accountHolder: "",
  accountNumber: null,
  accountType: "",
  businessName: "",
  businessRegistrationNumber: "",
});

let currentUser = null;

onMounted(async () => {
  const userId = localStorage.getItem("authenticatedUserId");
  let userType = localStorage.getItem("userType");

  if (!userId || !userType) {
    alert("No authenticated user found.");
    router.push("/auth/login");
    return;
  }

  if (userType === "PRO_USER") userType = "PRO";
  if (userType === "BUSINESS_USER") userType = "BUSINESS";

  try {
    if (userType === "PRO") {
      currentUser = await getProUserById(userId);
    } else if (userType === "BUSINESS") {
      currentUser = await getBusinessUserById(userId);
    } else {
      alert(`Unsupported user type: ${userType}`);
      router.push("/auth/login");
      return;
    }

    form.value = {
      userId: currentUser.userId,
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      dateOfBirth: currentUser.dateOfBirth || "",
      idNumber: currentUser.idNumber || "",
      email: currentUser.email || "",
      phoneNumber: currentUser.phoneNumber || "",
      userType, 
      username: currentUser.username || "",
      password: "",
      login: currentUser.login ?? true,
      bankName: currentUser.bankName || "",
      accountHolder: currentUser.accountHolder || "",
      accountNumber: currentUser.accountNumber || null,
      accountType: currentUser.accountType || "",
      businessName: currentUser.businessName || "",
      businessRegistrationNumber: currentUser.businessRegistrationNumber || "",
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    alert("Failed to load account details.");
  }
});

const saveChanges = async () => {
  try {
    if (!currentUser) return;

    if (!form.value.password || form.value.password.trim() === "") {
      alert("You must enter a password to save changes.");
      return;
    }

    const payload = {
      ...form.value,
      userId: currentUser.userId,
      userType: form.value.userType,
    };

    if (payload.dateOfBirth && typeof payload.dateOfBirth === "string") {
      payload.dateOfBirth = payload.dateOfBirth.split("T")[0];
    }

    let updatedUser;
    if (form.value.userType === "PRO") {
      updatedUser = await updateProUser(payload.userId, payload);
    } else if (form.value.userType === "BUSINESS") {
      updatedUser = await updateBusinessUser(payload.userId, payload);
    }

    form.value = { ...updatedUser, password: "" };
    alert("Account updated successfully!");
  } catch (error) {
    console.error("Error updating account:", error);
    alert("Failed to update account.");
  }
};

const deleteAccount = async () => {
  if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
  try {
    if (form.value.userType === "PRO") {
      await deleteProUser(form.value.userId);
    } else if (form.value.userType === "BUSINESS") {
      await deleteBusinessUser(form.value.userId);
    }
    localStorage.clear();
    alert("Account deleted successfully.");
    router.push("/auth/login");
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete account.");
  }
};
</script>

<template>
  <div class="account-container">
    <h1 v-if="form.userType === 'PRO'">My Pro Account</h1>
    <h1 v-else-if="form.userType === 'BUSINESS'">My Business Account</h1>

    <form @submit.prevent="saveChanges">
      <label>First Name</label>
      <input v-model="form.firstName" type="text" required />

      <label>Last Name</label>
      <input v-model="form.lastName" type="text" required />

      <label>Date of Birth</label>
      <input v-model="form.dateOfBirth" type="date" required />

      <label>ID Number</label>
      <input v-model="form.idNumber" type="text" required />

      <label>Email</label>
      <input v-model="form.email" type="email" required />

      <label>Phone Number</label>
      <input v-model="form.phoneNumber" type="tel" required />

      <label>User Type</label>
      <input v-model="form.userType" type="text" disabled />

      <label>Username</label>
      <input v-model="form.username" type="text" required />

      <label>Password</label>
      <input v-model="form.password" type="password" placeholder="Leave blank to keep current" />

      <label>Bank Name</label>
      <input v-model="form.bankName" type="text" />

      <label>Account Holder</label>
      <input v-model="form.accountHolder" type="text" />

      <label>Account Number</label>
      <input v-model="form.accountNumber" type="number" />

      <label>Account Type</label>
      <input v-model="form.accountType" type="text" />

      <template v-if="form.userType === 'BUSINESS'">
        <label>Business Name</label>
        <input v-model="form.businessName" type="text" />

        <label>Business Registration Number</label>
        <input v-model="form.businessRegistrationNumber" type="text" />
      </template>

      <div class="buttons">
        <button type="submit">Save Changes</button>
        <button type="button" @click="deleteAccount" class="delete-btn">Delete Account</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.account-container {
  max-width: 600px;
  margin: 80px auto 0;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 12px;
  color: #fff;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: none;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  padding: 12px;
  border-radius: 50px;
  background-color: #7f0000;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background-color: #cc0000;
}

.delete-btn {
  background-color: #333;
}

.delete-btn:hover {
  background-color: #ff1a1a;
}
</style>
