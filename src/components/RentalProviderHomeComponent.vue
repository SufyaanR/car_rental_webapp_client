<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1 class="title">Grow Your Rental Business</h1>
        <p class="subtitle">
          List your vehicles, manage bookings, and get paid securely — all in one place.
        </p>
        <RouterLink to="/rental-provider/create" class="cta-btn">Add a Vehicle</RouterLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="feature">
        <i class="fas fa-car-side"></i>
        <h3>Manage Your Fleet</h3>
        <p>Easily add, edit, and monitor your vehicles from your dashboard.</p>
      </div>

      <div class="feature">
        <i class="fas fa-wallet"></i>
        <h3>Track Earnings</h3>
        <p>View real-time revenue insights and track every payment securely.</p>
      </div>

      <div class="feature">
        <i class="fas fa-calendar-check"></i>
        <h3>Streamlined Bookings</h3>
        <p>Accept, manage, and confirm rental requests in seconds.</p>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <h2>Empowering Vehicle Owners</h2>
      <p>
        Join a growing community of rental providers and turn your idle vehicles 
        into a steady source of income. We provide the tools, visibility, and 
        support to make your rental business thrive.
      </p>
      <RouterLink to="/rental-provider/about-us" class="learn-more">Learn More →</RouterLink>
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
