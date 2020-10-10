<template>
  <div class="login">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- 标题 -->
      <h3 class="title">桥梁监测系统平台</h3>
      <!-- 登录表单 -->
      <el-form class="login_form" :rules="loginFormRules" ref="loginFormRef" :model="loginForm">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="login_btn" @click="login" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqPostUser } from '@/request/ZhShao/api.js'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 登录表单绑定数据
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击登录按钮
    login() {
      // 验证表单
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          // 请求接口
          const data = await reqPostUser(this.loginForm.username, this.loginForm.password)
          // 请求接口成功
          if (Array.isArray(data.data)) {
            this.setUser(data.data[0])
            window.sessionStorage.setItem('token', JSON.stringify(data.data[0]))
            this.$router.push(this.$route.query.direction)
          } else {
            // 登录失败
            this.$message.error('登录失败')
          }
        }
      })
    },

    ...mapMutations('user', ['setUser'])
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgb(39, 44, 53);
}
/* 登录框 */
.login_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 349px;
  height: 282px;
  background-color: rgb(57, 64, 74);
}
.title {
  margin: 10px 0;
  color: rgb(178, 180, 184);
  font-size: 16px;
}
.login_form {
  width: 100%;
  /* background-color: beige; */
}
.login_form >>> .el-form-item__label {
  color: rgb(155, 165, 182);
}
.login_form >>> .el-input__inner {
  background-color: rgb(53, 59, 71);
  border: 1px solid rgb(53, 59, 71);
  /* color: rgb(114, 121, 130); */
}
.login_btn {
  width: 100%;
  /* background-color: rgb(78, 156, 210);
  border-color: rgb(78, 156, 210); */
}
.login_form >>> input::-webkit-input-placeholder {
  color: rgb(114, 121, 130);
}
.login_form >>> input::-moz-input-placeholder {
  color: rgb(114, 121, 130);
}
.login_form >>> input::-ms-input-placeholder {
  color: rgb(114, 121, 130);
}
</style>
