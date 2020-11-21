import {shallowMount} from '@vue/test-utils'

import Alert from '../index.vue'

describe('components | Alert', () => {

  const propsData = {
    data: {
      id: 'alert_002',
      type: 'warning',
      isDisplayed: false,
      rawHTMLContent: '<p>La direction interministérielle</p>'
    }
  }

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(Alert, {propsData})

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have an alert-warning class attribute when type is warning', () => {
    // when
    const wrapper = shallowMount(Alert, {propsData})

    // then
    expect(wrapper.find('div:first-child').attributes().class).toBe('alert alert-warning')
  })

  it('should show the alert content', () => {
    // when
    const wrapper = shallowMount(Alert, {propsData})

    // then
    expect(wrapper.find('div:first-child').element.innerHTML.trim()).toBe('<p>La direction interministérielle</p>')
  })
})
