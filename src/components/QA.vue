<template>
    <div class="">
        <SectionTitle
            :class="'sectionTitle--top-sm'"
            :title="'Q&A'"
            :number="'5'"
            :right="true"
        />
        <div class="qa">
            <QAItem v-for="(item, i) in items" :item="item" :key="i"/>
        </div>
    </div>
</template>

<script setup>
import QAItem from './QAItem.vue';
import SectionTitle from './SectionTitle.vue';

defineProps({
    items: Array // { question, answer (HTML) }
});
</script>

<style lang="scss">
    .qa {
        cursor: pointer;
        max-width: 51rem;
        margin-top: -2rem;

        @media #{$phone} {
            margin-top: 1rem;
        }
    }
</style>
