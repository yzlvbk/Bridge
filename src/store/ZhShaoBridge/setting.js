export default {
  namespaced: true, // 设置独立命名空间，避免命名冲突  ---  ZhShaoSetting
  state: {
    // 当前展示的tab 默认为time
    activeName: 'time',

    // 当前展示的table 默认为姿态盒倾角 iclTable、accelTable、strainTable
    activeTableName: 'iclTable',
    // 时序图数据
    timeChartData: {},

    // 相关性分析图数据
    relationChartData: {},

    // 历史图数据
    historyChartData: {},

    /* 姿态盒倾角表格数据 */
    iclTableData: [],

    /* 姿态盒加速度表格数据 */
    accelTableData: [],

    /* 应变片表格数据 */
    strainTableData: []
  },
  mutations: {
    // 切换当前展示的tab
    toggleActiveName(state, tab) {
      state.activeName = tab.name
    },

    // 切换当前展示的table
    toggleTableName(state, name) {
      if (state.activeTableName === name) return
      state.activeTableName = name
    },

    // 保存时序图数据
    setTimeChartData(state, data) {
      state.timeChartData = data
    },

    // 保存相关性分析图数据
    setRelationChartData(state, data) {
      state.relationChartData = data
    },

    // 保存历史图数据
    setHistoryChartData(state, data) {
      state.historyChartData = data
    },

    /* 保存姿态盒倾角表格数据 */
    setIclTableData(state, data) {
      state.iclTableData = data
    },

    /* 保存姿态盒倾角表格数据 */
    setAccelTableData(state, data) {
      state.accelTableData = data
    },

    /* 保存姿态盒倾角表格数据 */
    setStrainTableData(state, data) {
      state.strainTableData = data
    }
  }
}
