import {shallowMount} from '@vue/test-utils'
import SkipLink from '../index.vue'
import AnchorLink from '../../AnchorLink'

describe('components | SkipLink', () => {
  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(SkipLink)

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have two AnchorLink components to #main and #filters', () => {
    // when
    const wrapper = shallowMount(SkipLink)
    const expectedProps = [
      {anchor: 'main', cssClass: '', message: 'Aller au contenu'},
      {anchor: 'filters', cssClass: '', message: 'Aller aux filtres'}
    ]

    // then
    const anchorLinkComponents = wrapper.findAll(AnchorLink)
    expect(anchorLinkComponents.length).toEqual(2)

    anchorLinkComponents.wrappers.forEach((component, index) => {
      expect(component.props()).toEqual(expectedProps[index])
    })
  })
})
