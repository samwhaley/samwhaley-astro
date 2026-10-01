<template>
    <div v-if="!loading">
        <Banner  
            :arrow="true"
            :bgPositionV="sponsorsPageData.Banner.background_position_v"
            :bgPositionH="sponsorsPageData.Banner.background_position_h"
            :image="sponsorsPageData.Banner.image.url"
            :title="sponsorsPageData.Banner.title"
            :subtitle="sponsorsPageData.Banner.subtitle"
        >
        </Banner>
        <div class="container">  
            <SectionTitle
                :class="'sectionTitle--top'"
                :title="sponsorsPageData.introduction_title"
                :number="'1'"
                :right="false"
            >   
            </SectionTitle>  
            <div class="body-text" v-html="$md.render(sponsorsPageData.introduction_content)"></div>
            <SecondarySponsors :secondarySponsorData="mainSponsorsData"/>
            <SecondarySponsors :secondarySponsorData="secondarySponsorsData"/>
            <Intro
                :marginTop="true"
                :image="sponsorsPageData.DonateComponent.image.url"
                :title="sponsorsPageData.DonateComponent.title"
                :number="sponsorsPageData.DonateComponent.number"
                :content="sponsorsPageData.DonateComponent.content"
                :button="sponsorsPageData.DonateComponent.Button">
            </Intro>
            <Social></Social>
        </div>

        <Footer :sponsorsData="sponsorsData"/>

    </div>
</template>

<script>
import sponsorsQuery from '~/apollo/queries/sponsors'
import sponsorsPageQuery from '~/apollo/queries/sponsorsPage'

import Banner from '~/components/Banner.vue'
import Intro from '~/components/Intro.vue'
import MainSponsors from '~/components/MainSponsors.vue'
import SecondarySponsors from '~/components/SecondarySponsors.vue'
import SectionTitle from '~/components/SectionTitle.vue'

export default {
    components: {
        Banner,
        Intro,
        MainSponsors,
        SecondarySponsors,
        SectionTitle
    },

    data: function () {
        return {
            sponsors: [],
            sponsorsPage: [],
            title: 'Sponsors - Sam Whaley Sailing',
            loading: 0
        }
    },

    head () {
        return {
            title: this.title,
        }
    },

    apollo: {
        $loadingKey: 'loading',
        sponsorsPage: {
            prefetch: true,
            query: sponsorsPageQuery
        },
        sponsors: {
            prefetch: true,
            query: sponsorsQuery
        }
    },

    computed: {
        sponsorsPageData() {
            return this.sponsorsPage
        },
        mainSponsorsData() {
            return this.sponsorsPage.MainSponsors
        },
        secondarySponsorsData() {
            return this.sponsorsPage.SecondarySponsors
        },
        sponsorsData() {
            return this.sponsors
        }
    },

    mounted() {
    }
}
</script>

<style lang="scss">

</style>
