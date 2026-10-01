<template>
    <div v-if="!loading">
        <div class="button__container button__container--blog">
            <nuxt-link to="/news" class="button button--alt">
                back
            </nuxt-link>
        </div>
        <div class="container container--blog">
            <transition name="page" appear>
                <div class="newsBanner" :style="{ backgroundImage: 'url(' + api + blogItems[0].image.url + ')', backgroundPosition: blogItems[0].thumbnail_position }">
                    <h2 class="newsBanner__date"><span class="newsBanner__date--red">{{ blogItems[0].date.slice(0, 2) }}</span>{{ blogItems[0].date.slice(2, 6) }}</h2>
                </div>
            </transition>
            <h4 class="newsItem__title">{{ blogItems[0].title }}</h4>
            <div class="container container--text">
                <p class="newsItem__date">{{ blogItems[0].date }}</p>

                <div class="news__content" v-html="$md.render(blogItems[0].rich_text)"></div>

                <div class="news__youtube" v-if="blogItems[0].youtube">
                    <Youtube :link="blogItems[0].youtube"/>
                </div>

                <div class="news__photo-grid" v-if="blogItems[0].photo_grid">
                    <PhotoGrid :photos="blogItems[0].photo_grid"/>
                </div>

                <div class="news__content" v-if="blogItems[0].rich_text_2" v-html="$md.render(blogItems[0].rich_text_2)"></div>

                <div class="news__youtube" v-if="blogItems[0].youtube_2">
                    <Youtube :link="blogItems[0].youtube_2"/>
                </div>

                <div class="news__photo-grid" v-if="blogItems[0].photo_grid_2">
                    <PhotoGrid :photos="blogItems[0].photo_grid_2"/>
                </div>

                <div class="news__content" v-if="blogItems[0].rich_text_3" v-html="$md.render(blogItems[0].rich_text_3)"></div>


                <div class="news__links" v-if="blogItems[0].Button[0]">
                    <h6>Links:</h6>
                        <div class="news__link" v-for="button in blogItems[0].Button">
                            <ButtonUrl :route="button.link" :text="button.title" :type="'alt'" :align="'left'"></ButtonUrl>
                        </div>
                </div>
                <LikeButton :likes="blogItems[0].likes" :id="blogItems[0].id"/>
                <ButtonLink :route="'/news'" :text="'back to news'" :type="'standard'" :align="'left'"></ButtonLink>
            </div>
        </div>
        <Footer :sponsorsData="sponsors"/>
    </div>
</template>

<script>
import blogItemQuery from '~/apollo/queries/blogItem'
import sponsorsQuery from '~/apollo/queries/sponsors'

import LikeButton from '~/components/abstracts/LikeButton.vue'
import PhotoGrid from '~/components/abstracts/PhotoGrid.vue'
import Youtube from '~/components/abstracts/Youtube.vue'

export default {
    components: {
        LikeButton,
        PhotoGrid,
        Youtube
    },

    data: function () {
        return {
            blogItems: [],
            loading: 0,
            title: 'News - Sam Whaley Sailing'
        }
    },

    head () {
        return {
            title: this.title
        }
    },

    apollo: {
        $loadingKey: 'loading',
        blogItems: {
            prefetch: true,
            query: blogItemQuery,
            variables () {
                return { slug: this.$route.params.slug }
            }
        },
        sponsors: {
            prefetch: true,
            query: sponsorsQuery
        }
    },

    computed: {
        api() {
            return process.env.strapiBaseUri;
        }
    },

    mounted() {
        var content = document.getElementsByClassName('news__content');
        if (content.length > 0) {
            var links = content[0].getElementsByTagName("a");
            for(var i=0; i<links.length; i++) {
                links[i].style.color = '#D80000';
                links[i].style.textDecoration = 'underline';
                links[i].style.fontWeight = 'bold';
            }
            var images = content[0].querySelectorAll("p img");
            for(var i=0; i<images.length; i++) {
                images[i].style.width = '100%';
                images[i].style.margin = '1rem 0';
            }
            var anchors = content[0].querySelectorAll("a");
            for (var i=0; i<anchors.length; i++){
                anchors[i].setAttribute('target', '_blank');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .news__content {
        margin-bottom: 2.5rem;
        max-width: 700px;

        p img {
            width: 100%;

            @media #{$phone} {
                margin: 0 0.7rem 1rem;
                max-width: calc(100% - 1.4rem);
            }
        }
    }
    .newsBanner {
        margin-left: 20vw;
        height: 56vh;
        background-position: center;
        background-size: cover;
        position: relative;
    }
    .newsBanner__date {
        font-size: 70px;
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(-90deg) translate(-80.7px, -155px);
        text-transform: uppercase;

        &--red {
            color: $primary;
        }
    }
    .newsItem__title {
        text-align: right;
        margin: 1.5rem 2rem 0rem;
        text-transform: uppercase;

        @media #{$smallPhone} {
            text-align: left;
        }
    }
    .newsItem__date {
        margin: 0;
        font-style: italic;
        text-align: right;

        @media #{$smallPhone} {
            text-align: left;
        }
    }

    .news__links {
        margin-bottom: 2rem;
    }
</style>