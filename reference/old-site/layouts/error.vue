<template>
  <div>
    <Banner 
        :bgPositionV="'center'"
        :bgPositionH="'center'"
        :image="'/uploads/IMG_0935_7ae02c8337.jpeg'"
        :title="'Oops!'"
        :error="'Sailed a bit of a header there. This page isn\'t here anymore'">
    </Banner>
    <div v-if="navPicker">
    	<AltNav></AltNav>
    </div>
    <Nav v-else></Nav>
  </div>
</template>

<script>
import AltNav from '~/components/abstracts/AltNav'
import Banner from '~/components/Banner'
import Nav from '~/components/Nav'

export default {
	components: {
		AltNav,
    Banner,
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