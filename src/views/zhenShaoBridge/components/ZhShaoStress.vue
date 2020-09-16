<template>
  <div class="stress">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>结构反应</el-breadcrumb-item>
      <el-breadcrumb-item>应力/内力</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">

      <div class="three_d_model" style="width: 60%;">
        <canvas class="bridge_stress" :width="canvasWidth" :height="canvasHeight"></canvas>
      </div>

      <!-- 空隙模块 -- 控制模块拖动 -->
      <div class="vsplitter" ref="vsplitter"></div>

      <div class="chart" style="width: 40%;">
        <!-- echarts图 -->
        <div class="stress_chart"></div>

        <!-- table表格 -->
        <div class="stress_data">
          <el-table
            ref="tableList"
            :data="tableData"
            stripe
            height="100%"
            style="width: 100%; border: none;"
            :row-style="{ height: '60px' }"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="id"
              align="center"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="material"
              align="center"
              label="主题材质">
            </el-table-column>
            <el-table-column
              prop="level"
              align="center"
              label="安全级别">
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
/* 监听图表div宽高变化 */
import elementResizeDetectorMaker from 'element-resize-detector'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { reqBridgeOneMesh, reqBridgeOneMeshDeform } from '@/request/ZhShao/api.js'
export default {
  async mounted () {
    const data = await reqBridgeOneMeshDeform('2020-01-09 10:24:02', '2020-01-09 10:34:02')
    console.log(data)
    // 获取Mesh数据
    this.getMeshData()
    /* 获取canvas的宽高 */
    const wrapDiv = document.querySelector('.three_d_model')
    this.canvasWidth = window.getComputedStyle(wrapDiv, null).getPropertyValue('width')
    this.canvasHeight = window.getComputedStyle(wrapDiv, null).getPropertyValue('height')

    /* 添加移动内容区域窗口大小事件 */
    const div = document.querySelector('.vsplitter')
    div.addEventListener('mousedown', this.mouseResize)

    /* 渲染3D模型 */
    this.$nextTick(() => {
      this.drawChart()
    })
  },
  data () {
    return {
      canvasWidth: '', // 应力图宽度
      canvasHeight: '', // 应力图高度度

      /* 表格数据 */
      tableData: [
        {
          id: '01',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '02',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '03',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '04',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '05',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '06',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '07',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '08',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '09',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '10',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '11',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '12',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }, {
          id: '13',
          name: '桥面板1',
          material: '混凝土',
          level: '6.0'
        }
      ],

      // 面板
      panel: [
        110101,
        110102,
        110103,
        110104,
        110201,
        110202,
        110203,
        110204,
        110301,
        110302,
        110303,
        110304,
        110401,
        110402,
        110403,
        110404,
        110501,
        110502,
        110503,
        110504,
        110601,
        110602,
        110603,
        110604,
        110701,
        110702,
        110703,
        110704,
        110801,
        110802,
        110803,
        110804,
        110901,
        110902,
        110903,
        110904,
        111001,
        111002,
        111003,
        111004,
        111101,
        111102,
        111103,
        111104,
        111201,
        111202,
        111203,
        111204,
        111301
      ],

      // 拱形
      vaulted: [
        210203,
        210204,
        210301,
        210302,
        210303,
        210304,
        210401,
        210402,
        210403,
        210404,
        210501,
        210502,
        210503,
        210504,
        210601,
        210602,
        210603,
        210604,
        210701,
        210702,
        210703,
        210704,
        210801,
        210802,
        210803,
        210804,
        210901,
        210902,
        210903,
        210904,
        211001,
        211002,
        211003,
        211004,
        211101,
        211102,
        211103
      ],

      // 支柱1
      bar1: [
        310201,
        310202,
        310203,
        310204,
        210201
      ],

      // 支柱2
      bar2: [
        310301,
        310302,
        310303,
        310304,
        210301
      ],

      // 支柱3
      bar3: [
        310401,
        310402,
        310403,
        310404,
        210401
      ],

      // 支柱4
      bar4: [
        310501,
        310502,
        310503,
        310504,
        210501
      ],

      // 支柱5
      bar5: [
        310901,
        310902,
        310903,
        310904,
        210901
      ],

      // 支柱6
      bar6: [
        311001,
        311002,
        311003,
        311004,
        211001
      ],

      // 支柱7
      bar7: [
        311101,
        311102,
        311103,
        311104,
        211101
      ],

      // 支柱8
      bar8: [
        311201,
        311202,
        311203,
        311204,
        211201
      ],

      // 所有面板点数据
      panelList: [],
      // 所有拱形点数据
      vaultedList: [],
      // 所有支柱点数据
      bar1List: [],
      bar2List: [],
      bar3List: [],
      bar4List: [],
      bar5List: [],
      bar6List: [],
      bar7List: [],
      bar8List: [],

      // Mesh所有点数据
      MeshPointObj: {}
    }
  },
  methods: {
    // 请求Mesh数据
    async getMeshData () {
      const data = await reqBridgeOneMesh()
      if (data.statusCode !== 200) return
      // 保存Mesh点数据
      this.MeshPointObj = data.data.Mesh.JointArray.Joint
      // console.log(this.MeshPointObj)

      this.panel.forEach(item => {
        this.panelList.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })
      this.vaulted.forEach(item => {
        this.vaultedList.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })
      this.bar1.forEach(item => {
        this.bar1List.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })
      this.bar2.forEach(item => {
        this.bar2List.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })
      this.bar3.forEach(item => {
        this.bar3List.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })
      this.bar4.forEach(item => {
        this.bar4List.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })
      this.bar5.forEach(item => {
        this.bar5List.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })
      this.bar6.forEach(item => {
        this.bar6List.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })
      this.bar7.forEach(item => {
        this.bar7List.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })
      this.bar8.forEach(item => {
        this.bar8List.push(this.MeshPointObj[item].X, this.MeshPointObj[item].Y, this.MeshPointObj[item].Z)
      })

      this.drawStress()
    },

    /* 绘制应力图 */
    drawStress () {
      const container = document.querySelector('.three_d_model')

      /**
     * 创建场景对象Scene
     */
      var scene = new THREE.Scene()

      // 桥面板部分
      this.drawMeshPart(this.panelList, scene)
      // 拱形部分
      this.drawMeshPart(this.vaultedList, scene)
      // 支柱1部分
      this.drawMeshPart(this.bar1List, scene)
      this.drawMeshPart(this.bar2List, scene)
      this.drawMeshPart(this.bar3List, scene)
      this.drawMeshPart(this.bar4List, scene)
      this.drawMeshPart(this.bar5List, scene)
      this.drawMeshPart(this.bar6List, scene)
      this.drawMeshPart(this.bar7List, scene)
      this.drawMeshPart(this.bar8List, scene)

      /**
     * 光源设置
     */
      // 点光源
      var point = new THREE.PointLight(0xffff)
      point.position.set(0, 4000, 0) // 点光源位置
      scene.add(point) // 点光源添加到场景中
      // 环境光
      var ambient = new THREE.AmbientLight(0x444444)
      scene.add(ambient)
      // console.log(scene)
      // console.log(scene.children)
      /**
     * 相机设置
     */
      var width = window.innerWidth // 窗口宽度
      var height = window.innerHeight // 窗口高度
      var k = width / height // 窗口宽高比
      var s = 4000 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // 创建相机对象
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, -100000, 100000)
      camera.position.set(0, -4000, 0) // 设置相机位置
      camera.lookAt(scene.position) // 设置相机方向(指向的场景对象)
      /**
     * 创建渲染器对象
     */

      var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: container.querySelector('canvas')
      })
      renderer.setSize(width, height)// 设置渲染区域尺寸
      // renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色

      // 渲染函数
      function render () {
        renderer.render(scene, camera) // 执行渲染操作
        requestAnimationFrame(render)
      }
      render()
      // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
      // eslint-disable-next-line no-unused-vars
      var controls = new OrbitControls(camera, renderer.domElement)
    },

    // 绘制Mesh部分
    drawMeshPart (part, scene) {
      /* 创建网格模型 */
      var geometry = new LineGeometry() // 创建一个Buffer类型几何体对象

      // 几何体传入顶点坐标
      geometry.setPositions(part)

      // 线条渲染模式
      var material = new LineMaterial({
        color: 0xffffff,
        linewidth: 5
      })// 材质对象
      material.resolution.set(window.innerWidth, window.innerHeight)
      var line = new Line2(geometry, material)// 线条模型对象
      line.computeLineDistances()
      scene.add(line)// 线条对象添加到场景中
    },

    /* 绘制echarts图表 */
    drawChart () {
      // 定义颜色
      var fontColor = 'rgb(15, 200, 224)'
      var lineColor = '#CACACA'

      // moocX轴数据
      const dataX = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']

      // 1.初始化echarts
      var myChart = this.$echarts.init(document.querySelector('.stress_chart'))
      // 2.配置option
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '10px',
          textStyle: {
            color: lineColor
          }

        },
        grid: {
          left: '4%',
          right: '12%',
          bottom: '5%',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              show: true
            },
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            borderColor: lineColor
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 坐标轴两边留白
          data: dataX,
          name: '时间',
          nameTextStyle: {
            color: lineColor
          },
          // axisLabel: { //坐标轴刻度标签的相关设置。
          //     // interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
          // // margin:15,
          //     formatter:function(params) {
          //         var newParamsName = "";
          //         var paramsNameNumber = params.length;
          //         var provideNumber = 5;  //一行显示几个字
          //         var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          //         if (paramsNameNumber > provideNumber) {
          //             for (var p = 0; p < rowNumber; p++) {
          //                 var tempStr = "";
          //                 var start = p * provideNumber;
          //                 var end = start + provideNumber;
          //                 if (p == rowNumber - 1) {
          //                     tempStr = params.substring(start, paramsNameNumber);
          //                 } else {
          //                     tempStr = params.substring(start, end) + "\n";
          //                 }
          //                 newParamsName += tempStr;
          //             }

          //         } else {
          //             newParamsName = params;
          //         }
          //         return newParamsName
          //     },
          //     //rotate:50,
          // },
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }
        },
        yAxis: [{
          name: '倾角(deg)',
          nameTextStyle: {
            color: lineColor
          },
          type: 'value',
          splitNumber: 5,
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: lineColor,
              opacity: 0.3
            }
          },
          // eslint-disable-next-line no-dupe-keys
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: fontColor
            }
          }

        }],
        dataZoom: [
          // x轴滚动条
          {
            type: 'inside',
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          // y轴滚动条
          {
            type: 'inside',
            show: true,
            realtime: true,
            start: 0,
            end: 100,
            yAxisIndex: 0
          }
        ],
        series: [{
          name: '2018',
          type: 'line',
          symbol: 'emptyCircle', // 标记形状
          itemStyle: {
            normal: {
              color: 'rgba(58,132,255,1)', // 圆点颜色
              lineStyle: {
                color: 'rgba(58,132,255,1)',
                width: 1
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(58,132,255,0.5)'// 渐变色起始颜色
                }, {
                  offset: 1,
                  color: 'rgba(58,132,255,0)'// 渐变色结束颜色
                }])
              }
            }
          },
          data: [1, 2, 3, 3, 5, 6, 5, 3, 6, 5, 5, 4]
        },
        {
          name: '2015',
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgba(255,80,124,1)',
              lineStyle: {
                color: 'rgba(255,80,124,1)',
                width: 1
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255,80,124,0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(255,80,124,0)'
                }])
              }
            }
          },
          data: [9, 5, 7, 8, 6, 7, 8, 7, 7, 6, 8, 6]
        }]
      }

      // 3.将配置项给实例
      myChart.setOption(option)
      // 4.让图表跟随屏幕自动的去适应
      const erd = elementResizeDetectorMaker()
      erd.listenTo(document.querySelector('.stress_chart'), element => {
        myChart.resize()
      })
    },

    /* 表行添加类名 */
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },

    /* 鼠标点击改变尺寸 */
    mouseResize (e) {
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
    }

  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.stress {
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
      justify-content: center;
      align-items: center;
    }

    .vsplitter {
      height: calc(100% - 110px);
      width: 14px;
      cursor: col-resize;
    }

    .chart {
      display: flex;
      flex-direction: column;

      .stress_chart {
      position: relative;
      flex-basis: 50%;
      border-bottom: 5px solid var(--BgColor);
      overflow: hidden;
      }

      .stress_data {
      display: flex;
      flex-direction: column;
      position: relative;
      flex-basis: 50%;
      border-top: 5px solid var(--BgColor);
      }
    }
  }
}

/* 设置el-table高度响应式 */
.stress_data .el-table {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll !important;
}
/* 修改字体颜色 */
.stress_data .el-table .success-row {
    color: red !important;
}
</style>
