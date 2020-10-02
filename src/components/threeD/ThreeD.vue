<template>
  <div class="three_d">
    <div class="threed_icon">
      <!-- 斜视图 -->
      <span class="threed_icon_item" @click="changeView(210, 0, 45)">
        <img src="./threeDicon/obliqueView.png" alt />
      </span>
      <!-- 正视图 -->
      <span class="threed_icon_item" @click="changeView(210, 0, 0)">
        <img src="./threeDicon/frontView.png" alt />
      </span>
      <!-- 俯视图 -->
      <span class="threed_icon_item" @click="changeView(270, 0, 0)">
        <img src="./threeDicon/topView.png" alt />
      </span>
      <!-- 侧视图 -->
      <span class="threed_icon_item" @click="changeView(0, 180, 90)">
        <img src="./threeDicon/sideView.png" alt />
      </span>
      <!-- 旋转 -->
      <span class="threed_icon_item">
        <img src="./threeDicon/rotate.png" alt />
      </span>
      <!-- 平移 -->
      <span class="threed_icon_item">
        <img src="./threeDicon/pan.png" alt />
      </span>
    </div>
    <canvas id="webgl"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import {
  sensorVertex,
  panel1Vertex,
  panel1Index,

  panel2Vertex,
  panel2Index,

  bar1Vertex,
  bar1Index,

  bar2Vertex,
  bar2Index,

  bar3Vertex,
  bar3Index,

  bar4Vertex,
  bar4Index,

  bar5Vertex,
  bar5Index,

  bar6Vertex,
  bar6Index,

  bar7Vertex,
  bar7Index,

  bar8Vertex,
  bar8Index,

  vaultedVertex,
  vaultedIndex,

  baseSupport1Vertex,
  baseSupport1Index,

  baseSupport2Vertex,
  baseSupport2Index
} from './three_js_vertex.js'
export default {
  mounted() {
    /* 渲染3D模型 */
    this.$nextTick(() => {
      this.drawThreeD()
    })
  },
  data() {
    return {
      // 传感器名称列表
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
      ],

      // X轴旋转值
      rotateX: 210,
      // Y轴旋转值
      rotateY: 0,
      // Z轴旋转值
      rotateZ: 0,

      scene: '',
      renderer: '',

      // 桥梁部分映射
      bridgePartMap: {
        panel1: false,
        panel2: true,
        bar1: false,
        bar2: false,
        bar3: false,
        bar4: false,
        bar5: false,
        bar6: true,
        bar7: false,
        bar8: false,
        vaulted: false,
        baseSupport1: false,
        baseSupport2: false
      }

    }
  },
  methods: {
    drawThreeD() {
      const _this = this
      var container = document.querySelector('.three_d')

      /* 创建场景对象scene */
      this.scene = new THREE.Scene()

      // 获取事件操作对象
      function getSelsectOBj(mouse, raycaster, e) {
        // 将html坐标系转化为webgl坐标系，并确定鼠标点击位置
        mouse.x = e.offsetX / container.querySelector('canvas').clientWidth * 2 - 1

        mouse.y = -(e.offsetY / container.querySelector('canvas').clientHeight * 2) + 1

        // 以camera为z坐标，确定所点击物体的3D空间位置
        raycaster.setFromCamera(mouse, camera)
        // 确定所点击位置上的物体数量
        const intersects = raycaster.intersectObjects(_this.scene.children, true)
        return intersects
      }

      var currentMesh
      // 鼠标移入移出事件
      var mouseMoveFuc = (e) => {
        const raycaster = new THREE.Raycaster() // 光线投射，用于确定鼠标点击位置
        const mouse = new THREE.Vector2() // 创建二维平面
        const intersects = getSelsectOBj(mouse, raycaster, e)
        if (intersects.length > 0) {
          if (intersects[0].object.geometry.name) {
            // 保存当前选中物体
            currentMesh = intersects[0].object

            // 选中变色
            intersects[0].object.material = new THREE.MeshLambertMaterial({
              color: 'lightgreen', // 三角面颜色
              side: THREE.DoubleSide // 两面可见
            })
          } else if (currentMesh) {
            resetMaterials()
          }
        } else if (currentMesh) {
          resetMaterials()
        }
      }

      // 重置传感器颜色
      function resetMaterials() {
        const name = currentMesh.geometry.name
        let color = ''
        if (name.startsWith('SR')) {
          color = 'red'
        } else if (name.startsWith('ZS')) {
          color = 'blue'
        }

        currentMesh.material = new THREE.MeshLambertMaterial({
          color, // 三角面颜色
          side: THREE.DoubleSide // 两面可见
        })
        currentMesh = ''
      }

      // 鼠标点击事件
      // var mouseDownFuc = async (e) => {
      //   const raycaster = new THREE.Raycaster() // 光线投射，用于确定鼠标点击位置
      //   const mouse = new THREE.Vector2() // 创建二维平面
      //   const intersects = getSelsectOBj(mouse, raycaster, e)
      //   if (intersects.length > 0) {
      //     for (var i = 0; i < intersects.length; i++) {
      //       if (intersects[i].object.material.name === 'yingbianji') {
      //         // 发送请求获取信息
      //         const ids = _this.threeDInfo.id
      //         // 1 获取时序图
      //         const { data } = await post(ometerTime, { ids })
      //         // 存储时序图Echarts数据
      //         this.firstEchartsDataX = data.times
      //         this.firstEchartsDataYs = data // 需删除里面times属性

      //         // 绘制echarts
      //         this.$nextTick(function () {
      //           this.drawFirstEcharts()
      //         })
      //       }
      //     }
      //   }
      // }

      /* 创建组对象group */
      var group = new THREE.Group()

      const bridgeMap = {
        panel1: [panel1Vertex, panel1Index],
        panel2: [panel2Vertex, panel2Index],
        bar1: [bar1Vertex, bar1Index],
        bar2: [bar2Vertex, bar2Index],
        bar3: [bar3Vertex, bar3Index],
        bar4: [bar4Vertex, bar4Index],
        bar5: [bar5Vertex, bar5Index],
        bar6: [bar6Vertex, bar6Index],
        bar7: [bar7Vertex, bar7Index],
        bar8: [bar8Vertex, bar8Index],
        vaulted: [vaultedVertex, vaultedIndex],
        baseSupport1: [baseSupport1Vertex, baseSupport1Index],
        baseSupport2: [baseSupport2Vertex, baseSupport2Index]
      }
      /* 绘制桥梁模型 -- 按部分绘制 */
      Object.keys(_this.bridgePartMap).forEach(item => {
        // 传入第四个参数，表示该部分被选中，需要变色
        group.add(_this.drawBridged(bridgeMap[item][0], bridgeMap[item][1], _this.scene, _this.bridgePartMap[item]))
      })
      // console.log(panel1Vertex, panel1Index)
      // console.log(panel2Vertex, panel2Index)
      // console.log(bar1Vertex, bar1Index)
      // console.log(bar2Vertex, bar2Index)
      // console.log(bar3Vertex, bar3Index)
      // console.log(bar4Vertex, bar4Index)
      // console.log(bar5Vertex, bar5Index)
      // console.log(bar6Vertex, bar6Index)
      // console.log(bar7Vertex, bar7Index)
      // console.log(bar8Vertex, bar8Index)
      // console.log(vaultedVertex, vaultedIndex)
      // console.log(baseSupport1Vertex, baseSupport1Index)
      // console.log(baseSupport2Vertex, baseSupport2Index)
      // const panel1 = this.drawBridged(panel1Vertex, panel1Index, _this.scene)
      group.add(this.drawBridged(panel1Vertex, panel1Index, _this.scene))

      // const panel2 = this.drawBridged(panel2Vertex, panel2Index, _this.scene)
      // group.add(panel2)

      // const bar1 = this.drawBridged(bar1Vertex, bar1Index, _this.scene)
      // group.add(bar1)

      // const bar2 = this.drawBridged(bar2Vertex, bar2Index, _this.scene)
      // group.add(bar2)

      // const bar3 = this.drawBridged(bar3Vertex, bar3Index, _this.scene)
      // group.add(bar3)

      // const bar4 = this.drawBridged(bar4Vertex, bar4Index, _this.scene)
      // group.add(bar4)

      // const bar5 = this.drawBridged(bar5Vertex, bar5Index, _this.scene)
      // group.add(bar5)

      // const bar6 = this.drawBridged(bar6Vertex, bar6Index, _this.scene)
      // group.add(bar6)

      // const bar7 = this.drawBridged(bar7Vertex, bar7Index, _this.scene)
      // group.add(bar7)

      // const bar8 = this.drawBridged(bar8Vertex, bar8Index, _this.scene)
      // group.add(bar8)

      // const vaulted = this.drawBridged(vaultedVertex, vaultedIndex, _this.scene)
      // group.add(vaulted)

      // const baseSupport1 = this.drawBridged(baseSupport1Vertex, baseSupport1Index, _this.scene)
      // group.add(baseSupport1)

      // const baseSupport2 = this.drawBridged(baseSupport2Vertex, baseSupport2Index, _this.scene)
      // group.add(baseSupport2)

      /* 绘制传感器模型 */
      this.sensorNameList.forEach((item, index) => {
        const mesh = this.drawSensor((index + 1), item, _this.scene)
        group.add(mesh)
      })

      _this.scene.add(group)

      group.rotateX(this.rotateX * Math.PI / 180) // 将组对象绕Z轴旋转
      group.rotateY(this.rotateY * Math.PI / 180) // 将组对象绕Z轴旋转
      group.rotateZ(this.rotateZ * Math.PI / 180) // 将组对象绕Z轴旋转

      // 斜视图 15, 0, 45
      // 正视图 20, 0, 0
      // 侧视图 0, 0, 90
      // 俯视图 90, 0, 0

      // 辅助坐标系   老版本AxisHelper 新版本AxesHelper
      var axisHelper = new THREE.AxisHelper(1000)
      _this.scene.add(axisHelper)

      /* 光源设置 */
      // 点光源
      var point = new THREE.PointLight(0xffffff)
      point.position.set(0, -800, 500) // 点光源位置
      _this.scene.add(point) // 点光源添加到场景中

      // 环境光
      var ambient = new THREE.AmbientLight(0xffffff, 0.3)
      _this.scene.add(ambient)
      // 方向光
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
      // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
      // 注意：位置属性在这里不代表方向光的位置，你可以认为方向光没有位置
      directionalLight.position.set(0, 2000, 500)
      // 方向光指向对象，可以不设置，默认的位置是0,0,0
      // directionalLight.target = bridgeMesh
      _this.scene.add(directionalLight)

      // 辅助光源
      var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
      _this.scene.add(directionalLightHelper)
      /**
     * 相机设置
     */
      var width = window.innerWidth // 窗口宽度
      var height = window.innerHeight // 窗口高度
      var k = width / height // 窗口宽高比
      var s = 4000 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // 创建相机对象s
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, -10000, 10000)
      camera.position.set(0, 10, 0) // 设置相机位置 正视图
      // camera.position.set(0, 0, 100) // 设置相机位置 俯视图
      // camera.position.set(-23000, -17600, 20600) // 设置相机位置 俯视图
      camera.lookAt(0, 0, 0)
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
      function render() {
        _this.renderer.render(_this.scene, camera) // 执行渲染操作
        requestAnimationFrame(render)
      }
      render()
      // 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
      // eslint-disable-next-line no-unused-vars
      var controls = new OrbitControls(camera, _this.renderer.domElement)
      // controls.enabled = false // 控制器是否被启用
      // controls.enableRotate = true // 是否启用旋转
      // controls.enableZoom = false // 是否启用缩放
      // controls.enablePan = false // 是否启用平移
      controls.minPolarAngle = -Infinity

      // 监听鼠标事件
      container.addEventListener('mousemove', mouseMoveFuc)
      // container.addEventListener('mousedown', mouseDownFuc)
    },

    // 绘制桥梁模型
    drawBridged(vertex, index, scene, isSelected) {
      /* 创建网格模型 */
      var geometry = new THREE.Geometry()

      /* 顶点数组 */
      var bridgeVerticesArry = []
      /* 向顶点数组中循环添加THREE.Vector3 */
      for (let i = 0; i < vertex.length; i += 3) {
        bridgeVerticesArry.push(new THREE.Vector3(vertex[i], vertex[i + 1], vertex[i + 2]))
      }
      geometry.vertices = bridgeVerticesArry

      /*  Face3三角面数组 */
      var facesArry = []
      /* 三角面数组中循环添加THREE.Face3 */
      for (let i = 0; i < index.length; i += 3) {
        facesArry.push(new THREE.Face3(index[i], index[i + 1], index[i + 2]))
      }
      geometry.faces = facesArry

      /* 计算所有面法向量 */
      geometry.computeFaceNormals()

      // 定义颜色， 默认#eee
      let color = '#eee'
      if (isSelected) {
        color = 'lightgreen'
      }
      // 材质对象(网格)渲染模式
      var material = new THREE.MeshPhongMaterial({
        color, // 三角面颜色
        side: THREE.DoubleSide // 两面可见
      })
      var bridgeMesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
      // scene.add(bridgeMesh) // 网格模型添加到场景中
      return bridgeMesh
    },

    // 绘制传感器模型
    drawSensor(num, name, scene) {
      var sensorGeometry = new THREE.Geometry() // 创建一个Buffer类型几何体对象
      sensorGeometry.name = name

      const sensorVertices = sensorVertex.slice((num - 1) * 24, num * 24)
      // 顶点数组
      var verticesArry = []

      for (let i = 0; i < sensorVertices.length; i += 3) {
        verticesArry.push(new THREE.Vector3(sensorVertices[i], sensorVertices[i + 1], sensorVertices[i + 2]))
      }
      sensorGeometry.vertices = verticesArry

      var allFaceIndex = [0, 4, 5, 0, 1, 5, 1, 5, 6, 1, 2, 6, 2, 6, 7, 2, 3, 7, 3, 7, 4, 3, 0, 4, 0, 3, 2, 0, 1, 2, 4, 7, 6, 4, 5, 6]
      // Face3构造函数创建一个三角面
      var facesArry = []

      for (let i = 0; i < allFaceIndex.length; i += 3) {
        facesArry.push(new THREE.Face3(allFaceIndex[i], allFaceIndex[i + 1], allFaceIndex[i + 2]))
      }
      sensorGeometry.faces = facesArry

      sensorGeometry.computeFaceNormals()

      if (name.startsWith('SR')) {
        // 三角面(网格)渲染模式
        var material = new THREE.MeshLambertMaterial({
          color: 'red', // 三角面颜色
          side: THREE.DoubleSide // 两面可见
        }) // 材质对象
        var mesh = new THREE.Mesh(sensorGeometry, material) // 网格模型对象Mesh
        // scene.add(mesh) // 网格模型添加到场景中
        return mesh
      } else if (name.startsWith('ZS')) {
        // 三角面(网格)渲染模式
        // eslint-disable-next-line no-redeclare
        var material = new THREE.MeshLambertMaterial({
          color: 'blue', // 三角面颜色
          side: THREE.DoubleSide // 两面可见
        }) // 材质对象
        // eslint-disable-next-line no-redeclare
        var mesh = new THREE.Mesh(sensorGeometry, material) // 网格模型对象Mesh
        // scene.add(mesh) // 网格模型添加到场景中
        return mesh
      }
    },

    // 改变视图
    changeView(x, y, z) {
      this.rotateX = x
      this.rotateY = y
      this.rotateZ = z
      this.$nextTick(() => {
        if (this.scene && this.renderer) {
          this.scene.remove()
          this.renderer.dispose()
          this.drawThreeD()
        }
      })
    }
  }

}
</script>

<style scoped lang="less">
.three_d {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .threed_icon {
    display: flex;
    position: absolute;
    top: 10px;
    right: 40px;

    .threed_icon_item {
      width: 30px;
      height: 30px;
      cursor: pointer;
      background-color: rgb(241, 241, 241);

      &:hover {
        background-color: rgb(0, 204, 204);
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
