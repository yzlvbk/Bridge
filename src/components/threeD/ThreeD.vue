<template>
  <div class="three_d">
      <canvas id="webgl"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { bridgeVertex, bridgeFaceIndex, sensorVertex } from './three_js_vertex.js'
export default {
  mounted () {
    /* 渲染3D模型 */
    this.$nextTick(() => {
      this.drawThreeD()
    })
  },
  data () {
    return {
      sensorNameList: [
        'ZS01010',
        'ZS01012',
        'ZS01013',
        'ZS01014',
        'ZS01015',
        'ZS01016',
        'ZS01017',
        'ZS01018',
        'ZS01020',
        'ZS01021',
        'ZS01022',
        'ZS01023',
        'ZS01024',
        'ZS01029',
        'ZS01030',
        'ZS01031',
        'ZS01032',
        'ZS01033',
        'ZS01034',
        'ZS01035',
        'ZS01036',
        'ZS01038',
        'ZS01039',
        'ZS01040',
        'ZS01041',
        'ZS01050',
        'ZS01051',
        'ZS01052',
        'ZS01053',
        'ZS01059',
        'SR1',
        'SR2',
        'SR3',
        'SR4',
        'SR5',
        'SR6',
        'SR7',
        'SR8',
        'SR9',
        'SR10',
        'SR11',
        'SR12',
        'SR13'
      ]
    }
  },
  methods: {
    drawThreeD () {
      var container = document.querySelector('.three_d')

      /* 创建场景对象Scene */
      const scene = new THREE.Scene()

      /* 绘制桥梁模型 */
      const bridgeMesh = this.drawBridged(scene)

      /* 绘制传感器模型 */
      this.sensorNameList.forEach((item, index) => {
        this.drawSensor((index + 1), item, scene)
      })

      // 辅助坐标系   老版本AxisHelper 新版本AxesHelper
      var axisHelper = new THREE.AxisHelper(1000)
      scene.add(axisHelper)

      /* 光源设置 */
      // 点光源
      var point = new THREE.PointLight(0xffffff)
      point.position.set(0, 0, 100) // 点光源位置
      scene.add(point) // 点光源添加到场景中
      // 环境光
      var ambient = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambient)
      // 方向光
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
      // 注意：位置属性在这里不代表方向光的位置，你可以认为方向光没有位置
      directionalLight.position.set(1000, -1000, 1000)
      // 方向光指向对象，可以不设置，默认的位置是0,0,0
      directionalLight.target = bridgeMesh
      scene.add(directionalLight)

      // 辅助光源
      var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
      scene.add(directionalLightHelper)
      /**
     * 相机设置
     */
      var width = window.innerWidth // 窗口宽度
      var height = window.innerHeight // 窗口高度
      var k = width / height // 窗口宽高比
      var s = 2500 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // 创建相机对象s
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
      // 监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
      // controls.addEventListener('change', render)
    },

    // 绘制桥梁模型
    drawBridged (scene) {
      /* 创建网格模型 */
      var geometry = new THREE.Geometry()

      /* 顶点数组 */
      var bridgeVerticesArry = []
      /* 向顶点数组中循环添加THREE.Vector3 */
      for (let i = 0; i < bridgeVertex.length; i += 3) {
        bridgeVerticesArry.push(new THREE.Vector3(bridgeVertex[i], bridgeVertex[i + 1], bridgeVertex[i + 2]))
      }
      geometry.vertices = bridgeVerticesArry

      /*  Face3三角面数组 */
      var facesArry = []
      /* 三角面数组中循环添加THREE.Face3 */
      for (let i = 0; i < bridgeFaceIndex.length; i += 3) {
        facesArry.push(new THREE.Face3(bridgeFaceIndex[i], bridgeFaceIndex[i + 1], bridgeFaceIndex[i + 2]))
      }
      geometry.faces = facesArry

      /* 计算所有面法向量 */
      geometry.computeFaceNormals()

      // 材质对象(网格)渲染模式
      var material = new THREE.MeshLambertMaterial({
        color: 'pink', // 三角面颜色
        side: THREE.DoubleSide // 两面可见
      })
      var bridgeMesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
      scene.add(bridgeMesh) // 网格模型添加到场景中
      return bridgeMesh
    },

    // 绘制传感器模型
    drawSensor (num, name, scene) {
      var geometry2 = new THREE.Geometry() // 创建一个Buffer类型几何体对象
      geometry2.name = name

      const vertices2 = sensorVertex.slice((num - 1) * 24, num * 24)
      // 顶点数组
      var verticesArry2 = []

      for (let i = 0; i < vertices2.length; i += 3) {
        verticesArry2.push(new THREE.Vector3(vertices2[i], vertices2[i + 1], vertices2[i + 2]))
      }
      geometry2.vertices = verticesArry2

      var allFaceIndex2 = [0, 4, 5, 0, 1, 5, 1, 5, 6, 1, 2, 6, 2, 6, 7, 2, 3, 7, 3, 7, 4, 3, 0, 4, 0, 3, 2, 0, 1, 2, 4, 7, 6, 4, 5, 6]
      // Face3构造函数创建一个三角面
      var facesArry2 = []

      for (let i = 0; i < allFaceIndex2.length; i += 3) {
        facesArry2.push(new THREE.Face3(allFaceIndex2[i], allFaceIndex2[i + 1], allFaceIndex2[i + 2]))
      }
      geometry2.faces = facesArry2

      geometry2.computeFaceNormals()

      if (name.startsWith('SR')) {
        // 三角面(网格)渲染模式
        var material2 = new THREE.MeshLambertMaterial({
          color: 'red', // 三角面颜色
          side: THREE.DoubleSide // 两面可见
        }) // 材质对象
        var mesh2 = new THREE.Mesh(geometry2, material2) // 网格模型对象Mesh
        scene.add(mesh2) // 网格模型添加到场景中
      } else if (name.startsWith('ZS')) {
        // 三角面(网格)渲染模式
        // eslint-disable-next-line no-redeclare
        var material2 = new THREE.MeshLambertMaterial({
          color: 'blue', // 三角面颜色
          side: THREE.DoubleSide // 两面可见
        }) // 材质对象
        // eslint-disable-next-line no-redeclare
        var mesh2 = new THREE.Mesh(geometry2, material2) // 网格模型对象Mesh
        scene.add(mesh2) // 网格模型添加到场景中
      }
    }

  }

}
</script>

<style scoped lang="less">
.three_d {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

</style>
