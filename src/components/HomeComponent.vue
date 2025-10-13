<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1 class="title">Find Your Perfect Ride</h1>
        <p class="subtitle">
          Explore our selection of cars and book your next adventure today.
        </p>
        <RouterLink to="/user/cars" class="cta-btn">Rent a Car</RouterLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="feature">
        <i class="fas fa-car"></i>
        <h3>Wide Variety</h3>
        <p>From compact city cars to powerful SUVs — we’ve got you covered.</p>
      </div>

      <div class="feature">
        <i class="fas fa-credit-card"></i>
        <h3>Easy Payment</h3>
        <p>Secure, flexible, and quick payment options for every renter.</p>
      </div>

      <div class="feature">
        <i class="fas fa-headset"></i>
        <h3>24/7 Support</h3>
        <p>We’re here whenever you need help or roadside assistance.</p>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <h2>Driven by Quality & Trust</h2>
      <p>
        We’re more than a rental company — we’re your travel partner.
        With transparent pricing, well-maintained cars, and friendly service,
        your comfort and confidence are our top priorities.
      </p>
      <RouterLink to="/user/about-us" class="learn-more">Learn More →</RouterLink>
    </section>
  </div>
</template>

<style scoped>
/* Base Layout */
.home-container {
  display: flex;
  flex-direction: column;
  gap: 60px;
  background-color: #282121;
  color: #e0e0e0;
  min-height: 100vh;
}

/* Hero Section */
.hero {
  position: relative;
  background: url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop')
  center/cover no-repeat;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  border-bottom: 2px solid #7f0000;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  padding: 0 20px;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
}

.subtitle {
  margin-top: 15px;
  font-size: 1.2rem;
  color: #d0d0d0;
  margin-bottom: 30px;
}

.cta-btn {
  background-color: #7f0000;
  color: white;
  padding: 12px 35px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(127, 0, 0, 0.4);
}

.cta-btn:hover {
  background: linear-gradient(135deg, #cc0000, #ff1a1a);
  transform: translateY(-2px);
}

/* Features Section */
.features {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  background-color: #1a1a1a;
  padding: 60px 20px;
}

.feature {
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 12px;
  width: 280px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  border-color: #7f0000;
  box-shadow: 0 0 15px rgba(127, 0, 0, 0.3);
}

.feature i {
  font-size: 2rem;
  color: #ff4d4d;
  margin-bottom: 15px;
}

/* About Section */
.about {
  background-color: #181818;
  text-align: center;
  padding: 80px 20px;
  border-top: 1px solid #333;
}

.about h2 {
  color: #ff4d4d;
  font-size: 2rem;
  margin-bottom: 20px;
}

.about p {
  max-width: 700px;
  margin: 0 auto 25px auto;
  color: #cfcfcf;
  line-height: 1.6;
}

.learn-more {
  display: inline-block;
  color: #ff4d4d;
  text-decoration: none;
  font-weight: 600;
}

.learn-more:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }

  .features {
    flex-direction: column;
    align-items: center;
  }

  .feature {
    width: 90%;
  }
}
</style>
