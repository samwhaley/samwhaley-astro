<template>
    
    <div class="page-swiper" :class="{ active: trigger }">
        <div class="swipe-img">
            <img src="https://sam-whaley-storage.s3.eu-west-2.amazonaws.com/logo.png" alt="London Irish Foundation - Logo">
        </div>
        
    </div>
    
</template>

<script>
    /*jshint esversion: 6 */

    export default {

        props: ['trigger'],

        data: () => ({
            active: '',
            offScreen: false,
        }),

        beforeRouteEnter (to, from, next) {
            this.active = 'active'
            next()
        },

    };
</script>

<style lang="scss" scoped>
    .page-swiper {
        background-color: $secondary;
        height: 100vh;
        left: -105%;
        position: fixed;
        top: 0;
        width: 100vw;
        z-index: 100;

        &.active {
            animation: swipe 1.5s;

            .swipe-img{
                animation: swipeOpacity 1s;
            }
        }

        &.off-screen {
            left: 100%;
        }

        .swipe-img {
            left: 50%;
            opacity: 0;
            pointer-events: none;
            position: fixed;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: opacity 0.5s ease;
            transition-delay: 0.25s;
        }
    }

    @keyframes swipe {
      0%   {left: -105%;}
      25%  {left: 0;}
      50%  {left: 0;}
      75%  {left: 0;}
      100% {left: 101%;}
    }

    @keyframes swipeOpacity {
      0%   {opacity: 0;}
      30%  {opacity: 1;}
      51%  {opacity: 1;}
      70%  {opacity: 1;}
      100% {opacity: 0;}
    }
</style>