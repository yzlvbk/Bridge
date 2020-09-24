<template>
  <div class="bridge">
    <div class="bridge_header">
      <div class="header_title">
        <router-link to="/">桥梁健康监测系统</router-link>
      </div>

      <div class="header_user">
        <div class="header_user_name">您好，admin</div>
        <div class="logout">
          <el-button type="info" size="mini">退出</el-button>
        </div>
      </div>
    </div>

    <el-container>
      <!-- 侧边栏 64px 220px-->
      <el-aside :width="isCollapse ? '64px' : '210px'">
        <!-- 折叠按钮 -->
        <div class="collapse" @click="isCollapse = !isCollapse">| | |</div>
        <!-- 导航菜单栏 -->
        <el-menu
        :default-active="activePath"
        background-color="rgba(14,27,43,1)"
        text-color="#eee"
        router
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        active-text-color=rgb(58,255,251)
        >
          <el-menu-item index="/ZhShaoMonitor">
            <i class="el-icon-message-solid"></i>
            <span slot="title">健康监测</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span>传感器系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ZhShaoSensorData">数据显示</el-menu-item>
              <el-menu-item index="/ZhShaoSensorInfo">基本信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-connection"></i>
              <span>结构反应</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ZhShaoStress">应力/内力</el-menu-item>
              <el-menu-item index="/ZhShaoTransform">变形/模态</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/ZhShaoTraffic">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">车流分析</span>
          </el-menu-item>

          <el-menu-item index="/ZhShaoAssess">
            <i class="el-icon-view"></i>
            <span slot="title">车载评估</span>
          </el-menu-item>

          <el-menu-item index="/ZhShaoStatement">
            <i class="el-icon-menu"></i>
            <span slot="title">报表</span>
          </el-menu-item>

          <el-menu-item index="/ZhShaoLog">
            <i class="el-icon-tickets"></i>
            <span slot="title">日志</span>
          </el-menu-item>

          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>工程概况</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ZhShaoProjectInfo">基本信息</el-menu-item>
              <!-- <el-menu-item index="/ZhShaoProjectImg">图片、视频</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <!-- 主题内容 -->
      <el-main>
        <keep-alive exclude="ZhShaoMonitor">
          <router-view></router-view>
        </keep-alive>

        <!-- 底部logo -->
        <!-- <footer class="footer_logo">
          <img class="footer_logo_img" src="../../assets/LOGO.svg" alt="">
          <a href="javascript:;" class="footer_title">仕达得尔智能科技</a>
        </footer> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  created () {
    this.activePath = this.$route.path

    // 浏览器宽度<1280px,默认折叠侧边栏
    if (window.innerWidth < 1280) {
      this.isCollapse = true
    }
  },
  data () {
    return {
      activePath: '', // 当前路径
      isCollapse: false // 控制侧边栏是否折叠
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/reset.css';
.bridge {
  height: 100%;
  background-color: var(--BgColor);
  // background-color: rgb(5, 24, 49);
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
  color: var(--LightTextColor);
}
.header_user {
  display: flex;
  position: absolute;
  right: 20px;
  align-items: center;
  // background-color: black;
  font-size: 14px;

  .header_user_name {
    margin-right: 30px;
  }
}

.collapse {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 15px;
  background-color:rgba(14,27,43,1);
  cursor: pointer;

  &:hover {
    color: rgb(15,200,224);
  }
}

.el-menu {
  height: calc(100% - 30px);
}
.el-container {
  height: 100%;
}

.footer_title {
  margin-left: 4px;
  font-size: 14px;
  color: var(--LightTextColor);
}
.footer_logo {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 38px;

  .footer_logo_img {
    width: 30px;
    height: 30px;
  }
}
</style>
