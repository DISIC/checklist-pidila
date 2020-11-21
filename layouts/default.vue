<template>
  <div>
    <skip-link/>

    <default-header/>

    <nuxt/>

    <default-footer/>
  </div>
</template>

<script>
  import DefaultHeader from '~/components/DefaultHeader'
  import DefaultFooter from '~/components/DefaultFooter'
  import SkipLink from '~/components/SkipLink/index'

  export default {
    components: {
      SkipLink,
      DefaultFooter,
      DefaultHeader
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/style";
</style>

