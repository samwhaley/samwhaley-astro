<template>
    <div class="sectionTitle" :class="{ 'sectionTitle--right': right}">
        <span class="number">0<span class="number--red">{{ number }}</span></span>
        <h4 class="sectionTitle__title">{{ title }}</h4>
    </div>
</template>

<script setup>
defineProps({
    number: [String, Number],
    title: String,
    right: Boolean
});
</script>

<style lang='scss'>
    .sectionTitle {
        display: flex;

        &--top {
            margin-top: -5rem;

            @media #{$phone} {
                margin-top: -2rem;
            }
        }
        &--top-sm {
            margin-top: -2rem;
        }

        .sectionTitle__title {
            align-self: flex-end;
            margin: 1.5rem 2rem 3.9rem 2rem;
            text-transform: uppercase;
        }

        @media #{$phone} {
            flex-direction: column;

            .sectionTitle__title {
                align-self: flex-start;
                margin-top: -2rem;
                margin-left: 0;
                margin-bottom: 0;
            }
        }
    }

    .sectionTitle--right {
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;  

        .sectionTitle__title {
            align-self: flex-end;
            order: -1;
            text-align: right;
        }
       
        @media #{$phone} {
            flex-direction: column-reverse;

            .sectionTitle__title {
                margin-top: -2rem;
                margin-right: 0;
                margin-bottom: 0;
            }
        }
    }
</style>
