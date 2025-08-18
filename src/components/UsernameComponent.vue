<script setup>
defineProps({
  emailAddress: {type:String, default:"defaultEmail"}
})

// this is a dummy component to demonstrate how a component can be structured
</script>

<template>
  <div class="mb-3">
    <label for="input" class="form-label">{{emailAddress}}</label>
    <input type="email" class="form-control" id="input" placeholder="name@example.com" >
  </div>
</template>

<style scoped>
</style>