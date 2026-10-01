<template>
    <div v-if="!loading">
        <Banner 
            :arrow="true"
            :bgPositionV="aboutData.Banner.background_position_v"
            :bgPositionH="aboutData.Banner.background_position_h"
            :image="aboutData.Banner.image.url"
            :title="aboutData.Banner.title"
            :subtitle="aboutData.Banner.subtitle">
        </Banner>
        <div class="container">
            <Intro
                :image="aboutData.Intro.image.url"
                :title="aboutData.Intro.title"
                :number="aboutData.Intro.number"
                :content="aboutData.Intro.content"
                :logos="aboutData.Intro.logos"
                :button="aboutData.Intro.Button"
                :alt="true">
            </Intro>

            <SectionTitle
                :title="'CRAFT'"
                :number="'2'"
                :right="false"
            />
            <Craft :craftData="aboutData.Craft"/>

            <SectionTitle
                :class="'sectionTitle--top'"
                :title="'AMBITION'"
                :number="'3'"
                :right="true"
            />
            <Ambition :ambitionData="aboutData.ambition"/>
            
            <div class="achievement-container">
                <SectionTitle
                    :title="'ACHIEVEMENTS'"
                    :number="'4'"
                    :right="false"
                />
                <Achievements :achievementsData="aboutData.Achievements"/>
            </div>
            <QA :qaData="aboutData.QA"/>
            <Social></Social>
        </div>

        <Footer :footerData="aboutData.Footer" :sponsorsData="sponsorsData"/>

    </div>
</template>

<script>
import aboutQuery from '~/apollo/queries/about'
import sponsorsQuery from '~/apollo/queries/sponsors'

import Achievements from '~/components/Achievements.vue'
import Ambition from '~/components/Ambition.vue'
import Banner from '~/components/Banner.vue'
import Intro from '~/components/Intro.vue'
import SectionTitle from '~/components/SectionTitle.vue'
import Craft from '~/components/Craft.vue'
import QA from '~/components/QA.vue'
import Footer from '~/components/Footer.vue'

export default {
    components: {
        Achievements,
        Ambition,
        Banner,
        Intro,
        SectionTitle,
        Craft,
        QA,
        Footer
    },

    data: function () {
        return {
            about: [],
            newsItems: [],
            profile: '',
            title: 'About - Sam Whaley Sailing',
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
        about: {
            prefetch: true,
            query: aboutQuery
        },
        sponsors: {
            prefetch: true,
            query: sponsorsQuery
        }
    },

    computed: {
        aboutData() {
            return this.about
        },
        sponsorsData() {
            return this.sponsors
        }
    },

    mounted() {
    }
}
</script>

<style lang="scss" scoped>

.achievement-container {
    margin-top: 15rem;
    overflow: hidden;
    position: relative;

    @media #{$phone} {
        margin-top: 0rem;
    }
}

</style>
