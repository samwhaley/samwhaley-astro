<template>
		<div class="ambition__container">
			<div class="body-text" v-html="$md.render(ambitionData.intro)"></div>
	<scroll @enter="scrollEnter()" @leave="scrollLeave()" :threshold='0'>
			<div class="ambition">
				<div v-for="(ambition, index) in ambitionData.ambition_bar" class="ambition__section">
					<h5 class="ambition__title">{{ ambition.title}}</h5>
					<div class="ambition__bar" :style="{ width: 100/(7 - (index + 1)) + '%' }">
						<div class="ambition__bar--solid" :data-width="ambition.percentage" :style="{ width: barWidth }"></div>
					</div>
				</div>
			</div>
	</scroll>
		</div>
</template>

<script>
	export default {

		components: {

		},

		props: {
			ambitionData: Object
		},

		data: function() {
			return {
				barWidth: 0
			}
		},

		methods: {
			scrollEnter: function() {
				var bars = document.getElementsByClassName('ambition__bar--solid')
				for (var i = 0; i < bars.length; i++) {
					var percentage = bars[i].dataset.width;
					bars[i].style.width = percentage + '%';
				}
			},
			scrollLeave: function() {
				var bars = document.getElementsByClassName('ambition__bar--solid')
				for (var i = 0; i < bars.length; i++) {
					bars[i].style.width = 0;
				}
			}
		}
	}
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