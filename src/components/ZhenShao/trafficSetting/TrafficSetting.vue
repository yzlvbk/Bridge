<template>
  <div class="traffic_setting">
    <div class="setting_button">
      <i class="el-icon-s-tools"></i>
      <span class="setting_text">设置</span>
    </div>

    <!-- 设置面板 -->
    <div class="setting_panel">
      <!-- <el-cascader v-model="timeValue" :options="Options" :show-all-levels="false"></el-cascader> -->

      <div class="confirm_cancel_button">
        <!-- 统计类型选择 -->
        <el-select v-model="typeValue" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <div>
          <el-date-picker v-model="endDate" type="datetime" placeholder="选择日期"></el-date-picker>
        </div>

        <!-- 确认和取消按钮 -->
        <div>
          <el-button type="primary" size="mini">确认</el-button>
          <el-button type="info" size="mini">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeOptions: [{
        value: '日统计',
        label: '日统计'
      }, {
        value: '周统计',
        label: '周统计'
      }, {
        value: '月统计',
        label: '月统计'
      }],
      typeValue: '日统计',

      endDate: '' // 结束时间
    }
  }

}
</script>

<style lang="less">
@import '../../../assets/css/reset.css';
.traffic_setting {
  position: absolute;
  z-index: 100;
  /* 设置按钮 */
  .setting_button {
    position: absolute;
    right: 0px;
    width: 50px;
    height: 25px;
    font-size: 13px;
    cursor: pointer;
    &:hover {
      color: var(--LightTextColor);
    }

    .setting_text {
      line-height: 25px;
      margin-left: 3px;
    }
    .el-icon-s-tools {
      vertical-align: middle;
    }
  }

  /* 设置面板 */
  .setting_panel {
    margin-top: 25px;
    padding: 10px 15px;
    background-color: rgb(19, 63, 105);
  }

  /* el-select样式 */
  .el-date-editor.el-input {
    width: 145px;
  }
  .el-input__inner {
    width: 145px !important;
    height: 32px;
    margin-bottom: 10px;
    line-height: 32px;
    color: #eee !important;
    font-weight: 600;
    border: none;
    // background-color: #fff !important;
  }
}
</style>
