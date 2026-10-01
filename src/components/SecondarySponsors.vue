<template>
    <div class="secondary-sponsor">
        <div class="secondary-sponsor__item" v-for="item in items" :key="item.title + item.link">
            <div class="secondary-sponsor__left">
                <div class="secondary-sponsor__logo" :style="{ backgroundImage: item.logo }"></div>
            </div>
            <div class="secondary-sponsor__content">
                <div class="" v-html="item.content"></div>
                <ButtonUrl :route="item.link" :text="'visit site'" type="alt"></ButtonUrl>
            </div>
        </div>
    </div>
</template>

<script setup>
import ButtonUrl from './ButtonUrl.vue';

defineProps({
    items: Array // { title, link, logo (CSS url), content (HTML) }
});
</script>

<style lang='scss' scoped>
    .secondary-sponsor {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 1.5rem;
        margin: 3rem auto;

        @media #{$phone} {
            grid-template-columns: 1fr 1fr;
        }

        @media #{$smallPhone} {
            grid-template-columns: 1fr;
        }
    }
    .secondary-sponsor__item {
        display: flex;
        flex-direction: column;

        @media (max-width: 800px) {
            
            & > div {
                width: 100%;
            }
        }

        @media #{$smallPhone} {
        }
    }

    .secondary-sponsor__left {
        position: relative;
        margin-right: 5%;
    }

    .secondary-sponsor__logo {
        background-position: left;
        background-repeat: no-repeat;
        background-size: contain;
        padding-top: 7rem;
        width: 100%;

        @media #{$phone} {
            padding-top: 8rem;
        }
    }

    .secondary-sponsor__content {
        .button__container {
            justify-content: flex-start;
        }
    }
    
    .secondary-sponsor__title {
        text-transform: uppercase;
    }



</style>
