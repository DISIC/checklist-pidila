<template>
  <main id="main" class="main" role="main">
    <div class="container main-container">
      <div class="col-group">
        <div class="criteria-boxes col-main">
          <h1>Liste des critères</h1>

          <alert v-for="alert in alerts" :key="alert.id" :data="alert"/>

          <filter-details/>

          <list-tools/>
          <p class="filters-access">
            <svg class="svg-icon icon-filter" aria-hidden="true" focusable="false">
              <use xlink:href="svg/icon-sprite.svg#filter"></use>
            </svg>
            <anchor-link :anchor="'filters'" :css-class="''" :message="'Accéder aux filtres'"/>
          </p>

          <div>
            <ul v-show="hasCriteriaDisplayed"
                id="criteria-list"
                class="criteria-list">
              <criteria v-for="criteria in criterias" :key="criteria.id" :data="criteria"/>
            </ul>
            <p v-show="!hasCriteriaDisplayed" class="criteria-null">
              Aucun critère ne correspond aux filtres appliqués.
            </p>
          </div>
        </div>

        <aside-column>

          <search-box/>

          <filter-box :data="globalFilters"/>

          <column-links/>

        </aside-column>

      </div>
    </div>
  </main>
</template>

<script>
  import Criteria from '~/components/Criteria/index'
  import FilterBox from '~/components/FilterBox/index'
  import FilterDetails from '~/components/FilterDetails/index'
  import Alert from '~/components/Alert/index'
  import ListTools from '~/components/ListTools/index'
  import AsideColumn from '~/components/AsideColumn/index'
  import ColumnLinks from '~/components/ColumnLinks/index'
  import SearchBox from '~/components/SearchBox/index'
  import Events from '~/bus/events'
  import AnchorLink from '~/components/AnchorLink/index'

  export default {
    components: {
      SearchBox,
      ColumnLinks,
      AsideColumn,
      ListTools,
      Alert,
      FilterDetails,
      FilterBox,
      Criteria,
      AnchorLink
    },
    computed: {
      criterias () {
        return this.$store.getters.filteredCriterias
      },
      alerts () {
        return this.$store.state.alerts
      },
      globalFilters () {
        return this.$store.state.globalFilters
      },
      urlQuery () {
        let checkedFilters = this.$store.state.checkedFilters
        let searchQuery = this.$store.state.searchQuery
        let query = {}

        checkedFilters.forEach(checkedFilter => {
          query[checkedFilter.title] = checkedFilter.tags
        })

        if (searchQuery.length !== 0) {
          query.searchQuery = searchQuery
        }
        return query
      },
      hasCriteriaDisplayed () {
        return this.$store.getters.displayedCriteriasNumber !== 0
      }
    },
    watch: {
      urlQuery (query) {
        this.$router.push({path: '/', query})
      }
    },
    mounted () {
      this.$store
        .dispatch('LOAD_DATA')
        .then(() => {
          this.$store.commit('SET_FILTER_TAGS_FROM_URL_QUERY', this.$route.query)
          this.$store.commit('SET_SEARCH_QUERY_FROM_URL_QUERY', this.$route.query)
        })
        .then(() => {
          this.$bus.$emit(Events.STORE_INITIALIZED)
        })
        .then(() => {
          document.title = this.$store.getters.displayedApplicationTitle
        })
    },
    head () {
      return {
        title: this.$store.getters.displayedApplicationTitle
      }
    }
  }
</script>

<style>
</style>
