import '../node_modules/flag-icons/css/flag-icons.css';

import { createApp } from 'vue';
import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import Vue3CountrySelector from '@/entry.esm';

console.log(Vue3CountrySelector);

const app = createApp(Dev);
app.use(Vue3CountrySelector);

app.mount('#app');
