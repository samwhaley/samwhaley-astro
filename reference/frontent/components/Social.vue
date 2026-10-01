<template>
    <div class="container social__container">
        <a href="https://www.instagram.com/samwhaley97/">
            <SocialItem :username="'samwhaley97'" :platform="'Instagram'"></SocialItem>
        </a>
        <a href="https://twitter.com/samwhaleygbr?lang=en">
            <SocialItem :username="'samwhaleygbr'" :platform="'Twitter'"></SocialItem>
        </a>
        <a href="https://www.facebook.com/samwhaleysailing/">
            <SocialItem :username="'samwhaleysailing'" :platform="'Facebook'"></SocialItem>
        </a>
    </div>
</template>

<script>
import SocialItem from '~/components/SocialItem.vue'


export default {
    components: {
        SocialItem
    },

    data() {
        return {
        }
    },

}
</script>

<style lang='scss' scoped>
    .social__container {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 5rem 0 0;

        @media #{$phone} {
            margin-top: 4rem;
        }
        
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }
</style>
