<template>
	<FontAwesomeIcon :icon="icons[name]" />
</template>

<script setup>
// Replaces nuxt-fontawesome's <fa>. Only the icons the old site registered.
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// Font Awesome's CSS is included once in the layout instead of injected at runtime.
config.autoAddCss = false;

defineProps({ name: String });

const icons = {
	'chevron-down': faChevronDown,
	plus: faPlus,
	minus: faMinus,
	instagram: faInstagram,
	twitter: faTwitter,
	facebook: faFacebook,
};
</script>
