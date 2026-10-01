<template>
    <div class="youtube">
      <iframe width="560" height="315" :src="link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</template>

<script>

export default {
	props: {
		link: String
	},

	data: function() {
		return {
		}
	}
}
</script>

<style lang="scss" scoped>
	.youtube { 
		position: relative; 
		padding-bottom: 393px; 
		height: 0; 
		//overflow: hidden; 
		max-width: 700px;
		margin-bottom: 2.5rem;

		@media (max-width: 700px) {
			padding-bottom: 56.25%;
		}
		
		iframe, object, embed { 
			position: absolute; 
			top: 0; 
			left: 0; 
			width: 100%; 
			height: 100%;
		}


		&:before {
			content: '';
			border-left: 3px solid $primary;
			border-bottom: 3px solid $primary;
			bottom: -0.5rem;
			left: -0.5rem;
			height: 100%;
			position: absolute;
			width: 90%;

			@media #{$phone} {
				display: none;
			}
		}
	}
</style>