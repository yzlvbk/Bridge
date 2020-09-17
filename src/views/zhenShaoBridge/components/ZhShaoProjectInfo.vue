<template functional>
  <div class="projectInfo">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>郑少高速桥</el-breadcrumb-item>
      <el-breadcrumb-item>工程概况</el-breadcrumb-item>
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="contain">
      <h2 class="contain_title">项目概况</h2>

      <p class="contain_text">本项目依托于郑少高速既郑卢高速郑州至少林寺路线段, 路线起自郑州市西南绕城公路马寨南1公里处，沿西南方向，经新密止于登封中岳庙东3公里处，连接河南省省会郑州与著名千年古刹少林寺，路线全长53.254公里。郑少高速公路于2001年9月16日正式开工建设，于2003年12月28日建成试运营通车。其中作为路线中不可或缺的连接部分，郑少高速公路桥梁共有主线桥梁48座，跨线天桥36座，匝道桥4座。其中，跨线天桥的结构形式多种多样，但天桥在使用过程中存在着各种损伤及结构破坏等各种问题。在日常的巡检中，管理养护主要检查主线桥及匝道桥，而天桥的问题往往不能及时发现。</p>

      <div class="contain_img_warp">
        <img src="@/assets/image/ZhShao/工程概况1.png">
        <span>图1  郑少K9+467天桥</span>
      </div>

      <p class="contain_text">目前，随着郑少高速周边地区经济的发展，地区之间的经济与发展联系日益密切，使得跨线天桥的交通流量逐年增大，尤其是大型车辆数量猛增，桥梁超载现象日趋严重。同时运输市场出现的无序的局面，运营者为了追求短期经济效益而进行了大量的超载运输。在使用期间，因跨桥天桥本身存在一些“先天缺陷”，再加上重载车辆荷载严重超过桥梁设计荷载，桥梁可能会在超载车辆偏载作用下，会致使主梁发生横向倾斜，甚至导致桥梁垮塌。并且路线通过地区地质条件特殊，属于黄土地带，夹杂膨胀土地段，土的力学性质的特殊性，含水量的变化都可能会导致桥梁的结构力学性质变化，产生病害，影响主线道路的正常运营。因此，天桥的结构损坏和稳定性非常值得关注，其中以下跨线桥最具有代表性：K9+467拱桥，该桥上部结构形式为钢筋混凝土上承式拱桥，下部结构为浆砌片石，拱形桥台，桥长61.68米，宽7.0米。该桥在近期的检查中发现：桥台面连接处网裂凹陷，桥面凹凸不平；1#伸缩缝失效，锚固区混凝土严重碎裂、凹陷；排水孔堵塞；主拱圈局部锈涨，左右侧面台端及拱脚出现宽度约0.08mm的纵缝。在重载车辆通过时可能造成桥梁结构变形开裂，进而引起结构物的不均匀沉降，导致桥梁垮塌。
      </p>

      <p class="contain_text">拱桥位置工程地质情况：<br>
1、郑少K9+467拱桥位于新密市白寨镇皇帝陵村东北200m处，有公路通往工程区，交通便利。<br>
2、桥区位于豫西低山丘陵区，场区地层分属于第四系中更新统粘土和寒武系灰岩,层位分布稳定，地层较简单，勘探深度范围内未见地下水。<br>
3、岩土工程地质评价场区第②层灰岩土上部2-3.6m强风化，呈碎块状，下部微风化为主，岩体结构较完整度，强度较高,建议采用桩基础，第②层灰岩下部微风化层作桩端持力层。
      </p>

      <div class="contain_img_warp">
        <img src="@/assets/image/ZhShao/工程概况2.png">
      </div>

      <div class="contain_img_warp">
        <img src="@/assets/image/ZhShao/工程概况3.png">
        <span>图2  桥面病害情况图片</span>
      </div>

      <p class="contain_text">此次自动化监测项目分别在桥面、桥跨、桥拱处安装空间运动姿态盒、智能颗粒、表面应变片、位移计来监测郑少天桥的结构内力，桥面沉降、水平位移、倾斜、挠度，桥梁两端过渡段接缝张开位移，桥梁的动力响应，环境参数等，考虑到运营监测的需要，对温度、雨雪量也进行监测。
      </p>

    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../../../assets/css/reset.css';
.projectInfo {
  height: 100%;
}
.contain {
  // display: flex;
  height: calc(100% - 130px);
  padding: 0 80px;
  box-sizing: border-box;
  background-color: var(--ContainBgColor);
  overflow-y: scroll;

  .contain_title {
    margin: 30px 0 0px;
    font-size: 20px;
  }

  .contain_text {
    margin-top: 20px;
    font-size: 16px;
    text-indent: 2em;
    line-height: 2;
  }

  .contain_img_warp {
    margin-top: 30px;
    text-align: center;

    img {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
