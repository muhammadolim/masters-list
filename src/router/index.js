import { createRouter, createWebHistory } from "vue-router";
import MastersListView from "../views/MastersList.vue";
import MasterDetailView from "../views/MasterDetails.vue";
import ApplicantForm from '../views/ApplicantForm.vue';

const routes = [
    {
        path: "/master-list/:id",
        name: "MasterList",
        component: MastersListView,
    },
    {
        path: "/master/:id",
        name: "MasterDetail",
        component: MasterDetailView,
    },
    {
        path: '/apply',
        name: 'ApplicantForm',
        component: ApplicantForm,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
