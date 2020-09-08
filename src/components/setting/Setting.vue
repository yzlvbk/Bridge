<template>
  <div class="setting_component">
    <div class="setting_button" @click="togglePanel">
      <i class="el-icon-s-tools"></i>
      <span class="setting_text">设置</span>
    </div>

    <!-- 时序图设置面板 -->
    <div class="setting_panel"
     v-show="isShowPanel && activeName === 'time'">
      <el-cascader
        v-model="timeValue"
        :options="Options"
        :show-all-levels="false"
        >
      </el-cascader>

      <!-- 确认和取消按钮 -->
      <div class="confirm_cancel_button">
        <el-button type="primary" size="mini" @click="timeConfirm">确认</el-button>
        <el-button type="info" size="mini" @click="hidePanel">取消</el-button>
      </div>
    </div>

    <!-- 相关性分析图设置面板 -->
    <div class="setting_panel"
     v-show="isShowPanel && activeName === 'relation'">
      <div>
        <el-cascader
          v-model="relationValue"
          :options="Options"
          :props="relationProps"
          collapse-tags
          clearable>
        </el-cascader>
      </div>

      <!-- 起始时间 -->
      <div>
        <el-date-picker
          v-model="relationStartTime"
          type="datetime"
          placeholder="选择日期时间">
      </el-date-picker>
      </div>

      <!-- 结束时间 -->
      <div>
        <el-date-picker
          v-model="relationEndTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>

      <!-- 确认和取消按钮 -->
      <div class="confirm_cancel_button">
        <el-button type="primary" size="mini" @click="relationConfirm">确认</el-button>
        <el-button type="info" size="mini" @click="hidePanel">取消</el-button>
      </div>
    </div>

    <!-- 历史分析图设置面板 -->
    <div class="setting_panel"
      v-show="isShowPanel && activeName === 'history'">
      <div>
        <el-cascader
          v-model="historyValue"
          :options="Options"
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
        <el-button type="primary" size="mini" @click="historyConfirm">确认</el-button>
        <el-button type="info" size="mini" @click="hidePanel">取消</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  reqBridgeOneSensorBaseInfo,
  reqBridgeOneStrainTimeAndHistory, // 应变片时序图和历史图
  reqBridgeOneIclTimeAndHistory, // 姿态盒倾角时序图和历史图
  reqBridgeOneAccelTimeAndHistory, // 姿态盒加速度时序图和历史图
  reqBridgeOneStrainRelation, // 应变片相关性分析图
  reqBridgeOneIclRelation, // 姿态盒倾角相关性分析图
  reqBridgeOneAccelRelation // 姿态盒加速度相关性分析图
} from '@/request/ZhShao/api.js'
export default {
  mounted () {
    this.getSensorBaseInfo()
  },
  data () {
    return {
      // 是否显示设置面板
      isShowPanel: false,

      // 时序图选中项
      timeValue: [],
      // 时序图配置项
      Options: [
        {
          value: '姿态盒倾角',
          label: '姿态盒倾角',
          children: []
        },
        {
          value: '姿态盒加速度',
          label: '姿态盒加速度',
          children: []
        },
        {
          value: '应变片',
          label: '应变片',
          children: []
        }
      ],

      // 相关性分析图选中项
      relationValue: [],
      // 相关性分析图属性
      relationProps: { multiple: true },
      // 相关性分析图配置
      relationOptions: [
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
      relationStartTime: '',
      // 相关性分析图结束时间
      relationEndTime: '',

      // 历史图选中项
      historyValue: [],
      // 历史图属性
      historyProps: { multiple: true },
      // 历史图配置
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
          children: []
        }
      ],
      // 历史图起始时间
      historyStartTime: '',
      // 历史图结束时间
      historyEndTime: ''
    }
  },
  computed: {
    ...mapState('ZhShaoSetting', ['activeName'])
  },
  methods: {
    // 请求传感器位置数据
    async getSensorBaseInfo () {
      const data = await reqBridgeOneSensorBaseInfo()
      // 请求数据成功
      if (data.statusCode === 200) {
        // 姿态盒
        data.data.Profiler.forEach((item) => {
          this.Options[0].children.push({ value: item.Name, label: item.Name })
          this.Options[1].children.push({ value: item.Name, label: item.Name })
        })
        // 应变片
        data.data.StrainGauges.forEach((item) => {
          this.Options[2].children.push({ value: item.Name, label: item.Name })
        })
      }
    },

    // 显示与隐藏设置面板
    togglePanel () {
      this.isShowPanel = !this.isShowPanel
    },

    // 鼠标离开点击
    mouseLeaveClick () {
      document.addEventListener('click', this.hidePanel, false)
    },

    // 隐藏设置面板
    hidePanel () {
      this.isShowPanel = false
      document.removeEventListener('click', this.hidePanel)
    },

    // 时序图确认
    async timeConfirm () {
      // 如果没有选中内容，则返回
      if (this.timeValue.length === 0) return
      console.log(this.timeValue)
      this.isShowPanel = false

      // 判断类型，发送请求
      if (this.timeValue[0] === '姿态盒倾角') {
        const data = await reqBridgeOneIclTimeAndHistory(['SR3'])
        console.log(data)
      } else if (this.timeValue[0] === '姿态盒加速度') {
        const data = await reqBridgeOneAccelTimeAndHistory(['SR3'])
        console.log(data)
      } else if (this.timeValue[0] === '应变片') {
        const data = await reqBridgeOneStrainTimeAndHistory(['ZS01013'])
        console.log(data)
      }
    },

    // 相关性分析图确认
    async relationConfirm () {
      // 如果没有选中内容，则返回
      if (this.relationValue.length === 0 || !this.relationStartTime || !this.relationEndTime) return
      console.log(this.relationValue)
      console.log(this.formatDate(this.relationStartTime))
      console.log(this.formatDate(this.relationEndTime))
      this.isShowPanel = false

      // 判断类型，发送请求
      if (this.relationValue[0][0] === '姿态盒倾角') {
        const data = await reqBridgeOneIclRelation(['SR3', 'SR4'], '2020-09-07 09:44:20', '2020-09-07 09:44:27')
        console.log(data)
      } else if (this.relationValue[0][0] === '姿态盒加速度') {
        const data = await reqBridgeOneAccelRelation(['SR3', 'SR4'], '2020-09-07 09:44:20', '2020-09-07 09:44:27')
        console.log(data)
      } else if (this.relationValue[0][0] === '应变片') {
        const data = await reqBridgeOneStrainRelation(['ZS01010', 'ZS01012'], '2020-09-07 09:44:20', '2020-09-07 09:44:27')
        console.log(data)
      }
    },

    // 历史图确认
    async historyConfirm () {
      // 如果没有选中内容，则返回
      if (this.historyValue.length === 0 || !this.historyStartTime || !this.historyEndTime) return
      this.isShowPanel = false

      console.log(this.historyValue)
      console.log(this.formatDate(this.historyStartTime))
      console.log(this.formatDate(this.historyEndTime))

      // 判断类型，发送请求
      if (this.historyValue[0][0] === '姿态盒倾角') {
        const data = await reqBridgeOneIclTimeAndHistory(['SR3', 'SR4'], '2020-09-07 09:44:20', '2020-09-07 09:44:27')
        console.log(data)
      } else if (this.historyValue[0][0] === '姿态盒加速度') {
        const data = await reqBridgeOneAccelTimeAndHistory(['SR3', 'SR4'], '2020-09-07 09:44:20', '2020-09-07 09:44:27')
        console.log(data)
      } else if (this.historyValue[0][0] === '应变片') {
        const data = await reqBridgeOneStrainTimeAndHistory(['ZS01010', 'ZS01012'], '2020-09-07 09:44:20', '2020-09-07 09:44:27')
        console.log(data)
      }
    },

    // 改变日期格式 例如: 2020-09-01 00:00
    formatDate (value) {
      var time = new Date(value)
      var year = time.getFullYear()
      var month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
      var date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      var hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
      var minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
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
    // .confirm_cancel_button {

    // }
}

</style>
