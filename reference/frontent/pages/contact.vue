<template>
    <div v-if="!loading">
        <Banner  
            :arrow="true"
            :bgPositionV="contact.Banner.background_position_v"
            :bgPositionH="contact.Banner.background_position_h"
            :image="contact.Banner.image.url"
            :title="contact.Banner.title"
            :subtitle="contact.Banner.subtitle">
        </Banner>
        <div class="container">
	        <SectionTitle
	            :class="'sectionTitle--top'"
	            :title="'Contact Sam'"
	            :number="'1'"
	            :right="false"
	        >   
	        </SectionTitle>
	        <div v-if="contact.intro" class="body-text" v-html="$md.render(contact.intro)"></div>
			<div class="container container--two container--mn">
				<div
				    @mouseover="hoverMap = false"
				    @mouseleave="hoverMap = true"
				>
			    	<GMap
			    	ref="gMap"
			    	:cluster="{options: {styles: clusterStyle}}"
			    	:center="{lat: location.lat, lng: location.lng}"
			    	:options="{fullscreenControl: false, styles: mapStyle, disableDefaultUI: hoverMap}"
			    	:zoom="11"
			    	>
					</GMap>
				</div>
				<div>
					<ContactForm></ContactForm>
				</div>
			</div>
			<Social></Social>
	    </div>
        <SponsorsCarousel :sponsorsData="sponsorsData"></SponsorsCarousel>
        <Footer :sponsorsData="sponsorsData"/>
    </div>

</template>

<script>
import contactQuery from '~/apollo/queries/contact'
import sponsorsQuery from '~/apollo/queries/sponsors'

import Banner from '~/components/Banner.vue'
import ContactForm from '~/components/ContactForm.vue'
import SectionTitle from '~/components/SectionTitle.vue'
import SponsorsCarousel from '~/components/SponsorsCarousel.vue'

export default {
    components: {
        Banner,
        ContactForm,
        SectionTitle,
        SponsorsCarousel
    },

	data: function() {
	  return {
	  	title: 'Contact - Sam Whaley Sailing',
	  	hoverMap: true,
	  	contact: [],
        loading: 0,
	    currentLocation: {},
	    location: { lat: 50.6112231, lng: -1.960818 },
	    pins: {
	      selected: "data:image/png;base64,iVBORw0KGgo...",
	      notSelected: "data:image/png;base64,iVBORw0KGgo..."
	    },
	    mapStyle: [
		    {
		        "featureType": "administrative",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "gamma": "1.00"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative.country",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "lightness": "-53"
		            },
		            {
		                "color": "#535353"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative.province",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "color": "#ffe8e8"
		            },
		            {
		                "saturation": "100"
		            },
		            {
		                "lightness": "-14"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative.locality",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "color": "#000000"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative.neighborhood",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "color": "#e57878"
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "lightness": "65"
		            },
		            {
		                "saturation": "-100"
		            },
		            {
		                "hue": "#ff0000"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "saturation": "-100"
		            },
		            {
		                "lightness": "80"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "poi.attraction",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#dddddd"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway.controlled_access",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#dddddd"
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#e7c8c8"
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "color": "#ee3131"
		            },
		            {
		                "saturation": "-100"
		            }
		        ]
		    },
		    {
		        "featureType": "transit.station",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "transit.station",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "color": "#ee3131"
		            },
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "transit.station",
		        "elementType": "labels.icon",
		        "stylers": [
		            {
		                "hue": "#ff0000"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "color": "#e3e3e3"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "color": "#ee3131"
		            }
		        ]
		    }
		],
	    clusterStyle: [
	      {
	        url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
	        width: 56,
	        height: 56,
	        textColor: "#fff"
	      }
	    ]
	  }
	},

    head () {
        return {
            title: this.title,
        }
    },

    apollo: {
        $loadingKey: 'loading',
        contact: {
            prefetch: true,
            query: contactQuery
        },
        sponsors: {
            prefetch: true,
            query: sponsorsQuery
        }
    },

    computed: {
        sponsorsData() {
            return this.sponsors
        }
    }

}
</script>

<style lang="scss">
     .center-text {
     	text-align: center;
     }

     .GMap {
     	@media #{$phone} {
     		margin-top: 1rem;
     	}
     }
</style>
