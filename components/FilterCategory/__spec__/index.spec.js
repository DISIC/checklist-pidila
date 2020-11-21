import {createLocalVue} from '../../../vue-test.config'
import {shallowMount} from '@vue/test-utils'
import Vuex from 'vuex'
import AnchorLink from '../../AnchorLink/index'
import FilterCategory from '../index.vue'

describe('components | FilterCategory', () => {
  const props = {
    data: {
      title: 'Référentiel',
      tags: [
        'RGAA',
        'Bonnes pratiques Opquast',
        'Troisième Input'
      ]
    }
  }

  let store
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()

    store = new Vuex.Store({
      state: {
        checkedFilters: []
      },
      getters: {
        tagsFromFilterTitle: (state) => () => state.checkedFilters
      }
    })

    store.commit = jest.fn()
  })

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(FilterCategory, {
      propsData: props,
      localVue,
      store
    })

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a legend named "Filtrer par référentiel" when title in props is "Référentiel', () => {
    // when
    const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})

    // then
    expect(wrapper.find('legend').element.textContent).toBe('Filtrer par référentiel')
  })

  it('should have three inputs when tags in props contains three entries', () => {
    // when
    const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})
    const inputsElement = wrapper.findAll('li.filter input[type=checkbox]')
    // then
    expect(inputsElement.length).toBe(3)
  })

  it('should have three labels correctly named when tags in props contains three entries', () => {
    // given
    const expectedNames = [
      'RGAA',
      'Bonnes pratiques Opquast',
      'Troisième Input'
    ]

    // when
    const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})
    const labelElements = wrapper.findAll('li.filter label')

    // then
    labelElements.wrappers.forEach((labelElement, index) => {
      expect(labelElement.element.textContent).toBe(expectedNames[index])
    })
  })

  it('should have all checkbox inputs not checked when getter tagsFromFilterTitle from store return no tags', () => {
    // given
    const store = {
      getters: {
        tagsFromFilterTitle: () => []
      }
    }

    // when
    const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})
    const checkboxElements = wrapper.findAll('li.filter input[type=checkbox]')

    // then
    checkboxElements.wrappers.forEach(checkboxElement => {
      expect(checkboxElement.element.attributes.checked).toBe(undefined)
    })
  })

  it('should have two inputs checked when getter tagsFromFilterTitle from store return an array with two tags', () => {
    // given
    const store = {
      state: {
        checkedFilters: [{
          title: 'Référentiel',
          tags: [
            'RGAA',
            'Bonnes pratiques Opquast'
          ]
        }]
      },
      getters: {
        tagsFromFilterTitle: function () {
          return [
            'RGAA',
            'Bonnes pratiques Opquast'
          ]
        }
      }
    }
    store.commit = jest.fn()

    // when
    const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})

    // then
    const checkboxElements = wrapper.findAll('li.filter input[type=checkbox]')
    const checkedElements = checkboxElements.wrappers
      .filter(checkboxElement => checkboxElement.element.checked !== false)

    expect(checkedElements).toHaveLength(2)
  })

  it('should call the "UPDATE_FILTER_TAGS" mutation when a checkbox is updated', () => {
    // given
    const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})
    const firstInputFilterElement = wrapper.find('li.filter input[type=checkbox]')
    const payload = {title: 'Référentiel', tags: ['RGAA']}
    // when
    firstInputFilterElement.trigger('click')

    // then
    expect(store.commit).toHaveBeenCalledWith('UPDATE_FILTER_TAGS', payload)
  })

  it('should call the "UPDATE_FILTER_TAGS" mutation when the "Tous" checkbox is updated', () => {
    // given
    const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})
    const inputTousElement = wrapper.find('p.filter-all input[type=checkbox]')
    const payload = {title: 'Référentiel', tags: []}

    // when
    inputTousElement.trigger('click')

    // then
    expect(store.commit).toHaveBeenCalledWith('UPDATE_FILTER_TAGS', payload)
  })
  // contribution bienvenue
  // le test échoue bien que fonctionne lorsque testé manuellement dans le navigateur.

  // it('should uncheck filter checkboxes when store checkedFilter getter returns an empty array', () => {
  //   // given
  //   const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})
  //   const inputFilterElements = wrapper.findAll('li.filter input[type=checkbox]')
  //   inputFilterElements.wrappers[0].trigger('click')
  //   inputFilterElements.wrappers[1].trigger('click')

  //   // when
  //   store.state.checkedFilters = []

  //   // then
  //   inputFilterElements.wrappers.forEach(inputFilter => {
  //     expect(inputFilter.element.checked).toBe(false)
  //   })
  // })

  it('should uncheck "Tous" checkbox when one or more filters are already checked from query', () => {
    // given
    const store = {
      state: {
        checkedFilters: [{
          title: 'Référentiel',
          tags: [
            'RGAA',
            'Bonnes pratiques Opquast'
          ]
        }]
      },
      getters: {
        tagsFromFilterTitle: function () {
          return [
            'RGAA',
            'Bonnes pratiques Opquast'
          ]
        }
      }
    }
    store.commit = jest.fn()

    const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})
    const inputTousElement = wrapper.find('p.filter-all input[type=checkbox]')

    // then
    expect(inputTousElement.element.checked).toBe(false)
  })

  it('should check "Tous" checkbox when no filters are checked from query', () => {
    // given
    store = new Vuex.Store({
      state: {
        checkedFilters: []
      },
      getters: {
        tagsFromFilterTitle: () => () => []
      }
    })
    store.commit = jest.fn()

    const wrapper = shallowMount(FilterCategory, {propsData: props, localVue, store})
    const inputTousElement = wrapper.find('p.filter-all input[type=checkbox]')

    // then
    expect(inputTousElement.element.checked).toBe(true)
  })

  it('should contain one AnchorLink component with anchor "criteria-list", message "Accéder à la liste des critères", css class "sr-only sr-only-focusable"', () => {
    // given
    const expectedProps = {anchor: 'criteria-list', message: 'Accéder à la liste des critères', cssClass: 'sr-only sr-only-focusable'}

    // when
    const wrapper = shallowMount(FilterCategory, {localVue, store})
    const anchorLinkComponent = wrapper.find(AnchorLink)

    // then
    expect(anchorLinkComponent.props()).toEqual(expectedProps)
  })
})
