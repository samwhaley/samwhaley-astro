<template>
        <div class="intro" :class="{ 'intro--mt': marginTop }">
            <div class="intro__left" :class="{ 'intro__left--alt': alt }">
                <div class="intro__image" :style="{ backgroundImage: image }"></div>
                <span v-if="number" class="number" :class="{ 'number--alt': alt }">0<span class="number--red">{{ number }}</span></span>
                <div class="intro__logos" v-if="logos && logos.length">
                    <img :src="logo" alt="Main Sponsor Logos" v-for="logo in logos" :key="logo">
                </div>
            </div>
                <div class="intro__right" :class="{ 'intro__right--alt': alt, active: scrolled }">
                    <h4 ref="titleEl" class="intro__title" :class="{ active: scrolled }">{{ title }}</h4>
                    <div class="intro__content" :class="{ active: scrolled }" v-html="content"></div>
                    <ButtonLink v-if="button && button.show" :route="button.href" :text="button.text" :type="button.type" :align="button.align"></ButtonLink>
                </div>
        </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ButtonLink from './ButtonLink.vue';

defineProps({
    alt: Boolean,
    button: Object, // { href, text, type, align, show }
    content: String, // rendered HTML
    image: String, // a CSS url(…) value
    logos: Array,
    marginTop: Boolean,
    number: Number,
    title: String
});

// Title and text slide in once the title scrolls into view (the old <scroll> wrapper).
const scrolled = ref(false);
const titleEl = ref(null);
let observer;

onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            scrolled.value = true;
        } else {
            const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if (vw < 500) scrolled.value = true;
        }
    }, { threshold: 0 });
    observer.observe(titleEl.value);
});
onBeforeUnmount(() => observer?.disconnect());
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
