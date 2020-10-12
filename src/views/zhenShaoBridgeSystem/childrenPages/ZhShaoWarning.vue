<template>
  <div class="zhenshao_warning">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>预警系统</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <!-- 添加预警联系方式 -->
      <div class="add_contact">
        <el-button type="primary" size="small" @click="addDialogVisible = true">添加预警联系方式</el-button>
      </div>

      <!-- 预警联系方式列表 -->
      <div class="contact_table_title">预警联系人列表</div>
      <div class="contact_table_warp">
        <table class="contact_table">
          <thead>
            <tr>
              <th width="50px">序号</th>
              <th>联系方式</th>
              <th>联系人</th>
              <th width="200px">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in contactList" :key="index">
              <td>{{index + 1}}</td>
              <td>{{item.contactType}}</td>
              <td>{{item.contactPerson}}</td>
              <td>
                <el-button size="mini" type="info" @click="editContact(index)">修改</el-button>
                <el-button size="mini" type="warning" @click="deleteContact(index)">删除</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 添加联系方式弹出框 -->
      <el-dialog title :visible.sync="addDialogVisible" width="30%">
        <div class="dialog_title">联系人:</div>
        <el-input v-model.trim="addContactPersonValue" placeholder="请输入联系人"></el-input>

        <div class="dialog_title">联系方式:</div>
        <el-input v-model.trim="addContactTypeValue" type="number" placeholder="请输入联系方式"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addContact">添 加</el-button>
        </span>
      </el-dialog>

      <!-- 修改联系方式弹出框 -->
      <el-dialog title :visible.sync="editDialogVisible" width="30%">
        <div class="dialog_title">联系人:</div>
        <el-input v-model.trim="editContactPersonValue" placeholder="请输入联系人"></el-input>

        <div class="dialog_title">联系方式:</div>
        <el-input v-model.trim="editContactTypeValue" type="number" placeholder="请输入联系方式"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="info" @click="confirmEditContact">修 改</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 预警联系方式列表 */
      contactList: [
        {
          contactType: '199xxxx9999',
          contactPerson: 'xxx'
        }
      ],

      // 添加预警联系人弹出框
      addDialogVisible: false,
      // 添加联系方式输入值
      addContactPersonValue: '',
      addContactTypeValue: '',

      // 修改预警联系人弹出框
      editDialogVisible: false,
      // 修改对象索引
      editContactIndex: 0,
      // 修改联系方式输入值
      editContactPersonValue: '',
      editContactTypeValue: ''
    }
  },
  methods: {
    // 添加预警联系方式
    addContact() {
      this.addDialogVisible = false
      if (!this.addContactPersonValue || !this.addContactTypeValue) return this.$message.warning('请输入正确联系人和联系方式')
      this.contactList.push({
        contactType: this.addContactTypeValue,
        contactPerson: this.addContactPersonValue
      })
      this.addContactPersonValue = ''
      this.addContactTypeValue = ''
    },

    // 修改预警联系方式
    editContact(index) {
      this.editDialogVisible = true
      this.editContactIndex = index // 保存修改对象索引
      this.editContactPersonValue = this.contactList[index].contactPerson
      this.editContactTypeValue = this.contactList[index].contactType
    },
    // 确定修改预警联系方式
    confirmEditContact() {
      this.editDialogVisible = false
      if (!this.editContactPersonValue || !this.editContactTypeValue) return this.$message.warning('请输入正确联系人和联系方式')
      this.contactList[this.editContactIndex].contactType = this.editContactTypeValue
      this.contactList[this.editContactIndex].contactPerson = this.editContactPersonValue
    },

    // 删除预警联系方式
    deleteContact(index) {
      this.contactList.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.zhenshao_warning {
  height: 100%;

  .contain {
    height: calc(100% - 118px);
    box-sizing: border-box;
    padding: 20px 20px;
    background-color: var(--ContainBgColor);
    overflow-y: auto;

    .add_contact {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .contact_table_title {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .contact_table_warp {
      width: 100%;
      max-height: 80%;
      overflow-y: auto;

      .contact_table {
        width: 100%;
        font-size: 14px;
        border-width: 1px;
        border-color: var(--LightTextColor);
        border-collapse: collapse;

        th {
          border-width: 1px;
          padding: 8px;
          border-style: solid;
          border-color: var(--LightTextColor);
          text-align: center;
        }
        td {
          border-width: 1px;
          padding: 8px;
          border-style: solid;
          border-color: var(--LightTextColor);
          text-align: center;
        }
      }
    }

    .el-dialog {
      .dialog_title {
        margin: 10px 0;
      }
    }
  }
}
</style>
