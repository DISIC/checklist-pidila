<template>
  <div class="filter-boxes">
    <h2>Rechercher dans les critères</h2>
    <form @submit.prevent="submit">
      <div class="input-group search-group">
        <input class="form-control" type="search" v-model="queryString"
               title="Rechercher dans l'ensemble des critères (exemple: accueil)" placeholder="ex. : accueil"/>
        <button type="submit" class="btn btn-search">
          <svg class="svg-icon icon-search" aria-hidden="true" focusable="false">
            <use xlink:href="svg/icon-sprite.svg#search"></use>
          </svg>
          <span class="sr-only">Valider la recherche</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import Events from '~/bus/events'

  export default {
    name: 'SearchBox',
    data: () => {
      return {
        queryString: ''
      }
    },
    methods: {
      submit: function () {
        this.$store.commit('SET_SEARCH_QUERY', this.queryString)
      }
    },
    mounted () {
      this.$bus.$on(Events.STORE_INITIALIZED, () => {
        this.queryString = this.$store.state.searchQuery
      })
    }
  }
</script>
