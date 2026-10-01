<template>
  <div>
    <nuxt />
    <div v-if="navPicker">
    	<AltNav></AltNav>
    </div>
    <Nav v-else></Nav>
  </div>
</template>

<script>
import AltNav from '~/components/abstracts/AltNav'
import Nav from '~/components/Nav'

export default {
	components: {
		AltNav,
    Nav
	},
        data: () => ({
            
        }),


        computed: {
          navPicker() {
            if (process.client) {
              let windowWidth = window.innerWidth
              if (windowWidth < 700) {
                return true
              } else {
                return false
              }
            } 
            
          }
        }
}
</script>