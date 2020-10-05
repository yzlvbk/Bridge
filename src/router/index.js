import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
const ZhShaoBridge = () =>
  import(
    /* webpackChunkName: "ZhShaoBridge" */ '../views/zhenShaoBridge/ZhShaoBridge.vue'
  )
const ZhShaoThreeD = () =>
  import(
    /* webpackChunkName: "ZhShaoThreeD" */ '../views/zhenShaoBridge/components/ZhShaoThreeD.vue'
  )
const ZhShaoMonitor = () =>
  import(
    /* webpackChunkName: "ZhShaoMonitor" */ '../views/zhenShaoBridge/components/ZhShaoMonitor.vue'
  )
const ZhShaoSensorData = () =>
  import(
    /* webpackChunkName: "ZhShaoSensorData" */ '../views/zhenShaoBridge/components/ZhShaoSensorData.vue'
  )
const ZhShaoSensorInfo = () =>
  import(
    /* webpackChunkName: "ZhShaoSensorInfo" */ '../views/zhenShaoBridge/components/ZhShaoSensorInfo.vue'
  )
const ZhShaoStress = () =>
  import(
    /* webpackChunkName: "ZhShaoStress" */ '../views/zhenShaoBridge/components/ZhShaoStress.vue'
  )
const ZhShaoTransform = () =>
  import(
    /* webpackChunkName: "ZhShaoTransform" */ '../views/zhenShaoBridge/components/ZhShaoTransform.vue'
  )
const ZhShaoTraffic = () =>
  import(
    /* webpackChunkName: "ZhShaoTraffic" */ '../views/zhenShaoBridge/components/ZhShaoTraffic.vue'
  )
const ZhShaoAssess = () =>
  import(
    /* webpackChunkName: "ZhShaoAssess" */ '../views/zhenShaoBridge/components/ZhShaoAssess.vue'
  )
const ZhShaoStatement = () =>
  import(
    /* webpackChunkName: "ZhShaoStatement" */ '../views/zhenShaoBridge/components/ZhShaoStatement.vue'
  )
const ZhShaoLog = () =>
  import(
    /* webpackChunkName: "ZhShaoLog" */ '../views/zhenShaoBridge/components/ZhShaoLog.vue'
  )
const ZhShaoProjectInfo = () =>
  import(
    /* webpackChunkName: "ZhShaoProjectInfo" */ '../views/zhenShaoBridge/components/ZhShaoProjectInfo.vue'
  )
const ZhShaoWarning = () =>
  import(
    /* webpackChunkName: "ZhShaoWarning" */ '../views/zhenShaoBridge/components/ZhShaoWarning.vue'
  )

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/zhenShaoBridge',
    redirect: '/ZhShaoMonitor',
    component: ZhShaoBridge,
    children: [
      {
        path: '/ZhShaoThreeD',
        component: ZhShaoThreeD,
        children: [
          { path: '/ZhShaoMonitor', component: ZhShaoMonitor },
          { path: '/ZhShaoSensorData', component: ZhShaoSensorData },
          { path: '/ZhShaoSensorInfo', component: ZhShaoSensorInfo }
        ]
      },
      { path: '/ZhShaoStress', component: ZhShaoStress },
      { path: '/ZhShaoTransform', component: ZhShaoTransform },
      { path: '/ZhShaoTraffic', component: ZhShaoTraffic },
      { path: '/ZhShaoAssess', component: ZhShaoAssess },
      { path: '/ZhShaoStatement', component: ZhShaoStatement },
      { path: '/ZhShaoLog', component: ZhShaoLog },
      { path: '/ZhShaoProjectInfo', component: ZhShaoProjectInfo },
      { path: '/ZhShaoWarning', component: ZhShaoWarning }
    ]
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* 路由导航守卫 */
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 如果非登录页或首页，进行拦截
  if (to.path === '/Login' || to.path === '/Home' || to.path === '/') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    // 如果token不存在，跳转至登录页面
    if (!token) router.push('/Login?direction=' + to.path)
    next()
  }
})
export default router
