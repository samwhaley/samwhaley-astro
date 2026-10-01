<template>
  <div class="social">
    <h3 class="social__name"><span class="social__name--red">@</span>{{ username }}</h3>
    <h6>{{ platform }}</h6>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  props: {
    username: String,
    platform: String
  }
}
</script>

<style lang="scss">
  .social {
    cursor: pointer;

      h6 {
        margin-left: 3rem;
      }

      .social__name, h6 {
        transition: color 0.5s ease;
        
      }
      &:hover {
        .social__name, h6 {
          color: $primary;
          transition: color 0.5s ease;

         }
      }
  }
  .social__name {
    font-size: 4rem;

    @media #{$desktop} {
      font-size: 7vw;
    }
    @media #{$phone} {
      font-size: 9vw;
    }

    margin-bottom: 0;
    &--red {
      color: $primary;
    }
  }

 
</style>