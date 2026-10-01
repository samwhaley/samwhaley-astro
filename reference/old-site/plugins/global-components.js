import Vue from 'vue'
import ButtonLink from '~/components/ButtonLink.vue'
import ButtonUrl from '~/components/ButtonUrl.vue'
import Scroll from '../components/abstracts/scroll';
import Social from '../components/Social';
import Footer from '~/components/Footer.vue'


const components = {
	ButtonLink,
	ButtonUrl,
	Scroll,
	Social,
	Footer
}

Object.entries(components).forEach(([name, component]) => {
 	Vue.component(name, component)
})