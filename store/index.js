import Vuex from 'vuex'
import {getCriteriasData, getAlertsData} from '~/services/getBundledDataService'
import {getConfigData} from '~/services/getConfigService'
import SearchEngine from '~/services/searchEngineService'

export const state = {
  criterias: [],
  alerts: [],
  globalFilters: [],
  checkedFilters: [],
  searchQuery: ''
}

export const mutations = {
  SET_CRITERIAS (state, {criterias}) {
    state.criterias = criterias
  },

  SET_GLOBAL_FILTERS (state, {globalFilters}) {
    state.globalFilters = globalFilters
  },

  SET_ALERTS (state, {alerts}) {
    state.alerts = alerts
  },

  UPDATE_FILTER_TAGS (state, checkedFilter) {
    let filterTitles = state.checkedFilters.map(filter => filter.title)
    let indexTitle = filterTitles.indexOf(checkedFilter.title)

    if (indexTitle !== -1) {
      // necessary to propagate vue-change-object notifications
      state.checkedFilters.splice(indexTitle, 1, checkedFilter)
    } else {
      state.checkedFilters = state.checkedFilters.concat(checkedFilter)
    }
  },

  UPDATE_GLOBAL_FILTERS (state, {globalFilters}) {
    globalFilters.forEach(newGlobalFilter => {
      let currentFilter = state.globalFilters.find(filter => newGlobalFilter.title === filter.title)

      if (typeof currentFilter !== 'undefined') {
        let currentFilterIndex = state.globalFilters.indexOf(currentFilter)
        let newTags = Array.from(new Set(currentFilter.tags.concat(newGlobalFilter.tags)))
        let updatedFilter = {
          title: currentFilter.title,
          tags: newTags
        }
        // necessary to propagate vue-change-object notifications
        state.globalFilters.splice(currentFilterIndex, 1, updatedFilter)
      } else {
        state.globalFilters = state.globalFilters.concat(newGlobalFilter)
      }
    })
  },

  SET_FILTER_TAGS_FROM_URL_QUERY (state, urlQuery) {
    let newCheckedFilters = []
    const queryFiltersArray = Object.entries(urlQuery)
      .map(filter => {
        const title = filter[0]
        const queryTagArguments = filter[1]
        return {
          title: title,
          tags: Array.isArray(queryTagArguments) ? queryTagArguments : [queryTagArguments]
        }
      })

    queryFiltersArray.forEach(queryFilter => {
      let currentGlobalFilter = state.globalFilters.find(globalFilter => globalFilter.title === queryFilter.title)

      if (typeof currentGlobalFilter === 'undefined') {
        return
      }

      const currentGlobalTags = currentGlobalFilter.tags
      const currentQueryTags = queryFilter.tags
      let resultTags = []

      currentQueryTags.forEach(currentQueryTag => {
        if (currentGlobalTags.includes(currentQueryTag)) {
          resultTags.push(currentQueryTag)
        }
      })
      let newCheckedFilter = {
        title: queryFilter.title,
        tags: resultTags
      }
      newCheckedFilters.push(newCheckedFilter)
    })

    state.checkedFilters = newCheckedFilters
  },

  SET_SEARCH_QUERY_FROM_URL_QUERY (state, urlQuery) {
    state.searchQuery = urlQuery.searchQuery || ''
  },

  SET_SEARCH_QUERY (state, searchQuery) {
    state.searchQuery = searchQuery
  }
}

export const actions = {
  LOAD_DATA ({commit}) {
    return getConfigData()
      .then(data => {
        commit('SET_GLOBAL_FILTERS', data)
      })
      .then(() => getCriteriasData())
      .then(data => {
        commit('SET_CRITERIAS', data)
        commit('UPDATE_GLOBAL_FILTERS', data)
      })
      .then(() => getAlertsData())
      .then(data => commit('SET_ALERTS', data))
  }
}

export const getters = {
  displayedCriteriasNumber: (state, getters) => {
    return getters.filteredCriterias.length
  },

  orderedFilters: state => {
    const globalFilters = state.globalFilters
    const checkedFilters = state.checkedFilters.slice()

    return checkedFilters.sort((a, b) => {
      const indexFilterA = globalFilters.findIndex(globalFilter => globalFilter.title === a.title)
      const indexFilterB = globalFilters.findIndex(globalFilter => globalFilter.title === b.title)
      return indexFilterA - indexFilterB
    }).map(checkedFilter => {
      const currentGlobalFilter = globalFilters.find(globalFilter => checkedFilter.title === globalFilter.title)

      const sortedTags = checkedFilter.tags.sort((a, b) => {
        const indexFilterTagA = currentGlobalFilter.tags.findIndex(tag => tag === a)
        const indexFilterTagB = currentGlobalFilter.tags.findIndex(tag => tag === b)
        return indexFilterTagA - indexFilterTagB
      })

      return {
        title: checkedFilter.title,
        tags: sortedTags
      }
    })
  },

  tagsFromFilterTitle: (state) => (title) => {
    const checkedFilter = state.checkedFilters.find(checkFilter => checkFilter.title === title)

    if (typeof checkedFilter === 'undefined') {
      return []
    }
    return checkedFilter.tags
  },

  filteredCriterias: state => {
    const checkedFilters = state.checkedFilters
    const searchEngine = new SearchEngine(state.criterias)
    const searchResults = searchEngine.search(state.searchQuery)
    const searchQueryActive = state.searchQuery.length > 0

    let results = state.criterias
      .filter((criteria) => {
        let criteriaFilters = criteria.filters

        return checkedFilters.map(checkedFilter => {
          const currentCheckedFilter = criteriaFilters.find(filter => filter.title === checkedFilter.title)
          return !isCriteriaFilterFiltered(currentCheckedFilter, checkedFilter)
        }).reduce((isToBeDisplayed, resultForOneFilter) => isToBeDisplayed && resultForOneFilter, true)
      })

    if (!searchQueryActive) {
      return results
    }

    const resultDictionnary = results.reduce((resultDictionnary, filter) => {
      resultDictionnary[filter.id] = filter
      return resultDictionnary
    }, {})

    return searchResults.filter(id => typeof resultDictionnary[id] !== 'undefined').map(id => resultDictionnary[id])

    function isCriteriaFilterFiltered (currentCriteriaFilter, checkedFilter) {
      let isCriteriaFiltered

      if (typeof currentCriteriaFilter === 'undefined' && checkedFilter.tags.length > 0) {
        isCriteriaFiltered = true
      } else if (typeof currentCriteriaFilter === 'undefined') {
        isCriteriaFiltered = false
      } else {
        const criteriaTags = currentCriteriaFilter.tags
        const checkedTags = checkedFilter.tags

        const currentFilterAllowsAll = checkedTags.length === 0
        const tagsUnion = Array.from(new Set(checkedTags.concat(criteriaTags)))
        const filterTagsIntersectionNotEmpty = tagsUnion.length !== (checkedTags.length + criteriaTags.length)
        isCriteriaFiltered = !currentFilterAllowsAll && !filterTagsIntersectionNotEmpty
      }
      return isCriteriaFiltered
    }
  },

  displayedApplicationTitle: (state, getters) => {
    const DEFAULT_APPLICATION_TITLE = 'Liste des critères - Checklist Pidila'
    let sumOfTags = state.checkedFilters.reduce((sumOfTags, currentFilter) => {
      return sumOfTags + currentFilter.tags.length
    }, 0)

    if (state.searchQuery !== '') {
      sumOfTags++
    }

    let title = DEFAULT_APPLICATION_TITLE

    if (sumOfTags > 0) {
      title = `${criteriasTrad(getters.displayedCriteriasNumber)} pour ${filtersTrad(sumOfTags)} - Checklist Pidila`
    }

    return title

    function criteriasTrad (criteriasNumber) {
      if (criteriasNumber <= 1) {
        return `${criteriasNumber} critère`
      } else {
        return `${criteriasNumber} critères`
      }
    }

    function filtersTrad (sumOfTags) {
      if (sumOfTags <= 1) {
        return `${sumOfTags} filtre appliqué`
      } else {
        return `${sumOfTags} filtres appliqués`
      }
    }
  }
}

const store = () => new Vuex.Store({state, mutations, actions, getters})

export default store
