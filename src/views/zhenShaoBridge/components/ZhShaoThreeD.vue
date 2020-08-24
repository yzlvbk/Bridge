<template>
<div class="monitor">
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
        <div class="three_d_model" style="width: 60%;">
            3d模型
        </div>
        <div class="vsplitter" ref="vsplitter"></div>
        <div class="chart" style="width: 40%;">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
export default {
  mounted () {
    this.path = this.$route.path

    // 添加移动内容区域窗口大小事件
    const div = document.querySelector('.vsplitter')
    div.addEventListener('mousedown', this.mouseResize)
  },
  data () {
    return {
      path: ''
    }
  },
  methods: {
    // 鼠标点击改变尺寸
    mouseResize (e) {
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
    $route (newVal) {
      this.path = newVal.path
    }
  },
  beforeDestroy () {
    // 销毁移动内容区域窗口大小事件
    this.$refs.vsplitter.removeEventListener('mousedown', this.mouseResize)
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/css/reset.css";

.monitor {
    height: 100%;
}

.contain {
    display: flex;
    height: calc(100% - 20px);

    .three_d_model,
    .chart {
        height: calc(100% - 110px);
        background-color: var(--ContainBgColor);
    }

    .vsplitter {
        height: calc(100% - 110px);
        width: 14px;
        cursor: col-resize;
    }
}
</style>
