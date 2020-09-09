<template>
  <div class="sernor_data_show">
    <!-- {{timeChartData}} -->
      <div class="sernor_chart">
        <Setting class="setting" @reDrawChart="reDrawChart" />
        <el-tabs v-model="activeName" @tab-click="toggleActiveName">
          <el-tab-pane label="时序图" name="time">
            <div class="time_chart"></div>
          </el-tab-pane>
          <el-tab-pane label="相关性分析图" name="relation">
            <div class="relation_chart"></div>
          </el-tab-pane>
          <el-tab-pane label="历史数据" name="history">
            <div class="history_chart"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="sernor_data">
        <div class="component-table">
          <el-table
            ref="tableList"
            :data="tableData"
            stripe
            height="100%"
            style="width: 100%; border: none;"
            :row-style="{ height: '60px' }"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="id"
              align="center"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="material"
              align="center"
              label="主题材质">
            </el-table-column>
            <el-table-column
              prop="level"
              align="center"
              label="安全级别">
            </el-table-column>
          </el-table>
      </div>
      </div>
  </div>
</template>

<script>
/* 监听图表div宽高变化 */
import elementResizeDetectorMaker from 'element-resize-detector'
import Setting from '../../../components/setting/Setting'
import { mapState, mapMutations } from 'vuex'
import {
  reqBridgeOneStrainTable,
  reqBridgeOneIclTable
} from '@/request/ZhShao/api.js'
export default {
  mounted () {
    this.getTableData()
  },
  data () {
    return {
      activeName: 'time',
      /* 表格数据 */
      tableData: [
        {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '02',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '03',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '04',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '05',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '06',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '07',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '08',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '09',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '10',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '11',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '12',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '13',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }
      ]
    }
  },
  computed: {
    ...mapState('ZhShaoSetting', ['timeChartData', 'relationChartData', 'historyChartData'])
  },
  methods: {
    // 请求表格数据
    async getTableData () {
      const data1 = await reqBridgeOneIclTable()
      console.log('now1', data1)

      const data2 = await reqBridgeOneStrainTable()
      console.log('now2', data2)
    },

    // 切换tab栏
    // toggleTabs (tab) {
    //   console.log(tab.name)
    // },
    ...mapMutations('ZhShaoSetting', ['toggleActiveName']),

    /* 绘制时序图 */
    drawTimeChart () {
      // 保存vuex中数据, 设置X、Y轴数据
      const object = Object.values(this.timeChartData)[0]
      const dataX = object.Time
      const series = []
      for (const key in object) {
        if (key !== 'Time') {
          series.push({
            name: key,
            type: 'line',
            symbol: 'emptyCircle', // 标记形状
            itemStyle: {
              normal: {
                color: 'rgba(58,132,255,1)', // 圆点颜色
                lineStyle: {
                  color: 'rgba(58,132,255,1)',
                  width: 1
                },
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(58,132,255,0.5)'// 渐变色起始颜色
                  }, {
                    offset: 1,
                    color: 'rgba(58,132,255,0)'// 渐变色结束颜色
                  }])
                }
              }
            },
            data: object[key]
          })
        }
      }

      // 定义颜色
      var fontColor = 'rgb(15, 200, 224)'
      var lineColor = '#CACACA'

      // moocX轴数据
      // const dataX = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']

      // 1.初始化echarts
      var myChart = this.$echarts.init(document.querySelector('.time_chart'))
      // 2.配置option
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '10px',
          textStyle: {
            color: lineColor
          }

        },
        grid: {
          left: '4%',
          right: '12%',
          bottom: '5%',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              show: true
            },
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            borderColor: lineColor
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 坐标轴两边留白
          data: dataX,
          name: '时间',
          nameTextStyle: {
            color: lineColor
          },
          // axisLabel: { //坐标轴刻度标签的相关设置。
          //     // interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
          // // margin:15,
          //     formatter:function(params) {
          //         var newParamsName = "";
          //         var paramsNameNumber = params.length;
          //         var provideNumber = 5;  //一行显示几个字
          //         var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          //         if (paramsNameNumber > provideNumber) {
          //             for (var p = 0; p < rowNumber; p++) {
          //                 var tempStr = "";
          //                 var start = p * provideNumber;
          //                 var end = start + provideNumber;
          //                 if (p == rowNumber - 1) {
          //                     tempStr = params.substring(start, paramsNameNumber);
          //                 } else {
          //                     tempStr = params.substring(start, end) + "\n";
          //                 }
          //                 newParamsName += tempStr;
          //             }

          //         } else {
          //             newParamsName = params;
          //         }
          //         return newParamsName
          //     },
          //     //rotate:50,
          // },
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }
        },
        yAxis: [{
          name: '倾角(deg)',
          nameTextStyle: {
            color: lineColor
          },
          type: 'value',
          splitNumber: 5,
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: lineColor,
              opacity: 0.3
            }
          },
          // eslint-disable-next-line no-dupe-keys
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }

        }],
        dataZoom: [
          // x轴滚动条
          {
            type: 'inside',
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          // y轴滚动条
          {
            type: 'inside',
            show: true,
            realtime: true,
            start: 0,
            end: 100,
            yAxisIndex: 0
          }
        ],
        series
      }

      // 3.将配置项给实例
      myChart.setOption(option, true)
      // 4.让图表跟随屏幕自动的去适应
      const erd = elementResizeDetectorMaker()
      erd.listenTo(document.querySelector('.time_chart'), element => {
        myChart.resize()
      })
    },

    /* 绘制相关性分析图 */
    drawRelationChart () {
      // 保存vuex中数据, 设置X、Y轴数据
      const dataX = this.relationChartData.x
      const series = []
      const yObject = this.relationChartData.y
      for (const key in yObject) {
        series.push({
          name: key,
          type: 'line',
          symbol: 'emptyCircle', // 标记形状
          itemStyle: {
            normal: {
              color: 'rgba(58,132,255,1)', // 圆点颜色
              lineStyle: {
                color: 'rgba(58,132,255,1)',
                width: 1
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(58,132,255,0.5)'// 渐变色起始颜色
                }, {
                  offset: 1,
                  color: 'rgba(58,132,255,0)'// 渐变色结束颜色
                }])
              }
            }
          },
          data: yObject[key]
        })
      }

      // 定义颜色
      var fontColor = 'rgb(15, 200, 224)'
      var lineColor = '#CACACA'

      // moocX轴数据
      // const dataX = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']

      // 1.初始化echarts
      var myChart = this.$echarts.init(document.querySelector('.relation_chart'))
      // 2.配置option
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '10px',
          textStyle: {
            color: lineColor
          }

        },
        grid: {
          left: '4%',
          right: '12%',
          bottom: '5%',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              show: true
            },
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            borderColor: lineColor
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 坐标轴两边留白
          data: dataX,
          name: '时间',
          nameTextStyle: {
            color: lineColor
          },
          // axisLabel: { //坐标轴刻度标签的相关设置。
          //     // interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
          // // margin:15,
          //     formatter:function(params) {
          //         var newParamsName = "";
          //         var paramsNameNumber = params.length;
          //         var provideNumber = 5;  //一行显示几个字
          //         var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          //         if (paramsNameNumber > provideNumber) {
          //             for (var p = 0; p < rowNumber; p++) {
          //                 var tempStr = "";
          //                 var start = p * provideNumber;
          //                 var end = start + provideNumber;
          //                 if (p == rowNumber - 1) {
          //                     tempStr = params.substring(start, paramsNameNumber);
          //                 } else {
          //                     tempStr = params.substring(start, end) + "\n";
          //                 }
          //                 newParamsName += tempStr;
          //             }

          //         } else {
          //             newParamsName = params;
          //         }
          //         return newParamsName
          //     },
          //     //rotate:50,
          // },
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }
        },
        yAxis: [{
          name: '倾角(deg)',
          nameTextStyle: {
            color: lineColor
          },
          type: 'value',
          splitNumber: 5,
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: lineColor,
              opacity: 0.3
            }
          },
          // eslint-disable-next-line no-dupe-keys
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }

        }],
        dataZoom: [
          // x轴滚动条
          {
            type: 'inside',
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          // y轴滚动条
          {
            type: 'inside',
            show: true,
            realtime: true,
            start: 0,
            end: 100,
            yAxisIndex: 0
          }
        ],
        series
      }

      // 3.将配置项给实例
      myChart.setOption(option, true)
      // 4.让图表跟随屏幕自动的去适应
      const erd = elementResizeDetectorMaker()
      erd.listenTo(document.querySelector('.relation_chart'), element => {
        myChart.resize()
      })
    },

    /* 绘制历史图 */
    drawHistoryChart () {
      // 保存vuex中数据, 设置X、Y轴数据
      const dataX = this.historyChartData.x
      const yObject = this.historyChartData.y
      console.log()
      const series = []
      for (const key in yObject) {
        series.push({
          name: key,
          type: 'line',
          symbol: 'emptyCircle', // 标记形状
          itemStyle: {
            normal: {
              color: 'rgba(58,132,255,1)', // 圆点颜色
              lineStyle: {
                color: 'rgba(58,132,255,1)',
                width: 1
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(58,132,255,0.5)'// 渐变色起始颜色
                }, {
                  offset: 1,
                  color: 'rgba(58,132,255,0)'// 渐变色结束颜色
                }])
              }
            }
          },
          data: yObject[key]
        })
      }

      // 定义颜色
      var fontColor = 'rgb(15, 200, 224)'
      var lineColor = '#CACACA'

      // moocX轴数据
      // const dataX = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']

      // 1.初始化echarts
      var myChart = this.$echarts.init(document.querySelector('.history_chart'))
      // 2.配置option
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '10px',
          textStyle: {
            color: lineColor
          }

        },
        grid: {
          left: '4%',
          right: '12%',
          bottom: '5%',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              show: true
            },
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            borderColor: lineColor
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 坐标轴两边留白
          data: dataX,
          name: '时间',
          nameTextStyle: {
            color: lineColor
          },
          // axisLabel: { //坐标轴刻度标签的相关设置。
          //     // interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
          // // margin:15,
          //     formatter:function(params) {
          //         var newParamsName = "";
          //         var paramsNameNumber = params.length;
          //         var provideNumber = 5;  //一行显示几个字
          //         var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          //         if (paramsNameNumber > provideNumber) {
          //             for (var p = 0; p < rowNumber; p++) {
          //                 var tempStr = "";
          //                 var start = p * provideNumber;
          //                 var end = start + provideNumber;
          //                 if (p == rowNumber - 1) {
          //                     tempStr = params.substring(start, paramsNameNumber);
          //                 } else {
          //                     tempStr = params.substring(start, end) + "\n";
          //                 }
          //                 newParamsName += tempStr;
          //             }

          //         } else {
          //             newParamsName = params;
          //         }
          //         return newParamsName
          //     },
          //     //rotate:50,
          // },
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }
        },
        yAxis: [{
          name: '倾角(deg)',
          nameTextStyle: {
            color: lineColor
          },
          type: 'value',
          splitNumber: 5,
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: lineColor,
              opacity: 0.3
            }
          },
          // eslint-disable-next-line no-dupe-keys
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }

        }],
        dataZoom: [
          // x轴滚动条
          {
            type: 'inside',
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          // y轴滚动条
          {
            type: 'inside',
            show: true,
            realtime: true,
            start: 0,
            end: 100,
            yAxisIndex: 0
          }
        ],
        series
      }

      // 3.将配置项给实例
      myChart.setOption(option, true)
      // 4.让图表跟随屏幕自动的去适应
      const erd = elementResizeDetectorMaker()
      erd.listenTo(document.querySelector('.history_chart'), element => {
        myChart.resize()
      })
    },

    /* 表行添加类名 */
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },

    /* 表格跳转到指定位置 */
    location () {
      this.$refs.tableList.$el.scrollTop = 300
    },

    // 设置变化, 重新绘制chart
    reDrawChart (type) {
      if (type === 'time') {
        // 重新绘制时序图
        // console.log(this.timeChartData)
        this.$nextTick(() => {
          this.drawTimeChart()
        })
      } else if (type === 'relation') {
        // 重新绘制相关性分析图
        // console.log(this.relationChartData)
        this.$nextTick(() => {
          this.drawRelationChart()
        })
      } else if (type === 'history') {
        // 重新绘制历史图图
        console.log(this.historyChartData)
        this.$nextTick(() => {
          this.drawHistoryChart()
        })
      }
    }
  },
  components: {
    Setting
  },
  beforeDestroy () {
    /* 移除监听事件 */
    // const erd = elementResizeDetectorMaker()
    // erd.removeAllListeners(document.querySelector('.time_chart'))
  }
}
</script>

<style lang="less">
@import "../../../assets/css/reset.css";
.sernor_data_show {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .sernor_chart {
    position: relative;
    flex-basis: 50%;
    border-bottom: 5px solid var(--BgColor);
    overflow: hidden;

    /* 设置按钮 */
    .setting {
      position: absolute;
      top: 6px;
      right: 18px;
      z-index: 100;
    }

    .el-tabs {
      height: 100%;

      .el-tabs__content {
        height: 100%;

        .el-tab-pane {
          height: 100%;
        }
      }

      .time_chart,
      .relation_chart,
      .history_chart {
        width: 100%;
        height: calc(100% - 55px);
      }
    }
  }

  .sernor_data {
    display: flex;
    flex-direction: column;
    position: relative;
    flex-basis: 50%;
    border-top: 5px solid var(--BgColor);

    .component-title {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
    }

    .component-table {
      display:flex;
      justify-content: center;
      flex-grow: 1;
      position: relative;
      height: 100%;
    }
  }
}

/* 设置el-table高度响应式 */
.sernor_data_show .el-table {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll !important;
}
/* 修改字体颜色 */
.sernor_data_show .el-table .success-row {
    color: red !important;
}
</style>>
