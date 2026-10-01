<template>
    <nav role="navigation" class="navigation">
        <div class="container navigation__container">

            <div class="nav__main" :class="{ 'nav__main--active': showMobileNav }">
                <div class="nav__header">
                    <h6 @click="toggleNav(); $emit('click');">Sam Whaley Sailing</h6>
                </div>
                <div class="nav__links">
                    <nuxt-link 
                    :key="index + 1"
                    v-for="(item, index) in routes" 
                    v-on:click.native="toggleNav(); $emit('click');"
                    :class="'nav__link'"
                    :to="(index == 0) ? item.charAt(0) : item">
                        {{ item.substring(1) }}
                    </nuxt-link>                   
                </div>
                <div class="nav__social">
                    <a href="https://www.instagram.com/samwhaley97/" target="_blank" rel="noopener"><p><fa :icon="['fab', 'instagram']"/></p></a>
                    <a href="https://twitter.com/samwhaleygbr" target="_blank" rel="noopener"><p><fa :icon="['fab', 'twitter']"/></p></a>
                    <a href="https://www.facebook.com/samwhaleysailing" target="_blank" rel="noopener"><p><fa :icon="['fab', 'facebook']"/></i></p></a>
                </div>

            </div>

            <div class="navigation__logo">
                <img @click="toggleNav();" src="https://sam-whaley-storage.s3.eu-west-2.amazonaws.com/logo.png" alt="Sam Whaley - Logo">
            </div>
        </div>
        </nav>
</template>

<script>
    /*jshint esversion: 6 */

    export default {

        data: () => ({
            routes: ['/home', '/about', '/news', '/sponsors', '/coaching', '/contact'],
            showMobileNav: false,
        }),

        methods: {

            toggleNav: function (event) {
                if (this.showMobileNav) {
                    this.showMobileNav = false;
                } else {
                    this.showMobileNav = true;
                }
            },
            beforeRouteLeave (to, from, next) {
                this.showMobileNav = false;
                next();
            },
            beforeRouteUpdate (to, from, next) {
                this.showMobileNav = true;
                next();
            },
        }
    };
</script>

<style lang="scss" scoped>
    .navigation {
        height: 0;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
    }

    .nav__main {
        background-color: $secondary;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: row;
        height: 100vh;
        left: 100%;
        margin-top: 0;
        position: fixed;
        padding: 0;
        top: 0;
        transition: left 0.5s ease-in-out;
        transition-delay: 0.5s;
        width: 100vw;

        @media #{$smallPhone} {
            flex-direction: column;
            justify-content: flex-start;
        }

        &--active {
            left: 0;
            transition: left 0.5s ease-in-out;
        }
    
    }

    .navigation__logo {
        background-color: white;
        border-radius: 50%;
        padding: 1rem .35rem;
        box-shadow: 0px 0px 30px #777777;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        right: 1rem;
        top: 1rem;
        transform: scale(0.75);
        z-index: 100;

        img {
            height: 2.5rem;
            padding: .25rem;
        }
    }

    .nav__links {
        display: flex;
        margin-left: 3rem;
        flex-direction: column;
    }

    .nav__link {
        margin-bottom: 1rem;
        font-size: 7vh;
        text-transform: uppercase;
        font-weight: 900;
        padding-left: 1rem;
        transition: opacity 0.4s ease;

        &.nuxt-link-exact-active {
            border-left: 5px solid $primary;
        }

        @media #{$smallPhone} {
            font-size: 5vh;
        }
    }
    .nav__social {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-bottom: 3rem;
        width: 15%;

        @media #{$smallPhone} {
            flex-direction: row;
            justify-content: flex-start;
            margin-left: 3rem;
            width: 100%;
        }

        a {
            transition: opacity 0.4s ease;
        }

        p {
            margin: 1rem;
        }

        svg {
            font-size: 2rem;
            color: $base;
            transition: color 0.25s ease;

            &:hover {
                color: $primary;
                transition: color 0.25s ease;
            }
        }
    }
    .nav__header {
        margin-top: 2.8rem;
        margin-left: 3rem;
        margin-bottom: 1.5rem;
        width: 100%;

        h6 {
            font-weight: 500;
        }
    }

</style>
