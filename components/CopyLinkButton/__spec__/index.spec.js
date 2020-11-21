import {createLocalVue} from '../../../vue-test.config'
import {shallowMount} from '@vue/test-utils'
import CopyLinkButton from '../index.vue'

describe('components | CopyLinkButton', () => {

  let localVue

  beforeEach(() => {
    document.execCommand = jest.fn()
    localVue = createLocalVue()
  })

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(CopyLinkButton)

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should call the document.execCommand with the argument "copy" on click', () => {
    // given
    const $bus = {}
    const wrapper = shallowMount(CopyLinkButton, {localVue, mocks: {$bus}})

    document.getElementById = () => {
      return {
        select: () => ''
      }
    }

    // when
    wrapper.find('button.btn-link').trigger('click')

    // then
    expect(document.execCommand).toHaveBeenCalledWith('copy')
  })

  it('should call the document.execCommand with the argument "copy" on keymap enter', () => {
    // given
    const $bus = {}
    const wrapper = shallowMount(CopyLinkButton, {localVue, mocks: {$bus}})

    document.getElementById = () => {
      return {
        select: () => ''
      }
    }

    // when
    wrapper.find('button.btn-link').trigger('keyup.enter')

    // then
    expect(document.execCommand).toHaveBeenCalledWith('copy')
  })

  it('should not display a tooltip popover when component is mounted', () => {
    // given
    const $bus = {}

    // when
    const wrapper = shallowMount(CopyLinkButton, {localVue, mocks: {$bus}})

    // then
    expect(wrapper.findAll('span.alert-success')).toHaveLength(0)
  })

  it('should display a tooltip popover when "Copier lien" button is clicked', () => {
    // given
    const $bus = {}
    const wrapper = shallowMount(CopyLinkButton, {localVue, mocks: {$bus}})

    // when
    wrapper.find('button.btn-link').trigger('click')

    // then
    expect(wrapper.findAll('span.alert-success')).toHaveLength(1)
  })

  it('should remove the role attribute when copy link button is clicked', () => {
    // given
    const $bus = {}
    const wrapper = shallowMount(CopyLinkButton, {localVue, mocks: {$bus}})

    // when
    wrapper.find('button.btn-link').trigger('click')

    // then
    expect(wrapper.findAll('p[role=presentation]')).toHaveLength(0)
  })

  it('should contain a span named alert-success when copy link button is clicked', () => {
    // given
    const $bus = {}
    const wrapper = shallowMount(CopyLinkButton, {localVue, mocks: {$bus}})

    // when
    wrapper.find('button.btn-link').trigger('click')

    // then
    expect(wrapper.findAll('span.alert-success')).toHaveLength(1)
  })

  it('should not contain a span named alert-success when escape is pressed and focus is on button link', () => {
    // given
    const $bus = {}
    const wrapper = shallowMount(CopyLinkButton, {localVue, mocks: {$bus}})
    // when
    wrapper.find('button.btn-link').trigger('click')
    wrapper.find('button.btn-link').trigger('keydown.esc')

    // then
    expect(wrapper.findAll('span.alert-success')).toHaveLength(0)
  })

  it('should not contain a span named alert-success when copy link button lose focus', () => {
    // given
    const $bus = {}
    const wrapper = shallowMount(CopyLinkButton, {localVue, mocks: {$bus}, attachToDocument: true})
    wrapper.find('button.btn-link').trigger('click')

    // when
    wrapper.find('button.btn-link').trigger('blur')

    // then
    expect(wrapper.findAll('span.alert-success')).toHaveLength(0)
  })
})
