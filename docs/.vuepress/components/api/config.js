// 开发时
const liujie = "//23.13.5.113:8686"; //刘杰
const LiJianHui = "//23.13.5.208:7070"; //李建会
const LiuYang = "//23.13.5.135:8090"; //刘杨
const yinhui = "//23.13.5.114:8686"; //尹慧
const ouyang = "//23.13.5.115:8686"; //欧阳
const houxin = "//23.13.5.28:8687"; //侯鑫
const dev = "//23.13.5.132:8687"; //测试
const zhuangqinsong="http://www.windthking.top:10087"

// 正式发布时
// const devInternet = "//183.230.49.150:48688";
const devInternet="//125.62.24.181:9999"
const  amapWebKey = 'ffe3f53e63db6ca6bbe1d85264a8fc5b'
const amapWebMapKey = '467fddcf60be0b46a5506d94cd2cc858'
const amapStyleConfig={
    zoom:15,
    zooms:[10, 18],
    showLabel:false,
    // features:['bg', 'road', 'building', 'point'],
    expandZoomRange:false,
    animateEnable:true,
    // mapStyle:"amap://styles/ddacd3aabfd79988b5e201ff4b5297e3",
    jogEnable:true,
    center:[106.559301373291,29.644483757475517], 
    labelzIndex:120,
    lockMapBound:1000,
}

const host = LiuYang;

// 为了部署方便而独立出来的配置文件，与打包无关
export default {
    isDebug:true,
    host,
    amapWebKey,
    amapWebMapKey,
    amapStyleConfig,
}
  