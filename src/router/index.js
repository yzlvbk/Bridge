import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ZhShaoBridge from '../views/zhenShaoBridge/ZhShaoBridge.vue'
import ZhShaoThreeD from '../views/zhenShaoBridge/components/ZhShaoThreeD.vue'
import ZhShaoMonitor from '../views/zhenShaoBridge/components/ZhShaoMonitor.vue'
import ZhShaoSensorData from '../views/zhenShaoBridge/components/ZhShaoSensorData.vue'
import ZhShaoSensorInfo from '../views/zhenShaoBridge/components/ZhShaoSensorInfo.vue'
import ZhShaoStress from '../views/zhenShaoBridge/components/ZhShaoStress.vue'
import ZhShaoTransform from '../views/zhenShaoBridge/components/ZhShaoTransform.vue'
import ZhShaoMesh from '../views/zhenShaoBridge/components/ZhShaoMesh.vue'
import ZhShaoTraffic from '../views/zhenShaoBridge/components/ZhShaoTraffic.vue'
import ZhShaoAssess from '../views/zhenShaoBridge/components/ZhShaoAssess.vue'
import ZhShaoStatement from '../views/zhenShaoBridge/components/ZhShaoStatement.vue'
import ZhShaoLog from '../views/zhenShaoBridge/components/ZhShaoLog.vue'
import ZhShaoProjectInfo from '../views/zhenShaoBridge/components/ZhShaoProjectInfo.vue'
import ZhShaoProjectImg from '../views/zhenShaoBridge/components/ZhShaoProjectImg.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
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
      { path: '/ZhShaoMesh', component: ZhShaoMesh },
      { path: '/ZhShaoTraffic', component: ZhShaoTraffic },
      { path: '/ZhShaoAssess', component: ZhShaoAssess },
      { path: '/ZhShaoStatement', component: ZhShaoStatement },
      { path: '/ZhShaoLog', component: ZhShaoLog },
      { path: '/ZhShaoProjectInfo', component: ZhShaoProjectInfo },
      { path: '/ZhShaoProjectImg', component: ZhShaoProjectImg }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
