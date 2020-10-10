<template>
  <div class="bridge">
    <div class="bridge_header">
      <div class="header_title">桥梁健康监测系统</div>

      <div class="header_user">
        <div class="header_user_name">您好，{{this.userInfo.UserName}}</div>
        <div class="goHome" style="margin-right: 20px;">
          <router-link to="/">
            <el-button type="primary" size="mini">首页</el-button>
          </router-link>
        </div>
        <div class="logout">
          <el-button type="info" size="mini" @click="logout">退出</el-button>
        </div>
      </div>
    </div>

    <el-container>
      <!-- 侧边栏 64px 220px-->
      <el-aside :width="isCollapse ? '64px' : '210px'">
        <!-- 折叠按钮 -->
        <div class="collapse" @click="isCollapse = !isCollapse">| | |</div>
        <!-- 导航菜单栏 rgba(14,27,43,1)-->
        <el-menu
          :default-active="activePath"
          background-color="rgba(14,27,43,1)"
          text-color="#eee"
          router
          :collapse="isCollapse"
          :collapse-transition="false"
          :unique-opened="true"
          active-text-color="rgb(58,255,251)"
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

          <el-menu-item index="/ZhShaoProjectInfo">
            <i class="el-icon-location"></i>
            <span slot="title">工程概况</span>
          </el-menu-item>

          <el-menu-item index="/ZhShaoWarning">
            <i class="el-icon-location"></i>
            <span slot="title">预警系统</span>
          </el-menu-item>
        </el-menu>

        <div class="bottom_logo">
          <img src="../../assets/LOGO.svg" style="height:30px; width: 30px" alt />
          <a class="bottom_logo_text">仕达得尔智能科技</a>
        </div>
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
        </footer>-->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  created() {
    this.activePath = this.$route.path

    // 浏览器宽度<1280px,默认折叠侧边栏
    if (window.innerWidth < 1280) {
      this.isCollapse = true
    }

    // 获取用户数据
    if (!this.userInfo) {
      const userInfo = JSON.parse(window.sessionStorage.getItem('token'))
      this.setUser(userInfo)
    }
  },
  data() {
    return {
      activePath: '', // 当前路径
      isCollapse: false // 控制侧边栏是否折叠
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.replace('/')
    },

    ...mapMutations('user', ['setUser'])
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
  font-size: 14px;

  .header_user_name {
    margin-right: 30px;
  }
}

.el-aside {
  height: calc(100% - 65px);

  .collapse {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    background-color: rgba(14, 27, 43, 1);
    cursor: pointer;

    &:hover {
      color: rgb(15, 200, 224);
    }
  }

  .el-menu {
    height: calc(100% - 30px - 40px);
  }

  .bottom_logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-left: 25px;

    .bottom_logo_text {
      margin-left: 15px;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        color: aquamarine;
      }
    }
  }
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
