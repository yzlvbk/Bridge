<template>
  <div class="homeTwo">
    <div class="homeTwo_header">郑州桥梁展示系统</div>
    <div class="homeTwo_content">
      <img class="homeTwo_content_img" src="../../assets/image/title.png" alt />

      <!-- 桥梁安全级别统计模块 -->
      <div class="homeTwo_safety">
        <!-- Echarts图表区域 -->
        <div class="homeTwo_safety_chart"></div>
        <!-- 无缝滚动区域 -->
        <div class="homeTwo_safety_form">
          <div class="homeTwo_safety_form_title">
            <ul>
              <li>编号</li>
              <li>名称</li>
              <li>类型</li>
              <li>健康分值</li>
              <li>安全级别</li>
            </ul>
          </div>
          <vue-seamless-scroll
            :data="safetyLevelList"
            :class-option="classOption"
            class="seamless_scroll"
            :style="'max-height: ' + seamlessMaxHeight"
          >
            <ul class="seamless_scroll_ul">
              <li v-for="item in safetyLevelList" :key="item.BridgeId">
                <span v-text="item.BridgeId"></span>
                <span v-text="item.BridgeName"></span>
                <span v-text="item.BridgeType"></span>
                <span v-text="item.HealthScore"></span>
                <span v-text="item.SafetyLevel"></span>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入表格无缝滚动插件
import vueSeamlessScroll from 'vue-seamless-scroll'
import {
  reqBridgeSafetyLevel
} from '@/request/ZhShao/api.js'
export default {
  mounted () {
    // 获取初始化数据
    this.getInitData()
    console.log('Home Two')
  },

  data () {
    return {
      // 桥梁安全等级
      safetyLevelList: [],
      // 桥梁安全评分
      SafetyScoreList: []
    }
  },
  computed: {
    // 第二屏无缝滚动最大高度
    seamlessMaxHeight () {
      return this.safetyLevelList.length * 45 + 'px'
    },

    classOption () {
      return {
        step: 0.5 // 数值越大速度滚动越快
        // limitMoveNum: 3 // 开始无缝滚动的数据量 this.dataList.length
        // hoverStop: true, // 是否开启鼠标悬停stop
        // direction: 0, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        // singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        // singleHeight: 20, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        // waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  methods: {
    // 请求初始化数据
    async getInitData () {
      const data = await reqBridgeSafetyLevel() // 桥梁安全等级
      this.safetyLevelList = data.data
      // 绘制echarts
      this.drawSafetyLevel()
    },

    // 绘制安全统计级别
    drawSafetyLevel () {
      // 不同等级不同颜色
      const colorArr = {
        safety: ['#67c23a', '#cccccc'],
        warning: ['#e6a23c', '#cccccc'],
        danger: ['#f56c6c', '#cccccc']
      }
      // 保存数据
      const data = this.safetyLevelList
      // X轴数据
      const dataX = []
      const dataY = []
      data.forEach((item) => {
        dataX.push(item.BridgeName)
        dataY.push(item.SafetyLevel)
      })
      const series = []

      series.push({
        data: dataY,
        type: 'bar',
        barMaxWidth: 'auto',
        barWidth: 30,
        itemStyle: {
          normal: {
            color: (params) => {
              let colorTop = ''
              let colorBottom = ''
              if (params.data < 6) {
                colorTop = colorArr.danger[0]
                colorBottom = colorArr.danger[1]
              } else if (params.data > 8) {
                colorTop = colorArr.safety[0]
                colorBottom = colorArr.safety[1]
              } else {
                colorTop = colorArr.warning[0]
                colorBottom = colorArr.warning[1]
              }
              return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: colorTop // 0% 处的颜色
              }, { // 可根据具体情况决定哪根柱子显示哪种颜色
                offset: 1,
                color: colorBottom // 100% 处的颜色
              }], false)
            }
          }
        },
        label: {
          show: true,
          position: 'top',
          distance: 10,
          color: '#fff'
        }
      })

      // 1.初始化echarts
      const myChart = this.$echarts.init(document.querySelector('.homeTwo_safety_chart'))

      // 2.配置option
      const option = {
        // backgroundColor: '#031245',
        title: {
          text: '桥梁安全级别统计',
          textStyle: {
            color: '#c0c3cd'
          },
          top: '20px',
          left: 'center'
        },
        textStyle: {
          color: '#c0c3cd',
          fontSize: 14
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              backgroundColor: '#031245'
            },
            restore: {}
          },
          iconStyle: {
            borderColor: '#c0c3cd'
          }
        },
        legend: {
          top: 10,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          left: 'center',
          padding: 0,
          textStyle: {
            color: '#c0c3cd',
            fontSize: 14,
            padding: [2, 0, 0, 0]
          }
        },
        grid: {
          containLabel: true,
          left: 20,
          right: 20,
          bottom: 10,
          top: 40
        },
        xAxis: {
          nameTextStyle: {
            color: '#c0c3cd',
            padding: [0, 0, -10, 0],
            fontSize: 14
          },
          axisLabel: {
            color: '#c0c3cd',
            fontSize: 14,
            interval: 0
          },
          axisTick: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          data: dataX,
          type: 'category'
        },
        yAxis: {
          nameTextStyle: {
            color: '#c0c3cd',
            padding: [0, 0, -10, 0],
            fontSize: 14
          },
          axisLabel: {
            color: '#c0c3cd',
            fontSize: 14
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#384267',
              width: 1
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#384267'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          name: ''
        },
        series,
        tooltip: {
          trigger: 'axis',
          show: false
        }
      }

      // 3.将配置项给实例
      myChart.setOption(option)

      // 4.跟随屏幕自适应
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }

  },

  components: {
    vueSeamlessScroll
  }
}
</script>

<style lang="less" scoped>
.homeTwo {
  height: 100%;
  padding: 0 20px;
  background: url(../../assets/image/bg3.png) no-repeat;
  // background-color: rgb(17, 30, 58);
  background-size: 100% 100%;

  .homeTwo_header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    padding-top: 20px;
    margin-bottom: 35px;
    font-size: 24px;
    color: #fff;
  }

  .homeTwo_content {
    position: relative;
    display: flex;
    justify-content: space-around;
    padding: 15px;
    height: calc(100% - 195px);
    border: 1px solid #081f5a;
    box-sizing: border-box;

    .homeTwo_content_img {
      position: absolute;
      left: 70px;
      top: -13px;
      width: 269px;
      display: block;
    }

    .homeTwo_safety {
      display: flex;
      flex-direction: column;
      flex-basis: 80%;
      margin-right: 20px;
      background: linear-gradient(to left, #003bcf, #003bcf) left top no-repeat,
        linear-gradient(to bottom, #003bcf, #003bcf) left top no-repeat,
        linear-gradient(to left, #003bcf, #003bcf) right top no-repeat,
        linear-gradient(to bottom, #003bcf, #003bcf) right top no-repeat,
        linear-gradient(to left, #003bcf, #003bcf) left bottom no-repeat,
        linear-gradient(to bottom, #003bcf, #003bcf) left bottom no-repeat,
        linear-gradient(to left, #003bcf, #003bcf) right bottom no-repeat,
        linear-gradient(to left, #003bcf, #003bcf) right bottom no-repeat;
      background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px;
      background-color: #0b0f2a;

      .homeTwo_safety_chart {
        flex-basis: 60%;
        overflow: hidden;
      }

      .homeTwo_safety_form {
        position: relative;
        flex-basis: 40%;
        margin-top: 20px;
        overflow: hidden;
        background-color: rgb(23, 45, 73);

        .homeTwo_safety_form_title {
          height: 50px;
          background-color: rgb(4, 62, 117);

          ul {
            display: flex;
            height: 100%;
            align-items: center;
          }
          li {
            flex-basis: 20%;
            text-align: center;
            font-size: 14px;
          }
        }

        .seamless_scroll {
          overflow: hidden;

          .seamless_scroll_ul {
            li {
              display: flex;
              justify-content: space-around;
              height: 45px;

              span {
                flex-basis: 20%;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
