<template>

	<div class="achievement-carousel">
        <Arrow></Arrow>
        <client-only>
          <carousel :per-page="1" :centerMode="true" :loop="true" :paginationEnabled="true" :scrollPerPage="false">
            <slide v-for='slide in achievementsData' :key="slide._id">
                <h3 class="achievement__year">{{ slide.year }}</h3>
                <div class="achievements">
                    <div class="achievements__item" v-for="item in slide.achievement_item" :key="item._id">
                        <h6 class="achievements__position">{{ item.position }}</h6>
                        <h6 class="achievements__competition">{{ item.competition }}</h6>
                    </div>
                </div>
            </slide>
          </carousel>
        </client-only>
    </div>

</template>

<script>
import Arrow from "~/components/Arrow.vue"
export default {
    props: {
        achievementsData: Array
    },
    components: {
        Arrow
    }
}
</script>

<style lang="scss" scoped>
    .achievement-carousel {
        @media #{$phone} {
            margin-top: 3rem;
        }

        .arrow {
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

    .VueCarousel {
        max-width: 1088px;
        width: 100%;
    }
    .VueCarousel-wrapper {
        overflow: visible;
        .VueCarousel-inner {
        }
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
    .VueCarousel-pagination {
        visibility: hidden;
    }
</style>