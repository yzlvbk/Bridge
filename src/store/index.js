import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import ZhShaoSetting from './ZhShaoBridge/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ZhShaoSetting,
    user
  }
})
