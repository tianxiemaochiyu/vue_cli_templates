/**
* Created by catscorpio on 2019/3/12.
*/

<template>
    <div class="footerbar">
        <div class="container body">
            <div class="info">
                {{$t('footerbar.title')}}
            </div>
            <div class="copyright">
                <span>{{$t('footerbar.title')}} ©️ 2019 (C)</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>

<style lang='scss' scoped>
    .footerbar{
        flex: 0 0 auto;
        background: $footer-bg;
        width: 100%;
    }
    .info{
        height: $footer-info-height;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        .name{
            font-weight: 600;
            font-size: 1rem;
            padding-top: 1rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
        }
        .info-item{
            span{
                text-align: left;
                display: block;
                font-weight: 600;
                font-size: 1rem;
                margin-bottom: .8rem;
            }
            li{
                width: 100%;
                text-align: left;
                font-size: .7rem;
                margin-bottom: .4rem;
            }
        }
    }
    .copyright{
        border-top: 1px solid #434354;
        height: $footer-copyright-height;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-size: .8rem;
    }

    @media screen and (max-width: $sm){
        .info{
            height: auto;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
        .info-item.ul{
            /*width: 100%;*/
            margin-top: 1rem;
            li, span{
                /*text-align: center;*/
            }
        }
        .copyright{
            padding-top: 1rem;
            padding-bottom: 1rem;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            height: auto;
        }
    }

    @media (max-width: $xs) {

    }
</style>