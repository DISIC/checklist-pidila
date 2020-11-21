<template>
  <li class="crit-item">
    <h2 class="js-expandmore crit-item-header">
      <button
        type="button"
        class="expandmore__button js-expandmore-button"
        @click="expandContent"
        :aria-expanded="isExpanded">
        <span class="crit-item-id">{{data.id}}</span>
        <span class="crit-item-title">{{data.title}}</span>
        <span class="expand-symbol" aria-hidden="true"></span>
      </button>
    </h2>
    <div class="crit-item-content js-to_expand" :hidden="isHidden">
      <div class="crit-item-test">
        <h3 class="sr-only">Tests</h3>
        <div class="crit-item-test-content" v-html="data.rawHTMLContent"></div>
      </div>

      <h3 class="sr-only">Filtres correspondants</h3>
      <ul class="tags-list">
        <li :class="cssClassForFilterGroup(filter.title)" v-for="filter in data.filters">
          <h4 class="sr-only">{{filter.title}}</h4>
          <ul class="tags-sublist">
            <li class="tags-sublist-item" v-for="tag in filter.tags">
              <span class="tag">{{tag}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
  import Events from '../../bus/events'
  import FilterClasses from '../../data/filter.config'

  export default {
    name: 'Criteria',
    props: {
      data: {
        type: Object,
        default: () => {
          return {
            id: 'pi_000',
            title: 'Titre manquant',
            rawHTMLContent: 'Contenu manquant',
            filters: []
          }
        }
      }
    },
    data: () => {
      return {
        isHidden: true
      }
    },
    methods: {
      hideContent: function () {
        this.isHidden = true
      },
      showContent: function () {
        this.isHidden = false
      },
      expandContent: function () {
        this.isHidden = !this.isHidden
      },
      cssClassForFilterGroup: function (title) {
        return FilterClasses.cssClasses[title] ? FilterClasses.cssClasses[title] : 'default-labels-group'
      }
    },
    computed: {
      isExpanded: function () {
        return `${!this.isHidden}`
      }
    },
    mounted: function () {
      this.$bus.$on(Events.COLLAPSE_CRITERIA, this.hideContent)
      this.$bus.$on(Events.EXPAND_CRITERIA, this.showContent)
    }
  }
</script>
