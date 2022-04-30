import request from './request'
import qs  from 'qs'

/* **************************** 系统配置-相关 **************************** */

/* 分页查询全部组织详细信息
@createTime 2022-04-18
@createUser luyi
@updateTime 2022-04-18
@updateUser luyi
@params params:[Object]，默认为
{
  keyword:"",
  pageNo:"",
  pageSize:""
}
*/
export function globalSysDeptPageAllDeptInfo (params) {
  return request({
    method: 'get',
    url: '/sys/dept/pageAllDeptInfo',
    params
  })
}

/* **************************** 文件下载-相关 **************************** */

/* 根据文件编号数组-获取文件列表信息
@createTime 2022-04-18
@createUser luyi
@updateTime 2022-04-18
@updateUser luyi
@params idList:[Array]文件id数组，形式为[id1,id2,id3]
*/
export function globalFileGetFileList (idList) {
  return request({
    method: 'post',
    url: `/file/getFileList?${idList.map((unit) => `ids=${unit}`).join('&')}`
  })
}

/* 根据文件id下载文件
@createTime 2022-04-18
@createUser luyi
@updateTime 2022-04-18
@updateUser luyi
@params fileId:[String]，文件id
*/
export function globalDownloadBaseFileId (fileId) {
  return request({ url: '/file/downloadFile', data: { id: fileId } })
}




export function elementUploadFileApi(options={}) {
  debugger;
  const {file,onSuccess,onError}=options
  let formData = new FormData();
  formData.append("files",file);
  return request({
    refuseToken: false,
    url: "/file/uploadFile?type=1",
    method: "post",
    json: false,
    data: formData,
    uploadFile:true,
    Headers: {
      ContentType: "multipart/form-data;",
    },
  }).then(res=>{
    debugger
    return {fileId:res.data[0]}
  }).then(onSuccess).catch(onError);
}


/**
 * 根据字典Type 获取字典列表  
 * @param {
          dictType: '***'
        } params   示例:
 * @returns   Promise
 */
export function selectDictDataInfoApi(params) {
  return request({
    url: '/sys/dict/data/selectDictDataInfo?'+qs.stringify(params),
    refuseToken: false,
    json: false,
    method:'get'
  })
}

