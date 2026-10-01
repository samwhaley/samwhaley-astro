<template>

	<div class="carousel">
        <client-only>
          <carousel 
          :per-page="3" 
          :speed="1000" 
          :centerMode="true" 
          :loop="true" 
          :paginationEnabled="false"
          :mouseDrag="true" 
          :autoplay="true"
          :autoplayTimeout="1000"
          :scrollPerPage="false"
          >
            <slide v-for='sponsor in sponsorsData' :key="sponsor.id" :style="'order:' + sponsor.order">
                <div class="sponsor__image" :style="{ backgroundImage: 'url(' + api + sponsor.logo.url + ')' }" :class="{ 'sponsor__image--last': sponsor.order === sponsorsData.length - 1}"></div>  
            </slide>
            <slide v-if="carouselLoaded"></slide>
          </carousel>
        </client-only>              
    </div>

</template>

<script>
export default {
    props: {
        sponsorsData: Array
    },

    data: function() {
        return {
            carouselLoaded: false
        }
    },

    mounted() {
        setTimeout( function() {
            this.carouselLoaded = true
        }, 1000) 
    },

    computed: {
        api() {
            return process.env.strapiBaseUri;
        },
    }
}
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
    .VueCarousel {
        width: 100vw;
    }
    .VueCarousel-wrapper {
        overflow: visible;
        .VueCarousel-inner {
        }
        .VueCarousel-slide {
            margin-left: 0rem;
            padding-left: 3rem;

            @media #{$phone} {
                padding-left: 1rem;
            }
        }
    }
</style>