<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getBasicUserById, updateBasicUser, deleteBasicUser } from "../routes/routes.js"; 

const router = useRouter();
const userId = localStorage.getItem("authenticatedUserId");

if (!userId) {
  alert("No authenticated user found.");
  router.push("/auth/login");
}

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
  bookCar: null
});

let currentUser = null;

onMounted(async () => {
  try {
    currentUser = await getBasicUserById(userId);

    form.value = {
      userId: currentUser.userId,
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      dateOfBirth: currentUser.dateOfBirth || "",
      idNumber: currentUser.idNumber || "",
      email: currentUser.email || "",
      phoneNumber: currentUser.phoneNumber || "",
      userType: currentUser.userType || "",
      username: currentUser.username || "",
      password: "", 
      login: currentUser.login ?? true,
      bookCar: currentUser.bookCar || null
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
      userType: currentUser.userType     
    };

    if (payload.dateOfBirth && typeof payload.dateOfBirth === "string") {
      payload.dateOfBirth = payload.dateOfBirth.split("T")[0];
    }

    console.log("Payload being sent:", payload); 

    const updatedUser = await updateBasicUser(userId, payload);

    form.value = {
      ...updatedUser,
      password: "" 
    };
    currentUser = updatedUser;

    alert("Account updated successfully!");
  } catch (error) {
    console.error("Error updating user:", error);
    alert("Failed to update account.");
  }
};

const deleteAccount = async () => {
  if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
  try {
    await deleteBasicUser(userId);
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
    <h1>My Account</h1>
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
      <input v-model="form.password" type="password" placeholder="You must enter a password to save changes" required />

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
