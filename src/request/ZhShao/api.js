import http from './http'

/* 系统首页获取桥梁基础信息 */
export const reqAllBridgeInfo = () => http('/v10/summary/GetAllBridgeInfo', {}, 'GET')

/* 系统首页获取桥梁安全等级 */
export const reqBridgeSafetyLevel = () => http('/v10/summary/GetAllBridgeSafetyLevel', {}, 'GET')

/* 系统首页获取桥梁安全评分 */
export const reqAllBridgeSafetyScore = () => http('/v10/summary/GetAllBridgeSafetyScore', {}, 'GET')

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
