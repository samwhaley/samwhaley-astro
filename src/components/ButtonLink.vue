<template>
	<div class="button__container" :class="'button__container--' + align">
		<component :is="as" :href="as === 'a' ? route : undefined" class="button" :class="'button--' + type">
			{{ text }}
		</component>
	</div>
</template>

<script setup>
// .button styles are global (src/styles/base/_buttons.scss), as they were on the old site.
defineProps({
	route: String,
	// "span" when the button sits inside another link (links can't be nested).
	as: { type: String, default: 'a' },
	type: String,
	text: String,
	align: String
});
</script>
