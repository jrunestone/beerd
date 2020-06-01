import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

import 'normalize.css/normalize.css';
import 'vue-material-design-icons/styles.css';
import '@/assets/styles/fonts.css';
import '@/assets/styles/global.css';

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
