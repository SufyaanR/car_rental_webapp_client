<template>
  <section class="contact-page">
    <div class="contact-container">
      <div class="left-panel">
        <h1 class="title">Contact Us</h1>
        <p class="subtitle">
          Have a question or need assistance?
          Fill in the form and we’ll get back to you shortly.
        </p>

        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input v-model="form.name" type="text" id="name" placeholder="Enter your name" required />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input v-model="form.email" type="email" id="email" placeholder="Enter your email" required />
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input v-model="form.subject" type="text" id="subject" placeholder="Subject of your message" required />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea v-model="form.message" id="message" rows="4" placeholder="Write your message..." required></textarea>
          </div>

          <button type="submit" class="submit-btn">Send Message</button>
        </form>
      </div>

      <div class="right-panel">
        <img src="https://media.istockphoto.com/id/2173282783/vector/the-call-center-specialist-girl-is-working.jpg?s=612x612&w=0&k=20&c=OlWeIVOzWf7wTKjTl6NEiL-iAtkSCLeoNbGDlFNgCok=" alt="Contact illustration" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const submitForm = () => {
  alert(`Thank you, ${form.value.name}! Your message has been sent.`);
  form.value = { name: "", email: "", subject: "", message: "" };
};
</script>

<style scoped>
.contact-page {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #2f2f2f, #1e1e1e);
  overflow: hidden;
}

.contact-container {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: #3b3b3b;
  border-radius: 20px;
  width: 80vw; /* Wider form layout */
  max-width: 1300px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.left-panel {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-panel {
  flex: 1;
  background: #2a2a2a;
}

.right-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
}

.title {
  font-size: 2rem;
  color: #ffb3b3;
  margin-bottom: 10px;
}

.subtitle {
  color: #ccc;
  margin-bottom: 30px;
  line-height: 1.6;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

label {
  color: #ddd;
  font-weight: 600;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #555;
  color: #fff;
  font-size: 1rem;
  transition: background 0.3s ease;
}

input:focus,
textarea:focus {
  background: #666;
  outline: 2px solid #7f0000;
}

.submit-btn {
  background: #7f0000;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #a00000;
}

/* Responsive */
@media (max-width: 968px) {
  .contact-container {
    flex-direction: column;
    width: 90vw;
  }

  .right-panel {
    display: none;
  }

  .left-panel {
    padding: 30px;
  }
}
</style>
