/**
* Created by catscorpio on 2019/3/12.
*/

<template>
    <div class="navbar">
        <div class="container body">
            <img @click="selectNav('home')" class="logo" src="../../assets/images/logo.png" alt="">
            <ul class="menu">
                <li @click="selectNav('home')" :class="{'active': activeIndex == 'home'}">{{$t('navbar.home')}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: ''
            }
        },
        watch: {
            '$route.path'() {
                this.isActive()
            }
        },
        computed: {

        },
        created() {
            this.isActive()
        },
        methods: {
            isActive() {
                switch (this.$route.path) {
                    case '/':
                        this.activeIndex = 'home';
                        break;
                    default:
                        this.activeIndex = '';
                }
            },
            selectNav(str){
                switch (str) {
                    case 'home':
                        this.$router.push('/');
                        break;
                    case 'token':
                        this.$router.push('/token');
                        break;
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .navbar {
        flex: 0 0 auto;
        width: 100%;
        height: $navbar-height;
        box-shadow: 0px 3px 8px 0 rgba(3, 3, 3, 0.1);
        background-color: white;
    }

    .body {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    ul.menu {
        display: block;
        display: flex;
        align-items: center;
        li {
            float: left;
            font-size: $navbar-fontsize;
            padding: 0 1.2rem;
            cursor: pointer;
            color: $primary-font-color;
        }
        .net-content{
            display: block;
            height: auto;
            color: $primary-color;
            background: rgba(72,72,198,.1);
            border-color: transparent;
            font-size: .60938rem;
            padding: .5rem .6rem;
            border-radius: .125rem;
        }
        .net-body{
            padding: 0;
        }
        li.active, li:hover, .navbar-dropdown:hover{
            color: $primary-color;
        }
        li.active .el-dropdown-link{
            color: $primary-color;
            font-size: $navbar-fontsize;
        }
        .el-dropdown{
            color: $primary-font-color;
            .el-dropdown-link{
                font-size: $navbar-fontsize;
            }
        }
        .net{
            color: $primary-color;
            /*background: rgba(72,72,198,.1);*/
            /*border-color: transparent;*/
            font-size: .60938rem;
            /*padding: .5rem .6rem;*/
            /*border-radius: .125rem;*/
        }
    }

    .item {
        min-width: 3rem;
        /*text-align: left;*/
        color: $primary-font-color;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.1rem;
    }
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover, .a-item:hover {
        color: $primary-color;
        background: transparent;
    }
    .a-item{
        color: $primary-font-color;
    }

    .logo{
        cursor: pointer;
        width: 4rem;
    }

    @media screen and (max-width: $sm){
        .navbar ul.menu li{
            padding: 0rem .3rem;
        }
        .navbar ul.menu li.net-body{
            padding: 0;
        }
        .logo{
            width: 3.5rem;
        }
    }
</style>