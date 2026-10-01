<template>
    <a :href="href" class="newsItem__link">
        <div class="newsItem" :class="{ 'newsItem--reverse': index % 2 == 0, 'newsItem--first': index == 1 }">
            <div class="newsItem__media" :style="{ backgroundImage: newsItem.image, backgroundPosition: newsItem.thumbnailPosition }">
                <h3 class="newsItem__date"><span class="newsItem__date--red">{{ newsItem.displayDate.slice(0, 2) }}</span>{{ newsItem.displayDate.slice(2, 6) }}</h3>
            </div>
            <div class="newsItem__content">
                <h5 class="newsItem__title">{{ newsItem.title }}</h5>
                <p class="newsItem__full-date">{{ newsItem.displayDate }}</p>
                <p class="newsItem__preview">{{ newsItem.preview }}</p>
                <ButtonLink as="span" :route="href" :text="'read more'" :type="'alt'" :align="(index % 2 == 0) ? 'right' : 'left'"></ButtonLink>
            </div>
        </div>
    </a>
</template>

<script setup>
import { computed } from 'vue';
import ButtonLink from './ButtonLink.vue';

const props = defineProps({
    newsItem: Object, // { slug, title, displayDate, preview, image (CSS url), thumbnailPosition }
    index: Number
});
const href = computed(() => `/news/${props.newsItem.slug}`);
</script>

<style lang='scss' scoped>
.newsItem__link {
    display: block;
    animation: pageAppear 0.5s both;
}

.newsItem {
    display: flex;
    margin: 3rem auto 0;
    width: 80%;

    & > div {
        width: 50%;
    }

    @media #{$phone} {
        flex-direction: column;
        width: 100%;

        div {
            width: 100%;
        }
    }

    &--first {
        margin: 5rem auto 0;
    }

    &--reverse {
        .newsItem__content {
            order: 0;
            margin-right: 2rem;
            text-align: right;
            
            @media #{$phone} {
                order: 1;
                text-align: left;
            }
        }

        .newsItem__media {
            order: 1;
            margin-right: 0rem;

            @media #{$phone} {
                background-size: auto 145%;
                margin-right: 0;
                margin-left: -3rem;
            }
        }

        .newsItem__date {
            position: absolute;
            transform: translateX(65%) rotate(90deg);
            right: 0;
            top: 5rem;
            left: auto;
        }
    }

    &:hover {
        .newsItem__media {
            background-size: auto 110%;
            transition: background-size 0.5s ease;

            @media #{$phone} {
                background-size: auto 155%;
            }
        }
    }
}

.newsItem__media {
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 101%;
    margin-right: 2rem;
    position: relative;
    padding-bottom: 18rem;
    transition: background-size 0.5s ease;

    @media #{$phone} {
        background-size: auto 145%;
        margin-right: 0;
        margin-left: 3rem;
    }
}

.image__container {
    overflow: hidden;
    height: 15rem;   
}

.newsItem__image {
    object-position: center;
}
.newsItem__date {
    font-size: 4.35rem;
    position: absolute;
    transform: translateX(-63%) rotate(90deg);
    left: 0;
    text-transform: uppercase;
    top: 5rem;
    white-space: nowrap;

    &--red {
        color: $primary;
    }
}

.newsItem__title {
    font-size: 1.875rem;
    text-transform: uppercase;
}
.newsItem__full-date {
    font-style: italic;
    margin: 0;
}
.newsItem__content {
    margin-top: 3rem;

    @media #{$phone} {
        margin-top: 2rem;
        padding-left: 1.25rem;
    }
}
</style>
