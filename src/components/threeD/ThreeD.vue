<template>
  <div class="three_d">
      <canvas id="webgl" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
/* 监听div宽高变化 */
// import elementResizeDetectorMaker from 'element-resize-detector'
import { vertex } from './vertex'
import { normal } from './normal'
export default {
  mounted () {
    /* 获取canvas的宽高 */
    const wrapDiv = document.querySelector('.three_d')
    this.width = window.getComputedStyle(wrapDiv, null).getPropertyValue('width')
    this.height = window.getComputedStyle(wrapDiv, null).getPropertyValue('height')

    /* 渲染3D模型 */
    this.$nextTick(() => {
      this.drawThreeD()
    })

    /* 监听宽高变化，响应式绘制 */
    // const erd = elementResizeDetectorMaker()
    // erd.listenTo(document.querySelector('.three_d'), element => {
    //   const wrapDiv = document.querySelector('.three_d')
    //   this.width = window.getComputedStyle(wrapDiv, null).getPropertyValue('width')
    //   this.height = window.getComputedStyle(wrapDiv, null).getPropertyValue('height')
    //   this.drawThreeD()
    // })
  },
  data () {
    return {
      /* canvas宽度和高度 -- 根据窗口大小动态赋值 */
      width: '',
      height: ''
    }
  },
  methods: {
    drawThreeD () {
      // 通过getElementById()方法获取canvas画布
      var canvas = document.getElementById('webgl')

      // 通过方法getContext()获取WebGL上下文
      var gl = canvas.getContext('webgl')

      // 顶点着色器源码
      var vertexShaderSource = `
        // attribute声明vec4类型变量apos
        attribute vec4 apos;
        // attribute声明顶点颜色变量
        // attribute vec4 a_color;
        // 顶点法向量变量
        attribute vec4 a_normal;
        // uniform声明平行光颜色变量
        uniform vec3 u_lightColor;
        // 平行光方向
        uniform vec3 u_lightDirection;
        // uniform声明选中的物体
        uniform int u_Clicked;
        attribute float a_Face;
        // varying声明顶点颜色插值后变量
        varying vec4 v_color;

        /**uniform声明矩阵变量**/
        uniform mat4 proj;// 模型矩阵
        uniform mat4 mx;// 绕x轴旋转矩阵
        uniform mat4 my;// 绕y轴旋转矩阵
        uniform mat4 scale;// 缩放矩阵
        uniform mat4 translate;// 平移矩阵
        void main() {
            // 两个旋转矩阵、顶点齐次坐标连乘
            gl_Position = proj*translate*scale*mx*my*apos;
            
            // 顶点法向量进行矩阵变换，然后归一化
            vec3 normal = normalize((mx*my*a_normal).xyz);
            // 计算平行光方向向量和顶点法向量的点积
            float dot = max(dot(u_lightDirection, normal), 0.0);
            // 计算反射后的颜色
            vec4 a_color = vec4(0.0,1.0,1.0,1);
            vec3 reflectedLight = u_lightColor * a_color.rgb * dot;
            // 环境光
            vec3 u_AmbientLight = vec3(0.1,0.1,0.1);
            vec3 ambient = u_AmbientLight * a_color.rgb;
            // 颜色插值计算 
            int face = int(a_Face);
            vec3 color = (face == u_Clicked) ? vec3(1.0)*u_lightColor* dot : reflectedLight;
            if(u_Clicked == 100){
                v_color = vec4(color + ambient,a_Face/255.0);
            }else{
                v_color = vec4(color + ambient, a_color.a);
            }
        }
        `

      // 片元着色器源码
      var fragShaderSource = `
        // 所有float类型数据的精度是lowp
        precision mediump float;
        // 接收顶点着色器中v_color数据
        varying vec4 v_color;
        void main() {
            // 插值后颜色数据赋值给对应的片元
            gl_FragColor = v_color;
        }
        `

      // 调用函数initShader(),初始化着色器,返回program对象
      var program = initShader(gl, vertexShaderSource, fragShaderSource)

      if (!program) {
        alert('program is Null')
      }

      /**
     * 从program对象获取相关的变量
     * uniform变量声明的方法使用getAttribLocation()方法
     **/
      // eslint-disable-next-line camelcase
      var u_lightColor = gl.getUniformLocation(program, 'u_lightColor')
      // eslint-disable-next-line camelcase
      var u_lightDirection = gl.getUniformLocation(program, 'u_lightDirection')
      // eslint-disable-next-line camelcase
      var u_Clicked = gl.getUniformLocation(program, 'u_Clicked')
      /** 从program对象获得旋转矩阵变量proj、mx、my、scale、translate变量**/
      var uniformProj = gl.getUniformLocation(program, 'proj')
      var mx = gl.getUniformLocation(program, 'mx')
      var my = gl.getUniformLocation(program, 'my')
      var scale = gl.getUniformLocation(program, 'scale')
      var translate = gl.getUniformLocation(program, 'translate')

      // 默认选中物体设置-1, 即默认不选中
      gl.uniform1i(u_Clicked, -1)
      /** 给平行光传入颜色和方向数据，RGB(1,1,1),单位向量(x,y,z) **/
      gl.uniform3f(u_lightColor, 1.0, 1.0, 1.0)
      gl.uniform3f(u_lightDirection, 1.0, 0.0, 1.0)

      /* 设置旋转、缩放、平移默认值 */
      var anglex = 60 * Math.PI / 180
      var angley = 0 * Math.PI / 180
      var scaleValue = 0.9
      var transValueX = 0
      var transValueY = 0

      /* 创建正交投影 */
      gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight)
      var projectMat = createOrtho(-canvas.clientWidth * 5, canvas.clientWidth * 5, -canvas.clientHeight * 5, canvas.clientHeight * 5, -10000.0, 10000.0)
      gl.uniformMatrix4fv(uniformProj, false, projectMat)

      /** 创建顶点缓冲区**/
      const n = initVertexBuffers(gl)

      // 添加鼠标点击事件
      canvas.addEventListener('mousedown', onMouseDown, false)
      // 添加滑轮缩放事件
      canvas.addEventListener('wheel', onMouseWheel, false)
      // 在canvas里屏蔽浏览器右键菜单,不兼容火狐
      canvas.oncontextmenu = function () {
        return false
      }

      // 执行渲染
      draw()

      // 声明初始化着色器函数
      function initShader (gl, vertexShaderSource, fragmentShaderSource) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER)
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(vertexShader, vertexShaderSource)
        gl.shaderSource(fragmentShader, fragmentShaderSource)
        gl.compileShader(vertexShader)
        gl.compileShader(fragmentShader)
        var program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        gl.useProgram(program)
        return program
      }

      // 声明正交投影矩阵函数
      function createOrtho (left, right, top, buttom, near, far) {
        var width = right - left
        var height = buttom - top
        var depth = far - near
        var ortho = new Float32Array([
          2 / width, 0, 0, 0,
          0, 2 / height, 0, 0,
          0, 0, -2 / depth, 0,
          -(left + right) / width, -(top + buttom) / height, -(near + far) / depth, 1
        ])
        return ortho
      }

      // 声明初始化顶点缓冲区函数
      function initVertexBuffers (gl) {
        // 顶点数据
        var vertexData = new Float32Array(vertex)

        // 顶点法向量数组normalData
        var normalData = new Float32Array(normal)
        if (!initArrayBuffer(gl, vertexData, gl.FLOAT, 3, 'apos')) return -1
        if (!initArrayBuffer(gl, normalData, gl.FLOAT, 3, 'a_normal')) return -1

        /** 执行绘制之前，一定要开启深度测试，以免颜色混乱**/
        gl.enable(gl.DEPTH_TEST)

        return vertexData.length / 3
      }

      // 初始化缓冲区
      function initArrayBuffer (gl, data, type, num, attribute) {
        // Create a buffer object
        var buffer = gl.createBuffer()
        if (!buffer) {
          console.log('Failed to create the buffer object')
          return false
        }
        // Write date into the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
        // Assign the buffer object to the attribute variable
        // eslint-disable-next-line camelcase
        var a_attribute = gl.getAttribLocation(program, attribute)
        // eslint-disable-next-line camelcase
        if (a_attribute < 0) {
          console.log('Failed to get the storage location of ' + attribute)
          return false
        }
        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0)
        // Enable the assignment to a_attribute variable
        gl.enableVertexAttribArray(a_attribute)

        return true
      }

      // 选择物体
      // function checkObject (x, y) {
      //   var pixels = new Uint8Array(4) // Array for storing the pixel value
      //   gl.uniform1i(u_Clicked, 100) // Draw by writing surface number into alpha value
      //   draw()
      //   // Read the pixel value of the clicked position. pixels[3] is the surface number
      //   gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
      //   gl.uniform1i(u_Clicked, -1)
      //   draw()
      //   return pixels[3]
      // }

      // 鼠标点击事件监听处理
      function onMouseDown (event) {
        // 记录点击位置
        var lastX = event.clientX; var lastY = event.clientY
        // 记录移动当前位置
        // var x = event.clientX; var y = event.clientY

        // 默认鼠标左键关闭状态
        let draggingLeft = false
        // 默认鼠标右键关闭状态
        let draggingRight = false

        // 激活鼠标左键
        if (event.button === 0) {
          draggingLeft = true
        }
        // 激活鼠标右键
        if (event.button === 2) {
          draggingRight = true
        }

        // 执行选取物体操作
        // var rect = event.target.getBoundingClientRect()
        // // eslint-disable-next-line camelcase
        // var x_in_canvas = x - rect.left; var y_in_canvas = rect.bottom - y
        // var face = checkObject(x_in_canvas, y_in_canvas)
        // gl.uniform1i(u_Clicked, face)
        draw()

        canvas.onmousemove = function (event) {
          event.preventDefault()

          var x = event.clientX; var y = event.clientY

          // 鼠标左键按下
          if (draggingLeft) {
            // 旋转比例--速度
            var factor1 = 0.005
            var dx1 = factor1 * (x - lastX)
            var dy1 = factor1 * (y - lastY)

            // 限制 x轴的旋转角度 -90 --- 90
            // anglex = Math.max(Math.min(anglex + dy, 90.0), -90.0)
            anglex -= dy1
            angley += dx1
          }

          // 鼠标右键按下
          if (draggingRight) {
            // 移动比例--速度
            var factor2 = 10
            var dx2 = factor2 * (x - lastX)
            var dy2 = factor2 * (y - lastY)

            transValueX += dx2
            transValueY -= dy2
          }

          lastX = x
          lastY = y
        }

        canvas.onmouseup = function (event) {
          event.preventDefault()
          draggingLeft = false
          draggingRight = false
        }

        canvas.onmouseleave = function (event) {
          event.preventDefault()
          draggingLeft = false
          draggingRight = false
        }
      }

      // 鼠标滚轮事件监听处理
      function onMouseWheel (event) {
        event.preventDefault()
        // 缩放比例
        var ratio = 0.02
        // 当滚轮向上滑动时
        if (event.wheelDelta > 0) {
          scaleValue += ratio
        }
        // 当滚轮向下滑动时
        if (event.wheelDelta < 0) {
          scaleValue -= ratio
        }
      }

      // 声明渲染函数
      function draw () {
        gl.clear(gl.COLOR_BUFFER_BIT)// 清空画布上一帧图像

        // 旋转角度
        var sinx = Math.sin(anglex)// x轴旋转角度正弦值
        var cosx = Math.cos(anglex)// x轴旋转角度余弦值
        var siny = Math.sin(angley)// y轴旋转角度正弦值
        var cosy = Math.cos(angley)// y轴旋转角度余弦值
        // y轴旋转矩阵
        var mxArrx = new Float32Array([1, 0, 0, 0, 0, cosx, -sinx, 0, 0, sinx, cosx, 0, 0, 0, 0, 1])
        // y轴旋转矩阵
        var myArry = new Float32Array([cosy, 0, -siny, 0, 0, 1, 0, 0, siny, 0, cosy, 0, 0, 0, 0, 1])
        // 把数据mxArr传递给着色器旋转矩阵变量mx,my
        gl.uniformMatrix4fv(mx, false, mxArrx)
        gl.uniformMatrix4fv(my, false, myArry)

        // 缩放矩阵
        var scaleArry = new Float32Array([scaleValue, 0.0, 0.0, 0.0, 0.0, scaleValue, 0.0, 0.0, 0.0, 0.0, scaleValue, 0.0, 0.0, 0.0, 0.0, 1.0])
        // 把缩放数据传递给缩放矩阵
        gl.uniformMatrix4fv(scale, false, scaleArry)

        // 平移矩阵
        var translateArry = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, transValueX, transValueY, 0, 1])
        // 把平移数据传递给缩放矩阵
        gl.uniformMatrix4fv(translate, false, translateArry)

        requestAnimationFrame(draw)
        /** 执行绘制命令**/
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES, 0, n)
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
