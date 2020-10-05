<template>
  <div class="monitor">
    <!-- 安全等级评分 -->
    <!-- <div class="ranking">安全等级评分:<i :class="safetyLevelClass">{{totalScore}}</i></div> -->

    <!-- 构件安全级别 -->
    <div class="component">
      <div class="component-title">构件安全级别</div>
      <div class="component-table">
        <el-table
          :data="memberSafetyLevelData"
          stripe
          :row-class-name="tableRowClassName"
          @row-click="tableRowClick"
          style="width: 100%; border: none;"
          :row-style="{ height: '60px' }"
        >
          <el-table-column prop="MemberId" align="center" label="编号"></el-table-column>
          <el-table-column prop="MemberName" align="center" label="名称"></el-table-column>
          <el-table-column prop="SafetyLevel" align="center" label="安全级别"></el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 车辆称重 -->
    <div class="weight">
      <div class="weight_num" :class="lastestWeightClass">
        当前载重:
        <br />
        {{lastestWeight}} t
      </div>
      <div class="weight_chart"></div>
    </div>
  </div>
</template>

<script>
/* 监听div宽高变化 */
import elementResizeDetectorMaker from 'element-resize-detector'
import {
  reqBridgeOneGetMemberSafetyLevel,
  reqBridgeOneVehicalWeight
} from '@/request/ZhShao/api.js'
export default {
  name: 'ZhShaoMonitor',
  async mounted() {
    // 获取桥梁系统1-构件安全级别数据
    this.getMemberSafetyLevel()
    // 获取桥梁系统1-车辆载重时序图数据
    await this.getVehicalWeight()

    // 绘制车辆载重时序图数据 --- 获取数据为异步，设置定时器，获取之后绘制
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
      /* 桥梁总体安全等级评分 */
      totalScore: 0,
      /* 构件安全级别数据 */
      memberSafetyLevelData: [],
      /* 车辆载重实时数据 */
      vehicalTime: [],
      vehicalWeight: [],
      lastestWeight: '', // 当前最新车重
      // 请求实时载重定时器
      timer: null
    }
  },
  methods: {
    /* 请求桥梁系统1-构件安全级别数据 */
    async getMemberSafetyLevel() {
      const data = await reqBridgeOneGetMemberSafetyLevel()
      // 请求数据成功
      if (data.statusCode === 200) {
        // totalScore: 每个构建等级之和
        let totalScore = 0
        data.data.forEach((item) => {
          totalScore += item.SafetyLevel
        })
        this.totalScore = Math.floor(totalScore / data.data.length * 10)
        this.memberSafetyLevelData = data.data
      }
    },

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

        // 计算最新车重
        const arry = []
        for (let i = (this.vehicalWeight.length - 1); i >= 0; i--) {
          // 从后往前寻找不为0的最新值
          if (this.vehicalWeight[i] !== 0) {
            // 从不为0的值开始找，将这一组的放入数组，然后筛选最大值
            for (let j = i; j >= 0; j--) {
              if (this.vehicalWeight[j] !== 0) {
                arry.push(this.vehicalWeight[j])
              } else {
                this.lastestWeight = Math.max(...arry).toFixed(2)
                return
              }
            }
          }
        }
        // 如果都为0，则最新载重为0
        this.lastestWeight = 0
      }
    },

    /* 表行添加类名 */
    tableRowClassName({
      row,
      rowIndex
    }) {
      // 安全等级评分颜色 <6 为红色， 6~8 为黄色，>8 为绿色
      if (row.SafetyLevel < 6) {
        return 'danger'
      } else if (row.SafetyLevel > 8) {
        return 'safety'
      } else {
        return 'warning'
      }
    },

    /* 表格某一行被点击 */
    tableRowClick(row) {
      this.$bus.$emit('tableRowClick', row.MemberId)
      console.log(row.MemberId)
    },

    /* 绘制车辆载重图 */
    drawWeightChart() {
      // 定义颜色
      const fontColor = 'rgb(15, 200, 224)'
      const lineColor = '#CACACA'

      // 1.初始化echarts
      const myChart = this.$echarts.init(document.querySelector('.weight_chart'))

      // 2.配置option
      const option = {
        color: ['rgb(15,200,224)'], // 线条颜色
        title: {
          text: '车辆实时载重',
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
      const erd = elementResizeDetectorMaker()
      erd.listenTo(document.querySelector('.weight'), element => {
        myChart.resize()
      })
    }
  },
  computed: {
    // 总体安全等级评分动态class
    safetyLevelClass() {
      // 安全等级评分颜色 <60 为红色， 60~80 为黄色，>80 为绿色
      if (this.totalScore < 60) {
        return 'danger'
      } else if (this.totalScore > 80) {
        return 'safety'
      } else {
        return 'warning'
      }
    },

    // 最新车辆载重动态class
    lastestWeightClass() {
      // 最新车辆载重颜色 <20 为绿色， 20 - 50 为黄色，>50 为绿色
      if (Number(this.lastestWeight) < 20) {
        return 'safety'
      } else if (Number(this.lastestWeight) < 50) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/css/reset.css';

.monitor {
  display: flex;
  // flex-direction: column;
  height: 100%;

  .ranking {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    flex-basis: 10%;
    border-bottom: 10px solid var(--BgColor);

    i {
      margin-left: 10px;
      font-size: 40px;
    }
  }

  .component {
    display: flex;
    flex-direction: column;
    position: relative;
    flex-basis: 50%;
    border-right: 10px solid var(--BgColor);

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

  .weight {
    position: relative;
    flex-basis: 50%;

    .weight_num {
      position: absolute;
      right: 10px;
      top: 13px;
      font-size: 15px;
    }

    .weight_chart {
      width: 100%;
      height: 100%;
    }
  }
}

/* 设置el-table高度响应式 */
.monitor .el-table {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: auto !important;
}

/* 修改字体颜色 */
.monitor .el-table .success-row {
  color: red !important;
}
</style>
