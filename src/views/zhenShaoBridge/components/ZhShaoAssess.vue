<template>
  <div class="assess">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>车载评估</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <div class="asseee_chart" style="width: 60%;">
        <div class="asseee_chart_top">
          <canvas class="asseee_chart_top_canvas"></canvas>
        </div>
        <div class="asseee_chart_bottom">
          <!-- 添加轴距/轴重 -->
          <div class="asseee_chart_bottom_add">
            <div class="asseee_chart_bottom_add_item">
              <el-input type="number" v-model.trim="distanceValue" placeholder="请输入轴距"></el-input>
            </div>
            <div class="asseee_chart_bottom_add_item">
              <el-input type="number" v-model.trim="weightValue" placeholder="请输入轴重"></el-input>
            </div>
            <div class="asseee_chart_bottom_add_item">
              <el-button v-if="!edit.status" type="primary" size="small" @click="addWheel">添加</el-button>
              <el-button v-else type="info" size="small" @click="editWheel">修改</el-button>
            </div>
          </div>

          <!-- 轴距/轴重表格 -->
          <div class="asseee_chart_bottom_table_warp">
            <table class="asseee_chart_bottom_table">
            <thead>
              <tr>
                <th></th>
                <th>轴距(m)</th>
                <th>轴重(KN)</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in wheelList" :key="index">
                <td>{{index + 1}}</td>
                <td>{{item.distance}}</td>
                <td>{{item.weight}}</td>
                <td>
                  <el-button size="mini" type="info" @click="editWheelItem(index)">修改</el-button>
                  <el-button  size="mini" type="warning" @click="deleteWheelItem(index)">删除</el-button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>

        </div>
      </div>

      <!-- 空隙模块 -- 控制模块拖动 -->
      <div class="vsplitter" ref="vsplitter"></div>

      <div class="assess_result" style="width: 40%;"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    /* 获取canvas的宽高 */
    const wrapDiv = document.querySelector('.asseee_chart_top')
    this.width = window.getComputedStyle(wrapDiv, null).getPropertyValue('width')
    this.height = window.getComputedStyle(wrapDiv, null).getPropertyValue('height')
    console.log(this.width)
    this.drawDistanceChart()
  },
  data () {
    return {
      width: '',
      height: '',
      // 是否修改状态
      edit: {
        status: false,
        index: null
      },

      // 车轮数组
      wheelList: [
        { distance: 0, weight: '' }
      ],

      // 轴距输入值
      distanceValue: '',

      // 轴重输入值
      weightValue: ''
    }
  },

  methods: {
    // 添加轴重和轴距
    addWheel () {
      if (!this.distanceValue || !this.weightValue) return this.$message.warning('请输入轴重和轴距')

      this.wheelList.push({ distance: this.distanceValue, weight: this.weightValue })
      this.distanceValue = ''
      this.weightValue = ''
    },

    // 修改轴重和轴距
    editWheelItem (index) {
      this.distanceValue = this.wheelList[index].distance
      this.weightValue = this.wheelList[index].weight
      this.edit.status = true
      this.edit.index = index
    },

    // 点击修改按钮，完成修改
    editWheel () {
      if (!this.distanceValue || !this.weightValue) return this.$message.warning('请输入轴重和轴距')
      this.wheelList[this.edit.index].distance = this.distanceValue
      this.wheelList[this.edit.index].weight = this.weightValue

      this.distanceValue = ''
      this.weightValue = ''
      this.edit.status = false
      this.edit.index = null
    },

    // 删除轴重和轴距
    deleteWheelItem (index) {
      this.wheelList.splice(index, 1)
      this.distanceValue = ''
      this.weightValue = ''
      this.edit.status = false
      this.edit.index = null
    },

    // 绘制轴重和轴距图
    drawDistanceChart () {
      const canvas = document.querySelector('.asseee_chart_top_canvas')

      var ctx = canvas.getContext('2d')
      canvas.width = parseInt(this.width) // 设置标签的属性宽高
      canvas.height = parseInt(this.height) // 千万不要用 canvas.style.height
      // canvas.style.border = '1px solid #000';

      /* 将原点位移画布中心 */
      ctx.translate(80, canvas.height / 2 + 50)

      this.wheelList.forEach((item, index) => {
        if (index === 0) {
          drawLine(0, item.distance)
          drawWheel(0, item.distance, item.weight)
        } else {
          // eslint-disable-next-line no-unused-vars
          let sum = 0
          for (let i = 0; i < index; i++) {
            sum += Number(this.wheelList[i].distance)
          }

          drawLine(sum, Number(item.distance) + sum)
          drawWheel(sum, Number(item.distance) + sum, item.weight)
        }
      })

      // 绘制距离
      function drawLine (start, end) {
      /* 开始路径规划 */

        ctx.moveTo(start, 0)
        ctx.lineTo(end, 0)

        // 绘制箭头
        ctx.moveTo(start, 0)
        ctx.lineTo(start + 5, 5)
        ctx.moveTo(start, 0)
        ctx.lineTo(start + 5, -5)

        ctx.moveTo(end, 0)
        ctx.lineTo(end - 5, 5)
        ctx.moveTo(end, 0)
        ctx.lineTo(end - 5, -5)

        // 绘制竖线分割
        if (start === 0) {
          ctx.moveTo(start, 10)
          ctx.lineTo(start, -10)
        }

        ctx.moveTo(end, 10)
        ctx.lineTo(end, -10)

        /* 闭合路径 */
        // ctx.closePath()
        /* 描边 */
        ctx.lineWidth = 1
        ctx.strokeStyle = '#E6A23C'
        ctx.stroke()

        /* 绘制文本 */
        ctx.beginPath()
        var str = end - start + 'm'
        /* 文本的属性：尺寸、字体、左右对齐方式、垂直对齐的方式 */
        ctx.font = '16px Microsoft YaHei'
        ctx.textAlign = 'center' // 对齐方式
        ctx.fillStyle = '#eee' // 填充颜色
        // ctx.strokeText(str, (end - start) / 2 + start, -20) // 描边
        ctx.fillText(str, (end - start) / 2 + start, -20) // 填充
      }

      // 绘制车轮
      function drawWheel (start, end, weight) {
        ctx.beginPath()
        if (start === 0) {
          ctx.rect(start - 5, -50, 10, 5)

          ctx.rect(start - 5, -100, 10, 5)

          var str = weight + 'KN'
          /* 文本的属性：尺寸、字体、左右对齐方式、垂直对齐的方式 */
          ctx.font = '12px Microsoft YaHei'
          ctx.textAlign = 'center' // 对齐方式
          ctx.fillStyle = '#eee' // 填充颜色
          ctx.fillText(str, start - 5, -60) // 填充

          ctx.fillText(str, start - 5, -110) // 填充
        } else {
          ctx.rect(end - 5, -50, 10, 5)

          ctx.rect(end - 5, -100, 10, 5)

          ctx.lineWidth = 1
          ctx.strokeStyle = '#0fc8e0'
          ctx.stroke()

          /* 绘制文本 */
          ctx.beginPath()
          // eslint-disable-next-line no-redeclare
          var str = weight + 'KN'
          /* 文本的属性：尺寸、字体、左右对齐方式、垂直对齐的方式 */
          ctx.font = '12px Microsoft YaHei'
          ctx.textAlign = 'center' // 对齐方式
          ctx.fillStyle = '#eee' // 填充颜色

          ctx.fillText(str, end - 5, -60) // 填充

          ctx.fillText(str, end - 5, -110) // 填充
        }
      }
    }
  },

  watch: {
    wheelList: {
      deep: true,
      handler () {
        this.drawDistanceChart()
      }
    }
  }
}
</script>

<style lang="less">
@import "../../../assets/css/reset.css";
.assess {
  height: 100%;

  .contain {
    display: flex;
    height: calc(100% - 20px);

    .asseee_chart,
    .assess_result {
      height: calc(100% - 110px);
      background-color: var(--ContainBgColor);
      overflow: hidden;
    }

    .asseee_chart {
      display: flex;
      flex-direction: column;

      .asseee_chart_top {
        // flex-basis: 50%;
        display: flex;
        justify-content: center;
        height: 50%;

        .asseee_chart_top_canvas {
          width: 100%;
          height: 100%;
        }
      }

      .asseee_chart_bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        // flex-basis: 50%;
        height: 50%;

        .asseee_chart_bottom_add {
          display: flex;
          width: 80%;
          height: 32px;

          .asseee_chart_bottom_add_item {
            flex: 1;

            .el-input__inner {
              width: 80%;
            }
          }
        }

        .asseee_chart_bottom_table_warp {
          width: 80%;
          height: calc(100% - 32px);
          margin-top: 20px;
          overflow-y: scroll;

          .asseee_chart_bottom_table {
            width: 100%;
            font-size: 14px;
            border-width: 1px;
            border-color: var(--LightTextColor);
            border-collapse: collapse;

            th {
              border-width: 1px;
              padding: 8px;
              border-style: solid;
              border-color: var(--LightTextColor);
              text-align: center;
            }
            td {
              border-width: 1px;
              padding: 8px;
              border-style: solid;
              border-color: var(--LightTextColor);
              text-align: center;
            }
          }
        }
      }
    }

    .vsplitter {
      height: calc(100% - 110px);
      width: 14px;
      cursor: col-resize;
    }
  }
}

// 去掉input type=number的 + -
input[type='number']{-moz-appearance:textfield;}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {-webkit-appearance: none;margin: 0;}
</style>
