<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { 
  getProUser, 
  getBusinessUser, 
  getPaymentsByProUserId, 
  getPaymentsByBusinessUserId 
} from "../routes/routes.js";

const route = useRoute();
const userId = Number(route.params.userId);

const payments = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchPayments() {
  payments.value = [];
  loading.value = true;
  error.value = null;

  let fetchedPayments = [];

  try {
    const proUser = await getProUser(userId);
    if (proUser) {
      fetchedPayments = await getPaymentsByProUserId(userId);
    }
  } catch (err) {
    console.log("Not a ProUser:", err.message);
  }

  if (fetchedPayments.length === 0) {
    try {
      const businessUser = await getBusinessUser(userId);
      if (businessUser) {
        fetchedPayments = await getPaymentsByBusinessUserId(userId);
      }
    } catch (err) {
      console.log("Not a BusinessUser:", err.message);
    }
  }

  if (!fetchedPayments || fetchedPayments.length === 0) {
    error.value = "No payments found for this user.";
  }

  payments.value = fetchedPayments;
  loading.value = false;
}

onMounted(fetchPayments);
</script>

<template>
  <div class="payments-wrapper">
    <h1>Payments Received</h1>

    <div v-if="loading">Loading payments...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="payments.length === 0">No payments found.</div>
    <div v-else>
      <table class="payments-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Payer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.paymentId">
            <td>{{ payment.booking?.bookingId }}</td>
            <td>{{ payment.user?.firstName }} {{ payment.user?.lastName }}</td>
            <td>{{ payment.amount }}</td>
            <td>{{ payment.paymentDate }}</td>
            <td>{{ payment.paymentTime }}</td>
            <td>{{ payment.paymentStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.payments-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color:#000
}

.loading, .error {
  text-align: center;
  margin: 20px 0;
  font-weight: 500;
  color: #7F0000;
}

.payments-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.payments-table th,
.payments-table td {
  border: 1px solid #7F0000;
  padding: 10px 12px;
  text-align: center;
  color: #000; 
}

.payments-table th {
  background-color: #7F0000;
  color: #fff;
  font-weight: 600;
}

.payments-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.payments-table tbody tr:hover {
  background-color: #ffe6e6;
}
</style>
