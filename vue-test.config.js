import Vuex from 'vuex'
import VueTestUtils from '@vue/test-utils'
import onClickOutside from './plugins/on-click-outside'

function createLocalVue() {
  const localVue = VueTestUtils.createLocalVue()
  localVue.use(onClickOutside)
  localVue.use(Vuex)
  return localVue
}

module.exports = {
  createLocalVue
}
