<template>
  <div class="traffic">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>车流分析</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <div class="three_d_model" style="width: 60%;">
        <!-- <button @click="addImg">添加照片</button> -->
        <div class="showImg">
          <img :src="currentImg" width="500px" heigth="500px" />
        </div>

        <swiper class="swiper" :options="swiperOption" ref="mySwiper">
          <swiperSlide v-for="(item, index) in imgList" :key="index">
            <img class="swiper_img" :src="item" @click="handle(item)" width="100%" />
          </swiperSlide>

          <!-- <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination" slot="pagination"></div>-->
        </swiper>
      </div>

      <!-- 空隙模块 -- 控制模块拖动 -->
      <div class="vsplitter" ref="vsplitter"></div>

      <div class="chart" style="width: 40%;"></div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { reqBridgeOneTrafficPic } from '@/request/ZhShao/api.js'
export default {
  async activated() {
    console.log('activated')
    // 获取车流图片数据
    this.getTrafficImg()
    this.timer = setInterval(this.getTrafficImg, 2000)

    setTimeout(() => {
      clearInterval(this.timer)
    }, 20000)

    /* 添加移动内容区域窗口大小事件 */
    // const div = document.querySelector('.vsplitter')
    // div.addEventListener('mousedown', this.mouseResize)

    // this.$refs.mySwiper.on('click', this.handleClickSlide)
  },
  data() {
    return {
      timer: '',
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 30,
        freeMode: true,
        grabCursor: true, // 鼠标放在照片上变成手形
        pagination: {
          // el: '.swiper-pagination',
          // clickable: true
        },
        navigation: {
          // nextEl: '.swiper-button-next', // 前进按钮的css选择器或HTML元素。
          // revEl: '.swiper-button-prev' // 后退按钮的css选择器或HTML元素。
          // hideOnClick: true
        }
      },

      imgList: [], // 照片数组

      currentImg: '', // 当前展示的照片
      reqImgId: 94960 // 请求图片Id
    }
  },
  methods: {
    /* 请求车流图片 */
    async getTrafficImg() {
      const data = await reqBridgeOneTrafficPic(this.reqImgId)
      console.log(data)
      if (data.data.length === 0) return
      this.currentImg = 'data:image/png;base64,' + data.data[0].Base64Data
      this.imgList.push(this.currentImg)
      this.reqImgId = data.data[0].Id + 1
    },

    /* 鼠标点击改变尺寸 */
    mouseResize(e) {
      const startX = e.clientX // 初始鼠标位置
      const left = document.querySelector('.three_d_model')
      const right = document.querySelector('.chart')
      const leftWidth = left.style.width // 初始左边宽度
      const rightWidth = right.style.width // 初始右边宽度
      // 鼠标按下移动事件
      document.onmousedown = function (e) {
        document.onmousemove = function (e) {
          const move = e.clientX - startX
          left.style.width = `calc(${leftWidth} + ${move}px)`
          right.style.width = `calc(${rightWidth} - ${move}px)`
        }
      }

      // 鼠标弹起取消事件
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmousedown = null
      }
    },

    handle(img) {
      this.currentImg = img
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  deactivated() {
    console.log('deactivated')
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
@import '../../../assets/css/reset.css';
.traffic {
  height: 100%;

  .contain {
    display: flex;
    height: calc(100% - 20px);

    .three_d_model,
    .chart {
      height: calc(100% - 110px);
      background-color: var(--ContainBgColor);
      overflow: hidden;
    }

    .three_d_model {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .showImg {
        width: 500px;
        height: 500px;
        margin-bottom: 40px;

        img {
          width: 100%;
          height: 100%;
          background-color: #444;
          transform: rotate(90deg);
        }
      }
    }

    .vsplitter {
      height: calc(100% - 110px);
      width: 14px;
      cursor: col-resize;
    }
  }
}

/* swiper */
.swiper {
  height: 100px;
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    // background-color: lightgreen;
  }

  .swiper_img {
    transform: rotate(90deg);
  }
}
</style>
