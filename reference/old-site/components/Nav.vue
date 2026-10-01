
<template>
	<div>
	  <div class="nav">
    	<div class="nav__circle" :class="{ active: circleActive, inactive: !circleActive }"></div>
	    <div @click="navToggle" class="nav__logo">
	    	<img src="https://sam-whaley-storage.s3.eu-west-2.amazonaws.com/logo.png" alt="">
	    </div>

	  	<div class="nav__main">
	  		<transition name="page" mode="out-in">
		  		<div v-show="navOpen" class="nav__header">
		  			<h6 @click="navToggle">Sam Whaley Sailing</h6>
		  		</div>
		  	</transition>
	  		<transition-group
  			tag="div" 
  			class="nav__links"
            v-on:before-enter="beforeEnter"
        	v-on:enter="enter"
        	v-on:leave="leave"
        	>
	  			<nuxt-link 
  				:key="item" 
  				:data-index="index" 
  				v-for="(item, index) in routes" 
  				v-show="navOpen"
	  			v-on:click.native="navToggle"
  				:class="'nav__link'"
  				:to="(index == 0) ? item.charAt(0) : item">
	  				{{ item.substring(1) }}
	  			</nuxt-link>
	  		</transition-group>
	  		<transition-group
  			tag="div" 
  			class="nav__social"
            v-on:before-enter="beforeEnter"
        	v-on:enter="enter"
        	v-on:leave="leave"
        	>
				<a v-show="navOpen" data-index="1" key="1" href="https://www.instagram.com/samwhaley97/" target="_blank" rel="noopener"><p><fa :icon="['fab', 'instagram']"/></p></a>
			    <a v-show="navOpen" data-index="1" key="2" href="https://twitter.com/samwhaleygbr" target="_blank" rel="noopener"><p><fa :icon="['fab', 'twitter']"/></p></a>
			    <a v-show="navOpen" data-index="1" key="3" href="https://www.facebook.com/samwhaleysailing" target="_blank" rel="noopener"><p><fa :icon="['fab', 'facebook']"/></i></p></a>
	  		</transition-group>
	  	</div>

	  </div>
	</div>
</template>

<script>
export default {
  data() {
    return {
    	circleActive: false,
    	navOpen: false,
    	routes: ['/home', '/about', '/news', '/sponsors', '/coaching', '/contact']
    }
  },

  methods: {
  	navToggle() {
  		const vm = this;
  		if( this.navOpen == true ){
  			this.navOpen = false
  			setTimeout( function() {
  				vm.circleActive = false
  			}, 300)
  		} else {
  			this.circleActive = true
  			this.navOpen = true
  		}
  	},

    beforeEnter: function(el) {
        el.style.display = 'none'
        el.style.opacity = 0
    },

    enter: function(el, index) {
        setTimeout( function() {
            el.style.display = 'block'
            let delay = ( el.dataset.index + 1 ) * 10
            setTimeout(function() {
                el.style.opacity = 1
            }, delay)
        }, 430)
    },

    leave: function(el, done) {
            el.style.opacity = 0
            setTimeout(function() {
                el.style.display = 'none'
            }, 400)
    }
  }
}
</script>

<style lang="scss">
	.nav__logo {
		border-radius: 50%;
    	padding: 1rem .35rem;
		box-shadow: 0px 0px 30px #777777;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: fixed;
		right: 1rem;
		top: 1rem;
		transform: scale(0.75);
		z-index: 100;

		img {
			height: 2.5rem;
			padding: .25rem;
		}
	}

	.nav__circle {
	    background-color: #FFF;
	    border-radius: 50%;
	    height: 3.4rem;
	    opacity: 1;
	    width: 3.4rem;
	    position: fixed;
	    right: 1.65rem;
	    top: 1.6rem;
	    z-index: 100;

		&.active {
			animation: scaleCircle 1s ease;
			animation-fill-mode: forwards;
		}
		&.inactive {
			animation: fadeCircle 1s ease;
			animation-fill-mode: forwards;
		}
	}

	@keyframes scaleCircle {
	  0% {
	    transform: scale(1);
	  }
	  100% {
	    transform: scale(100);
	  }
	}
	@keyframes fadeCircle {
	  0% {
	  	opacity: 1;
	  	transform: scale(100);
	  }
	  100% {
	  	opacity: 1;
	  	transform: scale(1);
	  }
	}

	.nav__main {
		left: 0;
		position: fixed;
		top: 0;

	    width: 100%;
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-between;
	    z-index: 100;
	}

	.nav__header {
	    margin-top: 2.8rem;
	    margin-left: 3rem;
	    margin-bottom: 1.5rem;
	    width: 100%;
	    z-index: 100;

	    h6 {
	    	font-weight: 500;
	    }
	}
	
	.nav__links {
	    display: flex;
	    margin-left: 3rem;
	    flex-direction: column;
	}

	.nav__link {
		margin-bottom: 1rem;
	    font-size: 7vh;
	    text-transform: uppercase;
	    font-weight: 900;
	    padding-left: 1rem;
		transition: opacity 0.4s ease;
		z-index: 100;

		&.nuxt-link-exact-active {
			border-left: 5px solid $primary;
		}
	}

	.nav__social {
		display: flex;
	    flex-direction: column;
	    justify-content: flex-end;
	    padding-bottom: .6rem;
	    width: 15%;
	    z-index: 100;

		a {
			transition: opacity 0.4s ease;
		}

	    p {
	    	margin: 1rem;
	    }

	    svg {
	    	font-size: 2rem;
	    	color: $base;
	    	transition: color 0.25s ease;

	    	&:hover {
	    		color: $primary;
	    		transition: color 0.25s ease;
	    	}
	    }
	}


 
</style>