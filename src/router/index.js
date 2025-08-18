import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";

//Renders page components when user navigates
const routes = [
    {path: '/', name: 'LoginPage', component: LoginPage},
    {path: '/login', name: 'LoginPage', component: LoginPage},
    {path: '/signup', name: 'SignUpPage', component: SignUpPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;