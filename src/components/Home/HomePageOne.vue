<template>
  <div class="home_one">
    <!-- 头部区域 -->
    <div class="header">
      <div class="header_title">郑州桥梁展示系统</div>

      <!-- 滚动表 -->
      <div class="scroll_list">
        <dv-scroll-board :config="rebroadcastConfig" style="height:120px" />
      </div>

      <!-- 天气信息 -->
      <div v-if="weatherData" class="header_weather_warp">
        <div class="header_weather">
          <!-- 天气图标 -->
          <i class="iconfont" :class="'icontianqi-'+weatherIcon"></i>
          <!-- 温度 -->
          <span class="temperature">{{weatherData.nowTem}}°C</span>
          <!-- 城市和天气 -->
          <span class="header_weather_item">
            <span>{{weatherData.city}}</span>
            <span>{{weatherData.wea}}</span>
          </span>
          <!-- 温度范围和湿度 -->
          <span class="header_weather_item">
            <span>{{weatherData.minTem}}°C~{{weatherData.maxTem}}°C</span>
            <span>湿度: {{weatherData.humidity}}</span>
            <!-- 风向 -->
          </span>
          <span class="header_weather_item">
            <span>{{weatherData.win}} {{weatherData.win_speed}}</span>
            <span></span>
          </span>
        </div>
      </div>
    </div>

    <!-- 主题内容区域 -->
    <div class="main">
      <div class="main_middle">
        <div class="main_middle_title">
          <!-- 子系统标题 -->
          <div
            class="main_middle_item_warp"
            v-if="false"
            @mouseover="middleItemOver"
            @mouseout="middleItemOut"
            @click="middleItemClick('zhenShaoBridge')"
          >
            <dv-decoration-11
              class="main_middle_item"
              style="width:200px;height:60px;"
              :color="activeColor"
            >郑州桥监测系统</dv-decoration-11>
          </div>
        </div>
        <div class="main_middle_map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reqAllBridgeInfo,
  reqAllBridgeNotice
} from '@/request/ZhShao/api.js'
export default {
  mounted () {
    // 获取天气数据
    this.getWeatherData()

    // 获取桥梁轮播信息、所有桥梁信息
    this.getAllBridgeNotices()
    this.getAllBridgeInfo()

    // 初始化郑州地图
    this.$nextTick(function () {
      // this.drawZhengZhouMap()
    })
  },

  data () {
    return {
      // 天气数据
      weatherData: {},
      // 天气图标
      weatherIcon: '',

      // 全部桥梁信息
      allBridgeInfo: [],

      // 全部桥梁轮播信息
      allBridgeNoticesData: [],

      // 按钮当前选中颜色
      activeColor: []
    }
  },

  computed: {
    // 轮播表配置
    rebroadcastConfig () {
      const data = []
      this.allBridgeNoticesData.forEach((item) => {
        if (item.HealthScore < 60) {
          data.push([
            `<span style="color:#f56c6c;">${item.BridgeId}</span>`,
            `<span style="color:#f56c6c;">${item.BridgeName}</span>`,
            `<span style="color:#f56c6c;">${item.HealthScore}</span>`,
            `<span style="color:#f56c6c;">${item.HealthStatus}</span>`
          ])
        } else if (item.HealthScore > 80) {
          data.push([
            `<span style="color:#67c23a;">${item.BridgeId}</span>`,
            `<span style="color:#67c23a;">${item.BridgeName}</span>`,
            `<span style="color:#67c23a;">${item.HealthScore}</span>`,
            `<span style="color:#67c23a;">${item.HealthStatus}</span>`
          ])
        } else {
          data.push([
            `<span style="color:#e6a23c;">${item.BridgeId}</span>`,
            `<span style="color:#e6a23c;">${item.BridgeName}</span>`,
            `<span style="color:#e6a23c;">${item.HealthScore}</span>`,
            `<span style="color:#e6a23c;">${item.HealthStatus}</span>`
          ])
        }
      })

      return {
        header: ['编号', '名称', '评分', '状态'],
        data,
        rowNum: 3, // 表行数
        align: ['center', 'center', 'center', 'center', 'center', 'center'],
        headerBGC: 'rgba(255,255,255,0)',
        oddRowBGC: 'rgba(45,53,63,0)', // 奇数行背景色
        evenRowBGC: 'rgba(42,49,58,0)', // 偶数行背景色
        waitTime: 2000 // 轮播时间
      }
    },

    // 3D地图scatter数据
    scatterData () {
      const config = []
      console.log(this.allBridgeInfo)
      this.allBridgeInfo.forEach(item => {
        const value = [item.Longitude, item.Latitude, 100]
        item.value = value
        config.push(item)
      })
      return config
    }
  },

  methods: {
    // 请求天气数据
    async getWeatherData () {
      // xue、lei、shachen、wu、bingbao、yun、yu、yin、qing
      const { data } = await this.$http.get('https://www.tianqiapi.com/api?version=v61&appid=13392814&appsecret=RfDCQz2U&city=郑州')
      this.weatherData = {
        city: data.city,
        nowTem: data.tem,
        maxTem: data.tem1,
        minTem: data.tem2,
        wea: data.wea,
        wea_img: data.wea_img,
        win: data.win,
        win_speed: data.win_speed,
        humidity: data.humidity
      }
      // 重置天气图标格式
      switch (data.wea_img) {
        case 'xue':
          this.weatherIcon = 'xiaoxue'
          break

        case 'lei':
          this.weatherIcon = 'leidiantianqi'
          break

        case 'shachen':
          this.weatherIcon = 'shachenbao'
          break

        case 'wu':
          this.weatherIcon = 'wu'
          break

        case 'bingbao':
          this.weatherIcon = 'bingbao'
          break

        case 'yun':
          this.weatherIcon = 'duoyun'
          break

        case 'yu':
          this.weatherIcon = 'zhongyu'
          break

        case 'yin':
          this.weatherIcon = 'yin'
          break

        case 'qing':
          this.weatherIcon = 'qing'
          break
      }
    },

    // 请求全部桥梁信息
    async getAllBridgeInfo () {
      const data = await reqAllBridgeInfo()
      this.allBridgeInfo = data.data
      this.$nextTick(() => {
        this.drawZhengZhouMap()
      })
    },

    // 请求全部桥梁轮播信息
    async getAllBridgeNotices () {
      const data = await reqAllBridgeNotice()
      this.allBridgeNoticesData = data.data
    },

    // 绘制3D地图
    drawZhengZhouMap () {
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.querySelector('.main_middle_map'))
      var scatterData = this.scatterData
      console.log('111', scatterData)
      fetch('json/zhengzhou.json').then(response => response.json()).then(res => {
        // 注册地图名字和数据
        _this.$echarts.registerMap('zhengzhou', res)

        // 隐藏动画加载效果。
        myChart.hideLoading()

        // 图表配置项
        var option = {
          tooltip: { // 提示框
            trigger: 'item',
            formatter: function (params) {
              return '编号：' + params.data.BridgeCode + '<br>' +
              '类型：' + params.data.BridgeType + '<br>' +
              '材质：' + params.data.MainMaterial + '<br>' +
              '建筑年限：' + params.data.BuildYear + '<br>' +
              '载重：' + params.data.LoadWeight
            }
          },
          geo3D: {
            map: 'zhengzhou',
            type: 'map3D',
            regionHeight: 4,
            label: { // 标签的相关设置
              show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
              distance: 50, // 标签距离图形的距离，在三维的散点图中这个距离是屏幕空间的像素值，其它图中这个距离是相对的三维距离
              // formatter:,               // 标签内容格式器
              textStyle: { // 标签的字体样式
                color: '#000', // 地图初始化区域字体颜色
                fontSize: 14, // 字体大小
                opacity: 1, // 字体透明度
                backgroundColor: 'rgba(0,23,11,0)' // 字体背景色
              }
            },

            itemStyle: { // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              color: 'rgba(94, 152, 174, 1)', // 地图板块的颜色
              opacity: 1, // 图形的不透明度 [ default: 1 ]
              borderWidth: 0.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
              borderColor: '#000' // 图形描边的颜色。[ default: #333 ]
            },

            emphasis: { // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时  label和itemStyle 的样式)
              label: { // label高亮时的配置
                show: true,
                textStyle: {
                  // color: '#fff', // 高亮时标签颜色变为 白色
                  fontSize: 14 // 高亮时标签字体 变大
                }
              },
              itemStyle: { // itemStyle高亮时的配置
                color: 'rgba(94, 152, 174, 1)' // 高亮时地图板块颜色改变
              }
            },

            shading: 'lambert', // 三维地理坐标系组件中三维图形的着色效果，echarts-gl 中支持下面三种着色方式:
            // 'color' 只显示颜色，不受光照等其它因素的影响。
            // 'lambert' 通过经典的 lambert 着色表现光照带来的明暗。
            // 'realistic' 真实感渲染，配合 light.ambientCubemap 和 postEffect 使用可以让展示的画面效果和质感有质的提升。ECharts GL 中使用了基于物理的渲染（PBR） 来表现真实感材质。
            // realisticMaterial: {}    // 真实感材质相关的配置项，在 shading 为'realistic'时有效。
            // lambertMaterial: {}      // lambert 材质相关的配置项，在 shading 为'lambert'时有效。
            // colorMaterial: {}        // color 材质相关的配置项，在 shading 为'color'时有效。

            light: { // 光照相关的设置。在 shading 为 'color' 的时候无效。  光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
              main: { // 场景主光源的设置，在 globe 组件中就是太阳光。
                color: '#eee', // 主光源的颜色。[ default: #fff ]
                intensity: 1.2, // 主光源的强度。[ default: 1 ]
                // shadow: true, // 主光源是否投射阴影。默认关闭。    开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
                // shadowQuality: 'high', // 阴影的质量。可选'low', 'medium', 'high', 'ultra' [ default: 'medium' ]
                alpha: 90, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
                beta: 0 // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
              },
              ambient: { // 全局的环境光设置。
                color: '#fff', // 环境光的颜色。[ default: #fff ]
                intensity: 0.4 // 环境光的强度。[ default: 0.2 ]
              }
            },

            viewControl: { // 用于鼠标的旋转，缩放等视角控制。
              projection: 'perspective', // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
              autoRotate: false, // 是否开启视角绕物体的自动旋转查看。[ default: false ]
              autoRotateDirection: 'cw', // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
              autoRotateSpeed: 10, // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
              autoRotateAfterStill: 3, // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
              damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
              rotateSensitivity: 1, // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
              zoomSensitivity: 0, // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
              panSensitivity: 1, // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
              panMouseButton: 'left', // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
              rotateMouseButton: 'left', // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

              distance: 100, // [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
              minDistance: 40, // [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。
              maxDistance: 400, // [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。

              alpha: 40, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
              beta: 15, // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
              minAlpha: -360, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
              maxAlpha: 360, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
              minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
              maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]

              center: [0, 0, 0], // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。

              animation: true, // 是否开启动画。[ default: true ]
              animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
              animationEasingUpdate: 'cubicInOut' // 过渡动画的缓动效果。[ default: cubicInOut ]
            }
          },

          series: [
            {
              type: 'scatter3D',
              coordinateSystem: 'geo3D',
              data: scatterData,
              symbol: 'pin',
              symbolSize: 30,
              itemStyle: {
                color: 'red',
                borderColor: '#fff',
                borderWidth: 1
              },
              label: {
                show: true,
                formatter: function (params) {
                  return params.data.BridgeName
                },
                position: 'top',
                textStyle: {
                  color: '#000',
                  backgroundColor: '#fff'
                }
              },
              emphasis: {
                itemStyle: {
                  color: 'pink',
                  borderColor: '#fff',
                  borderWidth: 1
                }
              }
            }
          ]
        }
        myChart.setOption(option)

        // 让图表跟随屏幕自动的去适应
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      })

      myChart.on('click', function (params) {
        console.log(params)
        if (params.data.BridgeName === '桥1') {
          _this.$router.push('zhenShaoBridge')
        }
      })
    },

    // 鼠标移入标题
    middleItemOver () {
      this.activeColor = ['pink', '#eee']
    },
    // 鼠标移出标题
    middleItemOut () {
      this.activeColor = []
    },
    // 鼠标点击标题
    middleItemClick (path) {
      this.$router.push(path)
    }

  }
}
</script>

<style lang="less" scoped>
.home_one {
  height: 100%;
  background: url(../../assets/image/bg.jpg) no-repeat;
  // background-color: rgba(9, 22, 40, 1) !important;
  background-size: 100% 100%;

  .header {
    position: relative;

    .header_title {
      text-align: center;
      line-height: 75px;
      font-size: 22px;
      height: 90px;
      background: url(../../assets/image/topbg.png) no-repeat;
      background-size: 100% 100%;
    }

    .scroll_list {
      position: absolute;
      top: 58px;
      left: 10px;
      width: 30%;
      max-width: 500px;
      z-index: 100;
    }

    .header_weather_warp{
      .header_weather {
      display: flex;
      align-items: center;
      position: absolute;
      right: 10px;
      top: 40px;
      height: 60px;
      text-align: left;

        .iconfont {
          font-size: 40px;
        }
        .temperature {
          margin: 0 7px;
          font-size: 22px;
        }
        .header_weather_item {
          display: flex;
          height: 36px;
          margin-right: 7px;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }

  }

  .main {
    position: relative;
    height: 100%;

    .main_middle {
      position: absolute;
      width: 100%;
      height: calc(100% - 90px);
      // border: 1px solid #fff;
    }
    .main_middle_map {
      width: 100%;
      height: 100%;
    }
    .main_middle_title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
    }
    .main_middle_item {
      cursor: pointer;
    }

  }
  .icontianqi-shachenbao { color: rgb(131,210,248); }
  .icontianqi-zhongyu { color: rgb(20, 84, 122); }
  .icontianqi-wu { color: rgb(218, 223, 227); }
  .icontianqi-qing { color: rgb(254, 202, 76);}
  .icontianqi-bingbao { color: rgb(218, 223, 227); }
  .icontianqi-xiaoxue { color: rgb(218, 223, 227); }
  .icontianqi-leidiantianqi { color: rgb(125, 125, 137); }
  .icontianqi-yin { color: rgb(20, 84, 122); }
  .icontianqi-duoyun { color: rgb(218, 223, 227);}
}
</style>
