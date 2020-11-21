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
  li.crit-item h2 {
    margin-top: 0;
  }
  ul li {
    margin-bottom: 0;
    &::before {
      display: none;
    }  
  }
.footer__websites a, .footer__sites-publics a {
    color: #3355e3;
  }  
  .footer__description p a {
    text-decoration: underline;
  }
</style>

