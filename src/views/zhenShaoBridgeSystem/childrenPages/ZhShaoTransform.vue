<template>
  <div class="transform">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>结构反应</el-breadcrumb-item>
      <el-breadcrumb-item>变形/弯矩</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <div class="three_d_model">
        <TransForm :sliderValue="sliderValue"></TransForm>
        <el-slider
          class="bridge_stress_slider"
          v-model="sliderValue"
          :min="5000"
          :max="20000"
          :step="3000"
          show-stops
        ></el-slider>
        <!-- <canvas class="bridge_stress" :width="canvasWidth" :height="canvasHeight"></canvas> -->
      </div>

      <!-- 空隙模块 -- 控制模块拖动 -->
      <!-- <div class="vsplitter" ref="vsplitter"></div> -->

      <div class="chart">
        <!-- 颜色差值区域 -->
        <div class="three_d_model_color">
          <span class="three_d_model_color_item">2</span>
          <span class="three_d_model_color_item">40</span>
          <span class="three_d_model_color_item">80</span>
          <span class="three_d_model_color_item">120</span>
          <span class="three_d_model_color_item">160</span>
          <span class="three_d_model_color_item">200</span>
          <span class="three_d_model_color_item">240</span>
          <span class="three_d_model_color_item">280</span>
          <span class="three_d_model_color_item">&gt;280</span>
        </div>
        <Stress />
      </div>
    </div>
  </div>
</template>

<script>
/* 监听图表div宽高变化 */
import elementResizeDetectorMaker from 'element-resize-detector'
import TransForm from '@/components/ZhenShao/transForm/TransForm'
import Stress from '@/components/ZhenShao/stress/Stress'
export default {
  async mounted() {
    // 获取Mesh数据
    // this.getMeshData()
    /* 获取canvas的宽高 */
    const wrapDiv = document.querySelector('.three_d_model')
    this.canvasWidth = window.getComputedStyle(wrapDiv, null).getPropertyValue('width')
    this.canvasHeight = window.getComputedStyle(wrapDiv, null).getPropertyValue('height')

    /* 添加移动内容区域窗口大小事件 */
    // const div = document.querySelector('.vsplitter')
    // div.addEventListener('mousedown', this.mouseResize)

    // this.$nextTick(() => {
    //   this.drawChart()
    // })
  },
  data() {
    return {
      canvasWidth: '', // 应力图宽度
      canvasHeight: '', // 应力图高度度

      // 滑块值
      sliderValue: 0,

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
  methods: {

    /* 绘制echarts图表 */
    drawChart() {
      // 定义颜色
      var fontColor = 'rgb(15, 200, 224)'
      var lineColor = '#CACACA'

      // moocX轴数据
      const dataX = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']

      // 1.初始化echarts
      var myChart = this.$echarts.init(document.querySelector('.stress_chart'))
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
        series: [{
          name: '2018',
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
          data: [1, 2, 3, 3, 5, 6, 5, 3, 6, 5, 5, 4]
        },
        {
          name: '2015',
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgba(255,80,124,1)',
              lineStyle: {
                color: 'rgba(255,80,124,1)',
                width: 1
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255,80,124,0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(255,80,124,0)'
                }])
              }
            }
          },
          data: [9, 5, 7, 8, 6, 7, 8, 7, 7, 6, 8, 6]
        }]
      }

      // 3.将配置项给实例
      myChart.setOption(option)
      // 4.让图表跟随屏幕自动的去适应
      const erd = elementResizeDetectorMaker()
      erd.listenTo(document.querySelector('.stress_chart'), element => {
        myChart.resize()
      })
    },

    /* 表行添加类名 */
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },

    /* 鼠标点击改变尺寸 */
    mouseResize(e) {
      const startX = e.clientX // 初始鼠标位置
      const left = document.querySelector('.three_d_model')
      const right = document.querySelector('.chart')
      const leftWidth = left.style.width // 初始左边宽度
      const rightWidth = right.style.width // 初始右边宽度

      // 鼠标按下移动事件
      document.onmousedown = function (e) {
        document.onmousemove = function (e) {
          const move = e.clientX - startX
          left.style.width = `calc(${leftWidth} + ${move}px)`
          right.style.width = `calc(${rightWidth} - ${move}px)`
        }
      }

      // 鼠标弹起取消事件
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmousedown = null
      }
    }

  },
  components: {
    TransForm,
    Stress
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.transform {
  height: 100%;

  .contain {
    display: flex;
    flex-direction: column;
    height: calc(100% - 118px);

    .three_d_model,
    .chart {
      height: calc(100% - 110px);
      background-color: var(--ContainBgColor);
      overflow: hidden;
    }

    .three_d_model {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;

      .bridge_stress_slider {
        position: absolute;
        bottom: 10%;
        left: center;
        width: 200px;
      }
    }

    .vsplitter {
      height: calc(100% - 110px);
      width: 14px;
      cursor: col-resize;
    }

    .chart {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .three_d_model_color {
        position: absolute;
        display: flex;
        left: center;
        top: 20px;
        background-image: linear-gradient(
          to right,
          #ff0000,
          #d8e703,
          #03e729,
          #03e7dc,
          #6200ff
        );

        .three_d_model_color_item {
          width: 40px;
          height: 20px;
          // border: 1px solid #fff;
          line-height: 20px;
          text-align: center;
          color: #000;
        }
      }
    }
  }
}
</style>
