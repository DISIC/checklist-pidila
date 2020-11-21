import {shallowMount} from '@vue/test-utils'
import FilterCategory from '../../FilterCategory/index.vue'
import FilterBox from '../index.vue'

describe('components | FilterBox', () => {

  let props
  beforeEach(() => {
    props = {
      data: [
        {title: '0', tags: ['0-1', '0-2']},
        {title: '1', tags: ['1-1', '1-2']},
        {title: '2', tags: ['2-1', '2-2']},
      ]
    }
  })

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(FilterBox)

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should contain three FilterCategory components when store has three filters', () => {
    // when
    const wrapper = shallowMount(FilterBox, {propsData: props})

    // then
    const filterCategoryComponents = wrapper.findAll(FilterCategory)
    expect(filterCategoryComponents).toHaveLength(3)
  })

  it('should set the right props in the FilterCategory components', () => {
    // when
    const wrapper = shallowMount(FilterBox, {propsData: props})

    // then
    const filterCategoryComponents = wrapper.findAll(FilterCategory)
    filterCategoryComponents.wrappers.forEach((component, index) => {
      expect(component.props()).toEqual({
        data: {
          title: String(index),
          tags: [String(index) + '-1', String(index) + '-2']
        }
      })
    })
  })
})
