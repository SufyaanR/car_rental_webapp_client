<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { 
  getProUser, 
  getBusinessUser, 
  getSubPaymentsByProUserId, 
  getSubPaymentsByBusinessUserId 
} from "../routes/routes.js";

const route = useRoute();
const userId = Number(route.params.userId);

const subscriptions = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchSubscriptions() {
  subscriptions.value = [];
  loading.value = true;
  error.value = null;

  let fetchedSubscriptions = [];

  try {
    const proUser = await getProUser(userId);
    if (proUser) {
      fetchedSubscriptions = await getSubPaymentsByProUserId(userId);
    }
  } catch (err) {
    console.log("Not a ProUser:", err.message);
  }

  if (fetchedSubscriptions.length === 0) {
    try {
      const businessUser = await getBusinessUser(userId);
      if (businessUser) {
        fetchedSubscriptions = await getSubPaymentsByBusinessUserId(userId);
      }
    } catch (err) {
      console.log("Not a BusinessUser:", err.message);
    }
  }

  if (!fetchedSubscriptions || fetchedSubscriptions.length === 0) {
    error.value = "No subscription payments found for this user.";
  }

  subscriptions.value = fetchedSubscriptions;
  loading.value = false;
}

onMounted(fetchSubscriptions);
</script>

<template>
  <div class="subscriptions-wrapper">
    <h1>Subscription Payments</h1>

    <div v-if="loading">Loading subscription payments...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="subscriptions.length === 0">No subscription payments found.</div>
    <div v-else>
      <table class="subscriptions-table">
        <thead>
          <tr>
            <th>Subscription ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Payment Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sub in subscriptions" :key="sub.subscriptionPaymentId">
            <td>{{ sub.subscriptionPaymentId }}</td>
            <td>{{ sub.amount }}</td>
            <td>{{ sub.paymentDate }}</td>
            <td>{{ sub.paymentTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.subscriptions-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #ffffff;
}

.loading, .error {
  text-align: center;
  margin: 20px 0;
  font-weight: 500;
  color: #7F0000;
}

.subscriptions-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.subscriptions-table th,
.subscriptions-table td {
  border: 1px solid #7F0000;
  padding: 10px 12px;
  text-align: center;
  color: #000000; 
}

.subscriptions-table th {
  background-color: #7F0000;
  color: #fff;
  font-weight: 600;
}

.subscriptions-table tbody tr {
  background-color: #f2f2f2;
}

.subscriptions-table tbody tr:hover {
  background-color: #ffe6e6;
}
</style>
