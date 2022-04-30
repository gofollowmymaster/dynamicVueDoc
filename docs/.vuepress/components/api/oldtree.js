import request from './request'
import qs  from 'qs'
const defaultConfig = {
  method: 'post',
  refuseToken: false,
  json: true
}

// // 根据字典Type 获取字典列表
// export function selectDictDataInfoApi(params) {
//   return request({
//     url: '/sys/dict/data/selectDictDataInfo?'+qs.stringify(params),
//     ...defaultConfig,
//     json: false,
//     method:'get'
//   })
// }

//----------------------古树名木-------------------
export function oldtreeListApi (params) {
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/listTreeMangePage',
    data: params,
  })
}


export function oldtreeUpdateApi (params) {
  debugger

  params.manageUser=params.manageUser[0]?.id
  params.treeNameId=params.treeNameId[0]?.id
  params.unit=params.unit[0]?.id
  params.pic=params.pic?.map(pic=>pic.fileId)
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/update',
    data: params,
  })
}


export function oldtreeSaveApi (params) {
   
  params.manageUser=params.manageUser[0]?.id
  params.treeNameId=params.treeNameId[0]?.id
  params.unit=params.unit[0]?.id
  params.district=params.district[0]?.id
  
  params.pic=params.pic?.map(pic=>pic.fileId)
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/insert',
    data: params,

  })
}


export function oldtreeDeleteApi (ids) {
  debugger

  ids=Array.isArray(ids)?ids.join(','):ids
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/batchDelete',
    data: {ids},
  }).then((res)=>{
    debugger
  })
}

export function oldtreeDetailApi (data) {
  debugger
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/getTreeMangeInfo?id='+data.id,
    json: false,
    method:'get'
  }).then((res)=>{
    return res.data
  })
}




//----------------------行道树-------------------
export function treeStreetListApi (params) {
  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/list',
    data: params,
    json: false,
  })
}


export function treeStreetUpdateApi (params) {
  params.administrator=params.administrator[0]?.id
  params.unit=params.unit[0]?.id
  params.area=params.area[0]?.id
  params.pic=params.pic.map(pic=>pic.fileId)
  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/update',
    data: params,

  })
}


export function treeStreetSaveApi (params) {
  params.administrator=params.administrator[0]?.id
  params.unit=params.unit[0]?.id
  params.area=params.area[0]?.id
  params.pic=params.pic.map(pic=>pic.fileId)
  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/save',
    data: params,

  })
}


export function treeStreetDeleteApi (ids) {
  ids=Array.isArray(ids)?ids.join(','):ids
  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/delete',
    data: {ids},

  })
}

export function treeStreetDetailApi (data) {
  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/info?id='+data.id,
    json: false,
    method:'get'
  })
}






//---------养护-----------------------
export function oldtreeMaintainListApi (data) {
  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/list',
    data,
    json:false,
  })
}


export function oldtreeMaintainUpdateApi (params) {
  params.pic=params.pic.map(pic=>pic.fileId)
  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/update',
    data: params,

  })
}


export function oldtreeMaintainSaveApi (params) {
  params.pic=params.pic.map(pic=>pic.fileId)
  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/save',
    data: params,

  })
}


export function oldtreeMaintainDeleteApi (ids) {
  ids=Array.isArray(ids)?ids.join(','):ids
  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/delete',
    data: {ids},

  })
}

export function oldtreeMaintainDetailApi (data) {
  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/info',
    data,
    method:'get'

  })
}
 


// export function parkCarListApi (params) {
//   return request({
//     ...defaultConfig,
//     url: '/park/car/page',
//     data: params,
//   })
// }



 

 




// export function uploadFileApi(options) {
//   debugger;
//   const {file,onSuccess,onError}=options
//   let formData = new FormData();
//   formData.append("files",file);
//   return request({
//     ...defaultConfig,
//     url: "/file/uploadFile?type=1",
//     method: "post",
//     json: false,
//     data: formData,
//     uploadFile:true,
//     Headers: {
//       ContentType: "multipart/form-data;",
//     },
//   }).then(onSuccess).catch(onError);
// }

//-------树种管理--------------------
export function treeSpeciesListApi (params={}) {
  debugger  

  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/listTreeSpeciesPage',
    // data: params,
    data:params.params,
    json:false,
     
  })
}

export function treeSpeciesTreeApi (params={}) {
  debugger  

  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/listTreeSpecies',
    // data: params,
    data:params.params,
    json:false,
     
  })
}

export function treeSpeciesUpdateApi (params) {
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/update',
    data: params,
  })
}

export function treeSpeciesSaveApi (params) {
  params.botanyId=params.botanyId[0]?.id
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/insert',
    data: params,
  })
}


export function treeSpeciesDeleteApi (ids) {
  debugger
  ids=Array.isArray(ids)?ids.map(item=>item.id).join(','):[ids.id]
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/delete',
    data: ids,
  })
}


export function treeSpeciesDetailApi (data) {
  debugger
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/getInfo',
    data:{id:data.id},
    json:false
  })
}


//--------植物-------
export function loadMainPlaintApi(params){
  debugger
    const {pageNo,pageSize}=params
    let mainPlaintTable=  localStorage.getItem('main-plaint-table')
    if(!mainPlaintTable){
      mainPlaintTable='{}'
    }
    mainPlaintTable=JSON.parse(mainPlaintTable)
    const start=(pageNo-1)*pageSize,end=start+pageSize
    return  Promise.resolve().then(()=>{
      return {list:Object.values(mainPlaintTable).slice(start,end),totalCount:mainPlaintTable.length}
    })
}

export function mainPlaintUpdateApi(data){
  let mainPlaintTable=  localStorage.getItem('main-plaint-table')
  if(!mainPlaintTable){
    mainPlaintTable='{}'
  }
  mainPlaintTable=JSON.parse(mainPlaintTable)
  mainPlaintTable[data.id]=data
  localStorage.setItem('main-plaint-table',JSON.stringify(mainPlaintTable))
  return  Promise.resolve().then(()=>({}))  
} 
export function mainPlaintSaveApi(data){
  let mainPlaintTable=  localStorage.getItem('main-plaint-table')
  if(!mainPlaintTable){
    mainPlaintTable='{}'
  }
  mainPlaintTable=JSON.parse(mainPlaintTable)
  const id = Object.values(mainPlaintTable).length*2
  data.id=id
  mainPlaintTable[id]=data
  localStorage.setItem('main-plaint-table',JSON.stringify(mainPlaintTable))
  return  Promise.resolve().then(()=>({}))

}
export function mainPlaintDetailApi(data){
  const id=data.id
  let mainPlaintTable=  localStorage.getItem('main-plaint-table')
  if(!mainPlaintTable){
    mainPlaintTable='{}'
  }
  mainPlaintTable=JSON.parse(mainPlaintTable)
  return  Promise.resolve().then(()=>mainPlaintTable[id])

}
export function mainPlaintDeleteApi(data){

  const id=data.id
  let mainPlaintTable=  localStorage.getItem('main-plaint-table')
  if(!mainPlaintTable){
    mainPlaintTable='{}'
  }
  mainPlaintTable=JSON.parse(mainPlaintTable)
  delete mainPlaintTable[id]
  localStorage.setItem('main-plaint-table',JSON.stringify(mainPlaintTable))

  return  Promise.resolve().then(()=>({}))

}








