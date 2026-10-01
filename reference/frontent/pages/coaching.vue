<template>

    <div v-if="!loading">
        <Banner  
            :arrow="true"
            :bgPositionV="coachingPage.Banner.background_position_v"
            :bgPositionH="coachingPage.Banner.background_position_h"
            :image="coachingPage.Banner.image.url"
            :title="coachingPage.Banner.title"
            :subtitle="coachingPage.Banner.subtitle">
        </Banner>
        <div class="container">
            <SectionTitle
                :class="'sectionTitle--top'"
                :title="coachingPage.intro_title"
                :number="'1'"
                :right="false">
            </SectionTitle>
            <div class="body-text" v-html="$md.render(coachingPage.intro_content)"></div>
            <CoachingBoats :boatData="coachingPage.Coaching_Boats"></CoachingBoats>
            <SectionTitle
                :class="'sectionTitle--top'"
                :title="'Services'"
                :number="'2'"
                :right="true">
            </SectionTitle>
            <Services :serviceItems="coachingPage.Services.service"></Services>
            <Social></Social>
        </div>
        <Footer :sponsorsData="sponsorsData"/>
    </div>

</template>

<script>
import coachingQuery from '~/apollo/queries/coaching'
import sponsorsQuery from '~/apollo/queries/sponsors'

import Banner from '~/components/Banner.vue'
import CoachingBoats from '~/components/CoachingBoats.vue'
import Intro from '~/components/Intro.vue'
import SectionTitle from '~/components/SectionTitle.vue'
import Services from '~/components/Services.vue'

export default {
    components: {
        Banner,
        CoachingBoats,
        Intro,
        SectionTitle,
        Services
    },

    data: function () {
        return {
            coachingPage: [],
            loading: 0,
            title: 'Coaching - Sam Whaley Sailing'
        }
    },

    head () {
        return {
            title: this.title,
        }
    },

    apollo: {
        $loadingKey: 'loading',
        coachingPage: {
            prefetch: true,
            query: coachingQuery
        },
        sponsors: {
            prefetch: true,
            query: sponsorsQuery
        }
    },

    mounted() {
    },

    computed: {
        sponsorsData() {
            return this.sponsors
        }
    }

}
</script>

<style lang="scss">

</style>
