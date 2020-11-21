<template>
    <a tabindex="0" @click="scrollTo(anchor)" @keyup.enter="scrollTo(anchor)" :class="cssClass">
      {{message}}
    </a>
</template>

<script>
  export default {
    name: 'AnchorLink',
    props: {
      anchor: {
        type: String,
        default: ''
      },
      cssClass: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      }
    },
    methods: {
      scrollTo: function (anchor) {
        this.$router.scrollTo(anchor)
      }
    }
  }
</script>
