<template>
    <transition name="page" appear>
        <div class="banner" :style="{ backgroundImage: 'linear-gradient(#828282, #828282), url(' + api + image + ')', backgroundPosition: bgPosition() }">
            <!-- <transition name="page" appear> -->
                <div class="banner__content">
                    <h1 v-parallax="0.1" class="banner__title">{{ title }}</h1>
                    <h3 v-parallax="0.1" class="banner__subtitle">{{ subtitle }}</h3>
                    <h5 v-if="error" v-html="error" class="banner__error"></h5>
                    <Arrow v-if="arrow"/>       
                </div>
            <!-- </transition> -->
        </div>
    </transition>
</template>

<script>
import Arrow from '~/components/Arrow.vue'

export default {
    components: {
        Arrow
    },

    props: {
        arrow: Boolean,
        bgPositionV: String,
        bgPositionH: String,
        image: String,
        title: String,
        subtitle: String,
        error: String
    },

    computed: {
        api() {
            return process.env.strapiBaseUri;
        }
    },
    methods: {
        bgPosition() {
            return this.bgPositionV + ' ' + this.bgPositionH
        }
    }
}
</script>

<style lang='scss' scoped>
    .banner {
        background-size: cover;
        background-blend-mode: screen;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: relative;
        width: 100vw;
        overflow: hidden;

        @media #{$smallPhone} {
            height: 60vh;
        }

        &:after {
            content: '';
            position: absolute;
            bottom: -2px;
            height: 30vh;
            width: 100vw;
            background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
            z-index: 0;
        }
    }

    .banner__content {
        max-width: 1088px;
    }
    
    .banner__title {
        letter-spacing: 1rem;
        font-size: 160px;
        font-weight: 900;
        margin: 0 15px;
        padding: 0;
        text-align: center;
        text-transform: uppercase;

        @media #{$tablet} {
            font-size: 15vw;
        }
        @media #{$phone} {
            font-size: 13vw;
            letter-spacing: .5rem;
        }
        @media #{$smallPhone} {
            font-size: 13vw;
            letter-spacing: .5rem;
        }
    }

    .banner__subtitle {
        letter-spacing: 1rem;
        font-size: 54px;
        font-weight: 400;
        text-align: center;
        margin-right: -1.25rem;
        margin-left: 15px;
        margin-top: 2rem;
        text-transform: uppercase;

        @media #{$tablet} {
            font-size: 5.5vw;
        }
    }

    .banner__error {
        margin: 0 30px;
        text-align: center;
    }
</style>
