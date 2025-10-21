<script setup>
import { ref, onMounted } from "vue";
import { 
  getProUser, 
  getBusinessUser, 
  getBookingsByProUserId, 
  getBookingsByBusinessUserId 
} from "../routes/routes.js";

const props = defineProps({
  userId: { type: Number, required: true }
});

const bookings = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchBookings() {
  bookings.value = [];
  loading.value = true;
  error.value = null;

  let fetchedBookings = [];

  try {
    const proUser = await getProUser(props.userId);
    if (proUser) {
      fetchedBookings = await getBookingsByProUserId(props.userId);
    }
  } catch (err) {
    console.log("Not a ProUser:", err.message);
  }

  if (fetchedBookings.length === 0) {
    try {
      const businessUser = await getBusinessUser(props.userId);
      if (businessUser) {
        fetchedBookings = await getBookingsByBusinessUserId(props.userId);
      }
    } catch (err) {
      console.log("Not a BusinessUser:", err.message);
    }
  }

  if (!fetchedBookings || fetchedBookings.length === 0) {
    error.value = "No bookings found for this user.";
  }

  bookings.value = fetchedBookings;
  loading.value = false;
}

onMounted(fetchBookings);
</script>

<template>
  <div class="bookings-wrapper">
    <h1>Bookings</h1>

    <div v-if="loading">Loading bookings...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="bookings.length === 0">No bookings found.</div>
    <div v-else>
      <table class="bookings-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Car</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking.bookingId">
            <td>{{ booking.bookingId }}</td>
            <td>{{ booking.car?.brand }} {{ booking.car?.model }}</td>
            <td>{{ booking.startDate }}</td>
            <td>{{ booking.endDate }}</td>
            <td>{{ booking.bookingStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.bookings-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #ffffff;
}

.error {
  text-align: center;
  margin: 20px 0;
  color: #7F0000;
}

.bookings-table {
  width: 100%;
  border-collapse: collapse;
}

.bookings-table th,
.bookings-table td {
  border: 1px solid #7F0000;
  padding: 10px;
  text-align: center;
  color:#000
}

.bookings-table th {
  background-color: #7F0000;
  color: #fff;
}

.bookings-table tbody tr {
  background-color: #f2f2f2;
}

.bookings-table tbody tr:hover {
  background-color: #ffe6e6;
}
</style>
