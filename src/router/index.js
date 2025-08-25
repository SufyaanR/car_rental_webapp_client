import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import RentalProviderCreatePage from "../pages/RentalProviderCreatePage.vue";
import CarListPage from "../pages/CarListPage.vue";
import CarViewPage from "../pages/CarViewPage.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import RentalProviderLayout from "../layouts/RentalProviderLayout.vue";
import UserLayout from "../layouts/UserLayout.vue";

//Renders page components when user navigates
const routes = [
    {path: '/rental-provider', component: RentalProviderLayout, children: [
            {path: 'create', name: 'RentalProviderCreatePage', component: RentalProviderCreatePage}
        ]},
    {path: '/user', component: UserLayout, children: [
            {path: '', name: 'LoginPage', component: LoginPage},
            {path: 'login', name: 'LoginPage', component: LoginPage},
            {path: 'signup', name: 'SignUpPage', component: SignUpPage},
            {path: 'cars', name: 'CarListPage', component: CarListPage},
            {path: 'car-view', name: 'CarViewPage', component: CarViewPage},
            //{path: 'car/:id', name: 'CarViewPage', component: CarViewPage},
        ]},
    {path: '/:catchAll(.*)*', name: "PageNotFound", component: PageNotFound} //This catches our error page not found
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;