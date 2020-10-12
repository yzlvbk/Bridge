<template>
  <div class="log">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>日志</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <!-- 内容头部区域 -->
      <div class="contain_top">
        <div class="contain_top_search">
          <el-date-picker v-model="dateSelectValue" type="month" placeholder="选择月"></el-date-picker>
          <el-button type="info" size="small" style="margin-left: 10px">搜索</el-button>
        </div>

        <div class="contain_top_write">
          <el-button type="primary" size="small" @click="isDialogVisible = true">填写日志</el-button>
        </div>
      </div>

      <!-- 表格区域 -->
      <div class="contain_table">
        <el-table :data="tableData" stripe border height="100%" style="width: 100%">
          <el-table-column prop="Id" label="日志编号" width="120"></el-table-column>
          <el-table-column prop="CreateTime" label="时间" width="160"></el-table-column>
          <el-table-column prop="User" label="上报人" width="100"></el-table-column>
          <el-table-column prop="Content" label="日志内容"></el-table-column>
        </el-table>
      </div>

      <!-- 分页区域 -->
      <div class="contain_pagination">
        <el-pagination
          @current-change="currentPageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          background
          layout="total, prev, pager, next"
          :total="totalLogNum"
        ></el-pagination>
      </div>

      <!-- 填写日志弹出框 -->
      <el-dialog class="writeLog_Dialog" title="填写日志" :visible.sync="isDialogVisible" width="30%">
        <div class="writeLog_Dialog_title">选择时间</div>
        <el-date-picker
          v-model="logwWriteDate"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
        ></el-date-picker>
        <div class="writeLog_Dialog_title">填写日志内容</div>
        <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="logTextarea"></el-input>
        <!-- 按钮组 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="isDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitLog">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reqBridgeOneGetWorkLog, reqBridgeOnePostWorkLog } from '@/request/ZhShao/api.js'
export default {
  mounted() {
    this.getLog()
  },
  data() {
    return {
      // 日期选择
      dateSelectValue: '',

      // 当前选中页
      currentPage: 1,
      // 日志总条数
      totalLogNum: 0,
      // 每页数量
      pageSize: 5,

      // 填写日志是否显示
      isDialogVisible: false,

      // 填写日志时间
      logwWriteDate: '',
      // 日志内容
      logTextarea: '',

      // 所有日志数据
      tableData: []
    }
  },
  methods: {
    // 获取日志
    async getLog() {
      const data = await reqBridgeOneGetWorkLog(this.currentPage, this.pageSize)
      if (data.statusCode !== 200) return
      this.tableData = data.data.data
      this.totalLogNum = data.data.total
    },

    // 页码发生变化
    currentPageChange(currentPage) {
      this.currentPage = currentPage
      this.getLog()
    },

    // 点击提交日志
    async submitLog() {
      this.isDialogVisible = false
      const data = await reqBridgeOnePostWorkLog('admmin22', this.logwWriteDate, this.logTextarea)
      console.log(data)
      if (data.statusCode !== 200) return
      // 重新渲染日志
      this.getLog()

      // 清空输入框
      this.logwWriteDate = ''
      this.logTextarea = ''
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/css/reset.css';
.log {
  height: 100%;

  .contain {
    height: calc(100% - 118px);
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: var(--ContainBgColor);
    overflow-y: auto;

    .contain_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      margin-bottom: 20px;

      /* 修改input长度 */
      .el-input__inner {
        width: 145px;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 145px;
      }
    }

    .contain_table {
      height: calc(100% - 60px - 50px);
      overflow-y: auto;
    }

    .contain_pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
    }

    .el-dialog {
      .writeLog_Dialog_title {
        margin: 10px 0;
      }

      /* 修改input长度 */
      .el-input__inner {
        width: 225px;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 225px;
      }
    }
  }

  .el-table td {
    border-bottom: 1px solid #626366;
    border-right: 1px solid #626366;
    border-left: 1px solid #626366;
  }
  .el-table--border th {
    border-top: 1px solid #626366;
    border-right: 1px solid #626366;
    border-left: 1px solid #626366;
  }
  .el-table--border {
    border: 1px solid transparent;
  }
}
</style>
