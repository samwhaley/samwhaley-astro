<template>
    <div>
        <div class="pageLinks" >
            <nuxt-link v-for="(serviceItem, index) in serviceItems" :key="index + 1" :to="serviceItem.title.toLowerCase()">
                <div class="serviceItem">
                    <div class="serviceItem__media" :style="{ backgroundImage: 'url(' + api + serviceItem.image.url + ')' }">
                        <h3 class="serviceItem__date">{{ serviceItem.bold_text }}</h3>
                    </div>
                    <div class="serviceItem__content">
                        <h5 class="serviceItem__title">{{ serviceItem.title }}</h5>
                        <p>{{ serviceItem.content }}</p>
                    </div>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import ServiceItem from '~/components/ServiceItem.vue'


export default {
    components: {
        ServiceItem
    },

    props: {
        serviceItems: Array
    },

    data() {
        return {
        }
    },

    computed: {
        api() {
            return process.env.strapiBaseUri;
        },
    }
}
</script>

<style lang='scss' scoped>
    .pageLinks {
      display: grid;
      grid-template: none / 1fr 1fr;
      margin-bottom: 5rem;
      margin-top: -2rem;

        @media (max-width: 750px) {
            grid-template: none / 1fr;
            margin-top: 0rem;
        }
    }

</style>
