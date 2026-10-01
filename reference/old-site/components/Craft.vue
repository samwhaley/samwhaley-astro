<template>
	<div>
		<div v-on:scroll.native="showLaser = false" class="body-text" v-html="$md.render(craftData.intro)"></div>
		<div class="craft">
			<div class="craft__selection">
				<h3 :class="{ active: showLaser }" @click="showLaser = true">LASER</h3>
				<h3 :class="{ active: !showLaser }" @click="showLaser = false">WASZP</h3>
			</div>
			<div class="craft__display">
				<transition name="page" mode="out-in">
					<div key="1" v-if="showLaser" class="Laser">
						<img :src="api + craftData.laser_image.url" alt="Laser Sailing Boat">
						<ul class="craft__list">
							<li class="craft__listItem" v-for="item in craftData.laser_info">{{ item.listItem }}</li>
						</ul>
					</div>
					<div  key="2" v-else class="Waszp">
						<img :src="api + craftData.waszp_image.url" alt="Waszp Sailing Boat">
						<ul class="craft__list">
							<li class="craft__listItem" v-for="item in craftData.waszp_info">{{ item.listItem }}</li>
						</ul>
					</div>
				</transition>
			</div>
		</div>
		<div class="craft__donate">
			<div class="std-text"  v-if="craftData.outro" v-html="$md.render(craftData.outro)"></div>
			<ButtonUrl v-if="craftData.Button.show" :route="craftData.Button.page" :text="craftData.Button.text" :type="craftData.Button.type" :align="craftData.Button.align"/>
		</div>
	</div>
</template>

<script>
	export default {

		props: {
			craftData: Object
		},

		data: function() {
			return {
				showLaser: false,
				scrolled: false
			}
		},

		beforeMount () {
			window.addEventListener('scroll', this.handleScroll);
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll);
		},

		methods: {
			handleScroll() {
				const craft = document.getElementsByClassName('craft')[0];
			    var docViewTop = window.pageYOffset;
			    var docViewBottom = docViewTop - craft.offsetHeight;

			    var elemTop = craft.getBoundingClientRect().top;
			    var elemBottom = elemTop + craft.offsetHeight;
			    if ((elemBottom <= docViewBottom) && this.scrolled === false) {
			    	this.showLaser = true
			    	this.scrolled = true
			    } 
			},
		},

	    computed: {
	        api() {
	            return process.env.strapiBaseUri;
	        },
	    }
	}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-active {
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
		    background-image: url(https://sam-whaley-storage.s3.eu-west-2.amazonaws.com/arrow_two.png);
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