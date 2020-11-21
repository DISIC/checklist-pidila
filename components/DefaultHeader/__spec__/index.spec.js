import {shallowMount} from '@vue/test-utils'

import DefaultHeader from '../index.vue'

describe('components | DefaultHeader', () => {

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(DefaultHeader)

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

})
