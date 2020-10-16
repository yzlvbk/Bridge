<template>
  <div class="stress">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>结构反应</el-breadcrumb-item>
      <el-breadcrumb-item>应力/内力</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <div class="chart" style="width: 50%;">
        <!-- echarts图 -->
        <div class="stress_chart">
          <img :src="stressPictureSrc" alt />

          <!-- 颜色差值区域 -->
          <div class="stress_chart_color">
            <span class="stress_chart_color_item">{{ 0 }}</span>
            <span
              class="stress_chart_color_item"
            >{{currentWeight !== 0 ? (-1 * (30 / currentWeight)).toFixed(1) : -1}}</span>
            <span
              class="stress_chart_color_item"
            >{{currentWeight !== 0 ? (-2 * (30 / currentWeight)).toFixed(1) : -2}}</span>
            <span
              class="stress_chart_color_item"
            >{{currentWeight !== 0 ? (-3 * (30 / currentWeight)).toFixed(1) : -3}}</span>
            <span
              class="stress_chart_color_item"
            >{{currentWeight !== 0 ? (-4 * (30 / currentWeight)).toFixed(1) : -4}}</span>
            <span
              class="stress_chart_color_item"
            >{{currentWeight !== 0 ? (-5 * (30 / currentWeight)).toFixed(1) : -5}}</span>
          </div>
        </div>

        <!-- 车辆载重时序图 -->
        <div class="stress_data">
          <div class="weight_chart"></div>
        </div>
      </div>

      <!-- 空隙模块 -- 控制模块拖动 -->
      <div class="vsplitter" ref="vsplitter"></div>

      <div class="three_d_model" style="width: 50%;">
        <!-- 应力部分视图 -->
        <div class="three_d_model_item_top">
          <!-- 下拉框 -->
          <div class="select">
            <el-select v-model="selectElement1Value">
              <el-option
                v-for="item in element1Options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <img :src="element1PictureSrc" alt />
        </div>
        <div class="three_d_model_item_bottom">
          <!-- 下拉框 -->
          <div class="select">
            <el-select v-model="selectElement2Value">
              <el-option
                v-for="item in element2Options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <img :src="element2PictureSrc" alt />
        </div>

        <!-- 颜色差值区域 -->
        <!-- <div class="three_d_model_color">
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
        <Stress />-->
      </div>
    </div>
  </div>
</template>

<script>
/* 监听图表div宽高变化 */
// import Stress from '@/components/ZhenShao/stress/Stress'
import {
  reqBridgeOneVehicalWeight
} from '@/request/ZhShao/api.js'
export default {
  async mounted() {
    /* 获取canvas的宽高 */
    const wrapDiv = document.querySelector('.three_d_model')
    this.canvasWidth = window.getComputedStyle(wrapDiv, null).getPropertyValue('width')
    this.canvasHeight = window.getComputedStyle(wrapDiv, null).getPropertyValue('height')

    // 获取桥梁系统1-车辆载重时序图数据
    await this.getVehicalWeight()
    // 绘制车辆载重时序图数据
    this.drawWeightChart()
  },
  activated() {
    // 每隔5s请求一次实时车辆载重数据
    this.timer = setInterval(async () => {
      await this.getVehicalWeight()
      this.drawWeightChart()
    }, 5000)
  },
  deactivated() {
    // 清除定时器
    clearInterval(this.timer)
  },
  data() {
    return {
      canvasWidth: '', // 应力图宽度
      canvasHeight: '', // 应力图高度度

      stressPictureSrc: 'ZhenShao/arch/new_animation_1.png', // 应力图片路径
      element1PictureSrc: 'ZhenShao/element/东侧桥面板/东侧桥面板_1.png',
      element2PictureSrc: 'ZhenShao/element/西侧拱圈/西侧拱圈_1.png',

      selectElement1Value: '东侧桥面板',
      /* 下拉框配置项 */
      element1Options:
        [{
          value: '东侧桥面板',
          label: '东侧桥面板'
        }, {
          value: '东侧拱圈',
          label: '东侧拱圈'
        }, {
          value: '东侧立柱1',
          label: '东侧立柱1'
        }, {
          value: '东侧立柱2',
          label: '东侧立柱2'
        }, {
          value: '东侧立柱3',
          label: '东侧立柱3'
        }, {
          value: '东侧立柱4',
          label: '东侧立柱4'
        }, {
          value: '跨中',
          label: '跨中'
        }],
      selectElement2Value: '西侧拱圈',
      /* 下拉框配置项 */
      element2Options: [
        {
          value: '西侧桥面板',
          label: '西侧桥面板'
        }, {
          value: '西侧拱圈',
          label: '西侧拱圈'
        }, {
          value: '西侧立柱1',
          label: '西侧立柱1'
        }, {
          value: '西侧立柱2',
          label: '西侧立柱2'
        }, {
          value: '西侧立柱3',
          label: '西侧立柱3'
        }, {
          value: '西侧立柱4',
          label: '西侧立柱4'
        }
      ],
      currentNum: 1,

      /* 车辆载重实时数据 */
      vehicalTime: [],
      vehicalWeight: [],

      // 请求实时载重定时器
      timer: null,

      isPlayStressAnimation: false,
      currentWeight: 0
    }
  },
  methods: {
    /* 请求桥梁系统1-车辆载重时序图数据 */
    async getVehicalWeight() {
      const data = await reqBridgeOneVehicalWeight()
      // 请求数据成功
      if (data.statusCode === 200) {
        // 重置上次数据
        this.vehicalTime = []
        this.vehicalWeight = []
        data.data.forEach((item) => {
          this.vehicalTime.push(item.Time.split('T')[1])
          this.vehicalWeight.push(item.Weight)
        })

        if (!this.isPlayStressAnimation) {
          // 车重数据是否不为0
          if (this.vehicalWeight.some(item => item !== 0)) {
            // 开启应力动画
            console.log(this.vehicalWeight.some(item => item !== 0))
            console.log(parseInt(Math.max(...this.vehicalWeight)))
            this.currentWeight = parseInt(Math.max(...this.vehicalWeight))
            this.playStressAnimation()
          }
        }
      }
    },

    /* 绘制车辆载重图 */
    drawWeightChart() {
      // 定义颜色
      const fontColor = 'rgb(0,0,0)'
      const lineColor = '#000'

      // 1.初始化echarts
      const myChart = this.$echarts.init(document.querySelector('.weight_chart'))

      // 2.配置option
      const option = {
        color: ['rgb(0,0,0)'], // 线条颜色
        title: {
          text: '车辆实时载重',
          textStyle: {
            color: '#000',
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
              show: false
            },
            saveAsImage: {
              show: false
            }
          },
          iconStyle: {
            borderColor: lineColor
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 坐标轴两边留白
          data: this.vehicalTime,
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
          name: '载重(t)',
          nameTextStyle: {
            color: lineColor
          },
          max: 70,
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
          name: '车辆实时载重',
          type: 'line',
          symbol: 'emptyCircle', // 标记形状
          lineStyle: {
            width: 1
          },
          data: this.vehicalWeight
        }]
      }

      // 3.将配置项给实例
      myChart.setOption(option)

      // 4.让图表跟随屏幕自动的去适应
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },

    /* 播放应变动画 */
    playStressAnimation() {
      // 激活动画状态
      this.isPlayStressAnimation = true
      const timer = setInterval(() => {
        this.stressPictureSrc = `ZhenShao/arch/new_animation_${this.currentNum}.png`
        this.element1PictureSrc = `ZhenShao/element/${this.selectElement1Value}/${this.selectElement1Value}_${this.currentNum}.png`
        this.element2PictureSrc = `ZhenShao/element/${this.selectElement2Value}/${this.selectElement2Value}_${this.currentNum}.png`
        this.currentNum += 1
        // console.log(this.currentNum)
        if (this.currentNum === 53) {
          // 清除定时器，关闭动画状态
          clearInterval(timer)
          this.currentNum = 1
          this.isPlayStressAnimation = false
        }
      }, 1200)
    }
  },
  components: {
    // Stress
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.stress {
  height: 100%;

  .contain {
    display: flex;
    height: calc(100% - 8px);

    .three_d_model,
    .chart {
      height: calc(100% - 110px);
      overflow: hidden;
    }

    .three_d_model {
      position: relative;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      // align-items: center;

      .three_d_model_item_top {
        position: relative;
        height: calc(50% - 5px);
        margin-bottom: 5px;
        background-color: #fff;
        text-align: center;

        .select {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 120px;
        }

        img {
          height: 100%;
        }
      }
      .three_d_model_item_bottom {
        position: relative;
        height: calc(50% - 5px);
        margin-top: 5px;
        background-color: #fff;
        text-align: center;

        .select {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 120px;
        }

        img {
          height: 100%;
        }
      }

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
        }
      }
    }

    .vsplitter {
      height: calc(100% - 110px);
      width: 14px;
      cursor: col-resize;
    }

    .chart {
      display: flex;
      flex-direction: column;
      background-color: #fff;

      .stress_chart {
        position: relative;
        flex-basis: 50%;
        border-bottom: 5px solid var(--BgColor);
        overflow: hidden;
        text-align: center;

        img {
          height: 100%;
        }

        .stress_chart_color {
          position: absolute;
          display: flex;
          height: 80%;
          flex-direction: column;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          background-image: linear-gradient(
            rgb(0, 0, 255),
            rgb(0, 255, 255),
            rgb(0, 255, 0),
            rgb(255, 255, 0),
            rgb(255, 0, 0)
          );

          .stress_chart_color_item {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            flex-basis: 16.7%;
            width: 25px;
            color: #333;
          }

          &::after {
            content: '×10^(-4)';
            position: absolute;
            bottom: -20px;
            right: -40px;
            color: #333;
          }
        }
      }

      .stress_data {
        display: flex;
        flex-direction: column;
        position: relative;
        flex-basis: 50%;
        border-top: 5px solid var(--BgColor);

        .weight_chart {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
