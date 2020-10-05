<template>
  <div class="zhshao_three_d">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>

      <el-breadcrumb-item v-if="path === '/ZhShaoMonitor'">健康监测</el-breadcrumb-item>

      <template v-if="path === '/ZhShaoSensorData'">
        <el-breadcrumb-item>传感器系统</el-breadcrumb-item>
        <el-breadcrumb-item>数据显示</el-breadcrumb-item>
      </template>

      <template v-if="path === '/ZhShaoSensorInfo'">
        <el-breadcrumb-item>传感器系统</el-breadcrumb-item>
        <el-breadcrumb-item>基本信息</el-breadcrumb-item>
      </template>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <div class="three_d_model" style="height: 50%;">
        <ThreeD />
        <div class="three_d_model_sensorInfo" v-if="sensorType">
          <template v-if="sensorType === '姿态盒'">
            <span>名称: {{sensorName}}</span>
            <span>类型: {{sensorType}}</span>
            <span>倾角X: {{iclX}}</span>
            <span>倾角Y: {{iclY}}</span>
            <span>加速度X: {{accelX}}</span>
            <span>加速度Y: {{accelY}}</span>
            <span>加速度Z: {{accelZ}}</span>
          </template>

          <template v-if="sensorType === '应变片'">
            <span>名称: {{sensorName}}</span>
            <span>类型: {{sensorType}}</span>
            <span>应变值: {{strainValue}}</span>
          </template>
        </div>
      </div>
      <!-- 空隙模块 -- 控制模块拖动 -->
      <!-- <div class="vsplitter" ref="vsplitter"></div> -->
      <div class="chart" style="height: 50%;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import ThreeD from '../../../components/threeD/ThreeD'
import { mapState } from 'vuex'
export default {
  mounted() {
    this.path = this.$route.path

    // 添加移动内容区域窗口大小事件
    // const div = document.querySelector('.vsplitter')
    // div.addEventListener('mousedown', this.mouseResize)

    // 监听传感器点击事件，显示选中传感器信息
    this.$bus.$on('selectSensor', (selectName) => {
      // 判断哪种类型传感器
      if (selectName.startsWith('SR')) {
        const iclData = this.iclTableData.filter(item => item.Name === selectName)[0]
        const accelData = this.accelTableData.filter(item => item.Name === selectName)[0]
        this.sensorName = iclData.Name
        this.sensorType = '姿态盒'
        this.iclX = iclData.IclX
        this.iclY = iclData.IclY
        this.accelX = accelData.AccelX
        this.accelY = accelData.AccelY
        this.accelZ = accelData.AccelZ
      } else {
        const strainData = this.strainTableData.filter(item => item.Name === selectName)[0]
        this.sensorName = strainData.Name
        this.sensorType = '应变片'
        this.strainValue = strainData.Value
      }
    })
  },
  data() {
    return {
      path: '',

      /* 传感器信息 */
      sensorName: '', // 传感器名称
      sensorType: '', // 传感器类型

      iclX: '', // 姿态盒倾角X
      iclY: '', // 姿态盒倾角Y
      accelX: '', // 姿态盒加速度X
      accelY: '', // 姿态盒加速度Y
      accelZ: '', // 姿态盒加速度Z

      strainValue: '' // 应变片应变值

    }
  },
  computed: {
    ...mapState('ZhShaoSetting',
      ['iclTableData', // 姿态盒倾角表格数据
        'accelTableData', // 姿态盒加速度表格数据
        'strainTableData' // 应变片表格数据
      ])
  },
  methods: {
    // 鼠标点击改变尺寸
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
  watch: {
    $route(newVal) {
      this.path = newVal.path
    }
  },
  components: {
    ThreeD
  },
  beforeDestroy() {
    // 销毁移动内容区域窗口大小事件
    // this.$refs.vsplitter.removeEventListener('mousedown', this.mouseResize)
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';

.zhshao_three_d {
  height: calc(100% - 46px);
}

.contain {
  display: flex;
  flex-direction: column;
  height: calc(100% - 73px);

  .three_d_model {
    position: relative;
    border-bottom: 10px solid var(--BgColor);

    .three_d_model_sensorInfo {
      display: flex;
      position: absolute;
      left: 10px;
      top: 10px;
      padding: 5px 8px;
      flex-direction: column;
      background-color: rgb(78, 78, 78);
      opacity: 0.6;
    }
  }
  .three_d_model,
  .chart {
    height: 100%;
    overflow: hidden;
    background-color: var(--ContainBgColor);
  }

  .vsplitter {
    height: 100%;
    width: 14px;
    cursor: col-resize;
  }
}
</style>
