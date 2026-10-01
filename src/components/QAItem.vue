<template>
        <div @click="open = !open; toggleItem()" class="qa__item" :class="{ active: open }">
            <div class="qa__question">
                <p>{{ item.question}}</p>
            </div>
            <div class="qa__answer" v-html="item.answer">
            </div>
            <i><Icon :name="plus ? 'plus' : 'minus'"/></i>
        </div>
</template>

<script setup>
import { ref } from 'vue';
import Icon from './Icon.vue';

defineProps({
    item: Object // { question, answer (HTML) }
});

const plus = ref(true);
const open = ref(false);

// The icon swaps halfway through its spin.
function toggleItem() {
    setTimeout(() => (plus.value = !plus.value), 200);
}
</script>

<style lang="scss">
    .qa__item {
        border-left: 3px solid $primary;
        border-bottom: 3px solid $primary;
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        padding-left: 1rem;
        position: relative;

        &.active {

            i {
                transform: rotate(720deg);
                transition: transform 1s ease;
            }

            .qa__answer {
                max-height: 500px;
                transition: max-height 1s ease;
            }
        }

        i {
            align-self: center;
            color: $primary;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 0.2rem;
            margin-right: 1.1rem;
            position: absolute;
            right: 0;
            top: 0;
            transition: transform 1s ease;
        }
        
        .qa__question {
            p {
                font-weight: 500;
                margin: 0 3rem 0 0;
            }
        }

        .qa__answer {
            margin-top: 1rem;
            max-height: 0;
            overflow-y: hidden;
            transition: max-height 1s ease;
        }
    }
</style>
