import { createRouter, createWebHashHistory } from 'vue-router';
import Dynamics from '@/components/Dynamics.vue';
import Skeleton from '@/components/SkeletonPage.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Dynamics,
        },

        {
            path: '/dynamics',
            component: Dynamics
        },
        {
            path: '/skeleton1',
            component: Skeleton
        },
        {
            path: '/skeleton2',
            component: Skeleton
        }

    ]
});

export default router;
