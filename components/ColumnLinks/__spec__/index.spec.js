import {shallowMount} from '@vue/test-utils'

import ColumnLinks from '../index.vue'

describe('components | ColumnLinks', () => {

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(ColumnLinks)

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

})
