import {shallowMount} from '@vue/test-utils'
import FilterConfig from '../../../data/filter.config'
import Events from '../../../bus/events'
import Criteria from '../index.vue'

describe('components | Criteria', () => {
  let props
  let wrapper

  const $store = {
    state: {
      checkedFilters: [{title: 'Référentiel', tags: ['Coréen']}]
    }
  }
  $store.commit = jest.fn()
  const $bus = {}

  beforeEach(() => {
    props = {
      data: {
        id: 'pi-001',
        title: 'Merveilleux titre',
        filters: [
          {
            title: 'Référentiel',
            tags: ['Intégration', 'Rédactionnel']
          },
          {
            title: 'Profil',
            tags: ['Développement']
          }
        ],
        rawHTMLContent: '<p>Contenu de qualité.</p>'
      }
    }

    FilterConfig.cssClasses = {
      'Référentiel': 'red-labels-group',
      'Profil': 'yellow-labels-group'
    }

    $bus.$on = function (eventKey, callback) {
    }
    wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})
    $store.commit.mockReset()
  })

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show the criteria title', () => {
    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

    // then
    expect(wrapper.find('h2 span.crit-item-title').element.textContent.trim()).toBe('Merveilleux titre')
  })

  it('should show the criteria id', () => {
    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

    // then
    expect(wrapper.find('h2 span.crit-item-id').element.textContent.trim()).toBe('pi-001')
  })

  it('should show the criteria content', () => {
    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

    // then
    expect(wrapper.find('div.crit-item-test-content').element.innerHTML.trim()).toBe('<p>Contenu de qualité.</p>')
  })

  it('should have a Screen Reader tag before Criteria details', () => {
    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

    // then
    expect(wrapper.find('div.crit-item-test h3.sr-only').element.textContent).toBe('Tests')
  })

  it('should have the criteria filter list', () => {
    // given
    props = {
      data: {
        id: 'pi_001',
        title: 'Merveilleux titre',
        filters: [
          {title: 'Profil', tags: ['Intégration', 'Développement']},
          {title: 'Référentiel', tags: ['RGAA', 'Charte de l\'État', 'Bonnes pratiques Opquast']}
        ],
        rawHTMLContent: '<p>Contenu de qualité.</p>'
      }
    }


    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})
    const filterTagsList = wrapper.findAll('ul.tags-sublist')
    const profilList = filterTagsList.wrappers[0]
    const referentielList = filterTagsList.wrappers[1]

    // then
    expect(filterTagsList).toHaveLength(2)
    expect(profilList.findAll('li')).toHaveLength(2)
    expect(referentielList.findAll('li')).toHaveLength(3)
  })

  it('should collapse the criteria content by default', () => {
    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

    // then
    expect(wrapper.find('div.crit-item-content').attributes().hidden).toBe('hidden')
  })

  it('should expand the criteria content when title is clicked', () => {
    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

    // when
    const titleButton = wrapper.find('h2.crit-item-header button')
    titleButton.trigger('click')

    // then
    expect(wrapper.find('div.crit-item-content').attributes().hidden).toBeFalsy()
  })

  it('should expand the criteria content when the bus event emits an "EXPAND_CRITERIA" event', () => {
    // given
    const $store = {
      state: {
        checkedFilters: [{title: 'Référentiel', tags: ['Intégration']}]
      }
    }
    $store.commit = jest.fn()

    let expandCriteriaCallback
    const $bus = {}
    $bus.$on = function (eventKey, callback) {
      if (eventKey === Events.EXPAND_CRITERIA) {
        expandCriteriaCallback = callback
      }
    }
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

    // when
    expandCriteriaCallback()

    // then
    expect(wrapper.find('div.crit-item-content').attributes().hidden).toBeFalsy()
  })

  it('should collapse the criteria content when the bus event emits an "COLLAPSE_CRITERIA" event', () => {
    // given
    let collapseCriteriaCallback
    const $bus = {}
    $bus.$on = function (eventKey, callback) {
      if (eventKey === Events.COLLAPSE_CRITERIA) {
        collapseCriteriaCallback = callback
      }
    }
    const wrapper = shallowMount(Criteria, {mocks: {$store, $bus}})

    // when
    collapseCriteriaCallback()

    // then
    expect(wrapper.find('div.crit-item-content').attributes().hidden).toBe('hidden')
  })

  it('should contain the right css class for criteria content filter groups', () => {
    // given
    FilterConfig.cssClasses = {
      'Référentiel': 'red-labels-group',
      'Niveau': 'blue-labels-group'
    }
    props = {
      data: {
        id: 'pi_001',
        title: 'Merveilleux titre',
        filters: [
          {
            title: 'Référentiel',
            tags: ['Intégration', 'Rédactionnel']
          },
          {
            title: 'Niveau',
            tags: ['1']
          }
        ],
        rawHTMLContent: '<p>Contenu de qualité.</p>'
      }
    }

    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})
    // then
    expect(wrapper.find('li.red-labels-group').element.innerHTML.match(/Référentiel/)).toHaveLength(1)
    expect(wrapper.find('li.blue-labels-group').element.innerHTML.match(/Niveau/)).toHaveLength(1)
  })

  it('should contain the default css class for criteria content filter groups when title is not in the config', () => {
    // given
    FilterConfig.cssClasses = {
      'Référentiel': 'red-labels-group'
    }
    props = {
      data: {
        id: 'pi_001',
        title: 'Merveilleux titre',
        filters: [
          {
            title: 'Référentiel',
            tags: ['Intégration', 'Rédactionnel']
          },
          {
            title: 'DefaultTitle',
            tags: ['1']
          }
        ],
        rawHTMLContent: '<p>Contenu de qualité.</p>'
      }
    }

    // when
    const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

    // then
    expect(wrapper.find('li.red-labels-group').element.innerHTML.match(/Référentiel/)).toHaveLength(1)
    expect(wrapper.find('li.default-labels-group').element.innerHTML.match(/DefaultTitle/)).toHaveLength(1)

  })

  describe('accessibility design elements', () => {
    it('should have an aria hidden attributes in the expand symbol', () => {
      // given
      const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

      // when
      const expandSymbol = wrapper.find('h2.crit-item-header button span.expand-symbol')

      // then
      expect(expandSymbol.attributes()['aria-hidden']).toBe('true')
    })

    it('should have an aria expanded attribute equal to false when content is hidden', () => {
      // given
      const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

      // when
      const titleButton = wrapper.find('h2.crit-item-header button')

      // then
      expect(titleButton.attributes()['aria-expanded']).toBe('false')
    })

    it('should have an aria expanded attribute equal to true when content is visible', () => {
      // given
      const wrapper = shallowMount(Criteria, {propsData: props, mocks: {$store, $bus}})

      // when
      const titleButton = wrapper.find('h2.crit-item-header button')
      titleButton.trigger('click')

      // then
      expect(titleButton.attributes()['aria-expanded']).toBe('true')
    })
  })
})
