<template>
        <div class="intro" :class="{ 'intro--mt': marginTop }">
            <div class="intro__left" :class="{ 'intro__left--alt': alt }">
                <div v-parallax="0.1" class="intro__image" :style="{ backgroundImage: 'url(' + api + image + ')' }"></div>
                <span v-if="number" class="number" :class="{ 'number--alt': alt }">0<span class="number--red">{{ number }}</span></span>
                <div v-parallax="0.1" class="intro__logos" v-if="logos">
                    <img :src="api + logo.url" alt="Main Sponsor Logos" v-for="logo in logos">
                </div>
            </div>
                <div class="intro__right" :class="{ 'intro__right--alt': alt, active: scrolled }">
                    <scroll @enter="scrollEnter()" @leave="scrollLeave()" :threshold='0'>
                        <h4 class="intro__title" :class="{ active: scrolled }">{{ title }}</h4>
                    </scroll>
                    <div class="intro__content" :class="{ active: scrolled }" v-html="$md.render(content)"></div>
                    <ButtonLink v-if="button.show" :route="button.page" :text="button.text" :type="button.type" :align="button.align"></ButtonLink>          
                </div>
        </div>
</template>

<script>
export default {
    props: {
        alt: Boolean,
        button: Object,
        content: String,
        image: String,
        logos: Array,
        marginTop: Boolean,
        number: Number,
        title: String
    },

    data: function() {
        return {
            scrolled: false,
        }
    },

    methods: {
        scrollEnter() {
            this.scrolled = true;
        },
        scrollLeave() {
            const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if( vw < 500 ) {
                this.scrolled = true;
            }
        }
    },

    computed: {
        api() {
            return process.env.strapiBaseUri;
        },
    },
}
</script>

<style lang='scss' scoped>
.intro {
    display: flex;
    margin-top: 5rem;
    width: 100%;

    @media #{$phone} {
        flex-direction: column;
        
        & > div {
            width: 100%;
        }
    }

    &--mt {
        margin-top: 8rem;

        @media #{$phone} {
            margin-top: 5rem;
        }
    }
}

.intro__image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 101%;
    padding-top: 18rem;
    width: 100%;

    @media #{$phone} {
        background-size: auto 140%;
    }
}

.intro__right {
    width: 50%;
}

.intro__title, .intro__content {
    opacity: 0;
    transform: translateX(-1rem);

    &.active {
        opacity: 1;
        transform: translateX(0);
        transition-property: opacity, transform;
        transition-duration: .5s;
        transition-timing-function: ease;
    }
}

.intro__title{
    text-transform: uppercase;
}

.intro__content.active {
    transition-delay: 0.2s;
}

.intro__left {
    width: 40%;
    margin-right: 10%;
    position: relative;

    @media #{$phone} {
        margin-left: -30px;
    }

    &--alt {
        order: 2;
        margin-right: 0;
        margin-left: 10%;

        @media #{$phone} {
            order: 0;
        }

    }

    .number {
        position: absolute;
        top: -2.5%;
        right: 0;
        transform: translate(36%, -50%);

        @media #{$phone} {
            transform: translate(38%, -49%);
        }

        &--alt {
            top: -2.5%;
            left: 0;
            right: auto;
            transform: translate(-30%, -50%);     
        }
    }
}

.intro__logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    @media #{$phone} {
        width: 90%;
    }

    & > img {
        object-fit: contain;
        margin-bottom: 0.5rem;
        width: 45%;
        max-height: 6rem;
    }
}

</style>
