import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

// Init 
const pinia = createPinia();

// Page Components
const Landing = { template: `<div>Landing</div>` }

// Routes
const routes = [
    { path: '/', component: Landing },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// Create Vue App instance
const app_instance = createApp(App);
app_instance.use(router);
app_instance.use(pinia);
app_instance.mount('#app');