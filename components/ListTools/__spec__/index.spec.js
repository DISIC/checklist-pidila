import {shallowMount} from '@vue/test-utils'
import Events from '../../../bus/events'
import ListTools from '../index.vue'
import CopyLinkButton from '../../CopyLinkButton'

jest.useFakeTimers()

describe('components | ListTools', () => {
  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(ListTools)

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should emit an "EXPAND_CRITERIA" event to the EventBus when "Ouvrir Toute la liste des critères" button is pressed', () => {
    // given
    const $bus = {}
    $bus.$emit = jest.fn()
    const wrapper = shallowMount(ListTools, {mocks: {$bus}})
    const expectedEventName = Events.EXPAND_CRITERIA

    // when
    wrapper.find('button.btn-open_all').trigger('click')

    // then
    expect($bus.$emit).toHaveBeenCalledWith(expectedEventName)
  })

  it('should emit an "COLLAPSE_CRITERIA" event to the EventBus when "Fermer Toute la liste des critères" button is pressed', () => {
    // given
    const $bus = {}
    $bus.$emit = jest.fn()
    const wrapper = shallowMount(ListTools, {mocks: {$bus}})
    const expectedEventName = Events.COLLAPSE_CRITERIA

    // when
    wrapper.find('button.btn-close_all').trigger('click')

    // then
    expect($bus.$emit).toHaveBeenCalledWith(expectedEventName)
  })

  it('should contain one CopyLinkButton component', () => {
    // when
    const wrapper = shallowMount(ListTools)

    // then
    const filterBoxComponents = wrapper.findAll(CopyLinkButton)
    expect(filterBoxComponents.wrappers).toHaveLength(1)
  })
})
