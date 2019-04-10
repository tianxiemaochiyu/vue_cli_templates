<template>
    <div id="app">
        <NavBar></NavBar>
        <div class="main">
            <router-view/>
        </div>
        <FooterBar></FooterBar>
    </div>
</template>
<script>
    import NavBar from '@/views/Layout/NavBar';
    import FooterBar from '@/views/Layout/FooterBar';
    export default {
        components: {
            NavBar: NavBar,
            FooterBar: FooterBar
        },
        data(){
            return {

            }
        },
        created(){
            window.addEventListener('resize', () => this.$store.dispatch('SetScreenSize', window.innerWidth))
        }
    }
</script>
<style lang="scss">
    @import "@/assets/styles/global.scss";
    #app {
        text-align: center;
        color: #2c3e50;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
    .main{
        flex: 1 0 auto;
        width: 100%;
    }
</style>
