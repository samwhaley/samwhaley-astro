<script>
export default {
   // Enables an abstract component in Vue.
   // This property is undocumented and may change at any time,
   // but your component should work without it.
  abstract: true,

  // Props work just fine in abstract components!
  props: {
    threshold: {
      type: Number
    }
  },

  // Yay, render functions!
  render() {
    // Without using a wrapper component, we can only render one child component.
    try {
      return this.$slots.default[0];
    } catch (e) {
      throw new Error('IntersectionObserver.vue can only render one, and exactly one child component.');
    }

    return null;
  },

  mounted() {
    // There's no real need to declare observer as a data property,
    // since it doesn't need to be reactive.

    this.observer = new IntersectionObserver((entries) => {
      this.$emit(entries[0].isIntersecting ? 'enter' : 'leave', [entries[0]]);
    }, {
      threshold: this.threshold | 1
    });

    // You have to wait for the next tick so that the child element has been rendered.
    this.$nextTick(() => {
      this.observer.observe(this.$slots.default[0].elm);
    });
  },

  destroyed() {
    // Why did the W3C choose "disconnect" as the method anyway?
    this.observer.disconnect();
  }
}    
</script>
