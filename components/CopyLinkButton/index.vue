<template>
  <li class="link-tool" v-on-click-outside="hideAlertSuccess">
    <p :role="displayedRoleAttribute" aria-live="assertive">
      <span v-if="displayedAlertSuccess" class="alert-success">
        Le lien a été copié dans le presse-papier.
      </span>
    </p>
    <button
      type="button"
      class="btn btn-tool btn-link"
      title="Copier le lien permanent vers cette liste"
      @click="copyUrl"
      @keyup.enter="copyUrl"
      @blur="hideAlertSuccess"
      @onfocusout="hideAlertSuccess"
      @keydown.esc="hideAlertSuccess">
      <svg class="svg-icon icon-tool icon-link click-through-able" aria-hidden="true" focusable="true">
        <use xlink:href="svg/icon-sprite.svg#link"></use>
      </svg>
      <span class="sr-only">Copier le lien permanent vers cette liste</span>
    </button>
  </li>
</template>

<script>
  export default {
    name: 'CopyLinkButton',
    data: function () {
      return {
        displayedAlertSuccess: false
      }
    },
    methods: {
      displayAlertSuccess: function () {
        this.displayedAlertSuccess = true
      },
      hideAlertSuccess: function () {
        this.displayedAlertSuccess = false
      },
      copyUrl: function (event) {
        var tempInput = document.createElement('input')
        tempInput.style = 'position: absolute; left: -9999px'
        tempInput.value = global.location.href
        tempInput.setAttribute('aria-hidden', 'true')
        tempInput.classList.add('sr-only')
        document.body.appendChild(tempInput)
        tempInput.select()
        document.execCommand('copy')
        document.body.removeChild(tempInput)
        event.target.focus()
        this.displayAlertSuccess()
      }
    },
    computed: {
      displayedRoleAttribute: function () {
        return this.displayedAlertSuccess ? '' : 'presentation'
      }
    }
  }
</script>
