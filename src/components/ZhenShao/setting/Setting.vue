<template>
  <div class="setting_component">
    <div class="setting_button" @click="togglePanel">
      <i class="el-icon-s-tools"></i>
      <span class="setting_text">设置</span>
    </div>

    <!-- 时序图设置面板 -->
    <div class="setting_panel" v-show="isShowPanel && activeName === 'time'">
      <el-cascader v-model="timeValue" :options="Options" :show-all-levels="false"></el-cascader>

      <!-- 确认和取消按钮 -->
      <div class="confirm_cancel_button">
        <el-button type="primary" size="mini" @click="timeConfirm">确认</el-button>
        <el-button type="info" size="mini" @click="hidePanel">取消</el-button>
      </div>
    </div>

    <!-- 相关性分析图设置面板 -->
    <div class="setting_panel" v-show="isShowPanel && activeName === 'relation'">
      <div>
        <el-cascader
          v-model="relationValue"
          :options="Options"
          :props="relationProps"
          collapse-tags
          clearable
        ></el-cascader>
      </div>

      <!-- 起始时间 -->
      <div>
        <el-date-picker v-model="relationStartTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </div>

      <!-- 结束时间 -->
      <div>
        <el-date-picker v-model="relationEndTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </div>

      <!-- 确认和取消按钮 -->
      <div class="confirm_cancel_button">
        <el-button type="primary" size="mini" @click="relationConfirm">确认</el-button>
        <el-button type="info" size="mini" @click="hidePanel">取消</el-button>
      </div>
    </div>

    <!-- 历史分析图设置面板 -->
    <div class="setting_panel" v-show="isShowPanel && activeName === 'history'">
      <div>
        <el-cascader
          v-model="historyValue"
          :options="Options"
          :props="historyProps"
          collapse-tags
          clearable
        ></el-cascader>
      </div>

      <!-- 起始时间 -->
      <div>
        <el-date-picker v-model="historyStartTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </div>

      <!-- 结束时间 -->
      <div>
        <el-date-picker v-model="historyEndTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </div>

      <!-- 确认和取消按钮 -->
      <div class="confirm_cancel_button">
        <el-button type="primary" size="mini" @click="historyConfirm">确认</el-button>
        <el-button type="info" size="mini" @click="hidePanel">取消</el-button>
      </div>
    </div>

    <!-- 传感器数据设置面板 -->
    <div class="setting_panel" v-show="isShowPanel && activeName === 'sensorData'">
      <el-cascader v-model="sensorDataValue" :options="sensorDataOptions" :show-all-levels="false"></el-cascader>

      <!-- 确认和取消按钮 -->
      <div class="confirm_cancel_button">
        <el-button type="primary" size="mini" @click="sensorDataConfirm">确认</el-button>
        <el-button type="info" size="mini" @click="hidePanel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
  mounted() {
    this.getSensorBaseInfo()

    // 初始化绘制
    this.timeConfirm()
    this.relationConfirm()
    this.historyConfirm()

    // 注册监听点击传感器事件
    this.$bus.$on('selectSensor', (selectName) => {
      // 如果当前路由非传感器系统数据显示 return
      if (this.$route.path !== '/ZhShaoSensorData') return
      // 判断当前选中的tab，绘制tab中的echarts
      switch (this.activeName) {
        case 'time':
          // 判断选中哪种类型传感器
          selectName.startsWith('SR') ? this.timeValue = ['姿态盒倾角', selectName] : this.timeValue = ['应变片', selectName]
          // 绘制时序图
          this.timeConfirm()
          break

        case 'relation':
          // 判断选中哪种类型传感器
          selectName.startsWith('SR') ? this.relationValue = [['姿态盒倾角', selectName]] : this.relationValue = [['应变片', selectName]]
          // 绘制相关性分析图
          this.relationConfirm()
          break

        case 'history':
          // 判断选中哪种类型传感器
          selectName.startsWith('SR') ? this.historyValue = [['姿态盒倾角', selectName]] : this.historyValue = [['应变片', selectName]]
          // 绘制历史图
          this.historyConfirm()
          break

        case 'sensorData':
          // 判断选中哪种类型传感器
          selectName.startsWith('SR') ? this.sensorDataValue = ['姿态盒倾角'] : this.sensorDataValue = ['应变片']
          // 绘制数据表格
          this.sensorDataConfirm()
          break
      }
    })
  },
  activated() {
    // 实时更新时序图
    this.timer = setInterval(async () => {
      if (this.activeName === 'time') {
        // 判断类型，发送请求
        if (this.timeValue[0] === '姿态盒倾角') {
          const data = await reqBridgeOneIclTimeAndHistory([this.timeValue[1]])
          // 请求数据成功
          if (data.statusCode !== 200) return
          // 保存数据到vuex
          this.setTimeChartData(data.data)
        } else if (this.timeValue[0] === '姿态盒加速度') {
          const data = await reqBridgeOneAccelTimeAndHistory([this.timeValue[1]])
          // 请求数据成功
          if (data.statusCode !== 200) return
          // 保存数据到vuex
          this.setTimeChartData(data.data)
        } else if (this.timeValue[0] === '应变片') {
          const data = await reqBridgeOneStrainTimeAndHistory([this.timeValue[1]])
          // 请求数据成功
          if (data.statusCode !== 200) return
          // 保存数据到vuex
          this.setTimeChartData(data.data)
        }

        // 通知父组件重新绘制Echarts
        this.$emit('reDrawChart', 'time')
      }
    }, 1000)
  },

  deactivated() {
    clearInterval(this.timer)
  },
  data() {
    return {
      timer: null,
      // 是否显示设置面板
      isShowPanel: false,

      // 时序、相关、历史图通用配置项
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

      // 时序图选中项
      timeValue: ['应变片', 'ZS01010'], // 默认选中第一项

      // 相关性分析图选中项
      relationValue: [['姿态盒倾角', 'SR1'], ['姿态盒倾角', 'SR3']],
      // 相关性分析图属性
      relationProps: { multiple: true },
      // 相关性分析图起始时间
      relationStartTime: 'Mon Jun 22 2020 23:00:00 GMT+0800 (中国标准时间)',
      // 相关性分析图结束时间
      relationEndTime: 'Mon Jun 22 2020 23:02:00 GMT+0800 (中国标准时间)',

      // 历史图选中项
      historyValue: [['姿态盒倾角', 'SR1'], ['姿态盒倾角', 'SR3']],
      // 历史图属性
      historyProps: { multiple: true },
      // 历史图起始时间
      historyStartTime: 'Mon Jun 22 2020 23:00:00 GMT+0800 (中国标准时间)',
      // 历史图结束时间
      historyEndTime: 'Mon Jun 22 2020 23:02:00 GMT+0800 (中国标准时间)',

      // 传感器数据下拉菜单配置项
      sensorDataOptions: [
        { value: '姿态盒倾角', label: '姿态盒倾角' },
        { value: '姿态盒加速度', label: '姿态盒加速度' },
        { value: '应变片', label: '应变片' }
      ],
      // 传感器数据选中项
      sensorDataValue: ['姿态盒倾角']
    }
  },
  computed: {
    ...mapState('ZhShaoSetting', ['activeName'])
  },
  methods: {
    // 请求传感器位置数据
    async getSensorBaseInfo() {
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
    togglePanel() {
      this.isShowPanel = !this.isShowPanel
    },

    // 鼠标离开点击
    mouseLeaveClick() {
      document.addEventListener('click', this.hidePanel, false)
    },

    // 隐藏设置面板
    hidePanel() {
      this.isShowPanel = false
      document.removeEventListener('click', this.hidePanel)
    },

    // 时序图确认
    async timeConfirm() {
      // 如果没有选中内容，则返回
      if (this.timeValue.length === 0) return
      // console.log(this.timeValue)
      this.isShowPanel = false

      // 判断类型，发送请求
      if (this.timeValue[0] === '姿态盒倾角') {
        const data = await reqBridgeOneIclTimeAndHistory([this.timeValue[1]])
        // 请求数据成功
        if (data.statusCode !== 200) return
        // 保存数据到vuex
        this.setTimeChartData(data.data)
      } else if (this.timeValue[0] === '姿态盒加速度') {
        const data = await reqBridgeOneAccelTimeAndHistory([this.timeValue[1]])
        // 请求数据成功
        if (data.statusCode !== 200) return
        // 保存数据到vuex
        this.setTimeChartData(data.data)
      } else if (this.timeValue[0] === '应变片') {
        const data = await reqBridgeOneStrainTimeAndHistory([this.timeValue[1]])
        // 请求数据成功
        if (data.statusCode !== 200) return
        // 保存数据到vuex
        this.setTimeChartData(data.data)
      }

      // 通知父组件重新绘制Echarts
      this.$emit('reDrawChart', 'time')
      // console.log('time', this.timeValue)
      this.$bus.$emit('selectTime', this.timeValue[1])
    },

    // 相关性分析图确认
    async relationConfirm() {
      // 如果没有选中内容，则返回
      if (this.relationValue.length === 0 || !this.relationStartTime || !this.relationEndTime) return
      this.isShowPanel = false
      // 配置请求参数格式
      const Ids = []
      this.relationValue.forEach(item => {
        Ids.push(item[1])
      })
      const startTime = this.formatDate(this.relationStartTime)
      const endTime = this.formatDate(this.relationEndTime)

      // 判断类型，发送请求
      if (this.relationValue[0][0] === '姿态盒倾角') {
        const data = await reqBridgeOneIclRelation(Ids, startTime, endTime)
        // 请求数据成功
        if (data.statusCode !== 200) return
        // 保存数据到vuex
        this.setRelationChartData(data.data)
      } else if (this.relationValue[0][0] === '姿态盒加速度') {
        const data = await reqBridgeOneAccelRelation(Ids, startTime, endTime)
        // 请求数据成功
        if (data.statusCode !== 200) return
        // 保存数据到vuex
        this.setRelationChartData(data.data)
      } else if (this.relationValue[0][0] === '应变片') {
        const data = await reqBridgeOneStrainRelation(Ids, startTime, endTime)
        // 请求数据成功
        if (data.statusCode !== 200) return
        // 保存数据到vuex
        this.setRelationChartData(data.data)
      }

      // 通知父组件重新绘制Echarts
      this.$emit('reDrawChart', 'relation')

      this.$bus.$emit('selectRelation', Ids)
    },

    // 历史图确认
    async historyConfirm() {
      // 如果没有选中内容，则返回
      if (this.historyValue.length === 0 || !this.historyStartTime || !this.historyEndTime) return
      this.isShowPanel = false

      // 配置请求参数格式
      const Ids = []
      this.historyValue.forEach(item => {
        Ids.push(item[1])
      })
      const startTime = this.formatDate(this.historyStartTime)
      const endTime = this.formatDate(this.historyEndTime)

      // 判断类型，发送请求
      if (this.historyValue[0][0] === '姿态盒倾角') {
        const data = await reqBridgeOneIclTimeAndHistory(Ids, startTime, endTime)
        // 请求数据成功
        if (data.statusCode !== 200) return
        // 保存数据到vuex
        this.setHistoryChartData(data.data)
      } else if (this.historyValue[0][0] === '姿态盒加速度') {
        const data = await reqBridgeOneAccelTimeAndHistory(Ids, startTime, endTime)
        // 请求数据成功
        if (data.statusCode !== 200) return
        // 保存数据到vuex
        this.setHistoryChartData(data.data)
      } else if (this.historyValue[0][0] === '应变片') {
        const data = await reqBridgeOneStrainTimeAndHistory(Ids, startTime, endTime)
        // 请求数据成功
        if (data.statusCode !== 200) return
        // 保存数据到vuex
        this.setHistoryChartData(data.data)
      }

      // 通知父组件重新绘制Echarts
      this.$emit('reDrawChart', 'history')

      this.$bus.$emit('selectHistory', Ids)
    },

    // 传感器数据确认
    sensorDataConfirm() {
      this.isShowPanel = false
      console.log(this.sensorDataValue)
      if (this.sensorDataValue[0] === '姿态盒倾角') {
        this.toggleTableName('iclTable')
      } else if (this.sensorDataValue[0] === '姿态盒加速度') {
        this.toggleTableName('accelTable')
      } else if (this.sensorDataValue[0] === '应变片') {
        this.toggleTableName('strainTable')
      }
    },

    // 改变日期格式 例如: 2020-09-01T00:00
    formatDate(value) {
      var time = new Date(value)
      var year = time.getFullYear()
      var month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
      var date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      var hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
      var minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
      return year + '-' + month + '-' + date + 'T' + hour + ':' + minute
    },

    // 映射vuex中保存时序图数据、保存相关性分析图数据、保存历史图数据
    ...mapMutations('ZhShaoSetting', ['setTimeChartData', 'setRelationChartData', 'setHistoryChartData', 'toggleTableName'])
  }
}
</script>

<style lang="less">
@import '../../../assets/css/reset.css';
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
    // background-color: #fff !important;
  }

  /* 确认和取消按钮 */
  // .confirm_cancel_button {

  // }
}
</style>
