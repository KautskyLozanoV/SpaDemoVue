import Vue from 'vue';
import App from './App.vue';
import Router from './router';
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router: Router
});