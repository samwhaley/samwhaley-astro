<template>
	<div>
		<div class="boat" ref="boatEl">
			<div class="boat__selection">
				<h5 v-for="(boat, index) in boats" :key="index" :class="{ active: showBoat === boat.boatName }" @click="showBoat = boat.boatName">{{ boat.boatName }}</h5>
			</div>

 			<div class="">
				<transition name="page" mode="out-in">
					<div class="boat__display" v-if="current" :key="current.boatName">
						<div class="boat__image" :style="{ backgroundImage: current.image, backgroundPosition: current.backgroundPosition }"></div>
						<div class="boat__content">
							<h5 class="boat__title" >{{ current.title }}</h5>
							<div v-html="current.content"></div>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
	boats: Array // { boatName, title, content (HTML), image (CSS url), backgroundPosition }
});

// The old site opened on "Laser" and switched to "Waszp" once after scrolling past.
const names = props.boats.map((b) => b.boatName);
const showBoat = ref(names.includes('Laser') ? 'Laser' : names[0]);
const current = computed(() => props.boats.find((b) => b.boatName === showBoat.value));
const boatEl = ref(null);
let scrolled = false;

function handleScroll() {
	const boat = boatEl.value;
	const docViewBottom = window.pageYOffset - boat.offsetHeight;
	const elemBottom = boat.getBoundingClientRect().top + boat.offsetHeight;
	if (elemBottom <= docViewBottom && !scrolled) {
		if (names.includes('Waszp')) showBoat.value = 'Waszp';
		scrolled = true;
	}
}

onMounted(() => {
	window.addEventListener('scroll', handleScroll, { passive: true });
	// The JS loads once the section is visible, after the scroll that brought it
	// there, so check straight away (the old page listened from page load).
	handleScroll();
});
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll));
</script>

<style lang="scss" scoped>
.boat {
	margin-bottom: 2rem;
}

.boat__selection {
	align-items: center;
	display: flex;
	justify-content: space-around;
	max-width: 400px;
	margin: 2rem auto 0;

	h5 {
		border-bottom: 3px solid white;
		margin-bottom: 0;
		cursor: pointer;
		transition: border 0.5s ease;
		text-transform: uppercase;

		&.active {
			border-bottom: 3px solid $primary;
			transition: border 0.5s ease;
		}
	}
}
.boat__display {
	display: flex;
	margin: 2rem auto 0;
	max-width: 850px;
	justify-content: space-around;

	@media #{$phone} {
		flex-direction: column;
		align-items: flex-end;
	}


	.boat__image {
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		margin-right: 1.5%;
		position: relative;
		width: 47%;

		@media #{$phone} {
			margin-right: -50px;
			padding-top: 50%;
			width: 100%;
		}

		&:before {
			content: '';
			border-left: 3px solid $primary;
			border-bottom: 3px solid $primary;
			bottom: -0.5rem;
			left: -0.5rem;
			height: 100%;
			position: absolute;
			width: 100%;

			@media #{$phone} {
				display: none;
			}
		}
	}

	.boat__content {
		margin-left: 1.5%;
		width: 50%;
		padding-bottom: 2rem;
		padding-top: 2.5rem;
		position: relative;

		@media #{$phone} {
			padding-bottom: 0;
			padding-top: 2rem;
			width: 90%;

			&:before {
				content: '';
				border-left: 3px solid $primary;
				border-bottom: 3px solid $primary;
				bottom: -0.5rem;
				left: -1.5rem;
				height: 100%;
				position: absolute;
				width: 100%;
			}
		}
	}
}
</style>
