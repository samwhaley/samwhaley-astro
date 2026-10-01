<template>
	<div>
		<div class="body-text" v-html="craft.intro"></div>
		<div class="craft" ref="craftEl">
			<div class="craft__selection">
				<h3 :class="{ active: showLaser }" @click="showLaser = true">LASER</h3>
				<h3 :class="{ active: !showLaser }" @click="showLaser = false">WASZP</h3>
			</div>
			<div class="craft__display">
				<transition name="page" mode="out-in">
					<div key="1" v-if="showLaser" class="Laser">
						<img :src="craft.laserImage" alt="Laser Sailing Boat">
						<ul class="craft__list">
							<li class="craft__listItem" v-for="(item, i) in craft.laserInfo" :key="i">{{ item.listItem }}</li>
						</ul>
					</div>
					<div key="2" v-else class="Waszp">
						<img :src="craft.waszpImage" alt="Waszp Sailing Boat">
						<ul class="craft__list">
							<li class="craft__listItem" v-for="(item, i) in craft.waszpInfo" :key="i">{{ item.listItem }}</li>
						</ul>
					</div>
				</transition>
			</div>
		</div>
		<div class="craft__donate">
			<div class="std-text" v-if="craft.outro" v-html="craft.outro"></div>
			<ButtonUrl v-if="craft.button && craft.button.show" :route="craft.button.href" :text="craft.button.text" :type="craft.button.type" :align="craft.button.align"/>
		</div>
	</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ButtonUrl from './ButtonUrl.vue';

defineProps({
	craft: Object // intro/outro as HTML, image URLs, button with href
});

const showLaser = ref(false);
const craftEl = ref(null);
let scrolled = false;

// Unchanged from the old component: switches to the Laser tab once, after scrolling past.
function handleScroll() {
	const craft = craftEl.value;
	const docViewBottom = window.pageYOffset - craft.offsetHeight;
	const elemBottom = craft.getBoundingClientRect().top + craft.offsetHeight;
	if (elemBottom <= docViewBottom && !scrolled) {
		showLaser.value = true;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from, .fade-leave-active {
opacity: 0;
}
	.craft {
		display: flex;

		@media (max-width: 700px) {
			flex-direction: column;
		}
	}
	
	.craft__selection {
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		@media (max-width: 700px) {
			flex-direction: row;
		}

		h3 {
			border-bottom: $secondary 4px solid;
			cursor: pointer;
			text-align: center;
			transform: rotate(270deg);
			transition: border-bottom 0.5s ease;

			@media (max-width: 700px) {
				transform: rotate(0deg);
			}

			&.active {
				border-bottom: $primary 4px solid;
				transition: border-bottom 0.5s ease;
			}
		}
	}

	.Laser, .Waszp {
		display: flex;

		@media #{$smallPhone} {
			flex-direction: column;
			align-items: center;
		}

		img {
			object-fit: contain;
			width: 40%;

			@media #{$tablet} {
				width: 50%;
			}
		}

		ul {
		    display: flex;
		    flex-direction: column;
		    justify-content: center;

			li {
				margin-bottom: 0.75rem;
			}
		}
	}
	
	.craft__list {
		list-style: none;
	}

	.craft__listItem {
		position: relative;

		&:before {
		    content: '';
		    position: absolute;
		    display: inline-block;
		    height: 1rem;
		    width: 1rem;
		    background-image: url(/images/arrow.png);
		    background-size: contain;
		    background-repeat: no-repeat;
		    top: .15rem;
		    left: -1.5rem;
		}
	}
	.craft__donate {
		margin-left: 4rem;

		@media #{$phone} {
			margin-left: 0;
		}
	}
</style>
