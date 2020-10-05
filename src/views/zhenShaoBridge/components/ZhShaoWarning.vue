<template>
  <div class="zhenshao_warning">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>预警系统</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <div class="contain_warning_form">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="预警邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item label="预警号码">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>

          <el-form-item label="预警内容">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">发送预警</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        phone: '',

        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.zhenshao_warning {
  height: 100%;

  .contain {
    display: flex;
    height: calc(100% - 118px);
    box-sizing: border-box;
    padding: 30px 40px;
    background-color: var(--ContainBgColor);
    overflow-y: auto;

    .contain_warning_form {
      width: 40%;
    }
  }
}
</style>
