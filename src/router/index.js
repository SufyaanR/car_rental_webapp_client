import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import RentalProviderCreatePage from "../pages/RentalProviderCreatePage.vue";
import CarListPage from "../pages/CarListPage.vue";
import CarViewPage from "../pages/CarViewPage.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import RentalProviderUpdatePage from "../pages/RentalProviderUpdatePage.vue";
import RentalProviderPaymentsPage from '../pages/RentalProviderPaymentsPage.vue';
import RentalProviderBookingsPage from '../pages/RentalProviderBookingsPage.vue';
import RentalProviderLayout from "../layouts/RentalProviderLayout.vue";
import UserLayout from "../layouts/UserLayout.vue";
import HomePage from "../pages/HomePage.vue";
import AboutUsPage from "../pages/AboutUsPage.vue";
import ContactUsPage from "../pages/ContactUsPage.vue";

//Renders page components when user navigates
const routes = [
    {path: '/rental-provider', component: RentalProviderLayout, children: [
            {path: 'create', name: 'RentalProviderCreatePage', component: RentalProviderCreatePage},
            { path: 'update-car/:id', name: 'RentalProviderUpdatePage', component: RentalProviderUpdatePage },
            {path: 'payments/:userId', name: 'RentalProviderPayments',component: RentalProviderPaymentsPage},
            { path: 'bookings/:userId', name: 'RentalProviderBookings', component: RentalProviderBookingsPage }

        ]},
    {path: '/user', component: UserLayout, children: [
            {path: '', name: 'LoginPage', component: LoginPage},
            {path: 'login', name: 'LoginPage', component: LoginPage},
            {path: 'signup', name: 'SignUpPage', component: SignUpPage},
            {path: 'cars', name: 'CarListPage', component: CarListPage},
            {path: 'car/:id', name: 'CarViewPage', component: CarViewPage},
            {path: 'home', name: 'HomePage', component: HomePage},
            {path: 'about-us', name: 'AboutUsPage', component: AboutUsPage},
            {path: 'contact', name: 'ContactUsPage', component: ContactUsPage},
        ]},
    {path: '/:catchAll(.*)*', name: "PageNotFound", component: PageNotFound} //This catches our error page not found
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;