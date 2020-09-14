<template>
    <div>
        <full-page :options="options">
          <!-- 第一屏 -->
            <div class="section">
              <HomePageOne />
            </div>

            <!-- 第二屏 -->
            <div class="section">
              <HomePageTwo />
            </div>

            <!-- 第三屏 -->
            <div class="section homeThree">

            </div>
        </full-page>
    </div>
</template>
<script>
import {
  reqAllBridgeInfo,
  reqAllBridgeSafetyScore
} from '@/request/ZhShao/api.js'
import HomePageOne from '@/components/Home/HomePageOne'
import HomePageTwo from '@/components/Home/HomePageTwo'
export default {
  async mounted () {
    const lv = await reqAllBridgeInfo() // 包含经纬度信息
    const lv2 = await reqAllBridgeSafetyScore()
    console.log(lv)
    console.log(lv2)
  },
  data () {
    return {
      // 整屏滚动配置项
      options: {
        licenseKey: 'OPEN-SOURCE-GPLv3-LICENSE',
        verticalCentered: false, // 每一页幻灯片的内容是否垂直居中
        scrollBar: false,
        menu: '#menu',
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide', 'thirdSlide']
        // sectionsColor: ['rgba(9, 22, 40, 1)', 'skyblue', 'pink']
      }
    }
  },
  methods: {
  },
  components: {
    HomePageOne,
    HomePageTwo
  }
}
</script>

<style lang="less" scoped>
</style>
