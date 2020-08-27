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
          <el-select v-model="value">
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
            :data="tableData"
            stripe
            height="100%"
            style="width: 100%; border: none;"
            :row-style="{ height: '60px' }"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="type"
              align="center"
              label="传感器类型">
            </el-table-column>
            <el-table-column
              prop="id"
              align="center"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="构件名">
            </el-table-column>
            <el-table-column
              prop="x"
              align="center"
              label="X">
            </el-table-column>
            <el-table-column
              prop="y"
              align="center"
              label="Y">
            </el-table-column>
            <el-table-column
              prop="z"
              align="center"
              label="Z">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /* 下拉框配置项 */
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      /* 默认选项 */
      value: '选项2',
      /* 表格数据 */
      tableData: [
        {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }, {
          type: '姿态盒',
          id: '编号',
          name: '构建名',
          x: '1.001',
          y: '129.3',
          z: '3.0'
        }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    /* 表行添加类名 */
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
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
