import http from './http'

/* 系统首页获取桥梁轮播信息 */
export const reqAllBridgeNotice = () => http('/v10/summary/GetNotice', {}, 'GET')

/* 系统首页获取桥梁基础信息 */
export const reqAllBridgeInfo = () => http('/v10/summary/GetAllBridgeInfo', {}, 'GET')

/* 系统首页获取桥梁安全等级 */
export const reqBridgeSafetyLevel = () => http('/v10/summary/GetAllBridgeSafetyLevel', {}, 'GET')

/* 系统首页获取桥梁安全评分 */
export const reqAllBridgeSafetyScore = () => http('/v10/summary/GetAllBridgeSafetyScore', {}, 'GET')

/* 系统首页获取桥1车辆统计 */
export const reqBridgeOneVehicalCount = (startTime, endTime) => http('/v10/bridgeOne/GetVehicalCount', { startTime, endTime }, 'GET')

/* 郑少高速跨线桥 */
/* 桥梁系统1-3D数据 */
export const reqBridgeOne3D = () => http('/v10/bridgeOne/Get3D', {}, 'GET')

/* 桥梁系统1-传感器位置数据 */
export const reqBridgeOneSensorBaseInfo = () => http('/v10/bridgeOne/GetSensorBaseInfo', {}, 'GET')

/* 桥梁系统1-构件安全级别 */
export const reqBridgeOneGetMemberSafetyLevel = () => http('/v10/bridgeOne/GetMemberSafetyLevel', {}, 'GET')

/* 桥梁系统1-车辆载重时序图数据 */
export const reqBridgeOneVehicalWeight = () => http('/v10/bridgeOne/GetVehicalWeight', {}, 'GET')

/* 桥梁系统1-应变片时序图和历史图 */
export const reqBridgeOneStrainTimeAndHistory = (Ids, StartTime, EndTime) => http('/v10/bridgeOne/StrainTimeAndHistory', { Ids, StartTime, EndTime }, 'POST')

/* 桥梁系统1-应变片相关关系图 */
export const reqBridgeOneStrainRelation = (Ids, StartTime, EndTime) => http('/v10/bridgeOne/StrainRelation', { Ids, StartTime, EndTime }, 'POST')

/* 桥梁系统1-姿态盒倾角时序图和历史图 */
export const reqBridgeOneIclTimeAndHistory = (Ids, StartTime, EndTime) => http('/v10/bridgeOne/SrIclTimeAndHistory', { Ids, StartTime, EndTime }, 'POST')

/* 桥梁系统1-姿态盒倾角相关关系图 */
export const reqBridgeOneIclRelation = (Ids, StartTime, EndTime) => http('/v10/bridgeOne/SrIclRelation', { Ids, StartTime, EndTime }, 'POST')

/* 桥梁系统1-姿态盒加速度时序图和历史图 */
export const reqBridgeOneAccelTimeAndHistory = (Ids, StartTime, EndTime) => http('/v10/bridgeOne/SrAccelTimeAndHistory', { Ids, StartTime, EndTime }, 'POST')

/* 桥梁系统1-姿态盒加速度相关关系图 */
export const reqBridgeOneAccelRelation = (Ids, StartTime, EndTime) => http('/v10/bridgeOne/SrAccelRelation', { Ids, StartTime, EndTime }, 'POST')

/* 桥梁系统1-应变片表格数据 */
export const reqBridgeOneStrainTable = () => http('/v10/bridgeOne/GetStrainTable', {}, 'GET')

/* 桥梁系统1-姿态盒倾角表格数据 */
export const reqBridgeOneIclTable = () => http('/v10/bridgeOne/GetIclTable', {}, 'GET')

/* 桥梁系统1-姿态盒加速度表格数据 */
export const reqBridgeOneAccelTable = () => http('/v10/bridgeOne/GetAccelTable', {}, 'GET')

/* 桥梁系统1-车流实时图片 */
export const reqBridgeOneTrafficPic = (Id) => http('/v10/bridgeOne/GetPic', { Id }, 'GET')

/* 桥梁系统1-Mesh模型 */
export const reqBridgeOneMesh = (Id) => http('/v10/bridgeOne/GetMesh', {}, 'GET')

/* 桥梁系统1-Mesh变形 */
export const reqBridgeOneMeshDeform = (StartTime, EndTime) => http('/v10/bridgeOne/MeshDeform', { StartTime, EndTime }, 'POST')

/* 桥梁系统1-应力 */
export const reqBridgeOneMemberForce = () => http('/v10/bridgeOne/GetMemberForce', {}, 'GET')

/* 桥梁系统1-获取日志 */
export const reqBridgeOneGetWorkLog = () => http('/v10/bridgeOne/GetWorkLog', {}, 'GET')

/* 桥梁系统1-上传日志 */
export const reqBridgeOnePostWorkLog = (User, CreateTime, Content) => http('/v10/bridgeOne/PostWorkLog', { User, CreateTime, Content }, 'POST')

/* 桥梁系统1-获取报表 */
export const reqBridgeOneGetReport = (type, startTime, endTime) => http('/v10/bridgeOne/GetReport', { type, startTime, endTime }, 'GET')
