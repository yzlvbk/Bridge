<template>
  <div class="setting_component">
    <i class="el-icon-s-tools"></i>
    <span class="setting_text">设置</span>
  </div>
</template>

<style lang="less" scoped>
@import '../../assets/css/reset.css';
.setting_component {
  width: 50px;
  height: 25px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    color: var(--LightTextColor);;
  }

    .setting_text {
    line-height:25px;
    margin-left: 3px;
    }
    .el-icon-s-tools {
      vertical-align: middle;
    }
}

</style>
