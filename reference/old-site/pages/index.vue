<template>
    <div v-if="!loading">
        <Banner  
            :arrow="true"
            :bgPositionV="homeData.Banner.background_position_v"
            :bgPositionH="homeData.Banner.background_position_h"
            :image="homeData.Banner.image.url"
            :subtitle="homeData.Banner.subtitle"
            :title="homeData.Banner.title">
        </Banner>
        <div class="container">
            <Intro
                :button="homeData.Intro.Button"
                :content="homeData.Intro.content"
                :image="homeData.Intro.image.url"
                :number="homeData.Intro.number"
                :title="homeData.Intro.title">
            </Intro>
        </div>
        <SponsorsCarousel :sponsorsData="sponsorsData"></SponsorsCarousel>
        <div class="container container--ms">
            <SectionTitle
                :class="'sectionTitle--top-sm'"
                :title="'LATEST NEWS'"
                :number="'2'"
                :right="true"
            >   
            </SectionTitle>    
            <div class="newsGrid__container--pull-up">
                <NewsGrid :newsItems="blogItems.slice(0, 2)"></NewsGrid>
                <div class="button__container button__container--center">
                    <ButtonLink :route="'news'" :text="'more news'" type="" align="--center"></ButtonLink>
                </div>
            </div>
            <Intro
                :number="3"
                :button="homeData.PageLinks[0].Button"
                :content="homeData.PageLinks[0].content"
                :image="homeData.PageLinks[0].image.url"
                :title="homeData.PageLinks[0].title"
                :alt="true"
                :marginTop="true"
                >
            </Intro>   
            <Intro
                :number="4"
                :button="homeData.PageLinks[1].Button"
                :content="homeData.PageLinks[1].content"
                :image="homeData.PageLinks[1].image.url"
                :title="homeData.PageLinks[1].title"
                :marginTop="true"
                >
            </Intro>   
            <Social></Social>
        </div>
        <Footer :sponsorsData="sponsorsData"/>

    </div>
</template>

<script>
import homeQuery from '~/apollo/queries/home'
import blogItemsQuery from '~/apollo/queries/blogItems'
import sponsorsQuery from '~/apollo/queries/sponsors'

import Banner from '~/components/Banner.vue'
import Intro from '~/components/Intro.vue'
import NewsGrid from '~/components/NewsGrid.vue'
import PageLinks from '~/components/PageLinks.vue'
import SectionTitle from '~/components/SectionTitle.vue'
import SponsorsCarousel from '~/components/SponsorsCarousel.vue'

export default {
    components: {
        Banner,
        Intro,
        NewsGrid,
        SectionTitle,
        PageLinks,
        SponsorsCarousel
    },

    data: function () {
        return {
            sponsors: [],
            homePage: [],
            profile: '',
            title: 'Sam Whaley Sailing',
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
        homePage: {
            prefetch: true,
            query: homeQuery
        },
        blogItems: {
            prefetch: true,
            query: blogItemsQuery
        },
        sponsors: {
            prefetch: true,
            query: sponsorsQuery
        }
    },

    computed: {
        homeData() {
            return this.homePage
        },
        sponsorsData() {
            return this.sponsors
        },
    },

    mounted() {
    }
}
</script>
