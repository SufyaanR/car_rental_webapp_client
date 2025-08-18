<script setup>
import {onBeforeMount, ref} from 'vue';
import { useRouter } from 'vue-router';
import UsernameComponent from '../components/UsernameComponent.vue';
import PasswordComponent from '../components/PasswordComponent.vue';
// this is a real page but has dummy code for demo purposes
const email = ref()

onBeforeMount(async () => {console.log("hello world")})
</script>

<template>
<UsernameComponent :email-address= "email"/>
<PasswordComponent/>
  <h1>Login</h1>
  <input v-model="email"/>
  <label v-if="email">email:{{email}}</label>
  <a href="/signup"><button>Login</button></a>
</template>

<style scoped>
</style>