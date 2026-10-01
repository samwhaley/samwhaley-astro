<template>
		<div class="ambition__container">
			<div class="body-text" v-html="intro"></div>
			<div class="ambition" ref="barsEl">
				<div v-for="(ambition, index) in bars" :key="index" class="ambition__section">
					<h5 class="ambition__title">{{ ambition.title}}</h5>
					<div class="ambition__bar" :style="{ width: 100/(7 - (index + 1)) + '%' }">
						<div class="ambition__bar--solid" :style="{ width: visible ? ambition.percentage + '%' : 0 }"></div>
					</div>
				</div>
			</div>
		</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
	intro: String, // rendered HTML
	bars: Array // { title, percentage }
});

// Bars fill when the whole block is in view and empty again as soon as part of
// it leaves (the old code's threshold was `this.threshold | 1`, i.e. 1).
const barsEl = ref(null);
const visible = ref(false);
let observer;

onMounted(() => {
	observer = new IntersectionObserver(([entry]) => (visible.value = entry.isIntersecting), { threshold: 1 });
	observer.observe(barsEl.value);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<style lang="scss" scoped>
	.ambition__container {
		position: relative;
	}

	.body-text {
		margin-left: auto;
		width: 50%;

		@media #{$phone} {
			width: 100%;
		}
	}

	.ambition {
		position: absolute;
		top: 0;
		width: 100%;

		@media #{$phone} {
			position: relative;
		}
	}
	.ambition__section h5 {
		@media (max-width: 760px) {
			font-size: rem(20);
		}
	}

	.ambition__title {
		text-transform: uppercase;
	}
	
	.ambition__bar {
		box-sizing: border-box;
		height: 2rem;
	    // -webkit-box-shadow:inset 0px 0px 0px 2px #D3D3D363;
	    // -moz-box-shadow:inset 0px 0px 0px 2px #D3D3D363;
	    // box-shadow:inset 0px 0px 0px 2px #D3D3D363;
		margin-bottom: 0.5rem;
    	margin-top: -0.5rem;

		@media (max-width: 760px) {
			margin-bottom: 1.5rem;
		}


    	&--solid {
    		background-color: $primary;
    		border: 0px;
    		height: 2rem;
    		transition: width 1s ease;
    	}
	}
</style>
