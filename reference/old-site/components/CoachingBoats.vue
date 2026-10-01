<template>
	<div>
		<div class="boat">
			<div class="boat__selection">
				<h5 v-for="(boat, index) in boatData.Boat" :class="{ active: showBoat === boat.boat_name }" @click="showBoat = boat.boat_name">{{ boat.boat_name }}</h5>
			</div>

 			<div class="">
				<transition name="page" mode="out-in">
					<div class="boat__display" v-for="(boatItem, index) in boatData.Boat" :key="boatItem.id" v-if="showBoat == boatItem.boat_name">
						<div class="boat__image" :style="{ backgroundImage: 'url(' + api + boatItem.image.url + ')', backgroundPosition: boatItem.background_position }" alt=""></div>
						<div class="boat__content">
							<h5 class="boat__title" >{{ boatItem.title }}</h5>
							<div v-html="$md.render(boatItem.content)"></div>
						</div>
					</div>
				</transition>
			</div>
		</div> 
	</div>
</template>

<script>
	export default {

		components: {

		},

		props: {
			boatData: Object
		},

		data: function() {
			return {
				showBoat: 'Laser',
				scrolled: false
			}
		},

	    computed: {
	        api() {
	            return process.env.strapiBaseUri;
	        },
	    },

		beforeMount () {
			window.addEventListener('scroll', this.handleScroll);
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll);
		},
		
		methods: {
			handleScroll() {
				const boat = document.getElementsByClassName('boat')[0];
			    var docViewTop = window.pageYOffset;
			    var docViewBottom = docViewTop - boat.offsetHeight;

			    var elemTop = boat.getBoundingClientRect().top;
			    var elemBottom = elemTop + boat.offsetHeight;
			    if ((elemBottom <= docViewBottom) && this.scrolled === false) {
			    	this.showBoat = 'Waszp'
			    	this.scrolled = true
			    } 
			},
		},
	}
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