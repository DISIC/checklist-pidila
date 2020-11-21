<template>
  <div :class="alertType" v-html="data.rawHTMLContent"/>
</template>

<script>
  export default {
    name: 'Alert',
    props: {
      data: {
        type: Object,
        default: () => {
          return {
            id: 'alert_000',
            type: 'info',
            rawHTMLContent: 'Contenu manquant'
          }
        }
      }
    },
    computed: {
      alertType: function () {
        return `alert alert-${this.data.type}`
      }
    }
  }
</script>

<style scoped>

</style>
