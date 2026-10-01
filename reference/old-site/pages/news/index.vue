<template>

    <div v-if="!loading">
        <Banner  
            :arrow="true"
            :bgPositionV="newsPage.Banner.background_position_v"
            :bgPositionH="newsPage.Banner.background_position_h"         
            :image="newsPage.Banner.image.url"
            :title="newsPage.Banner.title"
            :subtitle="newsPage.Banner.subtitle">
        </Banner>
        <div class="container">
            <SectionTitle
                :class="'sectionTitle--top'"
                :title="newsPage.intro_title"
                :number="'1'"
                :right="false">
            </SectionTitle>
            <div class="body-text" v-html="$md.render(newsPage.intro_content)"></div>
            <div class="newsGrid__container">
                <NewsGrid :newsItems="blogItems.slice(0, blogCount)"></NewsGrid>
                <div class="button__container button__container--center">
                    <button @click="(blogCount >= blogItems.length) ? null : blogCount = blogCount + 10" class="button button--center" v-html="(blogCount >= blogItems.length) ? 'end' : 'see more'"></button>
                </div>
            </div>
            <Social></Social>      
        </div>
        <Footer :sponsorsData="sponsorsData"/>
    </div>

</template>

<script>
import newsQuery from '~/apollo/queries/news'
import sponsorsQuery from '~/apollo/queries/sponsors'

import Banner from '~/components/Banner.vue'
import Intro from '~/components/Intro.vue'
import NewsGrid from '~/components/NewsGrid.vue'
import SectionTitle from '~/components/SectionTitle.vue'

export default {
    components: {
        Banner,
        Intro,
        NewsGrid,
        SectionTitle
    },

    data: function () {
        return {
            blogCount: 10,
            newsPage: [],
            newsItems: [],
            blogItems: [],
            loading: 0,
            title: 'News - Sam Whaley Sailing'
        }
    },

    head () {
        return {
            title: this.title,
        }
    },

    apollo: {
        $loadingKey: 'loading',
        newsPage: {
            prefetch: true,
            query: newsQuery
        },
        // blogItems: {
        //     prefetch: true,
        //     query: blogItemsQuery,
        //     // variables () {
        //     //     return {
        //     //         start: 0,
        //     //         limit: this.blogCount
        //     //     }
        //     // }
        // },
        sponsors: {
            prefetch: true,
            query: sponsorsQuery
        }
    },

    mounted() {
        fetch(process.env.GRAPHQL_URL + '?_limit=-1&_sort=published_at:DESC', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            this.blogItems = data.data
        })
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
