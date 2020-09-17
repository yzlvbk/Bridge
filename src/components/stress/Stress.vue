<template>
  <div class="transform_mesh">
    <canvas class="bridge_stress"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { MeshPointObj } from './bridgePointData'
import { reqBridgeOneMemberForce } from '@/request/ZhShao/api.js'
export default {
  async mounted () {
    // 获取应变值
    this.getStressData()
    // 获取Mesh数据
    this.getMeshData()
  },
  data () {
    return {
      // 面板
      panel1: [
        110101,
        110102,
        110103,
        110104
      ],

      panel2: [
        110104,
        110201,
        110202,
        110203,
        110204
      ],

      panel3: [
        110204,
        110301,
        110302,
        110303,
        110304
      ],

      panel4: [
        110304,
        110401,
        110402,
        110403,
        110404
      ],

      panel5: [
        110404,
        110501,
        110502,
        110503,
        110504
      ],

      panel6: [
        110504,
        110601,
        110602,
        110603,
        110604
      ],

      panel7: [
        110604,
        110701,
        110702,
        110703,
        110704
      ],

      panel8: [
        110704,
        110801,
        110802,
        110803,
        110804
      ],

      panel9: [
        110804,
        110901,
        110902,
        110903,
        110904
      ],

      panel10: [
        110904,
        111001,
        111002,
        111003,
        111004
      ],

      panel11: [
        111004,
        111101,
        111102,
        111103,
        111104
      ],

      panel12: [
        111104,
        111201,
        111202,
        111203,
        111204,
        111301
      ],

      // 拱形
      vaulted1: [
        210203,
        210204,
        210301,
        210302,
        210303,
        210304
      ],

      vaulted2: [
        210304,
        210401,
        210402,
        210403,
        210404
      ],

      vaulted3: [
        210404,
        210501,
        210502,
        210503,
        210504
      ],

      vaulted4: [
        210504,
        210601,
        210602,
        210603,
        210604
      ],

      vaulted5: [
        210604,
        210701,
        210702,
        210703,
        210704
      ],

      vaulted6: [
        210704,
        210801,
        210802,
        210803,
        210804
      ],

      vaulted7: [
        210804,
        210901,
        210902,
        210903,
        210904
      ],

      vaulted8: [
        210904,
        211001,
        211002,
        211003,
        211004
      ],

      vaulted9: [
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
      panel1List: [],
      panel2List: [],
      panel3List: [],
      panel4List: [],
      panel5List: [],
      panel6List: [],
      panel7List: [],
      panel8List: [],
      panel9List: [],
      panel10List: [],
      panel11List: [],
      panel12List: [],
      // 所有拱形点数据
      vaulted1List: [],
      vaulted2List: [],
      vaulted3List: [],
      vaulted4List: [],
      vaulted5List: [],
      vaulted6List: [],
      vaulted7List: [],
      vaulted8List: [],
      vaulted9List: [],
      // 所有支柱点数据
      bar1List: [],
      bar2List: [],
      bar3List: [],
      bar4List: [],
      bar5List: [],
      bar6List: [],
      bar7List: [],
      bar8List: [],

      // 应变值
      stressDataObj: {}
    }
  },
  methods: {
    // 处理Mesh数据
    getMeshData () {
      this.panel1.forEach(item => {
        this.panel1List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel2.forEach(item => {
        this.panel2List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel3.forEach(item => {
        this.panel3List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel4.forEach(item => {
        this.panel4List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel5.forEach(item => {
        this.panel5List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel6.forEach(item => {
        this.panel6List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel7.forEach(item => {
        this.panel7List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel8.forEach(item => {
        this.panel8List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel9.forEach(item => {
        this.panel9List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel10.forEach(item => {
        this.panel10List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel11.forEach(item => {
        this.panel11List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.panel12.forEach(item => {
        this.panel12List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })

      this.vaulted1.forEach(item => {
        this.vaulted1List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.vaulted2.forEach(item => {
        this.vaulted2List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.vaulted3.forEach(item => {
        this.vaulted3List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.vaulted4.forEach(item => {
        this.vaulted4List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.vaulted5.forEach(item => {
        this.vaulted5List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.vaulted6.forEach(item => {
        this.vaulted6List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.vaulted7.forEach(item => {
        this.vaulted7List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.vaulted8.forEach(item => {
        this.vaulted8List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
      })
      this.vaulted9.forEach(item => {
        this.vaulted9List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
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
    },

    // 请求应变值
    async getStressData () {
      const data = await reqBridgeOneMemberForce()
      if (data.statusCode !== 200) return
      console.log(data)
      this.stressDataObj = data.data

      this.$nextTick(() => {
        this.drawStress()
      })
    },

    /* 绘制应力图 */
    drawStress () {
      const container = document.querySelector('.transform_mesh')

      /**
     * 创建场景对象Scene
     */
      var scene = new THREE.Scene()

      /* 基准模型 */
      // 桥面板部分
      this.drawMeshPart(this.panel1List, scene, 'red', 3)
      this.drawMeshPart(this.panel2List, scene, 'red', 3)
      this.drawMeshPart(this.panel3List, scene, 'red', 3)
      this.drawMeshPart(this.panel4List, scene, 'red', 3)
      this.drawMeshPart(this.panel5List, scene, 'red', 3)
      this.drawMeshPart(this.panel6List, scene, 'red', 3)
      this.drawMeshPart(this.panel7List, scene, 'red', 3)
      this.drawMeshPart(this.panel8List, scene, 'red', 3)
      this.drawMeshPart(this.panel9List, scene, 'red', 3)
      this.drawMeshPart(this.panel10List, scene, 'red', 3)
      this.drawMeshPart(this.panel11List, scene, 'red', 3)
      this.drawMeshPart(this.panel12List, scene, 'red', 3)
      // 拱形部分
      this.drawMeshPart(this.vaulted1List, scene, 'red', 3)
      this.drawMeshPart(this.vaulted2List, scene, 'red', 3)
      this.drawMeshPart(this.vaulted3List, scene, 'red', 3)
      this.drawMeshPart(this.vaulted4List, scene, 'red', 3)
      this.drawMeshPart(this.vaulted5List, scene, 'red', 3)
      this.drawMeshPart(this.vaulted6List, scene, 'red', 3)
      this.drawMeshPart(this.vaulted7List, scene, 'red', 3)
      this.drawMeshPart(this.vaulted8List, scene, 'red', 3)
      this.drawMeshPart(this.vaulted9List, scene, 'red', 3)
      // 支柱部分
      this.drawMeshPart(this.bar1List, scene, 'red', 3)
      this.drawMeshPart(this.bar2List, scene, 'red', 3)
      this.drawMeshPart(this.bar3List, scene, 'red', 3)
      this.drawMeshPart(this.bar4List, scene, 'red', 3)
      this.drawMeshPart(this.bar5List, scene, 'red', 3)
      this.drawMeshPart(this.bar6List, scene, 'red', 3)
      this.drawMeshPart(this.bar7List, scene, 'red', 3)
      this.drawMeshPart(this.bar8List, scene, 'red', 3)

      /* 应变模型 */
      const keysList = Object.keys(this.stressDataObj)
      keysList.forEach(key => {
        let color
        const linewidth = Number(this.stressDataObj[key]) / 50 + 3
        console.log(linewidth)
        if (linewidth < 0) {
          color = 'blue'
        } else if (linewidth < 5) {
          color = 'pink'
        } else if (linewidth < 10) {
          color = 'purple'
        } else {
          color = 'skyblue'
        }
        this.drawMeshPart(this[key + 'List'], scene, color, 3)
      })

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
    drawMeshPart (part, scene, color, linewidth) {
      /* 创建网格模型 */
      var geometry = new LineGeometry() // 创建一个Buffer类型几何体对象

      // 几何体传入顶点坐标
      geometry.setPositions(part)

      // 线条渲染模式
      var material = new LineMaterial({
        color: color,
        linecap: 'butt',
        linejoin: 'miter',
        linewidth
      })// 材质对象
      material.resolution.set(window.innerWidth, window.innerHeight)
      var line = new Line2(geometry, material)// 线条模型对象
      line.computeLineDistances()
      scene.add(line)// 线条对象添加到场景中
    }
  }
}
</script>
