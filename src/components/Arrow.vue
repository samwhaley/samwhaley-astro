<template>
	<div class="arrow"><Icon name="chevron-down"/></div>
</template>

<script setup>
import Icon from './Icon.vue';
</script>

<style lang="scss">
	.arrow {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translate(-50%, 0);
		animation: bounce 2s infinite;
		z-index: 5;
	}

	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {
			transform: translate(-50%, 0);
		}
		40% {
			transform: translate(-50%, -15px);
		}
		60% {
			transform: translate(-50%, -7.5px);
		}
	}
</style>
