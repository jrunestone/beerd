import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
console.log('vue says', process.env.FAUNADB_SERVER_SECRET);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
