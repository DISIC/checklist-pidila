<template>
  <ul class="list-tools">
    <copy-link-button/>
    <li class="print-tool">
      <button
        class="btn btn-tool btn-printer"
        type="button"
        title="Imprimer cette liste"
        onclick="window.print()">
        <svg class="svg-icon icon-tool icon-printer" aria-hidden="true" focusable="false">
          <use xlink:href="svg/icon-sprite.svg#printer"></use>
        </svg>
        <span class="sr-only">Imprimer cette liste</span>
      </button>
    </li>
    <li class="open-tool">
      <button @click="openAllIsPressed"
        class="btn btn-tool btn-open_all"
        title="Ouvrir toute la liste des critères"
        type="button">
        <svg class="svg-icon icon-tool icon-open_all" aria-hidden="true" focusable="false">
          <use xlink:href="svg/icon-sprite.svg#open_all"></use>
        </svg>
        <span class="sr-only">Ouvrir toute la liste des critères</span>
      </button>
    </li>
    <li class="close-tool">
      <button @click="closeAllIsPressed"
        class="btn btn-tool btn-close_all"
        title="Fermer toute la liste des critères"
        type="button">
        <svg class="svg-icon icon-tool icon-close_all" aria-hidden="true" focusable="false">
          <use xlink:href="svg/icon-sprite.svg#close_all"></use>
        </svg>
        <span class="sr-only">Fermer toute la liste des critères</span>
      </button>
    </li>
  </ul>
</template>

<script>
  import Events from '../../bus/events'
  import CopyLinkButton from '~/components/CopyLinkButton'

  export default {
    name: 'ListTools',
    components: {
      CopyLinkButton
    },
    data: function () {
      return {
        isDisplayed: true,
        currentUrl: '',
        hideTooltip: true
      }
    },
    methods: {
      openAllIsPressed: function () {
        this.$bus.$emit(Events.EXPAND_CRITERIA)
      },
      closeAllIsPressed: function () {
        this.$bus.$emit(Events.COLLAPSE_CRITERIA)
      }
    }
  }
</script>
