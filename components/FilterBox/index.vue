<template>
  <div class="filter-boxes">
    <h2>
      <svg class="svg-icon icon-filter" aria-hidden="true" focusable="false">
        <use xlink:href="svg/icon-sprite.svg#filter"></use>
      </svg>
      Filtrer la liste
    </h2>

    <form id="filters" class="filters nav-box-content">
      <p class="filter-boxes-info">La sélection de filtres met à jour la liste des critères sans rechargement de page.</p>

      <filter-category v-for="filter in data" :key="filter.title" :data="filter"/>

    </form>
  </div>
</template>

<script>
  import AnchorLink from '../AnchorLink/index'

  import FilterCategory from '../FilterCategory/index'

  export default {
    components: {AnchorLink, FilterCategory},
    name: 'FilterBox',
    props: {
      data: {
        type: Array,
        default: () => {
          return [
            {title: 'Filter is missing', tags: []}
          ]
        }
      }
    }
  }
</script>
