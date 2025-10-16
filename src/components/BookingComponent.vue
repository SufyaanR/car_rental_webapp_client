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
      userId: 165,          // hardcoded user ID for now
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
      user: { userId: 165 },          
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
    <div class="modal">
      <h2 v-if="!showPaymentForm">Book {{ car.brand }} {{ car.model }}</h2>
      <h2 v-else>Payment for Booking #{{ bookingId }}</h2>

      <div v-if="!showPaymentForm">
        <div class="form-group">
          <label>Start Date</label>
          <input type="date" v-model="startDate" />
        </div>

        <div class="form-group">
          <label>End Date</label>
          <input type="date" v-model="endDate" />
        </div>

        <div class="form-group">
          <label>Total Amount</label>
          <span v-if="duration > 0">R{{ totalAmount.toFixed(2) }}</span>
          <span v-else>—</span>
        </div>

        <div class="button-row">
          <button class="confirm" @click="confirmBooking" :disabled="loading">
            {{ loading ? "Processing..." : "Confirm Booking" }}
          </button>
          <button class="cancel" @click="closeModal">Cancel</button>
        </div>
      </div>

      <div v-else>
        <div class="form-group">
          <label>Card Number</label>
          <input type="text" v-model="cardNumber" placeholder="1234 5678 9012 3456" />
        </div>

        <div class="form-group">
          <label>Name on Card</label>
          <input type="text" v-model="nameOfCardHolder" placeholder="John Doe" />
        </div>

        <div class="form-group">
          <label>Expiry Date</label>
          <input type="text" v-model="expiryDate" placeholder="MM/YY" />
        </div>

        <div class="form-group">
          <label>CCV</label>
          <input type="text" v-model="ccv" placeholder="123" />
        </div>

        <div class="form-group">
          <label>Amount</label>
          <span>R{{ totalAmount.toFixed(2) }}</span>
        </div>

        <div class="button-row">
          <button class="confirm" @click="submitPayment" :disabled="loading">
            {{ loading ? "Processing..." : "Pay Now" }}
          </button>
          <button class="cancel" @click="closeModal">Cancel</button>
        </div>
      </div>
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

.modal {
  background: #1a1a1a;
  border-radius: 16px;
  padding: 30px;
  width: 400px;
  max-width: 95vw;
  color: #fff;
  border: 1px solid #333;
  box-shadow: 0 5px 20px rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal h2 {
  text-align: center;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.modal input {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #555;
  background: #2a2a2a;
  color: white;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
}

.confirm, .cancel {
  flex: 1;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.confirm {
  background: #7f0000;
  color: white;
}

.confirm:hover {
  background: #cc0000;
}

.cancel {
  background: #444;
  color: white;
}

@media (max-width: 480px) {
  .modal {
    width: 100%;
    padding: 20px;
    transform: none;
    left: 0;
    top: 0;
    position: relative;
  }

  .button-row {
    flex-direction: column;
  }

  .confirm, .cancel {
    width: 100%;
  }
}
</style>
