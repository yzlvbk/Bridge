<template>
  <div class="traffic">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>车流分析</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <!-- 监控图片区域 -->
      <div class="three_d_model" style="width: 60%;">
        <div class="showImg">
          <img :src="currentImg" />
        </div>

        <swiper class="swiper" :options="swiperOption" ref="mySwiper">
          <swiperSlide v-for="(item, index) in imgList" :key="index">
            <img class="swiper_img" :src="item" @click="handle(item)" width="100%" />
          </swiperSlide>
        </swiper>
      </div>

      <!-- 空隙模块 -- 控制模块拖动 -->
      <div class="vsplitter" ref="vsplitter"></div>

      <!-- 车型统计区域 -->
      <div class="chart" style="width: 40%;">
        <!-- 设置按钮 -->
        <TrafficSetting class="traffic_setting" @redrawChart="redrawChart" />
        <!-- Echarts图表区域 -->
        <div class="traffic_chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import TrafficSetting from '@/components/ZhenShao/trafficSetting/TrafficSetting'
import 'swiper/dist/css/swiper.css'
import {
  reqBridgeOneTrafficPic,
  reqBridgeOneTrafficCountDay,
  reqBridgeOneTrafficCountWeek,
  reqBridgeOneTrafficCountMonth
} from '@/request/ZhShao/api.js'
export default {
  async activated() {
    // 获取车流图片数据
    this.getTrafficImg(0)
    this.timer = setInterval(this.getTrafficImg, 5000)

    /* 添加移动内容区域窗口大小事件 */
    // const div = document.querySelector('.vsplitter')
    // div.addEventListener('mousedown', this.mouseResize)
    this.drawTrafficChart()
  },
  data() {
    return {
      timer: '',
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 10,
        freeMode: true,
        grabCursor: true // 鼠标放在照片上变成手形
      },

      imgList: [], // 照片数组

      currentImg: '', // 当前展示的照片
      reqImgId: 0, // 请求图片Id

      // 车型统计图数据资源
      trafficChartSource: {
        data: [],
        indicator: []
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    /* 请求车流图片 */
    async getTrafficImg() {
      const data = await reqBridgeOneTrafficPic(this.reqImgId)
      if (this.reqImgId === 0) {
        this.reqImgId = data.data[0].Id - 5
        this.getTrafficImg()
        return
      }
      if (data.data.length === 0) return
      this.currentImg = 'data:image/png;base64,' + data.data[0].Base64Data
      // 当图片大于20张时，从头部开始删除
      this.imgList.length >= 20 && this.imgList.shift()
      this.imgList.push(this.currentImg)
      this.reqImgId++
      this.swiper.slideNext()
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
    },
    /* 点击轮播图片 */
    handle(img) {
      this.currentImg = img
    },

    /* 绘制车型统计图 */
    drawTrafficChart(type) {
      // 1.初始化echarts
      const myChart = this.$echarts.init(document.querySelector('.traffic_chart'))

      // 车型数量
      const source = this.trafficChartSource

      const buildSeries = function (data) {
        const helper = data.map((item, index) => {
          const arr = new Array(data.length)
          arr.splice(index, 1, item)
          return arr
        })

        return [data, ...helper].map((item, index) => {
          return {
            type: 'radar',
            itemStyle: {
              color: '#31e586'
            },
            lineStyle: {
              color: index === 0 ? '#31e586' : 'transparent'
            },
            areaStyle: {
              color: index === 0 ? '#31e586' : 'transparent',
              opacity: 0.3
            },
            label: {
              show: index !== 0
            },
            tooltip: {
              show: index !== 0,
              formatter: function () {
                return source.indicator[index - 1].name + '：' + source.data[index - 1] + '辆'
              }
            },
            z: index === 0 ? 1 : 2,
            data: [item]
          }
        })
      }

      // 2.配置option
      const option = {
        // backgroundColor: '#080b30',
        title: {
          text: `车型${type}图`,
          textStyle: {
            color: '#fff'
          },
          top: '10px',
          left: 'center'
        },
        tooltip: {},
        radar: {
          // shape: 'circle',
          center: ['50%', '55%'],
          radius: '60%',
          name: {
            textStyle: {
              fontSize: 16,
              color: ['#d1dbf2'],
              padding: [3, 5]
            }
          },
          splitNumber: 4,
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(12,62,129,0)', 'rgba(12,62,129,0.3)', 'rgba(12,62,129,0)', 'rgba(12,62,129,0.3)']
            }
          },
          splitLine: {
            lineStyle: {
              color: '#0c3e81'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#0c3e81'
            }
          },
          indicator: source.indicator
        },
        series: buildSeries(source.data)
      }

      // 3.将配置项给实例
      myChart.setOption(option, true)

      // 4.跟随屏幕自适应
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },

    /* 重新绘制车型统计图 */
    async redrawChart(type, endTime) {
      let data
      if (type === '日统计') {
        data = await reqBridgeOneTrafficCountDay(endTime)
      } else if (type === '周统计') {
        data = await reqBridgeOneTrafficCountWeek(endTime)
      } else if (type === '月统计') {
        data = await reqBridgeOneTrafficCountMonth(endTime)
      }

      /*
      配置样例
       trafficChartSource: {
        data: [430, 100, 280, 350, 500, 190, 130],
        indicator: [
          { name: '自行车', max: 500 },
          { name: '汽车', max: 500 },
          { name: '卡车', max: 500 },
          { name: '公交车', max: 500 },
          { name: '摩托车', max: 500 },
          { name: '行人', max: 500 },
          { name: '电动车', max: 500 }
        ]
      }
      */

      if (data.data.length === 0) return this.$message.error('请求数据失败')
      this.trafficChartSource.data = []
      this.trafficChartSource.indicator = []
      data.data.forEach(item => {
        this.trafficChartSource.data.push(item.value)
      })
      // 找出最大数量
      const dataMax = Math.max(...this.trafficChartSource.data)
      data.data.forEach(item => {
        this.trafficChartSource.indicator.push({ name: item.name, max: dataMax })
      })

      this.drawTrafficChart(type)
    }
  },
  components: {
    swiper,
    swiperSlide,
    TrafficSetting
  },
  deactivated() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
@import '../../../assets/css/reset.css';
.traffic {
  height: 100%;

  .contain {
    display: flex;
    height: calc(100% - 8px);

    .three_d_model,
    .chart {
      height: calc(100% - 110px);
      background-color: var(--ContainBgColor);
      overflow: hidden;
    }

    .three_d_model {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .showImg {
        width: 380px;
        height: 380px;
        margin-bottom: 40px;

        img {
          width: 100%;
          height: 100%;
          background-color: transparent;
          transform: rotate(0deg);
        }
      }
    }

    .chart {
      position: relative;

      .traffic_setting {
        top: 6px;
        right: 18px;
      }

      .traffic_chart {
        width: 100%;
        height: 100%;
      }
    }

    .vsplitter {
      height: calc(100% - 110px);
      width: 14px;
      cursor: col-resize;
    }
  }
}

/* swiper */
.swiper {
  height: 100px;
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 14px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .swiper_img {
    transform: rotate(0deg);
  }
}
</style>
