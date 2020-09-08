import Vue from 'vue'
import Vuex from 'vuex'
import ZhShaoSetting from './ZhShaoBridge/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ZhShaoSetting
  }
})
