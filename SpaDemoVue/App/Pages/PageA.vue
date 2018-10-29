<template>
    <div>
    Page A - <strong>{{message}}</strong>
    </div>
    </template>
    <script>
    export default {
    name: 'PageA',
        data() {
        return {
            message: 'Data from Page A'
        };
    }        
};
</script>