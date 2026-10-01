<template>
    <div class="newsGrid" >
        <div v-for="(newsItem, index) in newsItems">
            <NewsItem :index="index + 1" :newsItem="newsItem"></NewsItem>
        </div>
    </div>
</template>

<script>
    /*jshint esversion: 6 */
    import NewsItem from '~/components/NewsItem.vue'

    export default {
        components: {
            NewsItem
        },

        props: {
            newsItems: Array
        },

        data() {
            return {
            }
        },

    }
</script>

<style lang='scss'>
    .newsGrid__container {
        &--pull-up {
            margin-top: -5rem;

            @media #{$phone} {
                margin-top: -1rem;
            }
        }
    }

    .newsGrid {
        margin-bottom: 3rem;
    }
    
    .newsGrid > div {
        margin-top: 1rem;
    }

    .newsGrid > div ~ div {
        margin-top: 0rem;
    }
</style>
