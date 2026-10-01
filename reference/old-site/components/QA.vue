<template>
    <div class="">
        <SectionTitle
            :class="'sectionTitle--top-sm'"
            :title="'Q&A'"
            :number="'5'"
            :right="true"
        />
        <div class="qa">
            <QAItem v-for="item in qaData.qa_item" :item="item" :key="item.id"/>
        </div>
    </div>

</template>

<script>
import QAItem from '~/components/QAItem.vue'
import SectionTitle from '~/components/SectionTitle.vue'

/*jshint esversion: 6 */
export default {
    name: 'QA',

    components: {
        QAItem,
        SectionTitle
    },

    props: {
        qaData: Object
    },

    data: function () {
        return {

        }
    },

    computed: {
    },

    methods: {

    },

    mounted() {

    }

}
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

