<template>
    <transition name="page">
        <div v-if="show" class="cookies" role="dialog" aria-label="Cookie consent">
            <p class="cookies__text">
                We'd like to use Google Analytics cookies to see how people use this site. They're only set if you accept.
            </p>
            <div class="cookies__buttons">
                <button type="button" class="button button--alt" @click="choose('denied')">decline</button>
                <button type="button" class="button" @click="choose('granted')">accept</button>
            </div>
        </div>
    </transition>
</template>

<script setup>
// Asks before loading Google Analytics (GA4). Nothing is loaded and no cookies
// are set until the visitor accepts. The choice is remembered in localStorage;
// the footer's "Cookie settings" link reopens this banner.
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
    gaId: String // GA4 measurement ID, e.g. G-XXXXXXX
});

const KEY = 'cookie-consent';
const show = ref(false);

function readChoice() {
    try {
        return localStorage.getItem(KEY);
    } catch {
        return null;
    }
}

function loadAnalytics() {
    if (window.gtag) return;
    window[`ga-disable-${props.gaId}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', props.gaId);
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(props.gaId)}`;
    document.head.appendChild(script);
}

function removeAnalytics() {
    window[`ga-disable-${props.gaId}`] = true;
    const domain = location.hostname.replace(/^www\./, '');
    for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
        if (!name.startsWith('_ga')) continue;
        for (const d of ['', `; domain=${domain}`, `; domain=.${domain}`]) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
        }
    }
}

function choose(choice) {
    try {
        localStorage.setItem(KEY, choice);
    } catch {
        // Private browsing etc.: the choice applies to this page view only.
    }
    show.value = false;
    if (choice === 'granted') loadAnalytics();
    else removeAnalytics();
}

const reopen = () => (show.value = true);

onMounted(() => {
    const choice = readChoice();
    if (choice === 'granted') loadAnalytics();
    else if (choice !== 'denied') show.value = true;
    window.addEventListener('cookie-settings', reopen);
});
onBeforeUnmount(() => window.removeEventListener('cookie-settings', reopen));
</script>

<style lang="scss" scoped>
    .cookies {
        align-items: center;
        background-color: $secondary;
        bottom: 1rem;
        box-shadow: 0px 0px 30px #777777;
        display: flex;
        gap: 1.5rem;
        left: 50%;
        max-width: 720px;
        padding: 1rem 1.5rem;
        position: fixed;
        transform: translateX(-50%);
        width: calc(100% - 2rem);
        z-index: 200;

        @media #{$phone} {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
    }

    .cookies__text {
        font-size: 0.9rem;
        margin: 0;
    }

    .cookies__buttons {
        display: flex;
        flex-shrink: 0;
        gap: 1.5rem;
        margin-left: auto;

        .button {
            cursor: pointer;
            font-size: rem(18);
        }
    }
</style>
