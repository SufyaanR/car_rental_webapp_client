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
import AuthLayout from "../layouts/AuthLayout.vue";
import RentalProviderSubscriptionPaymentPage from '../pages/RentalProviderSubscriptionPaymentPage.vue';
import RentalProviderHomePage from '../pages/RentalProviderHomePage.vue';
import AccountPage from '../pages/AccountPage.vue';
import RentalProviderAccountPage from '../pages/RentalProviderAccountPage.vue';
import RentalProviderCarListPage from '../pages/RentalProviderCarListPage.vue';

const routes = [
    { path: '/', redirect: '/auth/login' },
    {path: '/auth', component: AuthLayout, children: [
            {path: 'login', name: 'LoginPage', component: LoginPage},
            {path: 'signup', name: 'SignUpPage', component: SignUpPage}
        ]},
    {path: '/rental-provider', component: RentalProviderLayout, meta: { requiresAuth: true, roles: ['BUSINESS', 'PRO'] },  children: [
            {path: 'home', name: 'RentalProviderHomePage', component: RentalProviderHomePage},
            {path: 'create', name: 'RentalProviderCreatePage', component: RentalProviderCreatePage},
            { path: 'update-car/:id', name: 'RentalProviderUpdatePage', component: RentalProviderUpdatePage },
            {path: 'payments/:userId', name: 'RentalProviderPayments',component: RentalProviderPaymentsPage},
            { path: 'bookings/:userId', name: 'RentalProviderBookings', component: RentalProviderBookingsPage },
            {path: "subscriptions/:userId", name: "SubscriptionPayments",component: RentalProviderSubscriptionPaymentPage},
            {path: 'account/:userId', name: 'RentalProviderAccountPage', component: RentalProviderAccountPage},
            {path: 'about-us', name: 'AboutUsPage', component: AboutUsPage},
            { path: 'my-cars', name: 'RentalProviderCarListPage', component: RentalProviderCarListPage },

            
        ]},
    {path: '/user', component: UserLayout, meta: { requiresAuth: true, roles: ['BASIC'] }, children: [
            {path: 'cars', name: 'CarListPage', component: CarListPage},
            {path: 'car/:id', name: 'CarViewPage', component: CarViewPage},
            {path: 'home', name: 'HomePage', component: HomePage},
            {path: 'about-us', name: 'AboutUsPage', component: AboutUsPage},
            {path: 'contact', name: 'ContactUsPage', component: ContactUsPage},
            {path: 'account', name: 'AccountPage', component: AccountPage}
        ]},
    {path: '/:catchAll(.*)*', name: "PageNotFound", component: PageNotFound} 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userId = localStorage.getItem("authenticatedUserId");
    const userType = localStorage.getItem("userType");
    const isAuthenticated = !!userId;

    if (to.meta.requiresAuth && !isAuthenticated) {
        return next("/auth/login");
    }

    if (isAuthenticated && to.meta.roles && !to.meta.roles.includes(userType)) {
        return next("/auth/login");
    }

    if ((to.path === "/auth/login" || to.path === "/auth/signup") && isAuthenticated) {
        if (userType === "BASIC") next("/user/home");
        else if (["BUSINESS", "PRO"].includes(userType)) next("/rental-provider/home");
        else next("/auth/login");
    } else {
        next();
    }
});

export default router;