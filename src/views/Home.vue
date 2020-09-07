<template>
    <div>
        <full-page :options="options">
            <div class="section home">
                  <!-- 头部区域 -->
                  <div class="header">
                    <div class="header_title">郑州桥梁展示系统</div>
                    <div class="scroll_list"><dv-scroll-board :config="config" style="height:120px" /></div>
                    <div class="header_weather_warp">
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
                        <div class="main_middle_item_warp" @mouseover="middleItemOver" @mouseout="middleItemOut" @click="middleItemClick('zhenShaoBridge')">
                          <dv-decoration-11 class="main_middle_item" style="width:200px;height:60px;" :color="activeColor">郑州桥监测系统</dv-decoration-11>
                        </div>
                      </div>
                      <div class="main_middle_map"></div>
                    </div>
                  </div>
            </div>
            <div class="section homeTwo">
                <div class="homeTwo_header">郑州桥梁展示系统</div>
                <div class="homeTwo_title">郑州桥梁安全统计</div>
                <div class="homeTwo_content">
                  <img class="homeTwo_content_img" src="../assets/image/title.png" alt="">

                  <!-- 桥梁安全级别统计模块 -->
                  <div class="homeTwo_safety">
                    <!-- Echarts图表区域 -->
                    <div class="homeTwo_safety_chart"></div>
                    <!-- 无缝滚动区域 -->
                    <div class="homeTwo_safety_form">
                      <div class="homeTwo_safety_form_title">
                        <ul>
                          <li>编号</li>
                          <li>名称</li>
                          <li>类型</li>
                          <li>健康分值</li>
                          <li>安全级别</li>
                        </ul>
                      </div>
                      <vue-seamless-scroll :data="safetyLevelList" class="seamless_scroll" :style="'max-height: ' + seamlessMaxHeight">
                        <ul class="seamless_scroll_ul">
                          <li v-for="item in safetyLevelList" :key="item.BridgeId">
                            <span v-text="item.BridgeId"></span>
                            <span v-text="item.BridgeName"></span>
                            <span v-text="item.BridgeType"></span>
                            <span v-text="item.HealthScore"></span>
                            <span v-text="item.SafetyLevel"></span>
                          </li>
                        </ul>
                      </vue-seamless-scroll>
                    </div>
                  </div>

                  <!-- 桥梁车辆统计模块 -->
                  <div class="homeTwo_vehicle">
                    <!-- Echarts图表区域 -->
                    <div class="homeTwo_safety_chart"></div>
                    <!-- 无缝滚动区域 -->
                    <div class="homeTwo_safety_form">
                      <div class="homeTwo_safety_form_title">
                        <ul>
                          <li>编号</li>
                          <li>名称</li>
                          <li>类型</li>
                          <li>健康分值</li>
                          <li>安全级别</li>
                        </ul>
                      </div>
                      <vue-seamless-scroll :data="safetyLevelList" class="seamless_scroll" :style="'max-height: ' + seamlessMaxHeight">
                        <ul class="seamless_scroll_ul">
                          <li v-for="item in safetyLevelList" :key="item.BridgeId">
                            <span v-text="item.BridgeId"></span>
                            <span v-text="item.BridgeName"></span>
                            <span v-text="item.BridgeType"></span>
                            <span v-text="item.HealthScore"></span>
                            <span v-text="item.SafetyLevel"></span>
                          </li>
                        </ul>
                      </vue-seamless-scroll>
                    </div>
                  </div>
                </div>
            </div>
            <div class="section">
                <div class="box3">
                section3
                </div>
            </div>
        </full-page>
    </div>
</template>
<script>
// 导入表格无缝滚动插件
import vueSeamlessScroll from 'vue-seamless-scroll'
import {
  reqAllBridgeInfo,
  reqBridgeSafetyLevel,
  reqAllBridgeSafetyScore
} from '@/request/ZhShao/api.js'
export default {
  async mounted () {
    // 获取初始化数据
    this.getInitData()
    const lv = await reqAllBridgeInfo()
    console.log(lv)

    // 初始化郑州地图
    this.$nextTick(function () {
      this.drawZhengZhouMap()
      this.drawSafetyLevel()
    })

    // 请求天气数据
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
  data () {
    return {
      // 桥梁安全等级
      safetyLevelList: [],
      // 桥梁安全评分
      SafetyScoreList: [],

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
      },

      // 天气数据
      weatherData: {},
      // 天气图标
      weatherIcon: '',

      // 按钮当前选中颜色
      activeColor: [],

      // 轮播表配置
      config: {
        data: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ],
        rowNum: 3, // 表行数
        oddRowBGC: 'rgba(45,53,63,0.5)', // 奇数行背景色
        evenRowBGC: 'rgba(42,49,58,0.5)', // 偶数行背景色
        waitTime: 2000 // 轮播时间
      }
    }
  },
  methods: {
    // 请求初始化数据
    getInitData () {
      const promise1 = reqBridgeSafetyLevel() // 桥梁安全等级
      const promise2 = reqAllBridgeSafetyScore() // 桥梁安全评分

      Promise.all([promise1, promise2]).then((res) => {
        this.safetyLevelList = res[0].data
        this.SafetyScoreList = res[1].data
        console.log(res)
      })
    },
    /* 第一屏 */
    // 绘制3D地图
    drawZhengZhouMap () {
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.querySelector('.main_middle_map'))
      var scatterData = [
        {
          name: '郑州桥监测',
          value: [
            113.729471,
            34.453334,
            100
          ]
        },
        {
          name: '郑州桥监测2',
          value: [
            113.546923,
            34.780839,
            100
          ]
        },
        {
          name: '郑州桥监测3',
          value: [
            113.594628,
            34.678241,
            100
          ]
        },
        {
          name: '郑州桥监测3',
          value: [
            0,
            0,
            100
          ]
        }
      ]
      fetch('json/zhengzhou.json').then(response => response.json()).then(res => {
        console.log(res)

        // 注册地图名字和数据
        _this.$echarts.registerMap('zhengzhou', res)

        // 隐藏动画加载效果。
        myChart.hideLoading()

        // 图表配置项
        var option = {
          tooltip: { // 提示框
            trigger: 'item',
            formatter: function (params) {
              return params.name
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
              symbolSize: 40,
              itemStyle: {
                color: 'red',
                borderColor: '#fff',
                borderWidth: 1
              },
              label: {
                show: true,
                formatter: '郑州桥监测',
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
        if (params.data.name === '郑州桥监测') {
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
    },

    /* 第二屏 */
    // 绘制安全统计级别
    drawSafetyLevel () {
      // 1.初始化echarts
      const myChart = this.$echarts.init(document.querySelector('.homeTwo_safety_chart'))

      // 2.配置option
      const option = {
        // backgroundColor: '#031245',
        textStyle: {
          color: '#c0c3cd',
          fontSize: 14
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              backgroundColor: '#031245'
            },
            restore: {}
          },
          iconStyle: {
            borderColor: '#c0c3cd'
          }
        },
        legend: {
          top: 10,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          left: 'center',
          padding: 0,
          textStyle: {
            color: '#c0c3cd',
            fontSize: 14,
            padding: [2, 0, 0, 0]
          }
        },
        color: ['#63caff', '#49beff', '#03387a', '#03387a', '#03387a', '#6c93ee', '#a9abff', '#f7a23f', '#27bae7', '#ff6d9d', '#cb79ff', '#f95b5a', '#ccaf27', '#38b99c', '#93d0ff', '#bd74e0', '#fd77da', '#dea700'],
        grid: {
          containLabel: true,
          left: 20,
          right: 20,
          bottom: 10,
          top: 40
        },
        xAxis: {
          nameTextStyle: {
            color: '#c0c3cd',
            padding: [0, 0, -10, 0],
            fontSize: 14
          },
          axisLabel: {
            color: '#c0c3cd',
            fontSize: 14,
            interval: 0
          },
          axisTick: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          data: ['0点~2点', '3点~5点', '6点~8点', '0点~2点', '3点~5点', '6点~8点', '0点~2点', '3点~5点'],
          type: 'category'
        },
        yAxis: {
          nameTextStyle: {
            color: '#c0c3cd',
            padding: [0, 0, -10, 0],
            fontSize: 14
          },
          axisLabel: {
            color: '#c0c3cd',
            fontSize: 14
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#384267',
              width: 1
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#384267'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#384267',
              width: 1
            },
            show: true
          },
          name: ''
        },
        series: [{
          data: [200, 85, 112, 275, 305, 415, 741, 405],
          type: 'bar',
          barMaxWidth: 'auto',
          barWidth: 30,
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: 'linear',
              global: false,
              colorStops: [{
                offset: 0,
                color: '#0b9eff'
              }, {
                offset: 1,
                color: '#63caff'
              }]
            }
          },
          label: {
            show: true,
            position: 'top',
            distance: 10,
            color: '#fff'
          }
        }, {
          data: [1, 1, 1, 1, 1, 1, 1, 1],
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbol: 'diamond',
          symbolOffset: [0, '50%'],
          symbolSize: [30, 15]
        }, {
          data: [200, 85, 112, 275, 305, 415, 741, 405],
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbolPosition: 'end',
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [30, 12],
          zlevel: 2
        }, {
          data: [741, 741, 741, 741, 741, 741, 741, 741],
          type: 'bar',
          barMaxWidth: 'auto',
          barWidth: 30,
          barGap: '-100%',
          zlevel: -1
        }, {
          data: [1, 1, 1, 1, 1, 1, 1, 1],
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbol: 'diamond',
          symbolOffset: [0, '50%'],
          symbolSize: [30, 15],
          zlevel: -2
        }, {
          data: [741, 741, 741, 741, 741, 741, 741, 741],
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbolPosition: 'end',
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [30, 12],
          zlevel: -1
        }],
        tooltip: {
          trigger: 'axis',
          show: false
        }
      }

      // 3.将配置项给实例
      myChart.setOption(option)

      // 4.跟随屏幕自适应
      window.onresize = function () {
        myChart.resize()
      }
    }
  },
  computed: {
    // 第二屏无缝滚动最大高度
    seamlessMaxHeight () {
      return this.safetyLevelList.length * 45 + 'px'
    }
  },
  components: {
    vueSeamlessScroll
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  background: url(../assets/image/bg.jpg) no-repeat;
  // background-color: rgba(9, 22, 40, .1) !important;
  background-size: 100% 100%;

  .header {
    position: relative;

    .header_title {
      text-align: center;
      line-height: 75px;
      font-size: 22px;
      height: 90px;
      background: url(../assets/image/topbg.png) no-repeat;
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

.homeTwo{
  height: 100%;
  padding: 0 20px;
  background: url(../assets/image/bg3.png) no-repeat;
  // background-color: rgb(17, 30, 58);
  background-size: 100% 100%;

  .homeTwo_header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    padding-top: 15px;
    font-size: 24px;
    color: #fff;
  }

  .homeTwo_title {
    text-indent: 35px;
    margin-top: 20px;
    color: #fff;
    font-size: 24px;
    height: 33px;
    line-height: 33px;
    margin-bottom: 25px;
  }

  .homeTwo_content {
    position: relative;
    display: flex;
    justify-content: space-around;
    padding: 15px;
    height: calc(100% - 195px);
    border: 1px solid #081f5a;
    box-sizing: border-box;

    .homeTwo_content_img {
      position: absolute;
      left: 70px;
      top: -13px;
      width: 269px;
      display: block;
    }

    .homeTwo_safety {
      display: flex;
      flex-direction: column;
      flex-basis: 50%;
      margin-right: 20px;
      background: linear-gradient(to left, #003BCF, #003BCF) left top no-repeat, linear-gradient(to bottom, #003BCF, #003BCF) left top no-repeat, linear-gradient(to left, #003BCF, #003BCF) right top no-repeat, linear-gradient(to bottom, #003BCF, #003BCF) right top no-repeat, linear-gradient(to left, #003BCF, #003BCF) left bottom no-repeat, linear-gradient(to bottom, #003BCF, #003BCF) left bottom no-repeat, linear-gradient(to left, #003BCF, #003BCF) right bottom no-repeat, linear-gradient(to left, #003BCF, #003BCF) right bottom no-repeat;
      background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px;
      background-color: #0B0F2A;

      .homeTwo_safety_chart {
        flex-basis: 60%;
        overflow: hidden;
      }

      .homeTwo_safety_form {
        position: relative;
        flex-basis: 40%;
        margin-top: 20px;
        overflow: hidden;
        background-color: rgb(23, 45, 73);

        .homeTwo_safety_form_title {
          height: 50px;
          background-color: rgb(4, 62, 117);

          ul {
            display: flex;
            height: 100%;
            align-items: center;
          }
          li {
            flex-basis: 20%;
            text-align: center;
            font-size: 14px;
          }
        }

        .seamless_scroll {
          overflow: hidden;

          .seamless_scroll_ul {
            li {
              display: flex;
              justify-content: space-around;
              height: 45px;

              span {
                flex-basis: 20%;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
              }
            }
          }
        }
      }
    }

    .homeTwo_vehicle {
      display: flex;
      flex-direction: column;
      flex-basis: 50%;
      margin-left: 20px;
      background: linear-gradient(to left, #003BCF, #003BCF) left top no-repeat, linear-gradient(to bottom, #003BCF, #003BCF) left top no-repeat, linear-gradient(to left, #003BCF, #003BCF) right top no-repeat, linear-gradient(to bottom, #003BCF, #003BCF) right top no-repeat, linear-gradient(to left, #003BCF, #003BCF) left bottom no-repeat, linear-gradient(to bottom, #003BCF, #003BCF) left bottom no-repeat, linear-gradient(to left, #003BCF, #003BCF) right bottom no-repeat, linear-gradient(to left, #003BCF, #003BCF) right bottom no-repeat;
      background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px;
      background-color: #0B0F2A;

      .homeTwo_safety_chart {
        flex-basis: 60%;
        overflow: hidden;
      }

      .homeTwo_safety_form {
        position: relative;
        flex-basis: 40%;
        margin-top: 20px;
        overflow: hidden;
        background-color: rgb(23, 45, 73);

        .homeTwo_safety_form_title {
          height: 50px;
          background-color: rgb(4, 62, 117);

          ul {
            display: flex;
            height: 100%;
            align-items: center;
          }
          li {
            flex-basis: 20%;
            text-align: center;
            font-size: 14px;
          }
        }

        .seamless_scroll {
          overflow: hidden;

          .seamless_scroll_ul {
            li {
              display: flex;
              justify-content: space-around;
              height: 45px;

              span {
                flex-basis: 20%;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}

/* 设置el-table高度响应式 */
.homeTwo .el-table {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll !important;
}
</style>
