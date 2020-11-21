import {shallowMount} from '@vue/test-utils'
import AnchorLink from '../index.vue'

describe('components | AnchorLink', () => {
  const props = {
    anchor: 'main',
    message: 'Aller au contenu',
    cssClass: 'sr-only sr-only-focusable'
  }
  const $router = {}

  beforeEach(() => {
    $router.scrollTo = jest.fn()
  })

  it('should match snapshot', () => {
    // when
    const wrapper = shallowMount(AnchorLink, {mocks: {$router}})

    // then
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should display the expected message', () => {
    // when
    const wrapper = shallowMount(AnchorLink, {propsData: props, mocks: {$router}})

    // then
    expect(wrapper.find('a').element.textContent.trim()).toBe('Aller au contenu')
  })

  it('should contain the right css props class', () => {
    // when
    const wrapper = shallowMount(AnchorLink, {propsData: props, mocks: {$router}})

    // then
    expect(wrapper.find('a').element.className).toBe('sr-only sr-only-focusable')
  })

  it('should call the scrollTo function from router instance with anchor when clicked', () => {
    // given
    const wrapper = shallowMount(AnchorLink, {propsData: props, mocks: {$router}})

    // when
    wrapper.find('a').trigger('click')

    // then
    expect($router.scrollTo).toHaveBeenCalledWith('main')
  })
})
