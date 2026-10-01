<template>
    <div>
        <div class="serviceGrid" >
            <ServiceItem v-for="(serviceItem, index) in serviceItems" :key="index + 1" :index="index + 1" :serviceItem="serviceItem"></ServiceItem>
            <div></div>
            <ButtonLink :route="'/contact'" :text="'contact sam'" type=""></ButtonLink>
        </div>
    </div>
</template>

<script setup>
import ButtonLink from './ButtonLink.vue';
import ServiceItem from './ServiceItem.vue';

defineProps({
    serviceItems: Array
});
</script>

<style lang='scss'>
    .serviceGrid {
      display: grid;
      grid-gap: 2rem;
      grid-template: none / 1fr 1fr 1fr;
      margin-bottom: 5rem;
      margin-top: 0rem;

        @media (max-width: 750px) {
            grid-template: none / 1fr;
            grid-gap: 0;
            margin-top: 0rem;

        }

        .button__container {
            margin-top: 30px;
        }
    }

</style>
