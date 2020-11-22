<template>
  <main id="main" class="main" role="main">
<div class="cover">
  <div class="cover__container">
  <h1>La <span  class="highlight">checklist</span> PiDila</h1>
  <p class="cover__subtitle">Une liste unique des bonnes pratiques pour les sites publics : <abbr title="Référentiel général d‘amélioration de l‘accessibilité">RGAA</abbr>, Charte internet et Marque de l‘État, Bonnes pratiques Opquast, Éco-conception, <abbr title="Référentiel général d‘interopérabilité">RGI</abbr> et Loi informatique et liberté.</p>
  <p>Il est toujours intéressant de faire un diagnostic rapide en utilisant <a href="http://pidila.gitlab.io/amoa/evaluation-rapide.html">la checklist rapide</a> ou bien de faire les tests de la <a href="http://pidila.gitlab.io/developpement/shortlist.html">checklist du développeur</a> avant de livrer.</p>
  <div class="checklist_container col-group">
        <div class="criteria-boxes col-main">

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

        </aside-column>
    </div>
  </div>
</div>
  <div class="pidila-footer">
    <div class="container">
      <div class="footer-content">
        <p>Développée conjointement par le <a href="https://pidila.gitlab.io/" title="Pôle intégration de la DILA">PiDILA</a>  et la <abbr title="Direction interministérielle du numérique">DINUM</abbr>, la Checklist Pidila est désormais maintenue par le pôle <a href="https://design.numerique.gouv.fr/">DesignGouv</a> de la DINUM.</p>
        <p>Le <a href="https://gitlab.com/pidila/checklist-pidila">code source</a> de l'application servant à afficher cette page est distribué sous double licence <a href="https://gitlab.com/pidila/scampi-twig/blob/master/LICENCE-MIT.md">MIT</a> et <a href="http://www.cecill.info/licences/Licence_CeCILL-B_V1-fr.html">CeCILL-B</a>. Les contenus sont sous licences respectives de chacun des <a href="https://pidila.gitlab.io/checklist/referentiels.html">référentiels</a> alimentant la Checklist Pidila.</p>
      </div>
      <div class="pidila-logo">
        <p><a href="https://design.numerique.gouv.fr" target="_blank">
          <img src="svg/designgouv.svg" width="120" alt="DesignGouv - nouvelle fenêtre"/>
        </a>
      </p>
      <p>
        <a href="https://pidila.gitlab.io">
          <svg class="svg-logo" aria-hidden="true" focusable="false">
            <use xlink:href="svg/illus-sprite.svg#pidila"></use>
          </svg>
          <span class="sr-only">Site du Pidila</span>
        </a>
      </p>
      </div>
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
  import SearchBox from '~/components/SearchBox/index'
  import Events from '~/bus/events'
  import AnchorLink from '~/components/AnchorLink/index'

  export default {
    components: {
      SearchBox,
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

<style type="scss">
.cover__container { max-width: 80em; }
.filter-boxes { text-align: left;}
button { border-radius: unset;}
.crit-item-test {
  text-align: left;
}
.crit-item-title {
  font-weight: normal;
}
.crit-item-header .js-expandmore-button:hover,
.crit-item-header .js-expandmore-button:focus, 
.crit-item-header [aria-expanded="true"],
.crit-item-title {
    color: inherit;
}    

  .footer-content a {
  }
  .pidila-logo a {
    border: 0;
  }  


</style>
