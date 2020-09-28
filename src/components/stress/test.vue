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
    // 获取Mesh数据
    this.getStressData()
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
    // 请求应变值并处理
    async getStressData () {
      const data = await reqBridgeOneMemberForce()
      if (data.statusCode !== 200) return
      this.stressDataObj = data.data

      // 缩放比列
      const zoom = 3
      this.panel1.forEach(item => {
        this.panel1List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        // Z轴增加
        this.panel1List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel1) / zoom)
      })
      this.panel2.forEach(item => {
        this.panel2List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        // Z轴增加
        this.panel2List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel2) / zoom)
      })
      this.panel3.forEach(item => {
        this.panel3List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel3List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel3) / zoom)
      })
      this.panel4.forEach(item => {
        this.panel4List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel4List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel4) / zoom)
      })
      this.panel5.forEach(item => {
        this.panel5List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel5List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel5) / zoom)
      })
      this.panel6.forEach(item => {
        this.panel6List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel6List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel6) / zoom)
      })
      this.panel7.forEach(item => {
        this.panel7List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel7List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel7) / zoom)
      })
      this.panel8.forEach(item => {
        this.panel8List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel8List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel8) / zoom)
      })
      this.panel9.forEach(item => {
        this.panel9List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel9List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel9) / zoom)
      })
      this.panel10.forEach(item => {
        this.panel10List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel10List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel10) / zoom)
      })
      this.panel11.forEach(item => {
        this.panel11List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel11List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel11) / zoom)
      })
      this.panel12.forEach(item => {
        this.panel12List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.panel12List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.panel12) / zoom)
      })

      this.vaulted1.forEach(item => {
        this.vaulted1List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.vaulted1List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.vaulted1) / zoom)
      })
      this.vaulted2.forEach(item => {
        this.vaulted2List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.vaulted2List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.vaulted2) / zoom)
      })
      this.vaulted3.forEach(item => {
        this.vaulted3List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.vaulted3List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.vaulted3) / zoom)
      })
      this.vaulted4.forEach(item => {
        this.vaulted4List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.vaulted4List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.vaulted4) / zoom)
      })
      this.vaulted5.forEach(item => {
        this.vaulted5List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.vaulted5List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.vaulted5) / zoom)
      })
      this.vaulted6.forEach(item => {
        this.vaulted6List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.vaulted6List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.vaulted6) / zoom)
      })
      this.vaulted7.forEach(item => {
        this.vaulted7List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.vaulted7List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.vaulted7) / zoom)
      })
      this.vaulted8.forEach(item => {
        this.vaulted8List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.vaulted8List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.vaulted8) / zoom)
      })
      this.vaulted9.forEach(item => {
        this.vaulted9List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.vaulted9List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.vaulted9) / zoom)
      })

      this.bar1.forEach(item => {
        this.bar1List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.bar1List.push(MeshPointObj[item].X + 20, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.bar1) / zoom)
      })
      this.bar2.forEach(item => {
        this.bar2List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.bar2List.push(MeshPointObj[item].X + 20, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.bar2) / zoom)
      })
      this.bar3.forEach(item => {
        this.bar3List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.bar3List.push(MeshPointObj[item].X + 20, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.bar3) / zoom)
      })
      this.bar4.forEach(item => {
        this.bar4List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.bar4List.push(MeshPointObj[item].X + 20, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.bar4) / zoom)
      })
      this.bar5.forEach(item => {
        this.bar5List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.bar5List.push(MeshPointObj[item].X + 20, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.bar5) / zoom)
      })
      this.bar6.forEach(item => {
        this.bar6List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.bar6List.push(MeshPointObj[item].X + 20, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.bar6) / zoom)
      })
      this.bar7.forEach(item => {
        this.bar7List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.bar7List.push(MeshPointObj[item].X + 20, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.bar7) / zoom)
      })
      this.bar8.forEach(item => {
        this.bar8List.push(MeshPointObj[item].X, MeshPointObj[item].Y, MeshPointObj[item].Z)
        this.bar8List.push(MeshPointObj[item].X + 20, MeshPointObj[item].Y, MeshPointObj[item].Z - Number(this.stressDataObj.bar8) / zoom)
      })

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
      // this.drawMeshPart(this.panel1List, scene, 'red', 3)
      // this.drawMeshPart(this.panel2List, scene, 'red', 3)
      // this.drawMeshPart(this.panel3List, scene, 'red', 3)
      // this.drawMeshPart(this.panel4List, scene, 'red', 3)
      // this.drawMeshPart(this.panel5List, scene, 'red', 3)
      // this.drawMeshPart(this.panel6List, scene, 'red', 3)
      // this.drawMeshPart(this.panel7List, scene, 'red', 3)
      // this.drawMeshPart(this.panel8List, scene, 'red', 3)
      // this.drawMeshPart(this.panel9List, scene, 'red', 3)
      // this.drawMeshPart(this.panel10List, scene, 'red', 3)
      // this.drawMeshPart(this.panel11List, scene, 'red', 3)
      // this.drawMeshPart(this.panel12List, scene, 'red', 3)
      // // 拱形部分
      // this.drawMeshPart(this.vaulted1List, scene, 'red', 3)
      // this.drawMeshPart(this.vaulted2List, scene, 'red', 3)
      // this.drawMeshPart(this.vaulted3List, scene, 'red', 3)
      // this.drawMeshPart(this.vaulted4List, scene, 'red', 3)
      // this.drawMeshPart(this.vaulted5List, scene, 'red', 3)
      // this.drawMeshPart(this.vaulted6List, scene, 'red', 3)
      // this.drawMeshPart(this.vaulted7List, scene, 'red', 3)
      // this.drawMeshPart(this.vaulted8List, scene, 'red', 3)
      // this.drawMeshPart(this.vaulted9List, scene, 'red', 3)
      // // 支柱部分
      // this.drawMeshPart(this.bar1List, scene, 'red', 3)
      // this.drawMeshPart(this.bar2List, scene, 'red', 3)
      // this.drawMeshPart(this.bar3List, scene, 'red', 3)
      // this.drawMeshPart(this.bar4List, scene, 'red', 3)
      // this.drawMeshPart(this.bar5List, scene, 'red', 3)
      // this.drawMeshPart(this.bar6List, scene, 'red', 3)
      // this.drawMeshPart(this.bar7List, scene, 'red', 3)
      // this.drawMeshPart(this.bar8List, scene, 'red', 3)

      /* 应变模型 */
      // const keysList = Object.keys(this.stressDataObj)
      // keysList.forEach(key => {
      //   const linewidth = Number(this.stressDataObj[key]) / 50 + 3

      //   let color
      //   if (linewidth < 2) {
      //     color = '#ff7f50'
      //   } else if (linewidth < 4) {
      //     color = '#ff6347'
      //   } else if (linewidth < 6) {
      //     color = '#ff1493'
      //   } else if (linewidth < 6) {
      //     color = '#8b008b'
      //   } else if (linewidth < 8) {
      //     color = '#4b0082'
      //   } else if (linewidth < 10) {
      //     color = '#ff00ff'
      //   } else if (linewidth < 12) {
      //     color = '#8a2be2'
      //   } else if (linewidth < 14) {
      //     color = '#8b008b'
      //   } else if (linewidth < 16) {
      //     color = '#4b0082'
      //   }
      //   this.drawMeshPart(this[key + 'List'], scene, color, 3)
      // })

      // 绘制Mesh矩形宽度
      this.drawMeshRect(this.panel1List, scene, this.stressDataObj.panel1)
      this.drawMeshRect(this.panel2List, scene, this.stressDataObj.panel2)
      this.drawMeshRect(this.panel3List, scene, this.stressDataObj.panel3)
      this.drawMeshRect(this.panel4List, scene, this.stressDataObj.panel4)
      this.drawMeshRect(this.panel5List, scene, this.stressDataObj.panel5)
      this.drawMeshRect(this.panel6List, scene, this.stressDataObj.panel6)
      this.drawMeshRect(this.panel7List, scene, this.stressDataObj.panel7)
      this.drawMeshRect(this.panel8List, scene, this.stressDataObj.panel8)
      this.drawMeshRect(this.panel9List, scene, this.stressDataObj.panel9)
      this.drawMeshRect(this.panel10List, scene, this.stressDataObj.panel10)
      this.drawMeshRect(this.panel11List, scene, this.stressDataObj.panel11)
      this.drawMeshRect(this.panel12List, scene, this.stressDataObj.panel12)

      this.drawMeshRect(this.vaulted1List, scene, this.stressDataObj.vaulted1)
      this.drawMeshRect(this.vaulted2List, scene, this.stressDataObj.vaulted2)
      this.drawMeshRect(this.vaulted3List, scene, this.stressDataObj.vaulted3)
      this.drawMeshRect(this.vaulted4List, scene, this.stressDataObj.vaulted4)
      this.drawMeshRect(this.vaulted5List, scene, this.stressDataObj.vaulted5)
      this.drawMeshRect(this.vaulted6List, scene, this.stressDataObj.vaulted6)
      this.drawMeshRect(this.vaulted7List, scene, this.stressDataObj.vaulted7)
      this.drawMeshRect(this.vaulted8List, scene, this.stressDataObj.vaulted8)
      this.drawMeshRect(this.vaulted9List, scene, this.stressDataObj.vaulted9)

      this.drawMeshRect(this.bar1List, scene, this.stressDataObj.bar1)
      this.drawMeshRect(this.bar2List, scene, this.stressDataObj.bar2)
      this.drawMeshRect(this.bar3List, scene, this.stressDataObj.bar3)
      this.drawMeshRect(this.bar4List, scene, this.stressDataObj.bar4)
      this.drawMeshRect(this.bar5List, scene, this.stressDataObj.bar5)
      this.drawMeshRect(this.bar6List, scene, this.stressDataObj.bar6)
      this.drawMeshRect(this.bar7List, scene, this.stressDataObj.bar7)
      this.drawMeshRect(this.bar8List, scene, this.stressDataObj.bar8)

      /**
     * 光源设置
     */
      // 点光源
      var point = new THREE.PointLight(0xffff)
      point.position.set(0, 4000, 0) // 点光源位置
      scene.add(point) // 点光源添加到场景中
      // 环境光
      var ambient = new THREE.AmbientLight(0xffffff)
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
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, -1000000, 1000000)
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
        linewidth
      })// 材质对象
      material.resolution.set(window.innerWidth, window.innerHeight)
      var line = new Line2(geometry, material)// 线条模型对象
      line.computeLineDistances()
      scene.add(line)// 线条对象添加到场景中
    },

    // 绘制Mesh矩形
    drawMeshRect (vertexAry, scene, stress) {
      /**
     * 创建网格模型
     */
      var geometry = new THREE.BufferGeometry() // 声明一个空几何体对象

      // 类型数组创建顶点位置position数据
      var vertices = new Float32Array(vertexAry)

      // 创建属性缓冲区对象
      var attribue = new THREE.BufferAttribute(vertices, 3) // 3个为一组，作为一个顶点的xyz坐标
      // 设置几何体attributes属性的位置position属性
      geometry.attributes.position = attribue

      // 动态计算索引数组
      const indexAry = []
      for (let i = 0; i < (vertices.length / 3 - 2); i++) {
        indexAry.push(i, i + 1, i + 2)
      }

      // Uint16Array类型数组创建顶点索引数据
      var indexes = new Uint16Array(indexAry)
      // 索引数据赋值给几何体的index属性
      geometry.index = new THREE.BufferAttribute(indexes, 1) // 1个为一组

      // console.log(stress)
      let color
      // if (stress < 2) {
      //   color = '#f01b10'
      // } else if (stress < 40) {
      //   color = '#dd8514'
      // } else if (stress < 80) {
      //   color = '#48e719'
      // } else if (stress < 120) {
      //   color = '#25ca20'
      // } else if (stress < 160) {
      //   color = '#29e66d'
      // } else if (stress < 200) {
      //   color = '#2ee5a8'
      // } else if (stress < 240) {
      //   color = '#2ebcbd'
      // } else if (stress < 280) {
      //   color = '#2b91e4'
      // } else {
      //   color = '#3d1bf8'
      // }
      // if (stress < 2) {
      //   color = 'red'
      // } else if (stress < 40) {
      //   color = 'green'
      // } else if (stress < 80) {
      //   color = 'blue'
      // } else if (stress < 120) {
      //   color = 'yellow'
      // } else if (stress < 160) {
      //   color = 'purple'
      // } else if (stress < 200) {
      //   color = '#ff00ff'
      // } else if (stress < 240) {
      //   color = '#8a2be2'
      // } else if (stress < 280) {
      //   color = '#8b008b'
      // } else {
      //   color = '#4b0082'
      // }
      console.log(color)
      // 材质对象
      var material = new THREE.MeshPhongMaterial({
        color: 'pink', // 三角面颜色
        side: THREE.DoubleSide // 两面可见
      })
      var mesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
      scene.add(mesh) // 网格模型添加到场景中
    }
  }
}
</script>
