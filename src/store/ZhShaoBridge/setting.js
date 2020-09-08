export default {
  namespaced: true, // 设置独立命名空间，避免命名冲突
  state: {
    // 当前展示的tab 默认为time
    activeName: 'time'
  },
  mutations: {
    // 切换当前展示的tab
    toggleActiveName (state, tab) {
      state.activeName = tab.name
    }
  }
}
