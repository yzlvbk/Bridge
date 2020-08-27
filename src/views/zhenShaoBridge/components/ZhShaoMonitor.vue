<template>
  <div class="monitor">

    <!-- 安全等级评分 -->
    <div class="ranking">安全等级评分:<i style="color: lightgreen;">90</i></div>

    <!-- 构件安全级别 -->
    <div class="component">
      <div class="component-title">构件安全级别</div>
      <div class="component-table">
        <el-table
          :data="tableData"
          stripe
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

    <!-- 车辆称重 -->
    <div class="weight">
      <div class="weight_chart"></div>
    </div>
  </div>
</template>

<script>
/* 监听div宽高变化 */
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  mounted () {
    this.$nextTick(() => {
      this.drawWeightChart()
    })
  },
  data () {
    return {
      /* 表格数据 */
      tableData: [
        {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }
      ]
    }
  },
  methods: {
    /* 表行添加类名 */
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },

    /* 绘制车辆载重图 */
    drawWeightChart () {
      // 定义颜色
      var fontColor = 'rgb(15, 200, 224)'
      var lineColor = '#CACACA'

      // moocX轴数据
      const dataX = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']

      // 1.初始化echarts
      var myChart = this.$echarts.init(document.querySelector('.weight_chart'))
      // 2.配置option
      var option = {
        color: ['rgb(15,200,224)'], // 线条颜色
        title: {
          text: '车辆载重',
          textStyle: {
            color: '#eee',
            fontSize: '14',
            fontWeight: 400
          },
          left: 'center',
          top: '10'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '22%',
          left: '5%',
          right: '13%',
          bottom: '7%',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              show: true
            },
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
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }
        },
        yAxis: [{
          name: '重量',
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
            show: false
          },
          // eslint-disable-next-line no-dupe-keys
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }

        }],
        series: [{
          name: '2018',
          type: 'line',
          symbol: 'emptyCircle', // 标记形状
          lineStyle: {
            width: 1
          },
          data: [1, 2, 3, 3, 5, 6, 5, 3, 6, 5, 5, 4]
        }]
      }

      // 3.将配置项给实例
      myChart.setOption(option)
      // 4.让图表跟随屏幕自动的去适应
      const erd = elementResizeDetectorMaker()
      erd.listenTo(document.querySelector('.weight'), element => {
        myChart.resize()
      })
    }
  },
  beforeDestroy () {
    /* 移除监听事件 */
    const erd = elementResizeDetectorMaker()
    erd.removeAllListeners(document.querySelector('.weight'))
  }

}
</script>

<style lang="less">
@import "../../../assets/css/reset.css";
.monitor {
  display: flex;
  flex-direction: column;
  height: 100%;

  .ranking {
    display: flex;
    justify-content:center;
    align-items: center;
    font-size: 26px;
    flex-basis: 10%;
    border-bottom: 10px solid var(--BgColor);

    i {
      margin-left:10px;
      font-size: 40px;
    }
  }

  .component {
    display: flex;
    flex-direction: column;
    position: relative;
    flex-basis: 45%;
    border-bottom: 10px solid var(--BgColor);

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

  .weight {
    flex-basis: 45%;
  }
}

/* 设置el-table高度响应式 */
.monitor .el-table {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll !important;
}
/* 修改字体颜色 */
.monitor .el-table .success-row {
    color: red !important;
}

.weight_chart {
  width: 100%;
  height: 100%;
}
</style>
