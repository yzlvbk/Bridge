<template>
  <div class="communication">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>留言系统</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="contain">
      <!-- 发布主题帖 -->
      <div class="publish_post">
        <el-button type="primary" size="small">发布主题帖</el-button>
      </div>

      <div>主题帖</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.communication {
  height: 100%;

  .contain {
    height: calc(100% - 118px);
    box-sizing: border-box;
    padding: 20px 20px;
    background-color: var(--ContainBgColor);
    overflow-y: auto;

    .publish_post {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
