<script setup>
import { useRoute } from "vue-router";
import RentalProviderBookingsComponent from "../components/RentalProviderBookingsComponent.vue";

const route = useRoute();
const userId = Number(route.params.userId);
</script>

<template>
  <RentalProviderBookingsComponent :userId="userId" />
</template>
