import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Index = file => () => System.import('../views/Index.vue');
const Home =  file => () => System.import('../views/Home.vue');


export const staticRoutes = [
    {
        path: '/', name: 'Index', component: Index(), redirect: '/home',
        children: [
            {
                path: '/home', name: 'Home', component: Home()
            }
        ]
    }
];

export const router = new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: (to, from, savedPosition) => { //只在 HTML5 history 模式下可用
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
    routes: staticRoutes
});

export default router