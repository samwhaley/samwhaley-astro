<template>
	<div class="photo-grid">
	    <img v-for="photo in photos" :src="api + photo.url">
	</div>

</template>

<script>

export default {
	props: {
		photos: Array
	},

	data: function() {
		return {
			barWidth: 0
		}
	},

    computed: {
        api() {
            return process.env.strapiBaseUri;
        },
    }
}
</script>

<style lang="scss" scoped>
	.photo-grid{

		align-items: stretch;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: auto;
		grid-gap: 1rem;
		max-width: 700px;
		

		@media #{$smallPhone} {
			img {
				grid-column: 1/3;
			}
		}

		img:nth-of-type(3) {
			grid-column: 1/3;
		}
	}
</style>