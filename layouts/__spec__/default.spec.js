import {shallowMount, config} from '@vue/test-utils'

import defaultLayout from '../default.vue'
import DefaultHeader from '../../components/DefaultHeader'
import DefaultFooter from '../../components/DefaultFooter'
import SkipLink from '../../components/SkipLink'

describe('layouts | default', () => {

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(defaultLayout, {stubs: ['nuxt']})

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have one header component', () => {
    // when
    const wrapper = shallowMount(defaultLayout, {stubs: ['nuxt']})

    // then
    const defaultHeaderComponents = wrapper.findAll(DefaultHeader)
    expect(defaultHeaderComponents).toHaveLength(1)
  })

  it('should have one footer component', () => {
    // when
    const wrapper = shallowMount(defaultLayout, {stubs: ['nuxt']})

    // then
    const defaultFooterComponents = wrapper.findAll(DefaultFooter)
    expect(defaultFooterComponents).toHaveLength(1)
  })

  it('should have one SkipLink component', () => {
    // when
    const wrapper = shallowMount(defaultLayout, {stubs: ['nuxt']})

    // then
    const skipLinkComponents = wrapper.findAll(SkipLink)
    expect(skipLinkComponents).toHaveLength(1)
  })
})
