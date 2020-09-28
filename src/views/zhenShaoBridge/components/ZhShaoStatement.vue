<template>
  <div class="statement">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <div class="contain_stateItem">
        <div style="position: absolute; top: 20px; font-size: 18px;">日报表</div>
        <div>
          <el-date-picker
            v-model="dayValue"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
        <div style="margin-top:50px;">
          <el-button type="primary" @click="submitDayState">生成日报表</el-button>
        </div>
      </div>

      <div class="contain_stateItem_split"></div>

      <div class="contain_stateItem">
        <div style="position: absolute; top: 20px; font-size: 18px;">周报表</div>
        <div>
          <el-date-picker v-model="weekValye" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div style="margin-top:50px;">
          <el-button type="primary" @click="submitWeekState">生成周报表</el-button>
        </div>
      </div>

      <div class="contain_stateItem_split"></div>

      <div class="contain_stateItem">
        <div style="position: absolute; top: 20px; font-size: 18px;">月报表</div>
        <div>
          <el-date-picker v-model="monthValue" type="month" placeholder="选择日期"></el-date-picker>
        </div>
        <div style="margin-top:50px;">
          <el-button type="primary" @click="submitMonthState">生成月报表</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqBridgeOneGetReport } from '@/request/ZhShao/api.js'
export default {
  data () {
    return {
      dayValue: '',
      weekValye: '',
      monthValue: ''
    }
  },
  methods: {
    // 点击生成日报表
    async submitDayState () {
      if (!this.dayValue) return this.$message.info('请选择日期')
      const type = '日'
      const startTime = this.formatDate(this.dayValue - 86400 * 1000)
      const endTime = this.formatDate(this.dayValue)
      console.log(startTime, endTime)
      const Dom = document.querySelector('.statement .contain')
      const loading = this.$loading.service({ target: Dom, text: '正在生成报表', background: 'rgba(0,0,0,0.8)' })
      const data = await reqBridgeOneGetReport(type, startTime, endTime)
      loading.close()
      if (data.statusCode !== 200) return
      console.log(1111)
      window.open(data.data.data)
      console.log(data.data.data)
    },

    // 点击生成周报表
    submitWeekState () { },

    // 点击生成月报表
    submitMonthState () { },

    // 改变日期格式 例如: 2020-09-01T00:00
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

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.statement {
  height: 100%;
}
.contain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 116px);
  box-sizing: border-box;
  background-color: var(--ContainBgColor);
  overflow-y: auto;

  .contain_stateItem {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 33.33%;
    height: 99%;
  }

  .contain_stateItem_split {
    width: 10px;
    height: 100%;
    background-color: var(--BgColor);
  }
}
</style>
