<template>
    <div>
        Hello from App Vue: <strong>{{message}}</strong>
        <router-link to="/pagea">Go to A</router-link>
        <router-link to="/pageb">Go to B</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                message: 'Message from App.vue'
            };
        }
    };
</script>