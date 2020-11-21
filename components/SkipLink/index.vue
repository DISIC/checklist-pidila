<template>
  <div class="skip-link">
    <div class="container" id="top">
      <ul>
        <li><anchor-link :anchor="'main'" :message="'Aller au contenu'"/></li>
        <li><anchor-link :anchor="'filters'" :message="'Aller aux filtres'"/></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import AnchorLink from '../AnchorLink/index'

  export default {
    components: {AnchorLink},
    name: 'SkipLink',
    methods: {
      scrollTo: function (anchor) {
        this.$router.scrollTo(anchor)
      }
    }
  }
</script>
