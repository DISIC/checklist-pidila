import {shallowMount} from '@vue/test-utils'

import AsideColumn from '../index.vue'

describe('components | AsideColumn', () => {

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(AsideColumn)

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

})
