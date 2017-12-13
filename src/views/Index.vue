<template>
    <div>
        <CommonHeader></CommonHeader>
        <transition name="el-fade-in" mode="out-in" appear>
            <router-view class="common-body"></router-view>
        </transition>
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
    import CommonHeader from '../components/CommonHeader.vue'
    import CommonFooter from '../components/CommonFooter.vue'

    export default {
        components: {CommonHeader, CommonFooter}
    }
</script>

<style lang="scss">
    .common-body {
        flex-grow: 1;
    }
</style>