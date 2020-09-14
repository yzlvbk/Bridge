<template>
  <div>
    <!-- 头部区域 -->
    <header class="homeThree_header">桥梁安全评分</header>

    <!-- 内容区域 -->
    <div class="homeThree_content">
      <!-- 表格标题 -->
      <div class="homeThree_form">
        <div class="homeThree_form_title">桥梁安全评分</div>

        <!-- 表格标题 -->
        <table class="homeThree_form_table">
          <thead>
            <tr>
              <th>编号</th>
              <th>名称</th>
              <th>类型</th>
              <th>主体材质</th>
              <th>建设时间</th>
              <th>荷载</th>
              <th>健康评分</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in homeThreeTableData[currentPage]" :key="item.a">
              <td>{{item.BridgeId}}</td>
              <td>{{item.BridgeName}}</td>
              <td>{{item.BridgeType}}</td>
              <td>{{item.MainMaterial}}</td>
              <td>{{item.BuildYear}}</td>
              <td>{{item.LoadWeight}}</td>
              <td>{{item.HealthScore}}</td>
            </tr>
          </tbody>
        </table>

        <!-- 分页 -->
        <el-pagination
          class="homeThree_pagination"
          layout="prev, pager, next"
          background
          :current-page="currentPage"
          :page-size="5"
          @current-change="handleCurrentChange"
          :total="SafetyScoreList.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 当前页 默认为1
      currentPage: 1
    }
  },

  computed: {
    // 第三屏表格数据
    homeThreeTableData () {
      const result = {}
      let key = 1
      for (let i = 0; i < this.SafetyScoreList.length; i += 5) {
        result[key] = []
        result[key][0] = this.SafetyScoreList[i + 0]
        result[key][1] = this.SafetyScoreList[i + 1]
        result[key][2] = this.SafetyScoreList[i + 2]
        result[key][3] = this.SafetyScoreList[i + 3]
        result[key][4] = this.SafetyScoreList[i + 4]
        key++
      }
      return result
    }
  },

  methods: {
    // 当前页发生变化
    handleCurrentChange (newPage) {
      this.currentPage = newPage
    }
  }
}
</script>

<style lang="less" scoped>
.homeThree {
  background: url(../../assets/image/index_bg.png);

  .homeThree_header {
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 90px;
    font-size: 34px;
    color: #fff;
    background: url(../../assets/image/screen3_bg_top.png);
    background-size: 100% 100%;
  }

  .homeThree_content {
    display: flex;
    justify-content:center;
    height: 100%;
    margin-top: 30px;
    padding: 20px 40px;

    .homeThree_form {
      width: 90%;
      height: 400px;
      box-shadow: -10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset, 10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset;
      border: 1px solid #034c6a;
      box-sizing: border-box;
      position: relative;

      .homeThree_form_title {
        background-color: #034c6a;
        border-radius: 18px;
        position: absolute;
        height: 35px;
        width: 60%;
        top: -15px;
        color: #ffffff;
        font-weight: bold;
        font-size: 16px;
        left: 20%;
        line-height: 35px;
        text-align: center;
      }

      .homeThree_form_table {
        margin-top: 25px;
        width: 100%;
        border-collapse: collapse;
        position: absolute;
        text-align: center;
        overflow: scroll;

        thead {
          display: table-header-group;
          vertical-align: middle;
          border-color: inherit;
          tr {
            width: 100%;

            th {
              color: #61d2f7;
              font-size: 14px;
              font-weight: 600;
              padding-top: 12px;
              padding-bottom: 12px;
            }
          }
        }

        tbody {
          color: #ffffff;
          font-size: 14px;

          tr:nth-child(2n+1) {
            background-color: #072951;
            box-shadow: -10px 0px 15px #034c6a inset, 10px 0px 15px #034c6a inset;
          }

          td {
            padding: 12px 0;
          }
        }
      }

      .homeThree_pagination {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
