<template>
    <div class="newsGrid" >
        <div v-for="(newsItem, index) in newsItems" :key="newsItem.slug">
            <NewsItem :index="index + 1" :newsItem="newsItem"></NewsItem>
        </div>
    </div>
</template>

<script setup>
import NewsItem from './NewsItem.vue';

defineProps({
    newsItems: Array
});
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
