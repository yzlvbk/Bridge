<template>
  <div class="sernor_data_show">
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

        <el-tab-pane label="传感器数据" name="sensorData">
          <div class="sernor_data">
            <div class="component-table">
              <!-- 姿态盒倾角表格 -->
              <el-table
                v-show="activeTableName === 'iclTable'"
                ref="tableList"
                :data="iclTableData"
                stripe
                height="100%"
                style="width: 100%; border: none;"
                :row-style="{ height: '60px' }"
              >
                <el-table-column prop="Id" align="center" label="编号"></el-table-column>
                <el-table-column prop="Name" align="center" label="名称"></el-table-column>
                <el-table-column prop="IclX" align="center" label="倾角X"></el-table-column>
                <el-table-column prop="IclY" align="center" label="倾角Y"></el-table-column>
              </el-table>

              <!-- 姿态盒加速度表格 -->
              <el-table
                v-show="activeTableName === 'accelTable'"
                ref="tableList"
                :data="accelTableData"
                stripe
                height="100%"
                style="width: 100%; border: none;"
                :row-style="{ height: '60px' }"
              >
                <el-table-column prop="Id" align="center" label="编号"></el-table-column>
                <el-table-column prop="Name" align="center" label="名称"></el-table-column>
                <el-table-column prop="AccelX" align="center" label="加速度X"></el-table-column>
                <el-table-column prop="AccelY" align="center" label="加速度Y"></el-table-column>
                <el-table-column prop="AccelZ" align="center" label="加速度Z"></el-table-column>
              </el-table>

              <!-- 应变片表格 -->
              <el-table
                v-show="activeTableName === 'strainTable'"
                ref="tableList"
                :data="strainTableData"
                stripe
                height="100%"
                style="width: 100%; border: none;"
                :row-style="{ height: '60px' }"
              >
                <el-table-column prop="Id" align="center" label="编号"></el-table-column>
                <el-table-column prop="Name" align="center" label="名称"></el-table-column>
                <el-table-column prop="Value" align="center" label="值"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
  reqBridgeOneIclTable,
  reqBridgeOneAccelTable
} from '@/request/ZhShao/api.js'
export default {
  mounted() {
    // 获取表格数据
    this.getTableData()
  },
  data() {
    return {
      activeName: 'time'
    }
  },
  computed: {
    ...mapState('ZhShaoSetting', [
      'timeChartData',
      'relationChartData',
      'historyChartData',
      'activeTableName', // 当前tab栏名称
      'iclTableData', // 姿态盒倾角表格数据
      'accelTableData', // 姿态盒加速度表格数据
      'strainTableData' // 应变片表格数据
    ])
  },
  methods: {
    // 请求表格数据
    async getTableData() {
      const data1 = await reqBridgeOneIclTable()
      if (data1.statusCode === 200) {
        // 保存数据至vuex
        this.setIclTableData(data1.data)
      }

      const data2 = await reqBridgeOneStrainTable()
      if (data2.statusCode === 200) {
        // 保存数据至vuex
        this.setStrainTableData(data2.data)
      }

      const data3 = await reqBridgeOneAccelTable()
      if (data3.statusCode === 200) {
        // 保存数据至vuex
        this.setAccelTableData(data3.data)
      }
    },

    ...mapMutations('ZhShaoSetting', ['toggleActiveName', 'setIclTableData', 'setAccelTableData', 'setStrainTableData']),

    /* 绘制时序图 */
    drawTimeChart() {
      // 保存vuex中数据, 设置X、Y轴数据
      const object = Object.values(this.timeChartData)[0]
      // 根据传感器不同显示不同单位
      const yAxisName = Object.keys(this.timeChartData)[0].startsWith('SR') ? '倾角(deg)' : '微应变(micro strain)'
      // 处理X轴数据
      const dataX = []
      object.Time.forEach((item) => {
        dataX.push(item.split('T')[1])
      })
      // 处理series数据
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
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgba(58,132,255,0.5)' // 渐变色起始颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(58,132,255,0)' // 渐变色结束颜色
                    }
                  ])
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
          right: '6%',
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
          axisLine: {
            // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }
        },
        yAxis: [
          {
            name: yAxisName,
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
            axisLine: {
              // 坐标轴轴线相关设置
              lineStyle: {
                color: fontColor
              }
            }
          }
        ],
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
      erd.listenTo(document.querySelector('.time_chart'), (element) => {
        myChart.resize()
      })
    },

    /* 绘制相关性分析图 */
    drawRelationChart() {
      // 保存vuex中数据, 设置X、Y轴数据
      const dataX = this.relationChartData.x
      // 根据传感器不同显示不同单位
      const yAxisName = Object.keys(this.relationChartData.y)[0].startsWith('SR') ? '倾角(deg)' : '微应变(micro strain)'
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
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(58,132,255,0.5)' // 渐变色起始颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(58,132,255,0)' // 渐变色结束颜色
                  }
                ])
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
      var myChart = this.$echarts.init(
        document.querySelector('.relation_chart')
      )
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
          right: '6%',
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
          axisLine: {
            // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }
        },
        yAxis: [
          {
            name: yAxisName,
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
            axisLine: {
              // 坐标轴轴线相关设置
              lineStyle: {
                color: fontColor
              }
            }
          }
        ],
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
      erd.listenTo(document.querySelector('.relation_chart'), (element) => {
        myChart.resize()
      })
    },

    /* 绘制历史图 */
    drawHistoryChart() {
      // 保存vuex中数据, 设置X、Y轴数据
      const dataX = this.historyChartData.x
      const yObject = this.historyChartData.y
      // 根据传感器不同显示不同单位
      const yAxisName = Object.keys(this.historyChartData.y)[0].startsWith('SR') ? '倾角(deg)' : '微应变(micro strain)'
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
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(58,132,255,0.5)' // 渐变色起始颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(58,132,255,0)' // 渐变色结束颜色
                  }
                ])
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
      var myChart = this.$echarts.init(
        document.querySelector('.history_chart')
      )
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
          right: '6%',
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
          axisLine: {
            // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }
        },
        yAxis: [
          {
            name: yAxisName,
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
            axisLine: {
              // 坐标轴轴线相关设置
              lineStyle: {
                color: fontColor
              }
            }
          }
        ],
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
      erd.listenTo(document.querySelector('.history_chart'), (element) => {
        myChart.resize()
      })
    },

    /* 表格跳转到指定位置 */
    location() {
      this.$refs.tableList.$el.scrollTop = 300
    },

    // 设置变化, 重新绘制chart
    reDrawChart(type) {
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
        this.$nextTick(() => {
          this.drawHistoryChart()
        })
      }
    }
  },
  components: {
    Setting
  },
  beforeDestroy() {
    /* 移除监听事件 */
    // const erd = elementResizeDetectorMaker()
    // erd.removeAllListeners(document.querySelector('.time_chart'))
  }
}
</script>

<style lang="less">
@import '../../../assets/css/reset.css';
.sernor_data_show {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .sernor_chart {
    position: relative;
    flex-basis: 100%;
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
      .history_chart,
      .sernor_data {
        width: 100%;
        height: calc(100% - 55px);
      }
      .sernor_data {
        // display: flex;
        // flex-direction: column;
        // position: relative;
        // flex-basis: 50%;
        // border-top: 5px solid var(--BgColor);

        .component-title {
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 16px;
        }

        .component-table {
          display: flex;
          justify-content: center;
          flex-grow: 1;
          position: relative;
          height: 100%;
        }
      }
    }
  }
}

/* 设置el-table高度响应式 */
.sernor_data_show .el-table {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: auto !important;
}
/* 修改字体颜色 */
.sernor_data_show .el-table .success-row {
  color: red !important;
}
</style>
