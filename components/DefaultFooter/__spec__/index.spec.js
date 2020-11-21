import {shallowMount} from '@vue/test-utils'

import DefaultFooter from '../index.vue'

describe('components | DefaultFooter', () => {

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(DefaultFooter)

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

})
