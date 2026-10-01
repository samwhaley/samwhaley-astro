<template>
    <div class="newsGrid__container">
        <NewsGrid :newsItems="items.slice(0, count)"></NewsGrid>
        <div class="button__container button__container--center">
            <button @click="(count >= items.length) ? null : count = count + 10" class="button button--center" v-html="(count >= items.length) ? 'end' : 'see more'"></button>
        </div>
    </div>
</template>

<script setup>
// /news: ten posts at a time, as on the old site.
import { ref } from 'vue';
import NewsGrid from './NewsGrid.vue';

defineProps({
    items: Array
});
const count = ref(10);
</script>


