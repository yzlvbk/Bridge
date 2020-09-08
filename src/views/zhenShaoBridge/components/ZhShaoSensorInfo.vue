<template>
  <div class="sernor_info">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>工程概况</el-breadcrumb-item>
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <div class="contain_data">
        <div class="sernor_options">
          <!-- 下拉框 -->
          <el-select v-model="selectValue">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <!-- 表格区域 -->
        <div class="table_warp">
          <el-table
            ref="tableList"
            :data="selectValue === 'Profiler' ? profilerData : strainGaugesData"
            stripe
            height="100%"
            style="width: 100%; border: none;"
            :row-style="{ height: '60px' }"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="Type"
              align="center"
              label="传感器类型">
            </el-table-column>
            <el-table-column
              prop="Id"
              align="center"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="Name"
              align="center"
              label="构件名">
            </el-table-column>
            <el-table-column
              prop="X"
              align="center"
              label="X">
            </el-table-column>
            <el-table-column
              prop="Y"
              align="center"
              label="Y">
            </el-table-column>
            <el-table-column
              prop="Z"
              align="center"
              label="Z">
            </el-table-column>
            <el-table-column
              prop="Description"
              align="center"
              label="状态">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqBridgeOneSensorBaseInfo } from '@/request/ZhShao/api.js'
export default {
  mounted () {
    this.getSensorBaseInfo()
  },
  data () {
    return {
      /* 下拉框配置项 */
      options: [{
        value: 'Profiler',
        label: '姿态盒'
      }, {
        value: 'StrainGauges',
        label: '应变片'
      }],
      /* 默认选项 */
      selectValue: 'Profiler',
      /* 姿态盒数据 */
      profilerData: [],
      /* 传感器数据 */
      strainGaugesData: []
    }
  },
  methods: {
    // 请求传感器位置数据
    async getSensorBaseInfo () {
      const data = await reqBridgeOneSensorBaseInfo()
      console.log(data)
      // 请求数据成功
      if (data.statusCode === 200) {
        this.profilerData = data.data.Profiler
        this.strainGaugesData = data.data.StrainGauges
        // data.data.forEach((item) => {
        //   if (item.Type === 'Profiler') {
        //     item.Type = '姿态盒'
        //     this.profilerData.push(item)
        //   } else if (item.Type === 'StrainGauges') {
        //     item.Type = '应变片'
        //     this.strainGaugesData.push(item)
        //   }
        // })
      }
    },

    /* 表行添加类名 */
    tableRowClassName ({ row }) {
      if (row.Description === '正常运行') {
        return 'safety'
      } else if (row.Description === '设备故障') {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/css/reset.css';
.sernor_info {
  height: calc(100% - 46px);

  .contain {
    display: flex;
    height: calc(100% - 73px);

    .contain_data {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: var(--ContainBgColor);

      .sernor_options {
        height: 60px;
        padding: 0 10px;
        line-height: 60px;
      }

      .table_warp {
        position: relative;
        height: calc(100% - 60px);
      }
    }
  }
}

/* 设置el-table高度响应式 */
.sernor_info .el-table {
  position: absolute;
  top: 0px;
  bottom: 0;
  overflow-y: scroll !important;
}
/* 修改字体颜色 */
.sernor_info .el-table .success-row {
    color: red !important;
}
</style>
