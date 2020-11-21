import {shallowMount} from '@vue/test-utils'
import SearchBox from '../index.vue'
import Events from '../../../bus/events'

describe('components | SearchBox', () => {
  let $store = {}
  let $bus = {}
  beforeEach(() => {
    $store.state = {
      searchQuery: ''
    }
    $store.commit = jest.fn()
    $bus.$on = jest.fn()
  })

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(SearchBox, {mocks: {$store, $bus}})

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should contain one input text for searching', () => {
    // when
    const wrapper = shallowMount(SearchBox, {mocks: {$store, $bus}})

    // then
    expect(wrapper.findAll('input')).toHaveLength(1)
  })

  it('should contain one button "Rechercher" to trigger search', () => {
    // when
    const wrapper = shallowMount(SearchBox, {mocks: {$store, $bus}})

    // then
    expect(wrapper.findAll('button')).toHaveLength(1)
  })

  it('should call a mutation SET_SEARCH_QUERY from store when button is clicked', () => {
    // given
    const wrapper = shallowMount(SearchBox, {mocks: {$store, $bus}})

    // when
    wrapper.find('input[type=search]').element.value = 'coréen'
    wrapper.find('input[type=search]').trigger('input')
    wrapper.find('button[type=submit]').trigger('submit')

    // then
    expect($store.commit).toHaveBeenCalledWith('SET_SEARCH_QUERY', 'coréen')
  })

  it('should set input value with value from store', () => {
    // given
    $store.state.searchQuery = 'image'
    let searchBoxInputInitialize
    $bus.$on = function (eventKey, callback) {
      if (eventKey === Events.STORE_INITIALIZED) {
        searchBoxInputInitialize = callback
      }
    }
    const wrapper = shallowMount(SearchBox, {mocks: {$store, $bus}})

    // when
    searchBoxInputInitialize()

    // then
    const inputValue = wrapper.find('input[type=search]').element.value
    expect(inputValue).toBe('image')
  })
})
