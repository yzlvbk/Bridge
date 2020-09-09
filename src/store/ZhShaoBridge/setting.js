export default {
  namespaced: true, // 设置独立命名空间，避免命名冲突  ---  ZhShaoSetting
  state: {
    // 当前展示的tab 默认为time
    activeName: 'time',

    // 时序图数据
    timeChartData: {},

    // 相关性分析图数据
    relationChartData: {},

    // 历史图数据
    historyChartData: {}
  },
  mutations: {
    // 切换当前展示的tab
    toggleActiveName (state, tab) {
      state.activeName = tab.name
    },

    // 保存时序图数据
    setTimeChartData (state, data) {
      state.timeChartData = data
    },

    // 保存相关性分析图数据
    setRelationChartData (state, data) {
      state.relationChartData = data
    },

    // 保存历史图数据
    setHistoryChartData (state, data) {
      state.historyChartData = data
    }
  }
}
