<template>
  <CurdPage
    title="古树名木管理"
    :fields="fields"
    :pageOptionsprops="pageOptions"
  ></CurdPage>

</template>
<script>

const LiuYang = "//23.13.5.135:8090"; //刘杨
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
localStorage.setItem('global_config',JSON.stringify({
    isDebug:true,
    host,
    amapWebKey,
    amapWebMapKey,
    amapStyleConfig,
})) 
  
import CurdPage from './dynamicPage/components/pageTemplate/DynamicCurdPage.vue' // 增删改查页面

// import {
//   oldtreeUpdateApi,
//   oldtreeSaveApi,
//   oldtreeDetailApi,
//   oldtreeListApi,
//   oldtreeDeleteApi
// } from './api/oldtree.js'

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
 function oldtreeListApi (params) {
  return Promise.resolve({})
}

 function oldtreeUpdateApi (params) {
  debugger

  params.manageUser=params.manageUser[0]?.id
  params.treeNameId=params.treeNameId[0]?.id
  params.unit=params.unit[0]?.id
  params.pic=params.pic?.map(pic=>pic.fileId)

  return Promise.resolve({})
}

 function oldtreeSaveApi (params) {
  params.manageUser=params.manageUser[0]?.id
  params.treeNameId=params.treeNameId[0]?.id
  params.unit=params.unit[0]?.id
  params.district=params.district[0]?.id
  params.pic=params.pic?.map(pic=>pic.fileId)
  return Promise.resolve({})
}


 function oldtreeDeleteApi (ids) {
  ids=Array.isArray(ids)?ids.join(','):ids
  return Promise.resolve({})
}

 function oldtreeDetailApi (data) {
  return Promise.resolve({})
}

import {
  buildFormFields,
  buildTableFields,
  buildSearchFields,
  deepMerge
} from './dynamicPage/utils/tool'
import fields from "./fields.js"

export default {
  name: 'dynamicCurdPage',
  components: {
    CurdPage
  },
  data () {
    return {
      // form字段
      fields,
      // 页面配置
      pageOptions: {
        searchForm: { showTestTool: false },
        topToolBar: {
          create: {
            dialog: {
              title: '新增表单',
              body: {
                props: { showTestTool: false },
                btns: {
                  save: {
                    apiPromise:  oldtreeSaveApi,
                    callback: {
                      showTip: true
                    }
                  }
                }
              }
            }
          },
          bulkdelete: {
            component: 'el-button',
            label: '批量删除',

            apiPromise:  oldtreeDeleteApi ,
            dataAdapter: (data) => {
              return data?.data || {}
            }
          }
        },

        tableOption: {
          loadListApi:  oldtreeListApi,

          lineActions: {
            update: {
              component: 'el-button',
              label: '更新',
              apiPromise: oldtreeDetailApi,
              dialog: {
                title: '更新表单',
                width: '60%',
                body: {
                  props: {
                    showTestTool: false
                  },
                  btns: {
                    save: {
                      label: '更改',
                      apiPromise:oldtreeUpdateApi
                    }
                  }
                }
              }
            },
            detail: null,
            aview: {
              component: 'el-button',
              label: '查看',
              actionType: 'dialogContent',
              properties: {
                key: 'view',
                size: 'small'
              },
              dialog: {
                title: '查看表单',
                width: '60%',
                data: {},
                body: [
                  {
                    component: 'dynamicForm',
                    name:'@object@',

                    props: {
                      class:["grid-col-12"],
                      dataRquest: {
                          apiPromise:  oldtreeDetailApi,
                        
                        },
                      
                      formOption: {
                        formProperties: {
                          'label-width': '100px',
                          'label-position': 'left'
                        },
                        borderForm: false,
                        showFoldBtn: false,
                        showTestTool: true,
                        textModel: true,
                        formItemList: buildFormFields(fields),
                        data: {},
                        
                      },

                      actions: {
                        //  save:null,
                        cancel: {
                          actionType: 'close',
                          label: '取消'
                        }
                      }
                    }
                  }
                ]
              }
            },
            delete: {
              component: 'el-button',
              label: '删除',
              actionType: 'requestApi',
              apiPromise:  oldtreeDeleteApi,
              dataAdapter: (data) => {
                return data?.data || {}
              },
              callback :{}
            }
          }
        },

 
        pagination: { 'hide-on-single-page': false }
        // tableOption: { formOption: { showFoldBtn: false } }
      }
    }
  }
}
</script>
<style lang="css" scoped></style>
