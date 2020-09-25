<template>
  <div class="statement">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <el-button type="primary">报表生成</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.statement {
  height: 100%;
}
.contain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 130px);
  padding: 0 80px;
  box-sizing: border-box;
  background-color: var(--ContainBgColor);
  overflow-y: scroll;
}
</style>
