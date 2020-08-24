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
      <div class="three_d_model">
        3d模型
      </div>
      <div class="vsplitter"></div>
      <div class="chart">
      1
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.stress {
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
  .three_d_model {
    width: 60%;
  }
  .chart {
    width: 40%;
  }
  .vsplitter {
    height: calc(100% - 110px);
    width: 14px;
    cursor: col-resize;
  }
}
</style>
