<template>
  <div class="bridge">
    <div class="bridge_header">
      <div class="header_title">桥梁健康监测系统</div>

      <div class="header_user">
        <div class="header_user_name">您好，admin</div>
      </div>
    </div>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <el-menu
        :default-active="activePath"
        background-color="rgba(44,84,126,0.1)"
        text-color="#fff"
        router
        :unique-opened="true"
        active-text-color=rgb(58,255,251)
        >
          <el-menu-item index="/ZhShaoMonitor">
            <i class="el-icon-menu"></i>
            <span slot="title">健康监测</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>传感器系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ZhShaoSensorData">数据显示</el-menu-item>
              <el-menu-item index="/ZhShaoSensorInfo">基本信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>结构反应</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ZhShaoStress">应力/内力</el-menu-item>
              <el-menu-item index="/ZhShaoTransform">变形/模态</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/ZhShaoMesh">
            <i class="el-icon-menu"></i>
            <span slot="title">Mesh</span>
          </el-menu-item>

          <el-menu-item index="/ZhShaoTraffic">
            <i class="el-icon-menu"></i>
            <span slot="title">车流分析</span>
          </el-menu-item>

          <el-menu-item index="/ZhShaoAssess">
            <i class="el-icon-menu"></i>
            <span slot="title">车载评估</span>
          </el-menu-item>

          <el-menu-item index="/ZhShaoStatement">
            <i class="el-icon-menu"></i>
            <span slot="title">报表</span>
          </el-menu-item>

          <el-menu-item index="/ZhShaoLog">
            <i class="el-icon-menu"></i>
            <span slot="title">日志</span>
          </el-menu-item>

          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>工程概况</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ZhShaoProjectInfo">基本信息</el-menu-item>
              <el-menu-item index="/ZhShaoProjectImg">图片、视频</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <!-- 主题内容 -->
      <el-main>
        <router-view></router-view>

        <!-- 底部logo -->
        <footer class="footer_logo">
          <img class="footer_logo_img" src="../../assets/LOGO.svg" alt="">
          <a href="javascript:;" class="header_title">仕达得尔智能科技</a>
        </footer>
      </el-main>

    </el-container>
  </div>
</template>

<script>
export default {
  created () {
    this.activePath = this.$route.path
  },
  data () {
    return {
      activePath: '' // 当前路径
    }
  }
}
</script>

<style lang="less" scoped>
.bridge {
  height: 100%;
  background-color: rgba(9, 22, 40, 1);
  background-size: 100% 100%;
}
.bridge_header {
  position: relative;
  display: flex;
  align-items: center;
  height: 65px;
  background-color: rgba(255, 255, 255, 0.07);
}
.header_title {
  margin-left: 20px;
  font-size: 22px;
  color: rgb(15,200,224);
}
.header_user {
  position: absolute;
  right: 100px;
  width: 100px;
}

.el-container {
  height: 100%;
}

.footer_logo {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 50px;

  .footer_logo_img {
    width: 40px;
    height: 40px;
  }
}
</style>
