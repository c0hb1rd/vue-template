<template>
    <transition name="el-fade-in" mode="out-in" appear>
        <router-view id="app"></router-view>
    </transition>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'app',
    }
</script>

<style lang="scss">

</style>
