<template>
	<div class="achievement-carousel">
        <Arrow></Arrow>
        <Carousel :items="achievements" :per-page="1" :loop="true" :pagination-enabled="true" v-slot="{ item: slide }">
            <h3 class="achievement__year">{{ slide.year }}</h3>
            <div class="achievements">
                <div class="achievements__item" v-for="(item, i) in slide.achievementItem" :key="i">
                    <h6 class="achievements__position">{{ item.position }}</h6>
                    <h6 class="achievements__competition">{{ item.competition }}</h6>
                </div>
            </div>
        </Carousel>
    </div>
</template>

<script setup>
import Arrow from './Arrow.vue';
import Carousel from './Carousel.vue';

defineProps({
    achievements: Array
});
</script>

<style lang="scss" scoped>
    .achievement-carousel {
        @media #{$phone} {
            margin-top: 3rem;
        }

        :deep(.arrow) {
            bottom: 0.57rem;
            left: 7.5rem;
            animation: sideBounce 2s infinite;
            color: $primary;

            // @media #{$smallPhone} {
            //     bottom: 0.38rem;
            // }
            @media #{$tablet} {
                bottom: 0.38rem;
            }

        }

        @keyframes sideBounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translate(0, -50%) rotate(-90deg);
            }
            40% {
                transform: translate(-7.5px, -50%) rotate(-90deg);
            }
            60% {
                transform: translate(-3.5px, -50%) rotate(-90deg);
            }
        }

        &:after {
            content: '';
            position: absolute;
            border-left: 3px solid $primary;
            border-bottom: 3px solid $primary;
            height: 2rem;
            width: 7rem;
            bottom: 2rem;
            left: 0;
        }
    }

    .achievement__year {
        margin-left: 1rem;
    }

    .achievements {
        display: grid;
        grid-template-columns: repeat( 3, 1fr );
        grid-auto-rows: max-content;
        position: relative;

        @media (max-width: 650px) {
            grid-template-columns: repeat( 2, 1fr );
        }
        @media #{$smallPhone} {
            grid-template-columns: repeat( 2, 1fr );
        }
    }

    .achievements__item {
        margin: 0 1rem;

        & > h6 {
            font-size: rem(20);
            font-weight: 600;       
    
            @media #{$smallPhone} {
                font-size: rem(16);
            }
        }
    }

    .achievements__position {
        color: $primary;
        margin-bottom: 0;        
    }

    .achievements__competition {
            margin-bottom: 1rem;
    }

    :deep(.VueCarousel) {
        max-width: 1088px;
        width: 100%;
    }
    :deep(.VueCarousel-wrapper) {
        .VueCarousel-slide {
            position: relative;
            margin-left: 0rem;

            &:before {
                background-color: $primary;
                content: '';
                height: 130%;
                left: 0rem;
                position: absolute;
                top: -30%;
                width: 3px;
            }
        }
    }

</style>
