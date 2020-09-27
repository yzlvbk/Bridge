<template>
  <div>
    <full-page :options="options">
      <!-- 第一屏 -->
      <div class="section">
        <HomePageOne />
      </div>

      <!-- 第二屏 -->
      <div class="section">
        <HomePageTwo v-if="isInit" />
      </div>

      <!-- 第三屏 -->
      <div class="section">
        <HomePageThree v-if="isInit" />
      </div>
    </full-page>
  </div>
</template>
<script>
export default {
  mounted () {
    // 延迟加载第二屏和第三屏
    setTimeout(() => {
      this.isInit = true
    }, 1000)
  },
  data () {
    return {
      // 是否初始化
      isInit: false,

      // 整屏滚动配置项
      options: {
        licenseKey: 'OPEN-SOURCE-GPLv3-LICENSE',
        verticalCentered: false, // 每一页幻灯片的内容是否垂直居中
        scrollBar: false,
        menu: '#menu',
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide', 'thirdSlide']
      }
    }
  },
  components: {
    HomePageOne: () => import('@/components/Home/HomePageOne'),
    HomePageTwo: () => import('@/components/Home/HomePageTwo'),
    HomePageThree: () => import('@/components/Home/HomePageThree')
  }
}
</script>

<style lang="less">
// 整屏滚动小圆点
#fp-nav ul li {
  width: 16px;
  height: 16px;
  margin: 14px 7px;
}
#fp-nav ul li a span {
  height: 12px;
  width: 12px;
  margin: -6px 0 0 -6px;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
#fp-nav ul li a.active span {
  margin: -6px 0 0 -6px;
  background-color: rgba(255, 255, 255, 1);
}
</style>
