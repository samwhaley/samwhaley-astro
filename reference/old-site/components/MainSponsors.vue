<template>
    <div> 
        <div class="main-sponsor" v-for="item in mainSponsorData.sponsor_item" :key="item.id">
            <div class="main-sponsor__left">
                <img class="main-sponsor__logo" :src="api + item.logo.url"></img>
            </div>
            <div class="main-sponsor__content">
                <h5 class="main-sponsor__title">{{ item.title }}</h5>
                <div class="" v-html="$md.render(item.content)"></div> 
                <ButtonUrl :route="item.link" :text="'visit site'" :type="'alt'" :align="'left'"></ButtonUrl>  
            </div>
        </div>
    </div>
</template>

<script>
import Arrow from '~/components/Arrow.vue'

export default {
    components: {
        Arrow
    },

    props: {
        mainSponsorData: Object
    },

    computed: {
        api() {
            return process.env.strapiBaseUri;
        },
    }
}
</script>

<style lang='scss' scoped>
    .main-sponsor {
        display: flex;
        margin: 1rem auto 3rem;
        width: 90%;


        @media #{$phone} {
            flex-direction: column;
            margin-top: 2rem;
            
            & > div {
                width: 100%;
            }
        }
    }

    .main-sponsor__left {
        position: relative;
        margin-right: 5%;
        width: 40%;

        @media #{$smallPhone} {
            // margin: 0 auto;
        }
    }

    .main-sponsor__logo {
        width: 100%;
    }

    .main-sponsor__content {
        width: 55%;

        @media #{$smallPhone} {
            padding-top: 2rem;
        }

        .button__container {
            justify-content: flex-start;
        }
    }
    
    .main-sponsor__title {
        text-transform: uppercase;
    }



</style>
