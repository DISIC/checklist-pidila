import {shallowMount} from '@vue/test-utils'
import FilterConfig from '../../../data/filter.config'
import FilterDetails from '../index.vue'

describe('components | FilterDetails', () => {
  let $store = {}
  beforeEach(() => {
    $store = {
      getters: {
        displayedCriteriasNumber: 1,
        orderedFilters: []
      },
      state: {
        searchQuery: ''
      }
    }
    FilterConfig.operators = {
      'Profil': 'pour',
      'Référentiel': 'dans',
      'Niveau': 'de niveau',
      'Thématique': 'concernant'
    }
  })

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(FilterDetails, {mocks: {$store}})
    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should update the row-count span when the component is mounted', () => {
    // when
    const wrapper = shallowMount(FilterDetails, {mocks: {$store}})
    // then
    expect(wrapper.find('span.row-count').element.textContent).toBe('1')
  })

  it('should update the row-count span when the getter from store is updated', () => {
    // when
    const wrapper = shallowMount(FilterDetails, {mocks: {$store}})
    $store.getters.displayedCriteriasNumber = 3

    // then
    expect(wrapper.find('span.row-count').element.textContent).toBe('3')
  })

  it('should update the filters-recap p with "aucun filtre ni recherche appliqués pour le moment" ' +
    'when store has no checked filters and no search query', () => {
    // given
    const expectedNoFilterHtml = '<span class="row-count">1</span>' +
      ' critère sans aucun filtre ni recherche appliqués pour le moment.'

    // when
    const wrapper = shallowMount(FilterDetails, {mocks: {$store}})

    // then
    expect(wrapper.find('.filters-recap').element.innerHTML).toBe(expectedNoFilterHtml)
  })

  it('should update the filters-recap p with "Aucun filtre n\'a été appliqué pour le moment." ' +
    'when no tags are checked but there are empty filters in store and no search query', () => {
    // given
    $store.getters.orderedFilters = [
      {
        title: 'Profil',
        tags: []
      },
      {
        title: 'Référentiel',
        tags: []
      }
    ]
    const expectedNoFilterHtml = '<span class="row-count">1</span>' +
      ' critère sans aucun filtre ni recherche appliqués pour le moment.'

    // when
    const wrapper = shallowMount(FilterDetails, {mocks: {$store}})

    // then
    expect(wrapper.find('.filters-recap').element.innerHTML).toBe(expectedNoFilterHtml)
  })

  it('should update the filters-recap p if there are filters and a search query', () => {
    // Given
    $store.getters.orderedFilters = [
      {
        title: 'Profil',
        tags: ['Intégration']
      },
      {
        title: 'Référentiel',
        tags: ['RGAA', 'Bonnes pratiques Opquast']
      },
      {
        title: 'Niveau',
        tags: []
      },
      {
        title: 'Thématique',
        tags: ['Présentation']
      }
    ]
    $store.state.searchQuery = 'Navigation'
    const expectedNoFilterHtml = '<span class="row-count">1</span>' +
      ' critère correspondant à la recherche « <b>Navigation</b> » pour <b>Intégration</b> dans <b>RGAA</b> ou ' +
      '<b>Bonnes pratiques Opquast</b> concernant <b>Présentation</b> ' +
      '<a href="./" class="filters-reset">Annuler tous les filtres</a>'

    // When
    const wrapper = shallowMount(FilterDetails, {mocks: {$store}})

    // Then
    const trimmedFilterRecapHtml = wrapper.find('.filters-recap').element.innerHTML
      .split('\n').map(HTMLline => HTMLline.trim()).join('\n')
    expect(trimmedFilterRecapHtml).toBe(expectedNoFilterHtml)
  })

  it('should update the filters-recap p if there is a search a query and no filters', () => {
    // Given
    $store.getters.orderedFilters = []
    $store.state.searchQuery = 'Navigation'
    const expectedNoFilterHtml = '<span class="row-count">1</span>' +
      ' critère correspondant à la recherche « <b>Navigation</b> »  ' +
      '<a href="./" class="filters-reset">Annuler tous les filtres</a>'

    // When
    const wrapper = shallowMount(FilterDetails, {mocks: {$store}})

    // Then
    const trimmedFilterRecapHtml = wrapper.find('.filters-recap').element.innerHTML
      .split('\n').map(HTMLline => HTMLline.trim()).join('\n')
    expect(trimmedFilterRecapHtml).toBe(expectedNoFilterHtml)
  })

  it('should display "critère" if 0 or 1 criterias are displayed', () => {
    // given
    $store.getters.displayedCriteriasNumber = 1

    // when
    const wrapper = shallowMount(FilterDetails, {mocks: {$store}})

    // then
    expect(wrapper.element.innerHTML.match(/ critère(?!s)/)).toHaveLength(1)
  })
})
