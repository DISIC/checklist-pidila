<template>
  <p class="filters-recap alert alert-info" v-html="displayFiltersRecap" aria-live="assertive" aria-atomic="true" />
</template>
<script>
  import FilterConfig from '../../data/filter.config'

  const DEFAULT_OPERATOR = ''
  const TAG_CONNECTOR = ' ou '
  const NO_FILTER_MESSAGE = 'sans aucun filtre ni recherche appliqués pour le moment.'

  export default {
    name: 'FilterDetails',
    computed: {
      numberOfCriteriasDisplayed () {
        return this.$store.getters.displayedCriteriasNumber
      },
      displayActiveFilters () {
        const orderedFilters = this.$store.getters.orderedFilters
        const numberOfCheckedTags = orderedFilters.reduce((sumOfTags, filter) => sumOfTags + filter.tags.length, 0)

        if (numberOfCheckedTags === 0) {
          return ''
        }

        return orderedFilters.reduce((displayedMessage, currentFilter) => {
          if (currentFilter.tags.length === 0) {
            return displayedMessage
          }

          const operator = FilterConfig.operators[currentFilter.title] || DEFAULT_OPERATOR
          const tagString = currentFilter.tags
            .map(tag => '<b>' + tag + '</b>')
            .join(TAG_CONNECTOR)

          return [displayedMessage, operator, tagString].join(' ')
        }, '').trim()
      },
      displayCriteriaText () {
        const criteriaTrad = {
          singular: 'critère',
          plural: 'critères'
        }
        let displayedMessage = ''
        if (this.numberOfCriteriasDisplayed <= 1) {
          displayedMessage = criteriaTrad.singular
        } else {
          displayedMessage = criteriaTrad.plural
        }
        return displayedMessage
      },
      displaySearchQuery () {
        const searchQuery = this.$store.state.searchQuery
        return searchQuery.length > 0 ? `correspondant à la recherche « <b>${searchQuery}</b> »` : ''
      },
      displayFiltersRecap () {
        let filterMessage = NO_FILTER_MESSAGE
        if (this.displaySearchQuery !== '' || this.displayActiveFilters !== '') {
          filterMessage = this.displaySearchQuery + ' ' + this.displayActiveFilters + ' <a href="./" class="filters-reset">Annuler tous les filtres</a>'
        }
        return '<span class="row-count">' + this.numberOfCriteriasDisplayed + '</span> ' +
          this.displayCriteriaText + ' ' + filterMessage
      }
    }
  }

</script>
