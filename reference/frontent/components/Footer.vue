<template>
    <div class="footer">
        <div class="subscribe">
            <div class="subscribe__text">
                <h5>Subscribe</h5>
                <p>SIGN UP WITH YOUR EMAIL ADDRESS TO RECEIVE THE LATEST NEWS AND UPDATES FROM SAM WHALEY SAILING.</p>
            </div>
        </div>
        <Subscribe/>
        <div class="footer__sponsors">
            <h5>Sponsors & Supporters</h5>
                <nuxt-link :to="'sponsors'">
                    <div class="footer__logos">
                        <div v-for='sponsor in sponsorsData' :key="sponsor.id" :style="'order:' + sponsor.order">
                            <img :src="api + sponsor.logo.url">
                        </div>
                    </div>
                </nuxt-link>
        </div>
        <div class="footer__links">
            <p>Sam Whaley ©  <span class="footer__links--red">|</span>  <a href="https://www.jonsnow.world">Website by Jon Snow</a></p>
        </div>
    </div>
</template>

<script>
import axios from 'axios' 
import Subscribe from '~/components/Subscribe.vue'

export default {
    name: 'Footer',

    components: {
        Subscribe
    },

    props: {
        footerData: Object,
        sponsorsData: Array
    },

    data: function () {
        return {
           
        }
    },

    computed: {
        api() {
            return process.env.strapiBaseUri;
        },
    },

}
</script>

<style lang='scss' scoped>
.footer {
    margin: -1rem auto 1rem;
    padding: 30px;
    max-width: 770px;

    @media (max-width: 770px) {
        max-width: 75%;
        padding: 0;
    }

    @media #{$phone} {
        margin-top: 3rem;
        
        & > div {
            width: 100%;
        }
    }
}

.footer__sponsors {
    margin-top: 2rem;
    text-align: center;

    h5 {
        font-size: rem(20);
        font-weight: 300;
    }
}

.footer__logos {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem auto 0;
    width: 80%;

    div {
       margin: 5px 5px;
    }

    img {
        object-fit: contain;
        height: 2.5rem;
    }

    @media #{$smallPhone} {
        width: 100%;
    }
}

.footer__links {
    margin: 2rem auto 0;
    width: 100%;

    p {
        font-size: 0.8rem;
        font-weight: 400;
        margin: 0 auto;
        text-align: center;
    }

    &--red {
        color: $primary;
    }
}

.subscribe__text {
    display: flex;
    max-width: 720px;

    @media #{$smallPhone} {
        flex-wrap: wrap;
    }

    h5 {
        align-self: flex-start;
        margin-right: 1.5rem;
        text-transform: uppercase;

    }

    p {
        align-self: flex-end;
    }

    @media #{$smallPhone} {
        flex-wrap: wrap;

        h5, p {
            margin-right: 0;
            text-align: center;
            width: 100%;
        }
    }
}
</style>
