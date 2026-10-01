<template>
        <div class="serviceItem">
            <div class="serviceItem__media" :style="{ backgroundImage: serviceItem.image }">
                <h3 class="serviceItem__date">{{ serviceItem.boldText }}</h3>
            </div>
            <div class="serviceItem__content">
                <h5 class="serviceItem__title">{{ serviceItem.title }}</h5>
                <p>{{ serviceItem.content }}</p>
            </div>
        </div>
</template>

<script setup>
defineProps({
    serviceItem: Object, // { boldText, title, content, image (CSS url) }
    index: Number
});
</script>

<style lang='scss'>
.serviceItem {
    display: flex;
    flex-direction: column;
    margin: 5rem 5% 0 0 ;

    @media (max-width: 750px) {
        width: 110%;
    }

    &--first {
        margin: 5rem auto;
    }

    &:hover {
        .serviceItem__media {
            background-size: auto 155%;
            transition: background-size 0.5s ease;

            @media (max-width: 750px) {
                background-size: cover;
            }
        }
    }
}

.serviceItem__media {
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 130%;
    // margin-left: 3.2rem;
    position: relative;
    padding-bottom: 18rem;
    transition: background-size 0.5s ease;

    @media (max-width: 750px) {
        background-size: cover;
        margin-right: 0;
        margin-left: 3rem;
    }
}

.image__container {
    overflow: hidden;
    height: 15rem;   
}

.serviceItem__image {
    object-position: center;
}
.serviceItem__date {
    font-size: 4.35rem;
    position: absolute;
    transform: translate(-0.2rem, -101%);
    left: 0;
    text-transform: uppercase;
    top: 0;
    white-space: nowrap;
}

.serviceItem__title {
    text-transform: uppercase;
}

.serviceItem__content {
    margin-top: 1rem;

    @media (max-width: 750px) {
        margin-left: 3.2rem;
        margin-top: 2rem;
        padding-left: 1.25rem;
        width: 80%;
    }
}
</style>
