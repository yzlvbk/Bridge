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
  reqBridgeSafetyLevel,
  reqAllBridgeSafetyScore
} from '@/request/ZhShao/api.js'
export default {
  mounted () {
    // 获取初始化数据
    this.getInitData()
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
    }
  },
  methods: {
    // 请求初始化数据
    getInitData () {
      const promise1 = reqBridgeSafetyLevel() // 桥梁安全等级
      const promise2 = reqAllBridgeSafetyScore() // 桥梁安全评分

      Promise.all([promise1, promise2]).then((res) => {
        this.safetyLevelList = res[0].data
        this.SafetyScoreList = res[1].data
        // 绘制echarts
        this.drawVehicleNum()
      })
    },

    // 绘制车辆统计图
    drawVehicleNum () {
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
        series: [
          {
            name: '车型统计',
            type: 'pie',
            // 如果radius是百分比则必须加引号
            radius: ['10%', '70%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            data: [
              { value: 20, name: '卡车' },
              { value: 26, name: '轿车' },
              { value: 24, name: '挂车' },
              { value: 25, name: '拖车' },
              { value: 20, name: '农用车' },
              { value: 25, name: '大卡车' },
              { value: 30, name: '出租车' },
              { value: 42, name: '摩托车' }
            ],
            // 修饰饼形图文字相关的样式 label对象
            label: {
              fontSize: 13
            },
            // 修饰引导线样式
            labelLine: {
              // 连接到图形的线长度
              length: 10,
              // 连接到文字的线长度
              length2: 12
            }
          }
        ]
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
.homeThree {
  height: 100%;
  padding: 0 20px;
  background: url(../../assets/image/bg3.png) no-repeat;
  // background-color: rgb(17, 30, 58);
  background-size: 100% 100%;

  .homeThree_header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    padding-top: 20px;
    margin-bottom: 35px;
    font-size: 24px;
    color: #fff;
  }

  .homeThree_title {
    text-indent: 35px;
    margin-top: 20px;
    color: #fff;
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
      background: linear-gradient(to left, #003BCF, #003BCF) left top no-repeat, linear-gradient(to bottom, #003BCF, #003BCF) left top no-repeat, linear-gradient(to left, #003BCF, #003BCF) right top no-repeat, linear-gradient(to bottom, #003BCF, #003BCF) right top no-repeat, linear-gradient(to left, #003BCF, #003BCF) left bottom no-repeat, linear-gradient(to bottom, #003BCF, #003BCF) left bottom no-repeat, linear-gradient(to left, #003BCF, #003BCF) right bottom no-repeat, linear-gradient(to left, #003BCF, #003BCF) right bottom no-repeat;
      background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px;
      background-color: #0B0F2A;

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
