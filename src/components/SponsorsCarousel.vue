<template>
	<div class="carousel">
        <Carousel
          :items="slides"
          :per-page="3"
          :speed="1000"
          :loop="true"
          :autoplay="true"
          :autoplay-timeout="1000"
          v-slot="{ item: sponsor, index }"
        >
            <div v-if="sponsor" class="sponsor__image" :style="{ backgroundImage: sponsor.logo }" :class="{ 'sponsor__image--last': index === sponsors.length - 1 }"></div>
        </Carousel>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Carousel from './Carousel.vue';

const props = defineProps({
    sponsors: Array // { logo (CSS url) }
});
// The old carousel added an empty slide at the end for spacing.
const slides = computed(() => [...props.sponsors, null]);
</script>

<style lang="scss" scoped>
    .carousel {
        position: relative;
    }
    .sponsor__image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        height: 20vw;

        @media #{$phone} {
            height: 5rem;
            margin-bottom: 3rem;
        }

        @media (min-width: 1600px) {
            height: 7vw;
        }

        &--last {
            margin-right: 2rem; 
        }

    }
    :deep(.VueCarousel) {
        width: 100vw;
    }
    :deep(.VueCarousel-wrapper) {
        .VueCarousel-slide {
            margin-left: 0rem;
            padding-left: 3rem;

            @media #{$phone} {
                padding-left: 1rem;
            }
        }
    }
</style>
