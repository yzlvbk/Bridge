<template>
  <div class="homeThree">
    <div class="homeThree_header">郑州桥梁展示系统</div>
    <div class="homeThree_content">
      <img class="homeThree_content_img" src="../../assets/image/title.png" alt />

      <!-- 桥梁车辆统计模块 -->
      <div class="homeThree_vehicle">
        <!-- Echarts图表区域 -->
        <div class="homeThree_vehicle_chart"></div>
        <!-- 无缝滚动区域 -->
        <div class="homeThree_vehicle_form">
          <div class="homeThree_vehicle_form_title">
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
            class="seamless_scroll"
            :class-option="classOption"
            :style="'max-height: ' + seamlessMaxHeight"
          >
            <ul class="seamless_scroll_ul">
              <li
                class="seamless_scroll_ul_li"
                v-for="item in safetyLevelList"
                :key="item.BridgeId"
                :id="item.BridgeId"
              >
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
  reqBridgeSafetyLevel,
  reqAllBridgeSafetyScore,
  reqBridgeOneVehicalCount
} from '@/request/ZhShao/api.js'
export default {
  mounted() {
    // 获取初始化数据
    this.getInitData()

    // 延迟给滚动列表添加事件，否则会点击失效
    setTimeout(() => {
      const lis = document.querySelectorAll('.seamless_scroll_ul_li')
      lis.forEach(li => {
        li.addEventListener('click', this.togglePieChart(li.id), false)
      })
    }, 100)
  },

  data() {
    return {
      // 桥梁安全等级
      safetyLevelList: [],
      // 桥梁安全评分
      SafetyScoreList: [],

      // 车辆统计
      carNumStatistics: [],

      // 模拟5座桥车辆统计
      mockcarNumStatistics: {
        'BC-01': [{
          name: '自行车',
          value: 429
        }, {
          name: '小汽车',
          value: 617
        }, {
          name: '卡车',
          value: 6
        }, {
          name: '公交车',
          value: 34
        }],
        'BC-02': [{
          name: '自行车',
          value: 229
        }, {
          name: '小汽车',
          value: 317
        }, {
          name: '摩托车',
          value: 26
        }, {
          name: '公交车',
          value: 54
        }, {
          name: '卡车',
          value: 6
        }],
        'BC-03': [{
          name: '行人',
          value: 329
        }, {
          name: '小汽车',
          value: 417
        }, {
          name: '卡车',
          value: 26
        }, {
          name: '公交车',
          value: 74
        }],
        'BC-04': [{
          name: '电动车',
          value: 429
        }, {
          name: '小汽车',
          value: 817
        }, {
          name: '卡车',
          value: 60
        }, {
          name: '公交车',
          value: 134
        }],
        'BC-05': [{
          name: '自行车',
          value: 929
        }, {
          name: '小汽车',
          value: 617
        }, {
          name: '卡车',
          value: 106
        }, {
          name: '公交车',
          value: 340
        }]
      }
    }
  },
  computed: {
    // 第二屏无缝滚动最大高度
    seamlessMaxHeight() {
      return this.safetyLevelList.length * 45 + 'px'
    },

    classOption() {
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
    getInitData() {
      const promise1 = reqBridgeSafetyLevel() // 桥梁安全等级
      const promise2 = reqAllBridgeSafetyScore() // 桥梁安全评分
      const promise3 = reqBridgeOneVehicalCount('2020-08-16 00:00:00', '2020-08-17 00:00:00')

      Promise.all([promise1, promise2, promise3]).then((res) => {
        this.safetyLevelList = res[0].data
        this.SafetyScoreList = res[1].data
        this.carNumStatistics = res[2].data
        // 绘制echarts
        this.drawVehicleNum()
      })
    },

    // 绘制车辆统计图
    drawVehicleNum() {
      const seriseData = this.carNumStatistics
      // 1.初始化echarts
      const myChart = this.$echarts.init(document.querySelector('.homeThree_vehicle_chart'))

      // 2.配置option
      const option = {
        title: {
          text: '车辆统计',
          textStyle: {
            color: '#c0c3cd'
          },
          top: '20px',
          left: 'center'
        },
        legend: {
          top: '93%',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: 'rgba(255,255,255,.7)',
            fontSize: '14'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 注意颜色写的位置
        color: [
          '#006cff',
          '#60cda0',
          '#ed8884',
          '#ff9f7f',
          '#0096ff',
          '#9fe6b8',
          '#32c5e9',
          '#1d9dff'
        ],
        series: [{
          name: '车型统计',
          type: 'pie',
          // 如果radius是百分比则必须加引号
          radius: ['10%', '70%'],
          center: ['50%', '50%'],
          data: seriseData,
          // 修饰饼形图文字相关的样式 label对象
          label: {
            show: true,
            formatter: '{b}：{c}辆\n占比：{d}%',
            fontSize: 13
          },
          // 修饰引导线样式
          labelLine: {
            // 连接到图形的线长度
            length: 10,
            // 连接到文字的线长度
            length2: 12
          }
        }]
      }

      // 3.将配置项给实例
      myChart.setOption(option, true)

      // 4.跟随屏幕自适应
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },

    // 点击无缝滚动列表，切换饼图
    togglePieChart(BridgeName) {
      return () => {
        // 添加current类名，高亮显示
        document.querySelectorAll('.seamless_scroll_ul_li').forEach(li => li.classList.remove('current'))
        document.querySelectorAll('#' + BridgeName).forEach(li => li.classList.add('current'))

        // 重新绘制echarts
        this.carNumStatistics = this.mockcarNumStatistics[BridgeName]
        this.drawVehicleNum()
      }
    }
  },

  components: {
    vueSeamlessScroll
  },
  beforeDestroy() {
    const lis = document.querySelectorAll('.seamless_scroll_ul_li')
    lis.forEach(li => {
      li.removeEventListener('click', this.togglePieChart(li.id), false)
    })
  }
}
</script>

<style lang="less" scoped>
.homeThree {
  height: 100%;
  padding: 0 20px;
  background: url(../../assets/image/bg3.png) no-repeat;
  background-size: 100% 100%;

  .homeThree_header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    padding-top: 20px;
    margin-bottom: 35px;
    font-size: 24px;
  }

  .homeThree_title {
    text-indent: 35px;
    margin-top: 20px;
    font-size: 24px;
    height: 33px;
    line-height: 33px;
    margin-bottom: 25px;
  }

  .homeThree_content {
    position: relative;
    display: flex;
    justify-content: space-around;
    padding: 15px;
    height: calc(100% - 195px);
    border: 1px solid #081f5a;
    box-sizing: border-box;

    .homeThree_content_img {
      position: absolute;
      left: 70px;
      top: -13px;
      width: 269px;
      display: block;
    }

    .homeThree_vehicle {
      display: flex;
      flex-direction: column;
      flex-basis: 80%;
      margin-left: 20px;
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

      .homeThree_vehicle_chart {
        flex-basis: 60%;
        overflow: hidden;
      }

      .homeThree_vehicle_form {
        position: relative;
        flex-basis: 40%;
        margin-top: 20px;
        overflow: hidden;
        background-color: rgb(23, 45, 73);

        .homeThree_vehicle_form_title {
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
            z-index: 9999;
          }
        }

        .seamless_scroll {
          overflow: hidden;

          .seamless_scroll_ul {
            li {
              display: flex;
              justify-content: space-around;
              height: 45px;
              line-height: 45px;

              &:hover {
                cursor: pointer;
                background-color: rgb(4, 62, 117);
              }

              span {
                flex-basis: 20%;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
              }
            }
            .current {
              background-color: rgb(4, 62, 117);
            }
          }
        }
      }
    }
  }
}
</style>
