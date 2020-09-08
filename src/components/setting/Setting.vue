<template>
  <div class="setting_component">
    <div class="setting_button" @click="togglePanel">
      <i class="el-icon-s-tools"></i>
      <span class="setting_text">设置</span>
    </div>

    <!-- 时序图设置面板 -->
    <div class="setting_panel" v-if="false">
      <el-cascader
        v-model="timeValue"
        :options="timeOptions"
        :show-all-levels="false"
        @change="handleChange">
      </el-cascader>

      <!-- 确认和取消按钮 -->
      <div class="confirm_cancel_button">
        <el-button type="primary" size="mini">确认</el-button>
        <el-button type="info" size="mini">取消</el-button>
      </div>
    </div>

    <!-- 相关性分析图设置面板 -->
    <div class="setting_panel" v-if="false">
      <div>
        <el-cascader
          :options="historyOptions"
          :props="historyProps"
          collapse-tags
          clearable>
        </el-cascader>
      </div>

      <!-- 起始时间 -->
      <div>
        <el-date-picker
          v-model="historyStartTime"
          type="datetime"
          placeholder="选择日期时间">
      </el-date-picker>
      </div>

      <!-- 结束时间 -->
      <div>
        <el-date-picker
          v-model="historyEndTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>

      <!-- 确认和取消按钮 -->
      <div class="confirm_cancel_button">
        <el-button type="primary" size="mini">确认</el-button>
        <el-button type="info" size="mini">取消</el-button>
      </div>
    </div>

    <!-- 历史分析图设置面板 -->
    <div class="setting_panel" v-show="isShowPanel">
      <div>
        <el-cascader
          :options="historyOptions"
          :props="historyProps"
          collapse-tags
          clearable>
        </el-cascader>
      </div>

      <!-- 起始时间 -->
      <div>
        <el-date-picker
          v-model="historyStartTime"
          type="datetime"
          placeholder="选择日期时间">
      </el-date-picker>
      </div>

      <!-- 结束时间 -->
      <div>
        <el-date-picker
          v-model="historyEndTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>

      <!-- 确认和取消按钮 -->
      <div class="confirm_cancel_button">
        <el-button type="primary" size="mini">确认</el-button>
        <el-button type="info" size="mini">取消</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // 是否显示设置面板
      isShowPanel: false,

      // 时序图选中项
      timeValue: [],
      // 时序图配置项
      timeOptions: [
        {
          value: 'zitaihe',
          label: '姿态盒倾角',
          children: [{
            value: '20002',
            label: '20002'
          }, {
            value: '20003',
            label: '20003'
          }, {
            value: '20004',
            label: '20004'
          }, {
            value: '20005',
            label: '20005'
          }]
        },
        {
          value: 'zitaihe',
          label: '姿态盒加速度',
          children: [{
            value: '20002',
            label: '20002'
          }, {
            value: '20003',
            label: '20003'
          }, {
            value: '20004',
            label: '20004'
          }, {
            value: '20005',
            label: '20005'
          }]
        },
        {
          value: 'zitaihe',
          label: '应变片',
          children: [{
            value: '20002',
            label: '20002'
          }, {
            value: '20003',
            label: '20003'
          }, {
            value: '20004',
            label: '20004'
          }, {
            value: '20005',
            label: '20005'
          }]
        }
      ],

      // 相关性分析图属性
      historyProps: { multiple: true },
      // 相关性分析图配置
      historyOptions: [
        {
          value: 'zitaihe',
          label: '姿态盒倾角',
          children: [{
            value: '20002',
            label: '20002'
          }, {
            value: '20003',
            label: '20003'
          }, {
            value: '20004',
            label: '20004'
          }, {
            value: '20005',
            label: '20005'
          }]
        },
        {
          value: 'zitaihe',
          label: '姿态盒加速度',
          children: [{
            value: '20002',
            label: '20002'
          }, {
            value: '20003',
            label: '20003'
          }, {
            value: '20004',
            label: '20004'
          }, {
            value: '20005',
            label: '20005'
          }]
        },
        {
          value: 'zitaihe',
          label: '应变片',
          children: [{
            value: '20002',
            label: '20002'
          }, {
            value: '20003',
            label: '20003'
          }, {
            value: '20004',
            label: '20004'
          }, {
            value: '20005',
            label: '20005'
          }]
        }
      ],
      // 相关性分析图起始时间
      historyStartTime: '',
      // 相关性分析图结束时间
      historyEndTime: ''
    }
  },
  methods: {
    // 显示与隐藏设置面板
    togglePanel () {
      this.isShowPanel = !this.isShowPanel
    },

    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less">
@import '../../assets/css/reset.css';
.setting_component {
  position: relative;
    /* 设置按钮 */
    .setting_button {
      position: absolute;
      right: 0px;
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

    /* 设置面板 */
    .setting_panel {
      // width: 200px;
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
        background-color: rgb(62, 88, 119);
    }

    /* 确认和取消按钮 */
    .confirm_cancel_button {

    }
}

</style>
