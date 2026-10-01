<template>
    <div class="VueCarousel">
        <div class="VueCarousel-wrapper" ref="wrapper"
            @pointerdown="dragStart" @pointerup="dragEnd" @pointercancel="dragging = false">
            <div class="VueCarousel-inner" :style="innerStyle">
                <div class="VueCarousel-slide" v-for="(item, i) in items" :key="i" :style="{ flexBasis: slideWidth + 'px' }">
                    <slot :item="item" :index="i"></slot>
                </div>
            </div>
        </div>
        <div v-if="paginationEnabled" class="VueCarousel-pagination">
            <div role="tablist" class="VueCarousel-dot-container" style="margin-top: 20px;">
                <button v-for="page in maxIndex + 1" :key="page" type="button" role="tab"
                    class="VueCarousel-dot" :class="{ 'VueCarousel-dot--active': page - 1 === index }"
                    :aria-label="'Item ' + (page - 1)" :aria-selected="page - 1 === index"
                    :style="{ marginTop: '20px', padding: '10px', width: '10px', height: '10px', backgroundColor: page - 1 === index ? '#000000' : '#efefef' }"
                    @click="index = page - 1; restartAutoplay()"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
// A small stand-in for vue-carousel (Vue 2 only), covering what the old site
// used: slides per page, loop, autoplay, transition speed, drag/swipe and dots.
// Class names match vue-carousel's so the old styles still apply.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
    items: { type: Array, default: () => [] },
    perPage: { type: Number, default: 1 },
    loop: Boolean,
    autoplay: Boolean,
    autoplayTimeout: { type: Number, default: 2000 },
    speed: { type: Number, default: 500 },
    paginationEnabled: Boolean,
});

const wrapper = ref(null);
const width = ref(0);
const index = ref(0);
const dragging = ref(false);
let dragX = 0;
let timer;
let resizeObserver;

const slideWidth = computed(() => width.value / props.perPage);
const maxIndex = computed(() => Math.max(0, props.items.length - props.perPage));
const innerStyle = computed(() => ({
    transform: `translate(${-index.value * slideWidth.value}px, 0)`,
    transition: `transform ${props.speed}ms ease`,
    // Before the width is measured, fall back to percentages so the SSR markup lays out sensibly.
    flexBasis: width.value ? `${width.value}px` : undefined,
}));

function go(step) {
    const next = index.value + step;
    if (next > maxIndex.value) index.value = props.loop ? 0 : maxIndex.value;
    else if (next < 0) index.value = props.loop ? maxIndex.value : 0;
    else index.value = next;
}

function dragStart(e) {
    dragging.value = true;
    dragX = e.clientX;
}
function dragEnd(e) {
    if (!dragging.value) return;
    dragging.value = false;
    const dx = e.clientX - dragX;
    if (Math.abs(dx) > 40) {
        go(dx < 0 ? 1 : -1);
        restartAutoplay();
    }
}

function restartAutoplay() {
    clearInterval(timer);
    if (props.autoplay) timer = setInterval(() => go(1), props.autoplayTimeout + props.speed);
}

onMounted(() => {
    const measure = () => (width.value = wrapper.value.clientWidth);
    measure();
    resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(wrapper.value);
    restartAutoplay();
});
onBeforeUnmount(() => {
    clearInterval(timer);
    resizeObserver?.disconnect();
});
</script>

<style lang="scss">
    // vue-carousel's own base styles.
    .VueCarousel {
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .VueCarousel-wrapper {
        width: 100%;
        position: relative;
        overflow: hidden;
        touch-action: pan-y;
        user-select: none;
    }
    .VueCarousel-inner {
        display: flex;
        flex-direction: row;
        backface-visibility: hidden;
    }
    .VueCarousel-pagination {
        text-align: center;
        width: 100%;
    }
    .VueCarousel-dot-container {
        display: inline-block;
        margin: 0 auto;
        padding: 0;
    }
    .VueCarousel-dot {
        appearance: none;
        background-clip: content-box;
        border: none;
        border-radius: 100%;
        box-sizing: content-box;
        cursor: pointer;
        display: inline-block;
        outline: none;
        padding: 0;
    }
    .VueCarousel-slide {
        flex-basis: inherit;
        flex-grow: 0;
        flex-shrink: 0;
        user-select: none;
        backface-visibility: hidden;
        outline: none;
    }
</style>
