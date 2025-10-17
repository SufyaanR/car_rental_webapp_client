<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import { createBooking, createPayment, getCar } from "../routes/routes.js";

const props = defineProps({
  car: { type: Object, required: true }
});
const emit = defineEmits(["close"]);

const startDate = ref("");
const endDate = ref("");
const loading = ref(false);
const bookingId = ref(null);
const fullCar = ref(null);
const showPaymentForm = ref(false);

const cardNumber = ref("");
const nameOfCardHolder = ref("");
const expiryDate = ref("");
const ccv = ref("");

const duration = computed(() => {
  if (!props.car || !startDate.value || !endDate.value) return 0;
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const diff = end - start;
  return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
});

const totalAmount = computed(() => {
  return props.car && duration.value > 0
    ? duration.value * props.car.pricePerDay
    : 0;
});

async function confirmBooking() {
  if (!props.car) return;
  if (duration.value <= 0) {
    alert("Please select valid start and end dates.");
    return;
  }

  try {
    loading.value = true;

    const bookingData = {
      startDate: startDate.value,
      endDate: endDate.value,
      totalPrice: totalAmount.value,
      bookingStatus: "PENDING",
      userId: localStorage.getItem("authenticatedUserId"),
      carId: props.car.carId
    };

    const response = await createBooking(bookingData);
    bookingId.value = response.bookingId;

    fullCar.value = await getCar(props.car.carId);

    showPaymentForm.value = true;
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Error creating booking. Please try again.");
  } finally {
    loading.value = false;
  }
}

async function submitPayment() {
  if (!bookingId.value) return;

  if (!cardNumber.value || !nameOfCardHolder.value || !expiryDate.value || !ccv.value) {
    alert("Please fill in all payment details.");
    return;
  }

  try {
    loading.value = true;

    let formattedExpiryDate = expiryDate.value;
    if (/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
      const [month, year] = expiryDate.value.split("/").map(Number);
      formattedExpiryDate = `20${year}-${String(month).padStart(2, "0")}-28`;
    }

    const now = new Date();

    const paymentData = {
      cardNumber: parseInt(cardNumber.value.replace(/\s+/g, "")),
      nameOfCardHolder: nameOfCardHolder.value,
      expiryDate: formattedExpiryDate,
      ccv: ccv.value,
      amount: totalAmount.value,
      paymentDate: now.toISOString().split("T")[0],
      paymentTime: now.toTimeString().split(" ")[0],
      paymentStatus: "PENDING",
      user: { userId: localStorage.getItem("authenticatedUserId") },
      booking: { bookingId: bookingId.value }
    };

    console.log("Prepared payment payload:", paymentData);
    await createPayment(paymentData);

    alert("Payment successful!");
    closeModal();
  } catch (error) {
    console.error("Payment failed:", error);
    alert("Error processing payment. Please try again.");
  } finally {
    loading.value = false;
  }
}


function closeModal() {
  startDate.value = "";
  endDate.value = "";
  bookingId.value = null;
  showPaymentForm.value = false;
  cardNumber.value = "";
  nameOfCardHolder.value = "";
  expiryDate.value = "";
  ccv.value = "";
  emit("close");
}
</script>

<template>
  <div v-if="car" class="modal-overlay">
    <div class="modal-card">
      <h2 class="modal-title">
        {{ showPaymentForm ? `Payment for Booking #${bookingId}` : `Book ${car.brand} ${car.model}` }}
      </h2>

      <form class="modal-form" @submit.prevent="showPaymentForm ? submitPayment() : confirmBooking()">
        <!-- Booking form -->
        <template v-if="!showPaymentForm">
          <div class="form-group">
            <label>Start Date</label>
            <input type="date" v-model="startDate" required />
          </div>

          <div class="form-group">
            <label>End Date</label>
            <input type="date" v-model="endDate" required />
          </div>

          <div class="form-group">
            <label>Total Amount</label>
            <span v-if="duration > 0">R{{ totalAmount.toFixed(2) }}</span>
            <span v-else>—</span>
          </div>
        </template>

        <!-- Payment form -->
        <template v-else>
          <div class="form-group">
            <label>Card Number</label>
            <input type="text" v-model="cardNumber" placeholder="1234 5678 9012 3456" required />
          </div>

          <div class="form-group">
            <label>Name on Card</label>
            <input type="text" v-model="nameOfCardHolder" placeholder="John Doe" required />
          </div>

          <div class="form-group">
            <label>Expiry Date</label>
            <input type="text" v-model="expiryDate" placeholder="MM/YY" required />
          </div>

          <div class="form-group">
            <label>CCV</label>
            <input type="text" v-model="ccv" placeholder="123" required />
          </div>

          <div class="form-group">
            <label>Amount</label>
            <span>R{{ totalAmount.toFixed(2) }}</span>
          </div>
        </template>

        <!-- Buttons -->
        <div class="form-actions">
          <button type="submit" class="confirm-btn" :disabled="loading">
            {{ loading ? "Processing..." : showPaymentForm ? "Pay Now" : "Confirm Booking" }}
          </button>
          <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-card {
  background: #3b3b3b;
  border-radius: 16px;
  padding: 40px 30px;
  width: 70vw;
  max-width: 600px;
  color: #eee;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  text-align: center;
  font-size: 1.8rem;
  color: #ff7f7f;
  margin-bottom: 20px;
}

.modal-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 600;
}

.form-group input {
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

.form-group input:focus {
  outline: 2px solid #7f0000;
  background: #666;
}

.form-actions {
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
}

.confirm-btn {
  flex: 1;
  background-color: #7f0000;
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #a00000;
}

.cancel-btn {
  flex: 1;
  background-color: #444;
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #666;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-card {
    width: 90vw;
    padding: 30px 20px;
  }

  .modal-form {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .confirm-btn,
  .cancel-btn {
    width: 100%;
  }
}
</style>
