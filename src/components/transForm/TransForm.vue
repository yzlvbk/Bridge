<template>
  <div class="threeD_stress">
    <canvas class="bridge_stress"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { reqBridgeOneMeshDeform } from '@/request/ZhShao/api.js'
import { MeshPointObj } from './bridgePointData'
export default {
  mounted () {
    // 处理Mesh数据
    this.getMeshData()
  },
  props: ['sliderValue'],
  data () {
    return {
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

      // 变形Mesh数据
      deformMeshObj: {},

      // 所有变形面板点数据
      panelDeformList: [],
      // 所有变形拱形点数据
      vaultedDeformList: [],
      // 所有变形支柱点数据
      bar1DeformList: [],
      bar2DeformList: [],
      bar3DeformList: [],
      bar4DeformList: [],
      bar5DeformList: [],
      bar6DeformList: [],
      bar7DeformList: [],
      bar8DeformList: [],

      scene: '',
      renderer: '',

      // 防抖定时器
      timer: null
    }
  },
  methods: {
    // 请求Mesh数据
    getMeshData () {
      this.panel.forEach(item => {
        this.panelList.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.vaulted.forEach(item => {
        this.vaultedList.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.bar1.forEach(item => {
        this.bar1List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.bar2.forEach(item => {
        this.bar2List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.bar3.forEach(item => {
        this.bar3List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.bar4.forEach(item => {
        this.bar4List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.bar5.forEach(item => {
        this.bar5List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.bar6.forEach(item => {
        this.bar6List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.bar7.forEach(item => {
        this.bar7List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.bar8.forEach(item => {
        this.bar8List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })

      // this.getMeshDeformData(10000) // 10000表示放大10000倍
    },

    // 请求变形Mesh数据
    async getMeshDeformData (s) {
      const data = await reqBridgeOneMeshDeform('2020-01-09 10:24:02', '2020-01-09 10:34:02')
      this.deformMeshObj = await data.data.Mesh.JointArray.Joint['2020/1/9 10:24:02']
      // console.log(this.deformMeshObj)
      this.panelDeformList = []
      this.vaultedDeformList = []
      this.bar1DeformList = []
      this.bar2DeformList = []
      this.bar3DeformList = []
      this.bar4DeformList = []
      this.bar5DeformList = []
      this.bar6DeformList = []
      this.bar7DeformList = []
      this.bar8DeformList = []
      this.panel.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.panelDeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })

      this.vaulted.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.vaultedDeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })
      this.bar1.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.bar1DeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })
      this.bar2.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.bar2DeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })
      this.bar3.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.bar3DeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })
      this.bar4.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.bar4DeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })
      this.bar5.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.bar5DeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })
      this.bar6.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.bar6DeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })
      this.bar7.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.bar7DeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })
      this.bar8.forEach(item => {
        MeshPointObj[item] && this.deformMeshObj[item] && this.bar8DeformList.push((Number(MeshPointObj[item].X) + (Number(this.deformMeshObj[item].X) * s)), (Number(MeshPointObj[item].Y) + (Number(this.deformMeshObj[item].Y) * s)), (Number(MeshPointObj[item].Z) + (Number(this.deformMeshObj[item].Z) * s)))
      })

      this.$nextTick(() => {
        this.drawStress()
      })
    },

    /* 绘制应力图 */
    drawStress () {
      const _this = this
      const container = document.querySelector('.threeD_stress')

      /**
     * 创建场景对象Scene
     */
      _this.scene = new THREE.Scene()

      // 桥面板部分
      this.drawMeshPart(this.panelList, _this.scene, '#fff')
      // 拱形部分
      this.drawMeshPart(this.vaultedList, _this.scene, '#fff')
      // 支柱部分
      this.drawMeshPart(this.bar1List, _this.scene, '#fff')
      this.drawMeshPart(this.bar2List, _this.scene, '#fff')
      this.drawMeshPart(this.bar3List, _this.scene, '#fff')
      this.drawMeshPart(this.bar4List, _this.scene, '#fff')
      this.drawMeshPart(this.bar5List, _this.scene, '#fff')
      this.drawMeshPart(this.bar6List, _this.scene, '#fff')
      this.drawMeshPart(this.bar7List, _this.scene, '#fff')
      this.drawMeshPart(this.bar8List, _this.scene, '#fff')

      // 桥面板变形部分
      this.drawMeshPart(this.panelDeformList, _this.scene, 'red')
      // 拱形变形部分
      this.drawMeshPart(this.vaultedDeformList, _this.scene, 'red')
      // 支柱变形部分
      this.drawMeshPart(this.bar1DeformList, _this.scene, 'red')
      this.drawMeshPart(this.bar2DeformList, _this.scene, 'red')
      this.drawMeshPart(this.bar3DeformList, _this.scene, 'red')
      this.drawMeshPart(this.bar4DeformList, _this.scene, 'red')
      this.drawMeshPart(this.bar5DeformList, _this.scene, 'red')
      this.drawMeshPart(this.bar6DeformList, _this.scene, 'red')
      this.drawMeshPart(this.bar7DeformList, _this.scene, 'red')
      this.drawMeshPart(this.bar8DeformList, _this.scene, 'red')

      /**
     * 光源设置
     */
      // 点光源
      var point = new THREE.PointLight(0xffff)
      point.position.set(0, 4000, 0) // 点光源位置
      _this.scene.add(point) // 点光源添加到场景中
      // 环境光
      var ambient = new THREE.AmbientLight(0x444444)
      _this.scene.add(ambient)
      // console.log(scene)
      // console.log(scene.children)
      /**
     * 相机设置
     */
      var width = window.innerWidth // 窗口宽度
      var height = window.innerHeight // 窗口高度
      var k = width / height // 窗口宽高比
      var s = 5000 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // 创建相机对象
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, -100000, 100000)
      camera.position.set(0, -4000, 0) // 设置相机位置
      camera.lookAt(_this.scene.position) // 设置相机方向(指向的场景对象)
      /**
     * 创建渲染器对象
     */

      _this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: container.querySelector('canvas')
      })
      _this.renderer.setSize(width, height)// 设置渲染区域尺寸
      // renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色

      // 渲染函数
      function render () {
        _this.renderer.render(_this.scene, camera) // 执行渲染操作
        requestAnimationFrame(render)
      }
      render()
      // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
      // eslint-disable-next-line no-unused-vars
      var controls = new OrbitControls(camera, _this.renderer.domElement)
    },

    // 绘制Mesh部分
    drawMeshPart (part, scene, color) {
      /* 创建网格模型 */
      var geometry = new LineGeometry() // 创建一个Buffer类型几何体对象

      // 几何体传入顶点坐标
      geometry.setPositions(part)

      // 线条渲染模式
      var material = new LineMaterial({
        color: color,
        linewidth: 1
      })// 材质对象
      material.resolution.set(window.innerWidth, window.innerHeight)
      var line = new Line2(geometry, material)// 线条模型对象
      line.computeLineDistances()
      scene.add(line)// 线条对象添加到场景中
    },

    // 函数防抖
    debounce (sliderValue) {
      const _this = this
      if (_this.timer !== null) clearTimeout(_this.timer)
      _this.timer = setTimeout(function () {
        _this.getMeshDeformData(sliderValue)
      }, 500)
    }
  },

  watch: {
    sliderValue (newname, name) {
      if (this.scene && this.renderer) {
        this.scene.remove()
        this.renderer.dispose()
        this.debounce(newname)
        // this.getMeshDeformData(newname)
      } else {
        console.log(22)
        this.getMeshDeformData(newname)
      }
    }
  }
}
</script>
