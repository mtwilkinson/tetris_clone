
import homepage from "./pages/homepage.svelte";
import test from "./pages/Play.svelte";

const routes = [
    {
        name: '/',
        component: homepage,
    },
    { name: 'login', component: test},

]

export { routes }