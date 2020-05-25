import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home/Home.vue';
import Auth from '@/views/Auth/Auth.vue';
import AuthService from '@/services/AuthService';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/auth',
        name: 'Auth',
        component: Auth
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name != 'Auth' && !AuthService.isAuthenticated()) {
        next('/auth');
    } else {
        next();
    }
});

export default router;