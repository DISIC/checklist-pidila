import {shallowMount} from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Criteria from '../../components/Criteria'
import FilterBox from '../../components/FilterBox'
import FilterDetails from '../../components/FilterDetails'
import Alert from '../../components/Alert'
import ListTools from '../../components/ListTools'
import AsideColumn from '../../components/AsideColumn'
import ColumnLinks from '../../components/ColumnLinks'
import SearchBox from '../../components/SearchBox'
import index from '../index.vue'

describe('pages | index', () => {
  const $route = {path: '/'}
  const $router = {}
  let $store = {}
  let $bus = {}
  $router.push = jest.fn()

  beforeEach(() => {
    $router.push.mockReset()
    $store = {
      state: {
        alerts: [{id: 'alert_000'}, {id: 'alert_001'}],
        globalFilters: [
          {title: '0', tags: ['0-1', '0-2']},
          {title: '1', tags: ['1-1', '1-2']}
        ],
        checkedFilters: [],
        searchQuery: ''
      },
      getters: {
        displayedCriteriasNumber: 3,
        filteredCriterias: [{title: '0'}, {title: '1'}, {title: '2'}]
      }
    }
    $store.commit = jest.fn()
    $store.dispatch = jest.fn()
    $store.dispatch.mockReturnValue(Promise.resolve())
    $bus.$emit = jest.fn()
  })

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(index, {
      stubs: {'aside-column': AsideColumn},
      mocks: {$store, $route, $router, $bus}
    })

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should contain two Alert components', () => {
    // when
    const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

    // then
    const alertComponents = wrapper.findAll(Alert)
    expect(alertComponents).toHaveLength(2)
  })

  it('should contain one FilterDetails component', () => {
    // when
    const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

    // then
    const filterDetailsComponents = wrapper.findAll(FilterDetails)
    expect(filterDetailsComponents).toHaveLength(1)
  })

  it('should contain one ListTools component', () => {
    // when
    const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

    // then
    const listToolsComponents = wrapper.findAll(ListTools)
    expect(listToolsComponents).toHaveLength(1)
  })

  it('should contain one SearchBox component', () => {
    // when
    const wrapper = shallowMount(index, {
      stubs: {'aside-column': AsideColumn},
      mocks: {$store, $route, $router, $bus}
    })

    // then
    const searchBoxComponents = wrapper.findAll(SearchBox)
    expect(searchBoxComponents).toHaveLength(1)
  })

  it('should contain one ColumnLinks component', () => {
    // when
    const wrapper = shallowMount(index, {
      stubs: {'aside-column': AsideColumn},
      mocks: {$store, $route, $router, $bus}
    })

    // then
    const columnLinksComponents = wrapper.findAll(ColumnLinks)
    expect(columnLinksComponents).toHaveLength(1)
  })

  describe('Criterias display', () => {
    it('should display "Aucun critère ne correspond aux filtres appliqués" when no criterias are displayed', () => {
      // given
      $store.displayedCriteriasNumber = 0

      // when
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      // then
      const noCriteriasMessage = wrapper.find('p.criteria-null').element.textContent.trim()
      expect(noCriteriasMessage).toBe('Aucun critère ne correspond aux filtres appliqués.')
    })

    it('should not show the criteria list when no criterias are displayed', () => {
      // given
      $store.getters.displayedCriteriasNumber = 0

      // when
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      // then
      expect(wrapper.find('ul.criteria-list').element.style.display).toBe('none')
    })

    it('should show the criteria list when some criterias are displayed', () => {
      // given
      $store.getters.displayedCriteriasNumber = 2

      // when
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      // then
      expect(wrapper.find('ul.criteria-list').element.style.display).not.toBe('none')
    })

    it('should show the "no criteria message" when no criterias are displayed', () => {
      // given
      $store.getters.displayedCriteriasNumber = 0

      // when
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      // then
      expect(wrapper.find('p.criteria-null').element.style.display).not.toBe('none')
    })

    it('should not show the "no criteria message" when some criterias are displayed', () => {
      // given
      $store.getters.displayedCriteriasNumber = 2

      // when
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      // then
      expect(wrapper.find('p.criteria-null').element.style.display).toBe('none')
    })

    it('should contain three Criteria components when store has three criterias', () => {
      // when
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      // then
      const criteriaComponents = wrapper.findAll(Criteria)
      expect(criteriaComponents).toHaveLength(3)
    })

    it('should set the right props in the Criteria components', () => {
      // when
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      // then
      const criteriaComponents = wrapper.findAll(Criteria)
      criteriaComponents.wrappers.forEach((component, index) => {
        expect(component.props()).toEqual({data: {title: String(index)}})
      })
    })
  })

  describe('Filter Box', () => {
    it('should contain one FilterBox component', () => {
      // when
      const wrapper = shallowMount(index, {
        stubs: {'aside-column': AsideColumn},
        mocks: {$store, $route, $router, $bus}
      })

      // then
      const filterBoxComponents = wrapper.findAll(FilterBox)
      expect(filterBoxComponents).toHaveLength(1)
    })

    it('should set the right props in the FilterBox component', () => {
      // when
      const wrapper = shallowMount(index, {
        stubs: {'aside-column': AsideColumn},
        mocks: {$store, $route, $router, $bus}
      })

      // then
      expect(wrapper.find(FilterBox).props()).toEqual({
        data: [
          {title: '0', tags: ['0-1', '0-2']},
          {title: '1', tags: ['1-1', '1-2']}
        ]
      })
    })
  })

  describe('mounted', () => {
    it('should load data from store', () => {
      // given
      shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      // then
      expect($store.dispatch).toHaveBeenCalledWith('LOAD_DATA')
    })

    it('should call the "SET_FILTER_TAGS_FROM_URL_QUERY" mutation with the query params when component is mounted', async () => {
      // given
      const expectedPayload = {
        'Référentiel': ['RGAA', 'Bonnes pratiques Opquast'],
        'Profil': ['Intégration', 'Graphisme']
      }
      $route.query = {
        'Référentiel': ['RGAA', 'Bonnes pratiques Opquast'],
        'Profil': ['Intégration', 'Graphisme']
      }

      $store.commit = jest.fn()
      $store.dispatch = jest.fn()
      $store.dispatch.mockReturnValue(Promise.resolve())

      // when
      shallowMount(index, {mocks: {$store, $route, $router, $bus}})
      await flushPromises()

      // then
      expect($store.commit).toHaveBeenCalledWith('SET_FILTER_TAGS_FROM_URL_QUERY', expectedPayload)
    })

    it('should call the "SET_SEARCH_QUERY_FROM_URL_QUERY" mutation with the query params when component is mounted', async () => {
      // given
      const expectedPayload = {
        'Référentiel': ['RGAA', 'Bonnes pratiques Opquast'],
        'Profil': ['Intégration', 'Graphisme'],
        'searchQuery': 'navigation'
      }
      $route.query = {
        'Référentiel': ['RGAA', 'Bonnes pratiques Opquast'],
        'Profil': ['Intégration', 'Graphisme'],
        'searchQuery': 'navigation'
      }

      $store.commit = jest.fn()
      $store.dispatch = jest.fn()
      $store.dispatch.mockReturnValue(Promise.resolve())

      // when
      shallowMount(index, {mocks: {$store, $route, $router, $bus}})
      await flushPromises()

      // then
      expect($store.commit).toHaveBeenCalledWith('SET_SEARCH_QUERY_FROM_URL_QUERY', expectedPayload)
    })

    it('should emit the "STORE_INITIALIZED" bus event when the store initialization is completed', async () => {
      // given
      $route.query = {
        'Référentiel': ['RGAA', 'Bonnes pratiques Opquast'],
        'Profil': ['Intégration', 'Graphisme'],
        'searchQuery': 'navigation'
      }

      $store.commit = jest.fn()
      $store.dispatch = jest.fn()
      $store.dispatch.mockReturnValue(Promise.resolve())

      // when
      shallowMount(index, {mocks: {$store, $route, $router, $bus}})
      await flushPromises()

      // then
      expect($bus.$emit).toHaveBeenCalledWith('STORE_INITIALIZED')
    })
  })

  describe('URL query params management', () => {
    it('should update the URL with the right params ' +
      'when the Pages component receives one checked filter and no search query', () => {
      // given
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      const payload = {path: '/', query: {'Référentiel': ['RGAA', 'Bonnes pratiques Opquast']}}
      // when
      $store.state.checkedFilters = [{title: 'Référentiel', tags: ['RGAA', 'Bonnes pratiques Opquast']}]

      // then
      expect($router.push).toHaveBeenCalledWith(payload)
    })

    it('should update the URL with the right params ' +
      'when the Pages component receives multiple checked filters and no search query', () => {
      // given
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})

      const payload = {
        path: '/',
        query: {'Référentiel': ['RGAA', 'Bonnes pratiques Opquast'], 'Profil': ['Intégration', 'Graphisme']}
      }
      // when
      $store.state.checkedFilters = [{
        title: 'Référentiel',
        tags: ['RGAA', 'Bonnes pratiques Opquast']
      }, {title: 'Profil', tags: ['Intégration', 'Graphisme']}]

      // then
      expect($router.push).toHaveBeenCalledWith(payload)
    })

    it('should update the URL with the right params ' +
      'when the Pages component receives no checked filters and a search query', () => {
      // given
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})
      const payload = {path: '/', query: {'searchQuery': 'navigation'}}

      // when
      $store.state.checkedFilters = []
      $store.state.searchQuery = 'navigation'

      // then
      expect($router.push).toHaveBeenCalledWith(payload)
    })

    it('should update the URL with the right params ' +
      'when the Pages component receives some checked filters and a search query', () => {
      // given
      const wrapper = shallowMount(index, {mocks: {$store, $route, $router, $bus}})
      const payload = {
        path: '/',
        query: {
          'Référentiel': ['RGAA', 'Bonnes pratiques Opquast'],
          'Profil': ['Intégration', 'Graphisme'],
          'searchQuery': 'navigation'
        }
      }

      // when
      $store.state.checkedFilters = [{
        title: 'Référentiel',
        tags: ['RGAA', 'Bonnes pratiques Opquast']
      }, {title: 'Profil', tags: ['Intégration', 'Graphisme']}]
      $store.state.searchQuery = 'navigation'

      // then
      expect($router.push).toHaveBeenCalledWith(payload)
    })
  })
})
